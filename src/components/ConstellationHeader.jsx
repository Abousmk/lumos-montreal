import { useEffect, useMemo, useRef } from 'react'
import '../styles/constellation.css'

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

export default function ConstellationHeader({ className = '', density = 1, glow = 1 }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const introStartRef = useRef(0)
  const heroConstellations = useMemo(
    () => [
      /* Silhouette centrale type figure / gémeaux (ref visuelle) */
      [
        [0.48, 0.22],
        [0.44, 0.34],
        [0.42, 0.46],
        [0.4, 0.58],
        [0.38, 0.72],
        [0.36, 0.86],
      ],
      [
        [0.58, 0.22],
        [0.56, 0.34],
        [0.58, 0.46],
        [0.6, 0.58],
        [0.62, 0.72],
        [0.64, 0.86],
      ],
      [
        [0.48, 0.22],
        [0.58, 0.22],
      ],
      [
        [0.42, 0.46],
        [0.58, 0.46],
      ],
      [
        [0.4, 0.58],
        [0.6, 0.58],
      ],
      /* Diagonale « Voie lactée » */
      [
        [0.08, 0.82],
        [0.2, 0.68],
        [0.32, 0.52],
        [0.48, 0.38],
        [0.66, 0.28],
        [0.82, 0.18],
        [0.92, 0.12],
      ],
      [
        [0.12, 0.28],
        [0.22, 0.36],
        [0.3, 0.22],
      ],
      [
        [0.72, 0.72],
        [0.82, 0.62],
        [0.88, 0.78],
      ],
    ],
    [],
  )

  useEffect(() => {
    const root = wrapRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    let ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    let rafId = 0
    let w = 0
    let h = 0
    let dpr = 1

    const stars = []
    const edges = []
    const landmarks = []
    const starPx = new Float32Array(4096)
    const starPy = new Float32Array(4096)
    const starRScale = new Float32Array(4096)
    const starAlpha = new Float32Array(4096)
    let introClockStarted = false

    const measure = () => {
      const rect = root.getBoundingClientRect()
      let rw = rect.width
      let rh = rect.height
      if (rw < 48 || rh < 48) {
        rw = Math.max(rw, root.clientWidth, root.offsetWidth, window.innerWidth * 0.98)
        rh = Math.max(rh, root.clientHeight, root.offsetHeight, window.innerHeight * 0.98)
      }
      return { rw: Math.max(48, rw), rh: Math.max(48, rh) }
    }

    const resize = () => {
      const { rw, rh } = measure()
      w = Math.floor(rw)
      h = Math.floor(rh)
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      stars.length = 0
      edges.length = 0
      landmarks.length = 0
      const count = Math.max(40, Math.floor((w * h) / 42000) * density)

      for (let i = 0; i < count; i += 1) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.85 + Math.random() * 2.4,
          tw: Math.random() * Math.PI * 2,
          sp: 0.35 + Math.random() * 1.1,
          a: 0.45 + Math.random() * 0.45,
          depth: Math.random(),
        })
      }

      const threshold = Math.min(Math.max(w, h) * 0.26, 190)
      for (let i = 0; i < stars.length; i += 1) {
        for (let j = i + 1; j < stars.length; j += 1) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < threshold && Math.random() < 0.13) {
            edges.push([i, j, dist / threshold])
          }
        }
      }

      for (let c = 0; c < heroConstellations.length; c += 1) {
        const chain = heroConstellations[c]
        const mapped = []
        for (let i = 0; i < chain.length; i += 1) {
          const [nx, ny] = chain[i]
          mapped.push({
            x: nx * w,
            y: ny * h,
            r: 3 + Math.random() * 2.4,
            phase: Math.random() * Math.PI * 2,
          })
        }
        landmarks.push(mapped)
      }

      if (!introClockStarted) {
        introClockStarted = true
        introStartRef.current = performance.now()
      }
    }

    const drawFlare = (px, py, len, alpha) => {
      ctx.strokeStyle = `rgba(255, 248, 255, ${alpha.toFixed(3)})`
      ctx.lineWidth = 1.15
      ctx.beginPath()
      ctx.moveTo(px - len, py)
      ctx.lineTo(px + len, py)
      ctx.moveTo(px, py - len)
      ctx.lineTo(px, py + len)
      ctx.stroke()
    }

    const paintFrame = (t, { frozen }) => {
      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06

      ctx.clearRect(0, 0, w, h)

      const cx = w * 0.5
      const cy = h * 0.5
      const now = performance.now()
      const introT = frozen ? 1 : Math.min(1, (now - introStartRef.current) / 2400)
      const entryEase = frozen ? 1 : 1 + (1 - easeOutCubic(introT)) * 0.16
      const breathe = frozen ? 1 : 1 + 0.1 * Math.sin(t * 0.00055)
      const drift = frozen ? 1 : 1 + 0.065 * Math.sin(t * 0.00042)
      const n = stars.length

      for (let i = 0; i < n; i += 1) {
        const s = stars[i]
        const z = entryEase * breathe * (1 + s.depth * 0.28 * drift)
        const par = 0.014 + s.depth * 0.048
        starPx[i] = cx + (s.x - cx) * z + pointer.x * par
        starPy[i] = cy + (s.y - cy) * z + pointer.y * par
        const a1 = t * 0.009 * s.sp + s.tw
        const rawTw = 0.22 + Math.sin(a1) * 0.45 + Math.sin(a1 * 2.17 + 1.1) * 0.38
        const twinkle = frozen ? 0.82 : Math.min(1, Math.max(0.1, rawTw))
        starRScale[i] = s.r * (0.88 + s.depth * 0.22) * (frozen ? 1 : 0.72 + twinkle * 0.42)
        starAlpha[i] = s.a * twinkle
      }

      const chainZoom = entryEase * breathe * 1.02
      const linePulseGlobal = frozen ? 1 : 0.62 + Math.sin(t * 0.0028) * 0.38
      const energy = frozen ? 0.35 : (t * 0.00055) % 1

      for (let i = 0; i < edges.length; i += 1) {
        const [aIdx, bIdx, fade] = edges[i]
        const pulse = frozen ? 0.88 : 0.58 + Math.sin(t * 0.0024 + stars[aIdx].tw + stars[bIdx].tw) * 0.42
        const alpha = (1 - fade) * 0.72 * pulse
        ctx.strokeStyle = `rgba(170, 215, 255, ${alpha.toFixed(3)})`
        ctx.lineWidth = 1.05
        ctx.beginPath()
        ctx.moveTo(starPx[aIdx], starPy[aIdx])
        ctx.lineTo(starPx[bIdx], starPy[bIdx])
        ctx.stroke()
      }

      for (let i = 0; i < n; i += 1) {
        const px = starPx[i]
        const py = starPy[i]
        const rr = starRScale[i]
        const alpha = starAlpha[i]
        const haloR = rr * 5.2 * glow
        const useHalo = haloR >= 1.2 || alpha > 0.18

        if (useHalo) {
          const grad = ctx.createRadialGradient(px, py, 0, px, py, haloR)
          grad.addColorStop(0, `rgba(255,255,255,${Math.min(alpha + 0.35, 1).toFixed(3)})`)
          grad.addColorStop(0.35, `rgba(185, 220, 255,${(alpha * 0.85).toFixed(3)})`)
          grad.addColorStop(1, 'rgba(120,170,255,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(px, py, haloR, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(255,255,255,${Math.min(alpha + 0.2, 1).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(px, py, rr, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let c = 0; c < landmarks.length; c += 1) {
        const chain = landmarks[c]
        if (chain.length < 2) continue

        for (let i = 0; i < chain.length - 1; i += 1) {
          const a = chain[i]
          const b = chain[i + 1]
          const pulse = frozen ? 0.85 : 0.55 + Math.sin(t * 0.0022 + a.phase) * 0.45
          const ax = cx + (a.x - cx) * chainZoom + pointer.x * 0.04
          const ay = cy + (a.y - cy) * chainZoom + pointer.y * 0.04
          const bx = cx + (b.x - cx) * chainZoom + pointer.x * 0.04
          const by = cy + (b.y - cy) * chainZoom + pointer.y * 0.04
          const segPulse = 0.55 + 0.45 * Math.sin((energy * Math.PI * 2) + i * 0.7 + c * 0.4)
          ctx.strokeStyle = `rgba(210, 240, 255, ${(0.78 * pulse * linePulseGlobal * segPulse).toFixed(3)})`
          ctx.lineWidth = 2.65
          ctx.shadowColor = 'rgba(160, 220, 255, 0.75)'
          ctx.shadowBlur = 12
          ctx.beginPath()
          ctx.moveTo(ax, ay)
          ctx.lineTo(bx, by)
          ctx.stroke()

          if (!frozen) {
            const mx = ax + (bx - ax) * ((energy + i * 0.07 + c * 0.11) % 1)
            const my = ay + (by - ay) * ((energy + i * 0.07 + c * 0.11) % 1)
            ctx.shadowBlur = 14
            ctx.fillStyle = `rgba(255, 255, 255, ${(0.42 * segPulse).toFixed(3)})`
            ctx.beginPath()
            ctx.arc(mx, my, 3.2, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 8
          }
        }
        ctx.shadowBlur = 0

        for (let i = 0; i < chain.length; i += 1) {
          const node = chain[i]
          const pulse = frozen ? 0.82 : 0.52 + Math.sin(t * 0.0028 + node.phase) * 0.48
          const px = cx + (node.x - cx) * chainZoom + pointer.x * 0.04
          const py = cy + (node.y - cy) * chainZoom + pointer.y * 0.04
          const rr = node.r * (0.92 + pulse * 0.28)
          drawFlare(px, py, rr * 4.2, (0.42 + 0.28 * Math.sin(t * 0.0033 + node.phase)) * pulse)

          const g = ctx.createRadialGradient(px, py, 0, px, py, rr * 8 * glow)
          g.addColorStop(0, `rgba(255,255,255,${Math.min(0.95 * pulse, 1).toFixed(3)})`)
          g.addColorStop(0.22, `rgba(200, 230, 255,${(0.72 * pulse).toFixed(3)})`)
          g.addColorStop(1, 'rgba(100, 150, 220, 0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(px, py, rr * 8 * glow, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = `rgba(255,255,255,${Math.min(0.95 * pulse, 1).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(px, py, rr, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const onMove = (e) => {
      const rect = root.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5
      const ny = (e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5
      pointer.tx = nx * 14
      pointer.ty = ny * 14
    }

    const onLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
    }

    let resizeRaf = 0
    const scheduleResize = () => {
      if (resizeRaf) return
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0
        resize()
        if (prefersReduced) paintFrame(0, { frozen: true })
      })
    }

    resize()
    requestAnimationFrame(() => {
      resize()
    })

    if (prefersReduced) {
      requestAnimationFrame(() => {
        resize()
        paintFrame(0, { frozen: true })
      })
      window.addEventListener('resize', scheduleResize)
      const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleResize) : null
      ro?.observe(root)
      return () => {
        if (resizeRaf) cancelAnimationFrame(resizeRaf)
        window.removeEventListener('resize', scheduleResize)
        ro?.disconnect()
      }
    }

    const runLoop = (t) => {
      if (document.visibilityState === 'hidden') {
        rafId = 0
        return
      }
      paintFrame(t, { frozen: false })
      rafId = requestAnimationFrame(runLoop)
    }

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        cancelAnimationFrame(rafId)
        rafId = 0
      } else if (!rafId) {
        rafId = requestAnimationFrame(runLoop)
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    if (document.visibilityState === 'hidden') {
      rafId = 0
    } else {
      rafId = requestAnimationFrame(runLoop)
    }

    window.addEventListener('resize', scheduleResize)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleResize) : null
    ro?.observe(root)

    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave, { passive: true })

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(rafId)
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      window.removeEventListener('resize', scheduleResize)
      ro?.disconnect()
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [density, glow])

  return (
    <div ref={wrapRef} className={`constellation-header ${className}`}>
      <div className="constellation-header__starfield" aria-hidden="true">
        <div className="constellation-header__starfield-inner" />
      </div>
      <canvas ref={canvasRef} className="constellation-header__canvas" />
      <div className="constellation-header__veil" aria-hidden="true" />
    </div>
  )
}
