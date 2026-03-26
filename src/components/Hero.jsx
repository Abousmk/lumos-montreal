import { useEffect, useRef } from 'react'
import '../styles/hero.css'

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) return

    let targetX = 0.5
    let targetY = 0.5
    let curX = 0.5
    let curY = 0.5
    let active = false
    let rafId = 0

    const clamp01 = (n) => Math.max(0, Math.min(1, n))

    const setVars = () => {
      el.style.setProperty('--hx', `${curX * 100}%`)
      el.style.setProperty('--hy', `${curY * 100}%`)

      // Two independent transforms (no CSS multiplication needed).
      const tx1 = (curX - 0.5) * 44
      const ty1 = (curY - 0.5) * 32
      const r1 = (curX - 0.5) * -10

      const tx2 = (curX - 0.5) * -28
      const ty2 = (curY - 0.5) * 40
      const r2 = (curX - 0.5) * 8

      el.style.setProperty('--tx1', `${tx1}px`)
      el.style.setProperty('--ty1', `${ty1}px`)
      el.style.setProperty('--rot1', `${r1}deg`)

      el.style.setProperty('--tx2', `${tx2}px`)
      el.style.setProperty('--ty2', `${ty2}px`)
      el.style.setProperty('--rot2', `${r2}deg`)
    }

    const loop = () => {
      const lerp = active ? 0.1 : 0.03
      curX += (targetX - curX) * lerp
      curY += (targetY - curY) * lerp
      setVars()
      rafId = requestAnimationFrame(loop)
    }

    setVars()
    rafId = requestAnimationFrame(loop)

    const computeTargetFromClient = (clientX, clientY) => {
      const rect = el.getBoundingClientRect()
      const x = (clientX - rect.left) / rect.width
      const y = (clientY - rect.top) / rect.height
      targetX = clamp01(x)
      targetY = clamp01(y)
    }

    const onMouseEnter = () => {
      active = true
    }

    const onMouseLeave = () => {
      active = false
      targetX = 0.5
      targetY = 0.5
    }

    const onMouseMove = (e) => {
      active = true
      computeTargetFromClient(e.clientX, e.clientY)
    }

    const onTouchMove = (e) => {
      active = true
      if (!e.touches || !e.touches[0]) return
      computeTargetFromClient(e.touches[0].clientX, e.touches[0].clientY)
    }

    const onTouchEnd = () => {
      active = false
      targetX = 0.5
      targetY = 0.5
    }

    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mousemove', onMouseMove, { passive: true })

    el.addEventListener('touchstart', onTouchMove, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('touchstart', onTouchMove)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [])

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-pointer" aria-hidden="true" />
      <div className="hero-groups" aria-hidden="true">
        <img
          className="hero-group hero-group-1"
          src={new URL('../../images/Groupe1.jpg', import.meta.url).href}
          alt=""
          draggable={false}
        />
        <img
          className="hero-group hero-group-2"
          src={new URL('../../images/Groupe2.jpg', import.meta.url).href}
          alt=""
          draggable={false}
        />
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Agence événementielle,
            <br />
            <span className="title-highlight">Née à Montréal</span>
          </h1>
          <p className="hero-subtitle">Mettre en lumière la scène émergente</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
