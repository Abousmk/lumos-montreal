import { ShootingStars } from './ShootingStars'
import { useLanguage } from '../LanguageContext'
import '../styles/footer.css'

const Footer = () => {
  const { t, language } = useLanguage()
  const currentYear = new Date().getFullYear()
  const pick = (fr, en) => (language === 'en' ? en : fr)

  const quickLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.lumos, href: '/univers#presentation' },
    { name: t.nav.universe, href: '/univers#artistes' },
    { name: t.nav.media, href: '/media' },
    { name: t.nav.collaborations, href: '/collaborations' },
  ]

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/lumosmtl' },
    { name: 'Facebook', url: 'https://facebook.com/lumosmtl' },
    { name: 'YouTube', url: 'https://youtube.com/@lumosmtl' },
    { name: 'Spotify', url: 'https://hyperfollow.com/lumosmtl' },
  ]

  const artists = [
    { name: 'KaMa', url: 'https://linktr.ee/quatrelettres' },
    { name: 'APPART', url: 'https://linktr.ee/appart' },
    { name: 'SSK', url: 'https://linktr.ee/southsykemet' },
  ]

  return (
    <footer className="footer">
      <div className="footer-stars" aria-hidden="true">
        <ShootingStars
          starColor="#d4af37"
          trailColor="#4a6fa5"
          maxStars={2}
          minSpeed={1.8}
          maxSpeed={3.8}
          minSpawnMs={6000}
          maxSpawnMs={16000}
        />
      </div>
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col lumos-reveal" style={{ animationDelay: '0.05s' }}>
              <h3 className="footer-logo">
                lumos
                <span className="logo-location">montréal</span>
              </h3>
              <p className="footer-tagline">{t.footer.tagline}</p>
              <p className="footer-description">{t.footer.description}</p>
            </div>

            <div className="footer-col lumos-reveal" style={{ animationDelay: '0.1s' }}>
              <h4 className="footer-title">{t.footer.navigation}</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col lumos-reveal" style={{ animationDelay: '0.15s' }}>
              <h4 className="footer-title">{t.footer.ourArtists}</h4>
              <ul className="footer-links">
                {artists.map((artist) => (
                  <li key={artist.name}>
                    <a href={artist.url} target="_blank" rel="noopener noreferrer">
                      {artist.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col lumos-reveal" style={{ animationDelay: '0.2s' }}>
              <h4 className="footer-title">{t.footer.followUs}</h4>
              <ul className="footer-links">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="footer-newsletter">
                <p className="newsletter-text">{t.footer.stayInformed}</p>
                <a href="/collaborations" className="newsletter-btn">
                  {t.footer.subscribe}
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom lumos-reveal" style={{ animationDelay: '0.25s' }}>
            <p className="footer-copyright">
              © {currentYear} {t.footer.copyright}
            </p>
            <div className="footer-credits">
              <span>
                {t.footer.designedBy}{' '}
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Vista Creative
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#home"
        className="back-to-top lumos-reveal"
        style={{ animationDelay: '0.3s' }}
        aria-label={pick('Retour en haut', 'Back to top')}
      >
        <span>↑</span>
      </a>
    </footer>
  )
}

export default Footer
