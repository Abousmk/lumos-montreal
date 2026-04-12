import { useEffect, useMemo, useRef } from 'react'
import '../styles/constellation.css'

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

export default function ConstellationHeader({ className = '', density = 1, glow = 1 }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const runningRef = useRef(true)
  const introStartRef = useRef(0)
  const heroConstellations = useMemo(
    () => [
      /* Grande diagonale type « gémeaux » / Voie lactée — lisible sur tous les headers */
      [
        [0.12, 0.78],
        [0.22, 0.58],
        [0.34, 0.44],
        [0.46, 0.36],
        [0.58, 0.3],
        [0.7, 0.26],
        [0.82, 0.22],
        [0.9, 0.18],
      ],
      /* Figure jumelle (lignes courtes, nœuds brillants) */
      [
        [0.52, 0.72],
        [0.48, 0.58],
        [0.5, 0.46],
        [0.54, 0.34],
        [0.58, 0.22],
      ],
      [
        [0.62, 0.68],
        [0.66, 0.54],
        [0.64, 0.42],
        [0.6, 0.3],
        [0.56, 0.2],
      ],
      /* Pont entre les deux */
      [
        [0.58, 0.22],
        [0.62, 0.28],
        [0.66, 0.34],
      ],
      [
        [0.08, 0.32],
        [0.18, 0.38],
        [0.28, 0.3],
        [0.36, 0.22],
      ],
      [
        [0.24, 0.82],
        [0.36, 0.74],
        [0.44, 0.82],
        [0.52, 0.88],
      ],
    ],
    [],
  )

  useEffect(() => {
    const root = wrapRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReduced) {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const rect = root.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, rect.width, rect.height)
      return
    }

    const ctx = canvas.getContext('2d')
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

    const resize = () => {
      const rect = root.getBoundingClientRect()
      w = Math.max(1, rect.width)
      h = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      stars.length = 0
      edges.length = 0
      landmarks.length = 0
      const count = Math.max(24, Math.floor((w * h) / 32000) * density)

      for (let i = 0; i < count; i += 1) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.9 + Math.random() * 2.1,
          tw: Math.random() * Math.PI * 2,
          sp: 0.3 + Math.random() * 0.9,
          a: 0.35 + Math.random() * 0.5,
          depth: Math.random(),
        })
      }

      const threshold = Math.min(Math.max(w, h) * 0.24, 170)
      for (let i = 0; i < stars.length; i += 1) {
        for (let j = i + 1; j < stars.length; j += 1) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < threshold && Math.random() < 0.11) {
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
            r: 2.8 + Math.random() * 2.2,
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

    const draw = (t) => {
      if (!runningRef.current) {
        rafId = requestAnimationFrame(draw)
        return
      }

      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06

      ctx.clearRect(0, 0, w, h)

      const cx = w * 0.5
      const cy = h * 0.5
      const now = performance.now()
      const introT = Math.min(1, (now - introStartRef.current) / 2400)
      const entryEase = 1 + (1 - easeOutCubic(introT)) * 0.16
      const breathe = 1 + 0.055 * Math.sin(t * 0.00022)
      const drift = 1 + 0.038 * Math.sin(t * 0.00017)
      const n = stars.length

      for (let i = 0; i < n; i += 1) {
        const s = stars[i]
        const z = entryEase * breathe * (1 + s.depth * 0.28 * drift)
        const par = 0.014 + s.depth * 0.048
        starPx[i] = cx + (s.x - cx) * z + pointer.x * par
        starPy[i] = cy + (s.y - cy) * z + pointer.y * par
        const twinkle = 0.65 + Math.sin(t * 0.0012 * s.sp + s.tw) * 0.35
        starRScale[i] = s.r * (0.88 + s.depth * 0.22) * (0.97 + twinkle * 0.06)
        starAlpha[i] = s.a * twinkle
      }

      const chainZoom = entryEase * breathe * 1.02
      const linePulseGlobal = 0.88 + Math.sin(t * 0.0009) * 0.12

      for (let i = 0; i < edges.length; i += 1) {
        const [aIdx, bIdx, fade] = edges[i]
        const pulse = 0.75 + Math.sin(t * 0.0016 + stars[aIdx].tw + stars[bIdx].tw) * 0.25
        const alpha = (1 - fade) * 0.55 * pulse
        ctx.strokeStyle = `rgba(160, 210, 255, ${alpha.toFixed(3)})`
        ctx.lineWidth = 0.95
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
        const useHalo = haloR >= 2.2 || alpha > 0.38

        if (useHalo) {
          const grad = ctx.createRadialGradient(px, py, 0, px, py, haloR)
          grad.addColorStop(0, `rgba(255,255,255,${Math.min(alpha + 0.25, 1).toFixed(3)})`)
          grad.addColorStop(0.35, `rgba(170,215,255,${(alpha * 0.8).toFixed(3)})`)
          grad.addColorStop(1, 'rgba(120,170,255,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(px, py, haloR, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(255,255,255,${Math.min(alpha + 0.15, 1).toFixed(3)})`
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
          const pulse = 0.72 + Math.sin(t * 0.001 + a.phase) * 0.28
          const ax = cx + (a.x - cx) * chainZoom + pointer.x * 0.04
          const ay = cy + (a.y - cy) * chainZoom + pointer.y * 0.04
          const bx = cx + (b.x - cx) * chainZoom + pointer.x * 0.04
          const by = cy + (b.y - cy) * chainZoom + pointer.y * 0.04
          ctx.strokeStyle = `rgba(190, 230, 255, ${(0.52 * pulse * linePulseGlobal).toFixed(3)})`
          ctx.lineWidth = 2.1
          ctx.shadowColor = 'rgba(120, 190, 255, 0.45)'
          ctx.shadowBlur = 6
          ctx.beginPath()
          ctx.moveTo(ax, ay)
          ctx.lineTo(bx, by)
          ctx.stroke()
        }
        ctx.shadowBlur = 0

        for (let i = 0; i < chain.length; i += 1) {
          const node = chain[i]
          const pulse = 0.68 + Math.sin(t * 0.0015 + node.phase) * 0.32
          const px = cx + (node.x - cx) * chainZoom + pointer.x * 0.04
          const py = cy + (node.y - cy) * chainZoom + pointer.y * 0.04
          const rr = node.r * (0.92 + pulse * 0.28)
          const linePulse = 0.85 + Math.sin(t * 0.0018 + node.phase * 1.3) * 0.15
          ctx.strokeStyle = `rgba(220, 240, 255, ${(0.32 * linePulse).toFixed(3)})`
          ctx.lineWidth = 1.05
          ctx.beginPath()
          ctx.moveTo(px - rr * 3.2, py)
          ctx.lineTo(px + rr * 3.2, py)
          ctx.moveTo(px, py - rr * 3.2)
          ctx.lineTo(px, py + rr * 3.2)
          ctx.stroke()

          const g = ctx.createRadialGradient(px, py, 0, px, py, rr * 7.6 * glow)
          g.addColorStop(0, `rgba(255,255,255,${Math.min(0.9 * pulse, 1).toFixed(3)})`)
          g.addColorStop(0.25, `rgba(180,225,255,${(0.6 * pulse).toFixed(3)})`)
          g.addColorStop(1, 'rgba(120,170,255,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(px, py, rr * 7.6 * glow, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = `rgba(255,255,255,${Math.min(0.9 * pulse, 1).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(px, py, rr, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const rect = root.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      pointer.tx = nx * 12
      pointer.ty = ny * 12
    }

    const onLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        runningRef.current = !!entry?.isIntersecting
      },
      { threshold: 0.01 },
    )
    io.observe(root)

    let resizeRaf = 0
    const scheduleResize = () => {
      if (resizeRaf) return
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0
        resize()
      })
    }

    resize()
    requestAnimationFrame(() => {
      resize()
    })
    rafId = requestAnimationFrame(draw)

    window.addEventListener('resize', scheduleResize)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleResize) : null
    ro?.observe(root)

    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      window.removeEventListener('resize', scheduleResize)
      ro?.disconnect()
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      io.disconnect()
    }
  }, [density, glow])

  return (
    <div ref={wrapRef} className={`constellation-header ${className}`}>
      <canvas ref={canvasRef} className="constellation-header__canvas" />
      <div className="constellation-header__veil" aria-hidden="true" />
    </div>
  )
}
