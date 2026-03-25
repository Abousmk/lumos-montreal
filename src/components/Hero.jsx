import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import '../styles/hero.css'

const AuroraBackground = lazy(() => import('./AuroraBackground'))

const Hero = () => {
  return (
    <section className="hero" id="home">
      <Suspense fallback={<div className="hero-aurora-fallback" aria-hidden />}>
        <AuroraBackground preset="cinematic">
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.h1
                className="hero-title"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Agence événementielle,
                <br />
                <span className="title-highlight">Née à Montréal</span>
              </motion.h1>

              <motion.p
                className="hero-subtitle"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Mettre en lumière la scène émergente
              </motion.p>
            </motion.div>
          </div>
        </AuroraBackground>
      </Suspense>
    </section>
  )
}

export default Hero
