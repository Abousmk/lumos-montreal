import { useState } from 'react'
import '../styles/collaborations.css'
import { useLanguage } from '../LanguageContext'

const Collaborations = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: '',
    message: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const serviceTypes = [
    t.collaborations.serviceEvent,
    t.collaborations.serviceBooking,
    t.collaborations.serviceProduction,
    t.collaborations.servicePartnership,
    t.collaborations.serviceOther,
  ]

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
          <span className="section-number">{t.collaborations.sectionNumber}</span>
          <h2 className="section-title">{t.collaborations.title}</h2>
          <p className="section-subtitle">{t.collaborations.subtitle}</p>
        </div>

        <div className="collaborations-content">
          <div className="collab-info lumos-reveal" style={{ animationDelay: '0.06s' }}>
            <h3 className="collab-info-title">
              {t.collaborations.infoTitle1}
              <br />
              <span className="highlight">{t.collaborations.infoTitle2}</span>
            </h3>

            <p className="collab-info-text">
              {t.collaborations.infoText}
            </p>

            <div className="collab-services">
              <h4>{t.collaborations.servicesTitle}</h4>
              <ul>
                <li>
                  <span className="service-icon">🎤</span>
                  <div>
                    <strong>{t.collaborations.service1Title}</strong>
                    <p>{t.collaborations.service1Desc}</p>
                  </div>
                </li>
                <li>
                  <span className="service-icon">🎵</span>
                  <div>
                    <strong>{t.collaborations.service2Title}</strong>
                    <p>{t.collaborations.service2Desc}</p>
                  </div>
                </li>
                <li>
                  <span className="service-icon">🎹</span>
                  <div>
                    <strong>{t.collaborations.service3Title}</strong>
                    <p>{t.collaborations.service3Desc}</p>
                  </div>
                </li>
                <li>
                  <span className="service-icon">🤝</span>
                  <div>
                    <strong>{t.collaborations.service4Title}</strong>
                    <p>{t.collaborations.service4Desc}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="collab-note">
              <p>
                <strong>{t.collaborations.noteStrong}</strong> {t.collaborations.noteText}
              </p>
            </div>
          </div>

          <div className="collab-form-wrapper lumos-reveal" style={{ animationDelay: '0.1s' }}>
            {!isSubmitted ? (
              <form className="collab-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">{t.collaborations.nameLabel}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t.collaborations.namePlaceholder}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t.collaborations.emailLabel}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t.collaborations.emailPlaceholder}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="serviceType">{t.collaborations.serviceLabel}</label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t.collaborations.servicePlaceholder}</option>
                    {serviceTypes.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t.collaborations.messageLabel}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={t.collaborations.messagePlaceholder}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  {t.collaborations.submitBtn}
                  <span className="btn-arrow">→</span>
                </button>
              </form>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>{t.collaborations.successTitle}</h3>
                <p>{t.collaborations.successText}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Collaborations
