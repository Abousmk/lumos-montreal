import { useEffect, useMemo, useState } from 'react'
import '../styles/events.css'
import { useLanguage } from '../LanguageContext'
import { LUMOS_EVENT_ROWS } from '../data/lumosEvents'

function localTodayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function partitionByEndDate(rows, todayISO) {
  const upcoming = []
  const past = []
  for (const e of rows) {
    const end = e.endDateISO
    if (!end || todayISO <= end) upcoming.push(e)
    else past.push(e)
  }
  upcoming.sort((a, b) => (a.endDateISO || '').localeCompare(b.endDateISO || ''))
  past.sort((a, b) => (b.endDateISO || '').localeCompare(a.endDateISO || ''))
  return { upcoming, past }
}

const Events = () => {
  const [filter, setFilter] = useState('all') // all, lumos, collab
  const [showAllPast, setShowAllPast] = useState(false)
  const [todayISO, setTodayISO] = useState(() => localTodayISO())
  const [remoteRows, setRemoteRows] = useState(null)
  const { t, language } = useLanguage()
  const isEn = language === 'en'

  useEffect(() => {
    const syncToday = () => setTodayISO(localTodayISO())
    const id = window.setInterval(syncToday, 60 * 60 * 1000)
    document.addEventListener('visibilitychange', syncToday)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', syncToday)
    }
  }, [])

  useEffect(() => {
    const url = import.meta.env.VITE_EVENTS_JSON_URL
    if (!url || typeof url !== 'string') return
    const ac = new AbortController()
    fetch(url, { signal: ac.signal })
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return
        const ok = data.filter(
          (row) =>
            row &&
            typeof row.id !== 'undefined' &&
            typeof row.type === 'string' &&
            typeof row.title === 'string' &&
            typeof row.date === 'string' &&
            typeof row.description === 'string' &&
            typeof row.endDateISO === 'string' &&
            /^\d{4}-\d{2}-\d{2}$/.test(row.endDateISO),
        )
        if (ok.length) setRemoteRows(ok)
      })
      .catch(() => {})
    return () => ac.abort()
  }, [])

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

  const sourceRows = remoteRows ?? LUMOS_EVENT_ROWS

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const { upcoming, past } = partitionByEndDate(sourceRows, todayISO)
    const pick = (list) =>
      list.filter((event) => {
        if (filter === 'all') return true
        return event.type === filter
      })
    return { upcomingEvents: pick(upcoming), pastEvents: pick(past) }
  }, [sourceRows, todayISO, filter])
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