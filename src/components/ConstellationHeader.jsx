import { useEffect, useMemo, useRef } from 'react'
import '../styles/constellation.css'

export default function ConstellationHeader({ className = '', density = 1, glow = 1 }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const runningRef = useRef(true)
  const heroConstellations = useMemo(
    () => [
      [
        [0.09, 0.56],
        [0.16, 0.48],
        [0.24, 0.42],
        [0.33, 0.4],
        [0.41, 0.45],
        [0.5, 0.52],
      ],
      [
        [0.56, 0.3],
        [0.64, 0.35],
        [0.72, 0.31],
        [0.79, 0.37],
        [0.87, 0.33],
      ],
      [
        [0.28, 0.72],
        [0.38, 0.66],
        [0.47, 0.72],
        [0.57, 0.69],
        [0.67, 0.75],
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
        })
      }

      const threshold = Math.min(Math.max(w, h) * 0.24, 170)
      for (let i = 0; i < stars.length; i += 1) {
        for (let j = i + 1; j < stars.length; j += 1) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < threshold && Math.random() < 0.085) {
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
            r: 2.3 + Math.random() * 1.6,
            phase: Math.random() * Math.PI * 2,
          })
        }
        landmarks.push(mapped)
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

      for (let i = 0; i < edges.length; i += 1) {
        const [aIdx, bIdx, fade] = edges[i]
        const a = stars[aIdx]
        const b = stars[bIdx]
        const pulse = 0.75 + Math.sin(t * 0.0016 + a.tw + b.tw) * 0.25
        const alpha = (1 - fade) * 0.42 * pulse
        ctx.strokeStyle = `rgba(150, 200, 255, ${alpha.toFixed(3)})`
        ctx.lineWidth = 0.7
        ctx.beginPath()
        ctx.moveTo(a.x + pointer.x * 0.02, a.y + pointer.y * 0.02)
        ctx.lineTo(b.x + pointer.x * 0.02, b.y + pointer.y * 0.02)
        ctx.stroke()
      }

      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i]
        const twinkle = 0.65 + Math.sin(t * 0.0012 * s.sp + s.tw) * 0.35
        const alpha = s.a * twinkle
        const px = s.x + pointer.x * 0.035
        const py = s.y + pointer.y * 0.035

        const grad = ctx.createRadialGradient(px, py, 0, px, py, s.r * 5.2 * glow)
        grad.addColorStop(0, `rgba(255,255,255,${Math.min(alpha + 0.25, 1).toFixed(3)})`)
        grad.addColorStop(0.35, `rgba(170,215,255,${(alpha * 0.8).toFixed(3)})`)
        grad.addColorStop(1, 'rgba(120,170,255,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, s.r * 5.2 * glow, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255,255,255,${Math.min(alpha + 0.15, 1).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let c = 0; c < landmarks.length; c += 1) {
        const chain = landmarks[c]
        if (chain.length < 2) continue

        for (let i = 0; i < chain.length - 1; i += 1) {
          const a = chain[i]
          const b = chain[i + 1]
          const pulse = 0.7 + Math.sin(t * 0.001 + a.phase) * 0.3
          ctx.strokeStyle = `rgba(170, 220, 255, ${(0.35 * pulse).toFixed(3)})`
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.moveTo(a.x + pointer.x * 0.04, a.y + pointer.y * 0.04)
          ctx.lineTo(b.x + pointer.x * 0.04, b.y + pointer.y * 0.04)
          ctx.stroke()
        }

        for (let i = 0; i < chain.length; i += 1) {
          const n = chain[i]
          const pulse = 0.65 + Math.sin(t * 0.0015 + n.phase) * 0.35
          const px = n.x + pointer.x * 0.04
          const py = n.y + pointer.y * 0.04
          const rr = n.r * (0.9 + pulse * 0.25)

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

    resize()
    rafId = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
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
