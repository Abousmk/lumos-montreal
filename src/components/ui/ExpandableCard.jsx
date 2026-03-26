import { useEffect, useId, useRef, useState } from 'react'
import '../../styles/expandable-card.css'

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className = '',
  expandedClassName = '',
}) {
  const [active, setActive] = useState(false)
  const cardRef = useRef(null)
  const id = useId()

  useEffect(() => {
    if (!active) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActive(false)
    }

    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setActive(false)
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside, { passive: true })

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [active])

  return (
    <>
      {active && (
        <div className="exp-overlay" aria-hidden="true" />
      )}

      {active && (
        <div className="exp-modalWrap" role="dialog" aria-modal="true" aria-labelledby={`exp-title-${id}`}>
          <div ref={cardRef} className={`exp-modal ${expandedClassName}`}>
            <div className="exp-modal__media">
              <img src={src} alt={title} className="exp-modal__img" loading="eager" decoding="async" />
              <div className="exp-modal__fade" aria-hidden="true" />
            </div>

            <div className="exp-modal__body">
              <div className="exp-modal__header">
                <div className="exp-modal__headCopy">
                  <p className="exp-modal__desc">{description}</p>
                  <h3 id={`exp-title-${id}`} className="exp-modal__title">
                    {title}
                  </h3>
                </div>
                <button type="button" className="exp-close" onClick={() => setActive(false)} aria-label="Fermer">
                  <span aria-hidden="true">+</span>
                </button>
              </div>

              <div className="exp-modal__content">{children}</div>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        className={`exp-card ${className}`}
        onClick={() => setActive(true)}
        aria-haspopup="dialog"
      >
        <div className="exp-card__media">
          <img src={src} alt={title} className="exp-card__img" loading="lazy" decoding="async" />
        </div>
        <div className="exp-card__meta">
          <p className="exp-card__desc">{description}</p>
          <h3 className="exp-card__title">{title}</h3>
        </div>
        <span className="exp-card__cta" aria-hidden="true">
          +
        </span>
      </button>
    </>
  )
}

