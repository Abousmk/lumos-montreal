import { ShootingStars } from './ShootingStars'
import '../styles/footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Artistes', href: '#artistes' },
    { name: 'Événements', href: '#evenements' },
    { name: 'Collaborations', href: '#collaborations' },
    { name: 'Entrevues', href: '#entrevues' },
    { name: 'Articles', href: '#articles' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { name: 'Instagram', url: '#' },
    { name: 'Facebook', url: '#' },
    { name: 'YouTube', url: '#' },
    { name: 'Spotify', url: 'https://hyperfollow.com/lumosmtl' },
  ]

  const artists = [
    { name: 'KaMa', url: 'https://linktr.ee/quatrelettres' },
    { name: 'Collectif APPART', url: '#' },
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
              <p className="footer-tagline">Mettre en lumière la scène émergente</p>
              <p className="footer-description">
                Agence événementielle spécialisée dans la promotion de la culture hip-hop montréalaise
                depuis 2022.
              </p>
            </div>

            <div className="footer-col lumos-reveal" style={{ animationDelay: '0.1s' }}>
              <h4 className="footer-title">Navigation</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col lumos-reveal" style={{ animationDelay: '0.15s' }}>
              <h4 className="footer-title">Nos Artistes</h4>
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
              <h4 className="footer-title">Suivez-nous</h4>
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
                <p className="newsletter-text">Restez informé de nos événements</p>
                <a href="#contact" className="newsletter-btn">
                  S'inscrire →
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom lumos-reveal" style={{ animationDelay: '0.25s' }}>
            <p className="footer-copyright">© {currentYear} Lumos Montréal. Tous droits réservés.</p>
            <div className="footer-credits">
              <span>
                Conçu par{' '}
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Vista Creative
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <a href="#home" className="back-to-top lumos-reveal" style={{ animationDelay: '0.3s' }} aria-label="Retour en haut">
        <span>↑</span>
      </a>
    </footer>
  )
}

export default Footer
