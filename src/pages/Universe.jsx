import { lazy, Suspense } from 'react'
import '../styles/universe.css'

const Artists = lazy(() => import('../components/Artists'))
const Events = lazy(() => import('../components/Events'))

export default function Universe() {
  return (
    <main className="universe night-sky">
      <section className="universe-intro" id="presentation">
        <div className="container">
          <div className="universe-intro__grid">
            <div className="universe-intro__copy lumos-reveal" style={{ animationDelay: '0.05s' }}>
              <h1 className="universe-intro__title">Site web Lumos</h1>
              <p className="universe-intro__lead">
                Fondée par la productrice Dana Kassem, l’Agence Lumos Montréal s’impose comme un acteur
                incontournable de la scène musicale indépendante. Depuis plusieurs années, l’agence se
                distingue par des concepts originaux qui mettent en valeur la créativité montréalaise.
              </p>
              <p className="universe-intro__lead">
                Notre mission: <strong>mettre en lumière</strong> votre vision et votre public.
              </p>

              <div className="universe-intro__founder">
                <div className="universe-intro__founderImg">
                  <img src="/images/dana.webp" alt="Dana Kassem" loading="lazy" decoding="async" />
                </div>
                <div className="universe-intro__founderCopy">
                  <p className="universe-intro__founderLabel">Fondatrice</p>
                  <p className="universe-intro__founderName">Dana Kassem</p>
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
                  href="https://hyperfollow.com/lumosmtl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="universe-intro__link"
                >
                  Écouter le projet (hyperfollow) →
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

