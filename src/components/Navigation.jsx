import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../LanguageContext'
import '../styles/navigation.css'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { language, changeLanguage, t } = useLanguage()
  const scrollTicking = useRef(false)
  const location = useLocation()

  const navLinks = [
    { id: 'home', name: t.nav.home, to: '/' },
    { id: 'lumos', name: t.nav.lumos, to: '/univers#presentation' },
    { id: 'universe', name: t.nav.universe, to: '/univers#artistes' },
    { id: 'media', name: t.nav.media, to: '/media' },
    { id: 'collaborations', name: t.nav.collaborations, to: '/collaborations' },
  ]

  useEffect(() => {
    const updateFromScroll = () => {
      setIsScrolled(window.scrollY > 50)

      let currentSection = ''
      if (location.pathname === '/univers') {
        for (const sectionId of ['presentation', 'artistes', 'evenements']) {
          const element = document.getElementById(sectionId)
          if (element) {
            const rect = element.getBoundingClientRect()
            const isVisible =
              rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
            if (isVisible) {
              currentSection = sectionId === 'presentation' ? 'lumos' : 'universe'
              break
            }
          }
        }
      } else {
        currentSection =
          location.pathname === '/'
            ? 'home'
            : location.pathname === '/media'
              ? location.hash === '#collaborations'
                ? 'collaborations'
                : 'media'
              : location.pathname === '/collaborations'
                ? 'collaborations'
              : ''
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
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash, location.pathname])

  const getVisibleLinks = () => {
    return navLinks
  }

  const visibleLinks = getVisibleLinks()

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" aria-label="Accueil">
            lumos
            <span className="logo-location">montréal</span>
          </Link>

          <div className="nav-links-desktop">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <Link key={link.id} to={link.to} className={`nav-link ${isActive ? 'active' : ''}`}>
                  {link.name}
                </Link>
              )
            })}
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
            <Link
              key={link.id}
              to={link.to}
              className="nav-mobile-link"
              style={{ animationDelay: `${0.06 + index * 0.07}s` }}
            >
              <span className="nav-mobile-dot" />
              <span className="nav-mobile-text">{link.name}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default Navigation
