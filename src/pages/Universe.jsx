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

const streamIconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
}

function StreamGlyph({ variant }) {
  switch (variant) {
    case 'spotify':
      return (
        <svg {...streamIconProps}>
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      )
    case 'apple':
      return (
        <svg {...streamIconProps}>
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 2.51.2 4.38 1.29 5.49 3.3-4.45 2.71-3.36 8.63.48 10.28-.89 2.48-1.78 4.96-3.61 7.43zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      )
    case 'ytmusic':
      return (
        <svg {...streamIconProps}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    default:
      return null
  }
}

export default function Universe() {
  const { t } = useLanguage()

  const streamButtons = [
    { key: 'spotify', href: SPOTIFY_ARTIST, ariaLabel: t.universe.listenSpotify, variant: 'spotify' },
    { key: 'apple', href: APPLE_MUSIC_DEFAULT, ariaLabel: t.universe.listenAppleMusic, variant: 'apple' },
    {
      key: 'youtube-music',
      href: YOUTUBE_MUSIC_PLAYLIST,
      ariaLabel: t.universe.listenYoutubeMusic,
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
              <p id="universe-listen-hint" className="universe-intro__listenHint">
                {t.universe.listenGroupLabel}
              </p>
              <div
                className="universe-intro__links"
                role="group"
                aria-labelledby="universe-listen-hint"
              >
                {streamButtons.map((btn) => (
                  <a
                    key={btn.key}
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`universe-intro__stream universe-intro__stream--${btn.variant}`}
                    aria-label={btn.ariaLabel}
                    title={btn.ariaLabel}
                  >
                    <StreamGlyph variant={btn.variant} />
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

