import { Suspense, lazy } from 'react'
import { useLanguage } from '../LanguageContext'
import ConstellationHeader from '../components/ConstellationHeader'
import '../styles/collaboration-hub.css'

const Collaborations = lazy(() => import('../components/Collaborations'))

const GOOGLE_CALENDAR_EMBED =
  'https://calendar.google.com/calendar/embed?src=en.canadian%23holiday%40group.v.calendar.google.com&ctz=America%2FToronto'

export default function CollaborationsPage() {
  const { t } = useLanguage()

  return (
    <main className="collaboration-hub night-sky">
      <section className="page-heroHeader collaboration-hub__hero">
        <ConstellationHeader className="collaboration-hub__constellation" density={2.1} glow={1.12} />
        <div className="container page-heroHeader__inner">
          <h1 className="page-heroTitle">{t.nav.collaborations}</h1>
        </div>
      </section>

      <section className="calendar-booking section" id="rendezvous">
        <div className="container">
          <div className="section-header lumos-reveal">
            <span className="section-number">04</span>
            <h2 className="section-title">{t.collaborations.calendarTitle}</h2>
            <p className="section-subtitle">{t.collaborations.calendarSubtitle}</p>
          </div>

          <div className="calendar-booking__frameWrap lumos-reveal" style={{ animationDelay: '0.06s' }}>
            <iframe
              src={GOOGLE_CALENDAR_EMBED}
              className="calendar-booking__frame"
              title="Lumos booking calendar"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
        <Collaborations />
      </Suspense>
    </main>
  )
}
