import { useEffect, useRef } from 'react'

// ─── Palette ────────────────────────────────────────────────────────────────
const COLORS = [
  { r: 255, g: 255, b: 255, weight: 0.60 }, // starlight white
  { r:  74, g: 111, b: 165, weight: 0.28 }, // celestial blue
  { r: 212, g: 175, b:  55, weight: 0.12 }, // subtle gold
]

function pickColor() {
  const rnd = Math.random()
  let acc = 0
  for (const c of COLORS) {
    acc += c.weight
    if (rnd < acc) return c
  }
  return COLORS[0]
}

function lerp(a, b, t) { return a + (b - a) * t }

// ─── Component ──────────────────────────────────────────────────────────────
export default function ConstellationBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })

    // ── state ──
    let W = 0, H = 0
    let rafId = 0
    let scrollY = 0
    let stars = []

    // ── helpers ──
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    function resize() {
      const parent = canvas.parentElement
      W = parent ? parent.offsetWidth  : window.innerWidth
      H = parent ? parent.offsetHeight : window.innerHeight
      canvas.width  = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      rebuild()
    }

    function rebuild() {
      const density = Math.max(40, Math.min(72, Math.floor((W * H) / 22000)))
      stars = Array.from({ length: density }, () => {
        const col = pickColor()
        return {
          x:  Math.random() * W,
          y:  Math.random() * H,
          r:  0.7 + Math.random() * 2.1,          // 0.7 → 2.8 px
          col,
          // twinkle
          phase:  Math.random() * Math.PI * 2,
          speed:  0.4 + Math.random() * 1.2,       // rad/s
          minA:   0.18 + Math.random() * 0.22,
          maxA:   0.72 + Math.random() * 0.28,
          // drift
          vx: (Math.random() - 0.5) * 0.055,
          vy: (Math.random() - 0.5) * 0.055,
          // parallax depth (0.3 = far/slow … 1.0 = close/fast)
          depth: 0.3 + Math.random() * 0.7,
        }
      })
    }

    // ── edge list — recomputed only on rebuild (O(n²) once, not per frame) ──
    let edges = []
    const LINK_DIST = 118
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST

    function buildEdges() {
      edges = []
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK_DIST_SQ) {
            edges.push({ i, j, dist: Math.sqrt(d2) })
          }
        }
      }
    }

    function fullRebuild() { rebuild(); buildEdges() }

    // ── animation ──
    let prevT = 0

    function frame(t) {
      if (document.visibilityState === 'hidden') {
        rafId = 0
        return
      }
      const dt = Math.min((t - prevT) / 1000, 0.05) // seconds, capped at 50ms
      prevT = t

      // clear
      ctx.fillStyle = '#0a0e27'
      ctx.fillRect(0, 0, W, H)

      // scroll parallax offset (stars further = move less)
      const scrollOff = scrollY * 0.10

      // cache projected positions
      const px = new Float32Array(stars.length)
      const py = new Float32Array(stars.length)
      const pa = new Float32Array(stars.length)

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]

        // drift
        s.x += s.vx
        s.y += s.vy
        if (s.x < 0) s.x = W
        else if (s.x > W) s.x = 0
        if (s.y < 0) s.y = H
        else if (s.y > H) s.y = 0

        // twinkle — smooth sinusoidal
        s.phase += s.speed * dt
        const alpha = lerp(s.minA, s.maxA, (Math.sin(s.phase) + 1) * 0.5)
        pa[i] = alpha

        // project: breathing (0.8% scale pulse) + scroll parallax per depth
        const breathe = 1 + Math.sin(t * 0.00028) * 0.008
        const cx = W * 0.5, cy = H * 0.5
        px[i] = cx + (s.x - cx) * breathe
        py[i] = cy + (s.y - cy) * breathe - scrollOff * s.depth
      }

      // ── draw lines ──
      ctx.save()
      ctx.lineWidth = 0.75
      for (const { i, j, dist } of edges) {
        const fade = 1 - dist / LINK_DIST
        // pulse edges slightly with average star alpha
        const edgeAlpha = fade * fade * 0.42 * ((pa[i] + pa[j]) * 0.5)
        ctx.globalAlpha = edgeAlpha
        ctx.strokeStyle = 'rgb(74,111,165)'
        ctx.beginPath()
        ctx.moveTo(px[i], py[i])
        ctx.lineTo(px[j], py[j])
        ctx.stroke()
      }
      ctx.restore()

      // ── draw stars ──
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const { r: cr, g: cg, b: cb } = s.col
        const x = px[i], y = py[i]
        const alpha = pa[i]

        // soft glow halo
        const glowR = s.r * 5.5
        const grd = ctx.createRadialGradient(x, y, 0, x, y, glowR)
        grd.addColorStop(0,   `rgba(${cr},${cg},${cb},${(alpha * 0.50).toFixed(3)})`)
        grd.addColorStop(0.4, `rgba(${cr},${cg},${cb},${(alpha * 0.18).toFixed(3)})`)
        grd.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`)
        ctx.globalAlpha = 1
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(x, y, glowR, 0, Math.PI * 2)
        ctx.fill()

        // crisp core
        ctx.globalAlpha = alpha
        ctx.fillStyle = `rgb(${cr},${cg},${cb})`
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(frame)
    }

    const kick = (t) => {
      prevT = t
      frame(t)
    }

    // ── lifecycle ──
    resize()

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        cancelAnimationFrame(rafId)
        rafId = 0
      } else if (!rafId) {
        rafId = requestAnimationFrame(kick)
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    if (document.visibilityState === 'hidden') {
      rafId = 0
    } else {
      rafId = requestAnimationFrame(kick)
    }

    const onScroll  = () => { scrollY = window.scrollY }
    const onResize  = () => resize()

    const ro = new ResizeObserver(onResize)
    ro.observe(canvas.parentElement || document.body)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize',  onResize)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize',  onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        display:       'block',
        pointerEvents: 'none',
        zIndex:        0,
      }}
    />
  )
}
