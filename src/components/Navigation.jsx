import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../LanguageContext'
import '../styles/navigation.css'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { language, changeLanguage, t } = useLanguage()
  const scrollTicking = useRef(false)

  const navLinks = [
    { id: 'artistes', name: t.nav.artists, href: '#artistes' },
    { id: 'evenements', name: t.nav.events, href: '#evenements' },
    { id: 'entrevues', name: t.nav.interviews, href: '#entrevues' },
    { id: 'articles', name: t.nav.articles, href: '#articles' },
    { id: 'collaborations', name: t.nav.collaborations, href: '#collaborations' },
  ]

  useEffect(() => {
    const updateFromScroll = () => {
      setIsScrolled(window.scrollY > 50)

      let currentSection = ''
      for (const sectionId of navLinks.map((l) => l.id)) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const isVisible =
            rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
          if (isVisible) {
            currentSection = sectionId
            break
          }
        }
      }
      setActiveSection(currentSection)
      scrollTicking.current = false
    }

    const onScroll = () => {
      if (!scrollTicking.current) {
        scrollTicking.current = true
        requestAnimationFrame(updateFromScroll)
      }
    }

    updateFromScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const getVisibleLinks = () => {
    if (!activeSection) return navLinks
    const activeIndex = navLinks.findIndex((link) => link.id === activeSection)
    if (activeIndex === -1) return navLinks
    return navLinks.slice(activeIndex + 1)
  }

  const visibleLinks = getVisibleLinks()

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="nav-logo">
            lumos
            <span className="logo-location">montréal</span>
          </a>

          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="nav-right">
            <div className="language-switcher">
              <button
                type="button"
                className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
                onClick={() => changeLanguage('fr')}
              >
                FR
              </button>
              <button
                type="button"
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
            </div>
            <button type="button" className="hamburger" aria-label="Menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {visibleLinks.length > 0 && (
        <div className="nav-mobile-vertical">
          {visibleLinks.map((link, index) => (
            <a
              key={link.id}
              href={link.href}
              className="nav-mobile-link"
              style={{ animationDelay: `${0.06 + index * 0.07}s` }}
            >
              <span className="nav-mobile-dot" />
              <span className="nav-mobile-text">{link.name}</span>
            </a>
          ))}
        </div>
      )}
    </>
  )
}

export default Navigation
