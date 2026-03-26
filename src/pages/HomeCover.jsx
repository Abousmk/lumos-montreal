import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/home-cover.css'

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

function useInteractiveTilt(containerRef) {
  const rafRef = useRef(0)
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReduced) return

    const apply = () => {
      rafRef.current = 0
      const x = clamp(target.current.x, -1, 1)
      const y = clamp(target.current.y, -1, 1)
      el.style.setProperty('--mx', String(x))
      el.style.setProperty('--my', String(y))
    }

    const onMove = (clientX, clientY) => {
      const r = el.getBoundingClientRect()
      const px = (clientX - (r.left + r.width / 2)) / (r.width / 2)
      const py = (clientY - (r.top + r.height / 2)) / (r.height / 2)
      target.current.x = px
      target.current.y = py
      if (!rafRef.current) rafRef.current = requestAnimationFrame(apply)
    }

    const onMouseMove = (e) => onMove(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      const t = e.touches?.[0]
      if (t) onMove(t.clientX, t.clientY)
    }
    const onLeave = () => {
      target.current.x = 0
      target.current.y = 0
      if (!rafRef.current) rafRef.current = requestAnimationFrame(apply)
    }

    el.addEventListener('mousemove', onMouseMove, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })
    el.addEventListener('touchend', onLeave, { passive: true })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('touchend', onLeave)
    }
  }, [containerRef])
}

export default function HomeCover() {
  const rootRef = useRef(null)
  useInteractiveTilt(rootRef)

  const floatingImages = useMemo(
    () => [
      { src: '/images/groupe-1.jpg', className: 'hc-float hc-float--a', alt: 'Lumos — Groupe 1' },
      { src: '/images/groupe-2.jpg', className: 'hc-float hc-float--b', alt: 'Lumos — Groupe 2' },
    ],
    [],
  )

  return (
    <main ref={rootRef} className="home-cover" id="home">
      <div className="home-cover__bg" aria-hidden="true" />
      <div className="home-cover__grain" aria-hidden="true" />

      <div className="home-cover__floats" aria-hidden="true">
        {floatingImages.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt} className={img.className} loading="eager" />
        ))}
      </div>

      <div className="home-cover__content">
        <div className="home-cover__brand">
          <span className="home-cover__brand-top">lumos</span>
          <span className="home-cover__brand-sub">montréal</span>
        </div>

        <h1 className="home-cover__title">L’Univers Lumos</h1>
        <p className="home-cover__subtitle">
          Agence événementielle hip-hop née à Montréal. Mettre en lumière la scène émergente.
        </p>

        <div className="home-cover__cta">
          <Link to="/univers" className="home-cover__btn">
            Explorez l’univers <span className="home-cover__btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

