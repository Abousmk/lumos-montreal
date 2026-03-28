import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../LanguageContext'

const pageSequences = {
  '/': ['/univers#presentation'],
  '/univers': ['#presentation', '#artistes', '#evenements', '/media#entrevues'],
  '/media': ['#entrevues', '#articles', '/collaborations'],
  '/collaborations': ['#rendezvous', '#collaborations'],
}

export default function SectionNavigator() {
  const location = useLocation()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const sequence = useMemo(() => pageSequences[location.pathname] || [], [location.pathname])
  const isVisible = currentIndex < sequence.length - 1

  useEffect(() => {
    if (location.pathname === '/') {
      setCurrentIndex(0)
      return
    }

    const handleScroll = () => {
      let active = 0
      for (let i = 0; i < sequence.length; i += 1) {
        const step = sequence[i]
        if (!step.startsWith('#')) continue
        const sectionId = step.slice(1)
        const el = document.getElementById(sectionId)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.45) active = i
      }
      setCurrentIndex(active)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname, sequence])

  const goToNextSection = () => {
    const next = sequence[currentIndex + 1]
    if (!next) return

    if (next.startsWith('/')) {
      navigate(next)
      return
    }

    const id = next.slice(1)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!sequence.length || !isVisible) return null

  return (
    <button type="button" className="section-navigator" onClick={goToNextSection}>
      <span className="navigator-text">{language === 'en' ? 'Next section' : 'Section suivante'}</span>
      <svg className="navigator-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 5v14m0 0l7-7m-7 7l-7-7" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  )
}
