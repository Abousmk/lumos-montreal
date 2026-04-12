import { useEffect, useRef } from 'react'

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

/**
 * Canvas 2D — pas de setState à chaque frame (meilleur TBT que l’ancien SVG React).
 */
export const ShootingStars = ({
  starColor = '#d4af37',
  trailColor = '#4a6fa5',
  maxStars = 2,
  minSpeed = 2,
  maxSpeed = 4.2,
  minSpawnMs = 5500,
  maxSpawnMs = 14000,
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25)

    let stars = []
    let rafId = 0
    let spawnTimeoutId = null
    let lastTime = performance.now()
    let W = 0
    let H = 0

    const resize = () => {
      W = parent.clientWidth
      H = parent.clientHeight
      if (W < 1 || H < 1) return
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    ro?.observe(parent)

    const spawnStar = () => {
      if (stars.length >= maxStars) return
      const side = Math.floor(Math.random() * 4)
      let x
      let y
      let angleDeg
      switch (side) {
        case 0:
          x = randomBetween(0, W)
          y = -40
          angleDeg = 42 + randomBetween(-12, 12)
          break
        case 1:
          x = W + 40
          y = randomBetween(0, H)
          angleDeg = 132 + randomBetween(-12, 12)
          break
        case 2:
          x = randomBetween(0, W)
          y = H + 40
          angleDeg = 222 + randomBetween(-12, 12)
          break
        default:
          x = -40
          y = randomBetween(0, H)
          angleDeg = 312 + randomBetween(-12, 12)
      }
      const angle = (angleDeg * Math.PI) / 180
      stars.push({
        x,
        y,
        angle,
        speed: randomBetween(minSpeed, maxSpeed),
        length: randomBetween(55, 105),
        width: randomBetween(0.9, 1.5),
      })
    }

    const scheduleSpawn = () => {
      clearTimeout(spawnTimeoutId)
      spawnTimeoutId = window.setTimeout(() => {
        spawnStar()
        scheduleSpawn()
      }, randomBetween(minSpawnMs, maxSpawnMs))
    }

    const loop = (now) => {
      if (document.visibilityState === 'hidden') {
        rafId = 0
        return
      }
      const dt = Math.min((now - lastTime) / 16.67, 2.2)
      lastTime = now

      ctx.clearRect(0, 0, W, H)

      stars = stars.filter((s) => {
        s.x += Math.cos(s.angle) * s.speed * dt * 7
        s.y += Math.sin(s.angle) * s.speed * dt * 7

        const lx = Math.cos(s.angle)
        const ly = Math.sin(s.angle)
        const x0 = s.x - lx * s.length
        const y0 = s.y - ly * s.length

        const g = ctx.createLinearGradient(x0, y0, s.x, s.y)
        g.addColorStop(0, `${trailColor}00`)
        g.addColorStop(0.4, trailColor)
        g.addColorStop(1, starColor)

        ctx.strokeStyle = g
        ctx.lineWidth = s.width
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()

        return s.x > -100 && s.x < W + 100 && s.y > -100 && s.y < H + 100
      })

      rafId = requestAnimationFrame(loop)
    }

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        cancelAnimationFrame(rafId)
        rafId = 0
        clearTimeout(spawnTimeoutId)
        spawnTimeoutId = 0
      } else {
        lastTime = performance.now()
        if (!rafId) rafId = requestAnimationFrame(loop)
        scheduleSpawn()
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    rafId = requestAnimationFrame(loop)
    spawnTimeoutId = window.setTimeout(() => {
      spawnStar()
      scheduleSpawn()
    }, 800)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(rafId)
      clearTimeout(spawnTimeoutId)
      ro?.disconnect()
    }
  }, [starColor, trailColor, maxStars, minSpeed, maxSpeed, minSpawnMs, maxSpawnMs])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
