import { lazy, Suspense } from 'react'
import { useLanguage } from '../LanguageContext'
import ConstellationHeader from '../components/ConstellationHeader'

const Interviews = lazy(() => import('../components/Interviews'))
const Blog = lazy(() => import('../components/Blog'))

export default function Media() {
  const { t } = useLanguage()

  return (
    <main className="media night-sky">
      <section className="page-heroHeader media-heroHeader">
        <ConstellationHeader className="media-heroHeader__constellation" density={1.3} glow={1.04} />
        <div className="container page-heroHeader__inner">
          <h1 className="page-heroTitle">{t.nav.media}</h1>
        </div>
      </section>

      <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
        <Interviews />
      </Suspense>
      <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
        <Blog />
      </Suspense>
    </main>
  )
}

