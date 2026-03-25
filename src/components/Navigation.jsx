import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'
import '../styles/navigation.css'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { language, changeLanguage, t } = useLanguage()

  const navLinks = [
    { id: 'artistes', name: t.nav.artists, href: '#artistes' },
    { id: 'evenements', name: t.nav.events, href: '#evenements' },
    { id: 'entrevues', name: t.nav.interviews, href: '#entrevues' },
    { id: 'articles', name: t.nav.articles, href: '#articles' },
    { id: 'collaborations', name: t.nav.collaborations, href: '#collaborations' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Détecte quelle section est visible
      const sections = navLinks.map(link => link.id)
      let currentSection = ''

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
          if (isVisible) {
            currentSection = sectionId
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filtrer les liens: montrer seulement ceux APRÈS la section active
  const getVisibleLinks = () => {
    if (!activeSection) return navLinks
    
    const activeIndex = navLinks.findIndex(link => link.id === activeSection)
    if (activeIndex === -1) return navLinks
    
    // Retourne les sections à venir (après la section active)
    return navLinks.slice(activeIndex + 1)
  }

  const visibleLinks = getVisibleLinks()

  return (
    <>
      {/* Navigation Desktop (en haut) */}
      <motion.nav 
        className={`navigation ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-container">
          <motion.a 
            href="#home" 
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
          >
            lumos
            <span className="logo-location">montréal</span>
          </motion.a>

          <div className="nav-links-desktop">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className="nav-right">
            <div className="language-switcher">
              <button 
                className={`lang-btn ${language === 'fr' ? 'active' : ''}`} 
                onClick={() => changeLanguage('fr')}
              >
                FR
              </button>
              <button 
                className={`lang-btn ${language === 'en' ? 'active' : ''}`} 
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
            </div>
            <button className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Navigation Mobile (côté gauche) */}
      {visibleLinks.length > 0 && (
        <motion.div 
          className="nav-mobile-vertical"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {visibleLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.href}
              className="nav-mobile-link"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="nav-mobile-dot"></span>
              <span className="nav-mobile-text">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>
      )}
    </>
  )
}

export default Navigation