import { useState } from 'react'
import '../styles/events.css'
import { useLanguage } from '../LanguageContext'

const Events = () => {
  const [filter, setFilter] = useState('all') // all, lumos, collab
  const [showAllPast, setShowAllPast] = useState(false)
  const { t, language } = useLanguage()
  const isEn = language === 'en'

  const translateDate = (date) => {
    if (!isEn) return date
    return date
      .replace('Juillet', 'July')
      .replace('Avril', 'April')
      .replace('Novembre', 'November')
      .replace('Mai', 'May')
      .replace('Janvier', 'January')
      .replace('Décembre', 'December')
      .replace('Septembre', 'September')
      .replace('Février', 'February')
      .replace('Mars', 'March')
      .replace('Octobre', 'October')
      .replace(' ou ', ' or ')
  }

  const translateDescription = (text) => {
    if (!isEn) return text
    const map = {
      '5e édition du festival Once in a Blue Moon': '5th edition of the Once in a Blue Moon festival',
      '4e édition de la compétition freestyle': '4th edition of the freestyle competition',
      'Lancement du projet GEMINI - EP 10 morceaux': 'Release of the GEMINI project - 10-track EP',
      '4e édition du festival': '4th edition of the festival',
      '3e édition de la compétition': '3rd edition of the competition',
      '3e édition du festival': '3rd edition of the festival',
      '2e édition de la compétition': '2nd edition of the competition',
      '2e édition du festival': '2nd edition of the festival',
      'Première édition de la compétition': 'First edition of the competition',
      'Lancement du festival Once in a Blue Moon': 'Launch of the Once in a Blue Moon festival',
      'Tournoi de soccer de rue': 'Street soccer tournament',
      'Détails à venir': 'Details coming soon',
      'Concert en collaboration': 'Collaborative concert',
      'Lancement album Nawfal': 'Nawfal album release',
      "Session d'écoute exclusive": 'Exclusive listening session',
      'Lancement album Blues Beldi': 'Blues Beldi album release',
      'Lancement projet Le Sens des Cartes': 'Release of Le Sens des Cartes project',
      'Spectacle Ngoundieu': 'Ngoundieu show',
      'Événement hip-hop collaboratif': 'Collaborative hip-hop event',
      'Événement Collectif APPART': 'APPART collective event',
      'Événement créatif collaboratif': 'Collaborative creative event',
      'Célébration Rive-Sud': 'South Shore celebration',
      'Premier événement collaboratif': 'First collaborative event',
    }
    return map[text] || text
  }

  const translateTitle = (title) => {
    if (!isEn) return title
    return title
      .replace('(À CONFIRMER)', '(TBA)')
      .replace('LANCEMENT', 'RELEASE')
      .replace("SOIRÉE D'ÉCOUTE", 'LISTENING SESSION')
      .replace("SESSION D'ÉCOUTE", 'LISTENING SESSION')
  }

  const events = [
    // ÉVÉNEMENTS LUMOS
    {
      id: 1,
      type: 'lumos',
      title: 'OIABM 5',
      date: 'Juillet 2026',
      status: 'upcoming',
      description: '5e édition du festival Once in a Blue Moon'
    },
    {
      id: 2,
      type: 'lumos',
      title: 'FRESHMAN TRIUMPH 4TH',
      date: 'Avril ou Mai 2026',
      status: 'upcoming',
      description: '4e édition de la compétition freestyle'
    },
    {
      id: 3,
      type: 'lumos',
      title: 'LANCEMENT OIABM:GEMINI (DELUXE)',
      date: '8 Novembre 2025',
      status: 'past',
      description: 'Lancement du projet GEMINI - EP 10 morceaux'
    },
    {
      id: 4,
      type: 'lumos',
      title: 'OIABM 4',
      date: '5 Juillet 2025',
      status: 'past',
      description: '4e édition du festival'
    },
    {
      id: 5,
      type: 'lumos',
      title: 'FRESHMAN TRIUMPH 3RD',
      date: '2 Mai 2025',
      status: 'past',
      description: '3e édition de la compétition'
    },
    {
      id: 6,
      type: 'lumos',
      title: 'OIABM 3',
      date: '6 Juillet 2024',
      status: 'past',
      description: '3e édition du festival'
    },
    {
      id: 7,
      type: 'lumos',
      title: 'FRESHMAN TRIUMPH 2ND',
      date: '18 Mai 2024',
      status: 'past',
      description: '2e édition de la compétition'
    },
    {
      id: 8,
      type: 'lumos',
      title: 'OIABM 2 - ÉDITION PERFECT BLUE',
      date: '15 Juillet 2023',
      status: 'past',
      description: '2e édition du festival'
    },
    {
      id: 9,
      type: 'lumos',
      title: 'FRESHMAN TRIUMPH',
      date: '20 Mai 2023',
      status: 'past',
      description: 'Première édition de la compétition'
    },
    {
      id: 10,
      type: 'lumos',
      title: 'OIABM 1',
      date: '16 Juillet 2022',
      status: 'past',
      description: 'Lancement du festival Once in a Blue Moon'
    },

    // ÉVÉNEMENTS COLLABORATIFS
    {
      id: 11,
      type: 'collab',
      title: 'NOVASTREET',
      date: '4 Avril 2026',
      status: 'upcoming',
      description: 'Tournoi de soccer de rue'
    },
    {
      id: 12,
      type: 'collab',
      title: 'LANCEMENT (À CONFIRMER)',
      date: 'Avril 2026',
      status: 'upcoming',
      description: 'Détails à venir'
    },
    {
      id: 13,
      type: 'collab',
      title: 'CONCERT (À CONFIRMER)',
      date: 'Mai 2026',
      status: 'upcoming',
      description: 'Concert en collaboration'
    },
    {
      id: 14,
      type: 'collab',
      title: 'LANCEMENT (À CONFIRMER)',
      date: 'Mars 2026',
      status: 'upcoming',
      description: 'Détails à venir'
    },
    {
      id: 15,
      type: 'collab',
      title: 'LANCEMENT (À CONFIRMER)',
      date: 'Février 2026',
      status: 'upcoming',
      description: 'Détails à venir'
    },
    {
      id: 16,
      type: 'collab',
      title: 'LANCEMENT NAWFAL',
      date: '9 Janvier 2026',
      status: 'past',
      description: 'Lancement album Nawfal'
    },
    {
      id: 17,
      type: 'collab',
      title: 'SOIRÉE D\'ÉCOUTE NAWFAL',
      date: '4 Décembre 2025',
      status: 'past',
      description: 'Session d\'écoute exclusive'
    },
    {
      id: 18,
      type: 'collab',
      title: 'LANCEMENT "BLUES BELDI"',
      date: '9 Janvier 2026',
      status: 'past',
      description: 'Lancement album Blues Beldi'
    },
    {
      id: 19,
      type: 'collab',
      title: 'SESSION D\'ÉCOUTE "BLUES BELDI"',
      date: '4 Décembre 2025',
      status: 'past',
      description: 'Session d\'écoute exclusive'
    },
    {
      id: 20,
      type: 'collab',
      title: 'LANCEMENT "LE SENS DES CARTES"',
      date: '13 Septembre 2025',
      status: 'past',
      description: 'Lancement projet Le Sens des Cartes'
    },
    {
      id: 21,
      type: 'collab',
      title: 'NGOUNDIEU & FRIENDS',
      date: '5 Septembre 2025',
      status: 'past',
      description: 'Spectacle Ngoundieu'
    },
    {
      id: 22,
      type: 'collab',
      title: 'PÔLE HIP-HOP & FRIENDS',
      date: '18 Janvier 2025',
      status: 'past',
      description: 'Événement hip-hop collaboratif'
    },
    {
      id: 23,
      type: 'collab',
      title: 'APPART 808',
      date: '6 Septembre 2024',
      status: 'past',
      description: 'Événement Collectif APPART'
    },
    {
      id: 24,
      type: 'collab',
      title: 'INFINITE KRE8TION',
      date: '2 Mars 2024',
      status: 'past',
      description: 'Événement créatif collaboratif'
    },
    {
      id: 25,
      type: 'collab',
      title: 'SOUTH SIDE FLAVORS',
      date: '16 Septembre 2023',
      status: 'past',
      description: 'Célébration Rive-Sud'
    },
    {
      id: 26,
      type: 'collab',
      title: 'THE C.O.L.T SHOW',
      date: '29 Octobre 2022',
      status: 'past',
      description: 'Premier événement collaboratif'
    }
  ]

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true
    return event.type === filter
  })

  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming')
  const pastEvents = filteredEvents.filter(e => e.status === 'past')
  const visiblePastEvents = pastEvents.slice(0, showAllPast ? pastEvents.length : 4)

  return (
    <section id="evenements" className="events-section">
      <div className="container">
        <div className="section-header lumos-reveal">
          <span className="section-number">{t.events.sectionNumber}</span>
          <h2 className="section-title">{t.events.title}</h2>
          <p className="section-subtitle">{t.events.subtitle}</p>
        </div>

        {/* Filtres */}
        <div className="events-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t.events.filterAll}
          </button>
          <button 
            className={`filter-btn ${filter === 'lumos' ? 'active' : ''}`}
            onClick={() => setFilter('lumos')}
          >
            {t.events.filterLumos}
          </button>
          <button 
            className={`filter-btn ${filter === 'collab' ? 'active' : ''}`}
            onClick={() => setFilter('collab')}
          >
            {t.events.filterCollab}
          </button>
        </div>

        {/* Événements à venir */}
        {upcomingEvents.length > 0 && (
          <div className="events-group">
            <h3 className="events-group-title">{t.events.upcoming}</h3>
            <div className="events-grid">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`event-card lumos-reveal ${event.type}`}
                  style={{ animationDelay: `${0.06 + index * 0.06}s` }}
                >
                  <span className="event-type">{event.type === 'lumos' ? 'Lumos' : isEn ? 'Collaborative' : 'Collaboratif'}</span>
                  <h4 className="event-title">{translateTitle(event.title)}</h4>
                  <p className="event-date">{translateDate(event.date)}</p>
                  <p className="event-description">{translateDescription(event.description)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Événements passés — timeline compacte */}
        {pastEvents.length > 0 && (
          <div className="past-events-section">
            <h3 className="events-group-title">{t.events.past}</h3>

            <div className="timeline-container">
              <div className="timeline-line" aria-hidden="true" />

              {visiblePastEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`timeline-item lumos-reveal ${event.type}`}
                  style={{ animationDelay: `${0.06 + index * 0.05}s` }}
                >
                  <div className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-item-inner">
                    <div className="timeline-date">{translateDate(event.date)}</div>
                    <div className="timeline-content">
                      <h4 className="timeline-title">{translateTitle(event.title)}</h4>
                      <p className="timeline-location">
                        {event.type === 'lumos' ? 'Lumos' : isEn ? 'Collaborative event' : 'Événement collaboratif'}
                      </p>
                      {event.description && (
                        <p className="timeline-description">{translateDescription(event.description)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pastEvents.length > 4 && (
              <button
                type="button"
                className="timeline-show-more"
                onClick={() => setShowAllPast(!showAllPast)}
                aria-expanded={showAllPast}
              >
                {showAllPast
                  ? isEn
                    ? 'Show less'
                    : 'Voir moins'
                  : isEn
                    ? `Show ${pastEvents.length - 4} more events`
                    : `Voir ${pastEvents.length - 4} événements de plus`}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Events