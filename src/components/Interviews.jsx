import '../styles/interviews.css'
import { useLanguage } from '../LanguageContext'

const Interviews = () => {
  const { t, language } = useLanguage()
  const pick = (fr, en) => (language === 'en' ? en : fr)
  const interviews = [
    {
      id: 1,
      platform: 'ONZMTL',
      title: pick(
        'LUMOS x Ngoundieu: Remplir des salles à Montréal, le freestyle pour Bigflo&Oli et +',
        'LUMOS x Ngoundieu: Filling venues in Montreal, freestyle for Bigflo&Oli and more',
      ),
      type: t.interviews.videoInterview,
      description: pick(
        "Discussion approfondie sur la vision de Lumos, les défis de l'événementiel hip-hop à Montréal, et les moments marquants de notre parcours.",
        'In-depth discussion on Lumos vision, challenges in Montreal hip-hop events, and key moments in our journey.',
      ),
      url: 'https://www.onzemtl.com',
      thumbnail: '/images/interview-onzmtl.jpg',
    },
    {
      id: 2,
      platform: 'OPUS',
      title: 'OP.67 - Dana Kassem (LUMOS)',
      type: t.interviews.podcast,
      description: pick(
        'Dana Kassem partage son parcours entrepreneurial, sa vision pour la scène émergente montréalaise, et les coulisses des événements OIABM et Freshman Triumph.',
        'Dana Kassem shares her entrepreneurial journey, her vision for Montreal emerging artists, and behind-the-scenes stories from OIABM and Freshman Triumph.',
      ),
      url: 'https://www.choq.ca/balados/opus/op.67-dana-kassem-lumos',
      thumbnail: '/images/interview-opus.jpg',
    },
  ]

  return (
    <section id="entrevues" className="interviews-section">
      <div className="container">
        <div className="section-header lumos-reveal">
          <span className="section-number">{t.interviews.sectionNumber}</span>
          <h2 className="section-title">{t.interviews.title}</h2>
          <p className="section-subtitle">{t.interviews.subtitle}</p>
        </div>

        <div className="interviews-grid">
          {interviews.map((interview, index) => (
            <a
              key={interview.id}
              href={interview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="interview-card lumos-reveal"
              style={{ animationDelay: `${0.08 + index * 0.12}s` }}
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
                  <span>{t.interviews.listen}</span>
                  <span className="cta-arrow">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="interviews-note lumos-reveal" style={{ animationDelay: '0.2s' }}>
          <p>{t.interviews.noteQuestion}</p>
          <a href="#collaborations" className="contact-link">
            {t.interviews.noteLink}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Interviews
