import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import SectionNavigator from './components/SectionNavigator'
import { useLanguage } from './LanguageContext'

const HomeCover = lazy(() => import('./pages/HomeCover'))
const Universe = lazy(() => import('./pages/Universe'))
const Media = lazy(() => import('./pages/Media'))
const CollaborationsPage = lazy(() => import('./pages/CollaborationsPage'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const { language } = useLanguage()

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
        <Suspense fallback={<div className="lazy-section-fallback" aria-hidden />}>
          <Routes key={`routes-${language}`}>
            <Route path="/" element={<HomeCover />} />
            <Route path="/univers" element={<Universe />} />
            <Route path="/media" element={<Media />} />
            <Route path="/collaborations" element={<CollaborationsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Suspense
          key={`footer-${language}`}
          fallback={<div className="lazy-section-fallback lazy-section-fallback--footer" aria-hidden />}
        >
          <Footer />
        </Suspense>
        <SectionNavigator />
      </div>
    </div>
  )
}

export default App
