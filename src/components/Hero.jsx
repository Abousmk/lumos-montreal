import ConstellationBackground from './ConstellationBackground'
import '../styles/hero.css'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <ConstellationBackground />
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Agence événementielle,
            <br />
            <span className="title-highlight">Née à Montréal</span>
          </h1>
          <p className="hero-subtitle">Mettre en lumière la scène émergente</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
