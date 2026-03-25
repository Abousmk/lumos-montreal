import { motion } from 'framer-motion'
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
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    { name: 'Instagram', url: '#' },
    { name: 'Facebook', url: '#' },
    { name: 'YouTube', url: '#' },
    { name: 'Spotify', url: 'https://hyperfollow.com/lumosmtl' }
  ]

  const artists = [
    { name: 'KaMa', url: 'https://linktr.ee/quatrelettres' },
    { name: 'Collectif APPART', url: '#' },
    { name: 'SSK', url: 'https://linktr.ee/southsykemet' }
  ]

  return (
    <footer className="footer">
      <div className="footer-stars" aria-hidden="true">
        <ShootingStars
          starColor="#d4af37"
          trailColor="#4a6fa5"
          minSpeed={10}
          maxSpeed={24}
          minDelay={700}
          maxDelay={1900}
          starWidth={13}
          maxStars={7}
        />
        <ShootingStars
          starColor="#ffffff"
          trailColor="#1a1f3a"
          minSpeed={8}
          maxSpeed={20}
          minDelay={1000}
          maxDelay={2200}
          starWidth={9}
          maxStars={5}
        />
        <ShootingStars
          starColor="#4a6fa5"
          trailColor="#0a0e27"
          minSpeed={9}
          maxSpeed={18}
          minDelay={1100}
          maxDelay={2600}
          starWidth={11}
          maxStars={5}
        />
      </div>
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Col 1 - Logo & Description */}
            <motion.div 
              className="footer-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="footer-logo">
                lumos
                <span className="logo-location">montréal</span>
              </h3>
              <p className="footer-tagline">
                Mettre en lumière la scène émergente
              </p>
              <p className="footer-description">
                Agence événementielle spécialisée dans la promotion de la culture hip-hop montréalaise depuis 2022.
              </p>
            </motion.div>

            {/* Col 2 - Navigation */}
            <motion.div 
              className="footer-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="footer-title">Navigation</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Col 3 - Artistes */}
            <motion.div 
              className="footer-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
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
            </motion.div>

            {/* Col 4 - Réseaux sociaux */}
            <motion.div 
              className="footer-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
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
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="footer-copyright">
              © {currentYear} Lumos Montréal. Tous droits réservés.
            </p>
            <div className="footer-credits">
              <span>Conçu par <a href="#" target="_blank" rel="noopener noreferrer">Vista Creative</a></span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.a
        href="#home"
        className="back-to-top"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
      >
        <span>↑</span>
      </motion.a>
    </footer>
  )
}

export default Footer