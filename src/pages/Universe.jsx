import { lazy, Suspense } from 'react'
import { useLanguage } from '../LanguageContext'
import ConstellationHeader from '../components/ConstellationHeader'
import '../styles/universe.css'

const Artists = lazy(() => import('../components/Artists'))
const Events = lazy(() => import('../components/Events'))

export default function Universe() {
  const { t } = useLanguage()
  return (
    <main className="universe night-sky">
      <section className="universe-intro" id="presentation">
        <ConstellationHeader className="universe-intro__constellation" density={1.35} glow={1.06} />
        <div className="container">
          <div className="universe-intro__grid">
            <div className="universe-intro__copy lumos-reveal" style={{ animationDelay: '0.05s' }}>
              <h1 className="universe-intro__title">{t.universe.title}</h1>
              <p className="universe-intro__lead">{t.universe.lead1}</p>
              <p className="universe-intro__lead">{t.universe.lead2}</p>

              <div className="universe-intro__founder">
                <div className="universe-intro__founderImg">
                  <img src="/images/dana.webp" alt="Dana Kassem" loading="lazy" decoding="async" />
                  <div className="universe-intro__founderTitle">
                    <p className="universe-intro__founderLabel">{t.universe.founderLabel}</p>
                    <p className="universe-intro__founderName">Dana Kassem</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="universe-intro__media lumos-reveal" style={{ animationDelay: '0.1s' }}>
              <div className="universe-intro__imageWrap">
                <img
                  src="/images/cover.webp"
                  alt="Cover du projet OIABM:GEMINI"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="universe-intro__links">
                <a
                  href="https://open.spotify.com/artist/3TIyXQ8uJy6XogcktOmykJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="universe-intro__link"
                >
                  {t.universe.listenProject} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="universe-section">
        <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
          <Artists />
        </Suspense>
      </section>

      <section className="universe-section">
        <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
          <Events />
        </Suspense>
      </section>
    </main>
  )
}

