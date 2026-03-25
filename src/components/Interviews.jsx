import { motion } from 'framer-motion'
import '../styles/interviews.css'

const Interviews = () => {
  const interviews = [
    {
      id: 1,
      platform: 'ONZMTL',
      title: 'LUMOS x Ngoundieu: Remplir des salles à Montréal, le freestyle pour Bigflo&Oli et +',
      type: 'Entrevue vidéo',
      description: 'Discussion approfondie sur la vision de Lumos, les défis de l\'événementiel hip-hop à Montréal, et les moments marquants de notre parcours.',
      url: 'https://www.onzemtl.com', // URL placeholder
      thumbnail: '/images/interview-onzmtl.jpg'
    },
    {
      id: 2,
      platform: 'OPUS',
      title: 'OP.67 - Dana Kassem (LUMOS)',
      type: 'Podcast',
      description: 'Dana Kassem partage son parcours entrepreneurial, sa vision pour la scène émergente montréalaise, et les coulisses des événements OIABM et Freshman Triumph.',
      url: 'https://www.choq.ca/balados/opus/op.67-dana-kassem-lumos',
      thumbnail: '/images/interview-opus.jpg'
    }
  ]

  return (
    <section id="entrevues" className="interviews-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">04</span>
          <h2 className="section-title">Entrevues</h2>
          <p className="section-subtitle">
            Lumos dans les médias
          </p>
        </motion.div>

        <div className="interviews-grid">
          {interviews.map((interview, index) => (
            <motion.a
              key={interview.id}
              href={interview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="interview-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="interview-thumbnail">
                <div className="thumbnail-placeholder">
                  <span className="platform-name">{interview.platform}</span>
                </div>
                <span className="interview-type">{interview.type}</span>
              </div>

              <div className="interview-content">
                <h3 className="interview-platform">{interview.platform}</h3>
                <h4 className="interview-title">{interview.title}</h4>
                <p className="interview-description">{interview.description}</p>
                
                <div className="interview-cta">
                  <span>Écouter l'entrevue</span>
                  <span className="cta-arrow">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div 
          className="interviews-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>Vous souhaitez interviewer Lumos ou nos artistes?</p>
          <a href="#collaborations" className="contact-link">
            Contactez-nous →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Interviews