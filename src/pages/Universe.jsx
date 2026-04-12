import { lazy, Suspense } from 'react'
import { useLanguage } from '../LanguageContext'
import ConstellationHeader from '../components/ConstellationHeader'
import '../styles/universe.css'

const Artists = lazy(() => import('../components/Artists'))
const Events = lazy(() => import('../components/Events'))

const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/3TIyXQ8uJy6XogcktOmykJ'
const YOUTUBE_MUSIC_PLAYLIST =
  'https://music.youtube.com/playlist?list=OLAK5uy_lJ8iIvf8fSSjBNnTO6VfWADgqMBo-Yzr4'
const APPLE_MUSIC_DEFAULT =
  import.meta.env.VITE_APPLE_MUSIC_URL ||
  'https://music.apple.com/ca/search?term=LUMOS%20Montreal'

export default function Universe() {
  const { t } = useLanguage()

  const streamButtons = [
    { key: 'spotify', href: SPOTIFY_ARTIST, label: t.universe.listenSpotify, variant: 'spotify' },
    { key: 'apple', href: APPLE_MUSIC_DEFAULT, label: t.universe.listenAppleMusic, variant: 'apple' },
    {
      key: 'youtube-music',
      href: YOUTUBE_MUSIC_PLAYLIST,
      label: t.universe.listenYoutubeMusic,
      variant: 'ytmusic',
    },
  ]

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
              <div
                className="universe-intro__links"
                role="group"
                aria-label={t.universe.listenGroupLabel}
              >
                {streamButtons.map((btn) => (
                  <a
                    key={btn.key}
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`universe-intro__stream universe-intro__stream--${btn.variant}`}
                    title={btn.label}
                  >
                    <span className="universe-intro__streamLabel">{btn.label}</span>
                    <span className="universe-intro__streamArrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                ))}
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

