import { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/events.css'

const Events = () => {
  const [filter, setFilter] = useState('all') // all, lumos, collab

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
      title: 'LANCEMENT XX',
      date: 'Avril 2026',
      status: 'upcoming',
      description: 'Lancement à venir'
    },
    {
      id: 13,
      type: 'collab',
      title: 'CONCERT XX',
      date: 'Mai 2026',
      status: 'upcoming',
      description: 'Concert en collaboration'
    },
    {
      id: 14,
      type: 'collab',
      title: 'LANCEMENT XX',
      date: 'Mars 2026',
      status: 'upcoming',
      description: 'Lancement à venir'
    },
    {
      id: 15,
      type: 'collab',
      title: 'LANCEMENT XX',
      date: 'Février 2026',
      status: 'upcoming',
      description: 'Lancement à venir'
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

  return (
    <section id="evenements" className="events-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">02</span>
          <h2 className="section-title">Événements</h2>
          <p className="section-subtitle">
            Notre parcours depuis 2022
          </p>
        </motion.div>

        {/* Filtres */}
        <div className="events-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous
          </button>
          <button 
            className={`filter-btn ${filter === 'lumos' ? 'active' : ''}`}
            onClick={() => setFilter('lumos')}
          >
            Lumos
          </button>
          <button 
            className={`filter-btn ${filter === 'collab' ? 'active' : ''}`}
            onClick={() => setFilter('collab')}
          >
            Collaboratifs
          </button>
        </div>

        {/* Événements à venir */}
        {upcomingEvents.length > 0 && (
          <div className="events-group">
            <h3 className="events-group-title">À Venir</h3>
            <div className="events-grid">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={`event-card ${event.type}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="event-type">{event.type === 'lumos' ? 'Lumos' : 'Collaboratif'}</span>
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-date">{event.date}</p>
                  <p className="event-description">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Événements passés */}
        {pastEvents.length > 0 && (
          <div className="events-group">
            <h3 className="events-group-title">Événements Passés</h3>
            <div className="events-timeline">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={`timeline-item ${event.type}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">{event.date}</span>
                    <h5 className="timeline-title">{event.title}</h5>
                    <p className="timeline-description">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Events