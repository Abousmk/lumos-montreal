import { lazy, Suspense, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'

const Artists = lazy(() => import('./components/Artists'))
const Events = lazy(() => import('./components/Events'))
const Interviews = lazy(() => import('./components/Interviews'))
const Blog = lazy(() => import('./components/Blog'))
const Collaborations = lazy(() => import('./components/Collaborations'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    setVH()
    window.addEventListener('resize', setVH)
    return () => window.removeEventListener('resize', setVH)
  }, [])

  return (
    <div className="app">
      <Navigation />
      <div className="site-content">
        <Hero />
        <main className="body-zone">
          <div className="stars-static" aria-hidden="true" />
          <div className="body-zone-content">
            <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
              <Artists />
            </Suspense>
            <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
              <Events />
            </Suspense>
            <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
              <Interviews />
            </Suspense>
            <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
              <Blog />
            </Suspense>
            <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
              <Collaborations />
            </Suspense>
          </div>
        </main>
        <Suspense fallback={<div className="lazy-section-fallback lazy-section-fallback--footer" aria-hidden />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  )
}

export default App
