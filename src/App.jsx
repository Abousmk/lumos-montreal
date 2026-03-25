import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Artists from './components/Artists'
import Events from './components/Events'
import Interviews from './components/Interviews'
import Blog from './components/Blog'
import Collaborations from './components/Collaborations'
import Footer from './components/Footer'

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
            <Artists />
            <Events />
            <Interviews />
            <Blog />
            <Collaborations />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App