import { useState } from 'react'
import '../styles/collaborations.css'

const Collaborations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: '',
    message: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const serviceTypes = ['Événementiel', 'Booking artiste', 'Production musicale', 'Partenariat', 'Autre']

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        serviceType: '',
        message: '',
      })
    }, 3000)
  }

  return (
    <section id="collaborations" className="collaborations-section">
      <div className="container">
        <div className="section-header lumos-reveal">
          <span className="section-number">03</span>
          <h2 className="section-title">Collaborations</h2>
          <p className="section-subtitle">Travaillons ensemble sur votre prochain projet</p>
        </div>

        <div className="collaborations-content">
          <div className="collab-info lumos-reveal" style={{ animationDelay: '0.06s' }}>
            <h3 className="collab-info-title">
              Mettre en lumière
              <br />
              <span className="highlight">votre vision</span>
            </h3>

            <p className="collab-info-text">
              Que vous soyez un artiste émergent cherchant à organiser un showcase, une marque souhaitant
              sponsoriser un événement, ou un promoteur avec une idée innovante, nous sommes là pour
              collaborer.
            </p>

            <div className="collab-services">
              <h4>Nos services:</h4>
              <ul>
                <li>
                  <span className="service-icon">🎤</span>
                  <div>
                    <strong>Événementiel</strong>
                    <p>Conception et production d'événements hip-hop</p>
                  </div>
                </li>
                <li>
                  <span className="service-icon">🎵</span>
                  <div>
                    <strong>Booking</strong>
                    <p>Représentation d'artistes émergents</p>
                  </div>
                </li>
                <li>
                  <span className="service-icon">🎹</span>
                  <div>
                    <strong>Production</strong>
                    <p>Création de projets musicaux collaboratifs</p>
                  </div>
                </li>
                <li>
                  <span className="service-icon">🤝</span>
                  <div>
                    <strong>Partenariats</strong>
                    <p>Collaborations marques et institutions</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="collab-note">
              <p>
                <strong>Note:</strong> Ce formulaire est actuellement en mode démo. L'intégration avec
                Google Calendar et Gmail sera activée prochainement.
              </p>
            </div>
          </div>

          <div className="collab-form-wrapper lumos-reveal" style={{ animationDelay: '0.1s' }}>
            {!isSubmitted ? (
              <form className="collab-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="serviceType">Type de service *</label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez un service</option>
                    {serviceTypes.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Envoyer la demande
                  <span className="btn-arrow">→</span>
                </button>
              </form>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Message envoyé!</h3>
                <p>Nous reviendrons vers vous sous peu.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Collaborations
