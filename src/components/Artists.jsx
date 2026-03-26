import { useState } from 'react'
import '../styles/artists.css'
import { ExpandableCard } from './ui/ExpandableCard'

const Artists = () => {
  const [view, setView] = useState('artists')

  const artists = [
    {
      id: 'kama',
      name: 'KaMa',
      subtitle: "L'Existentialisme Noir",
      image: '/images/Kama.jpg',
      link: 'https://linktr.ee/quatrelettres',
      bio: "Rappeur montréalais reconnu pour sa technique incisive et ses récits d'immigration. Figure majeure de la scène émergente montréalaise.",
      group: 'Lumos',
    },
    {
      id: 'hakey-law',
      name: 'Hakey Law',
      subtitle: 'Collectif APPART',
      image: '/images/hakey-law.jpg',
      link: 'https://linktr.ee/appart',
      bio: 'Visionnaire du texte, mélange introspection et ego-trap dans une énergie singulière.',
      group: 'APPART',
    },
    {
      id: 'kyusei',
      name: 'Kyūsei',
      subtitle: 'Collectif APPART',
      image: '/images/Kyusei.jpg',
      link: 'https://linktr.ee/appart',
      bio: 'Polyvalent et créatif, il fusionne rap, trap et afro dans un univers authentique.',
      group: 'APPART',
    },
    {
      id: 'damnibra',
      name: 'DAMNIBRA',
      subtitle: 'Collectif APPART',
      image: '/images/damnibra.jpg',
      link: 'https://linktr.ee/appart',
      bio: 'Artiste et producteur à la direction créative marquée, entre cloud et influences afro.',
      group: 'APPART',
    },
    {
      id: 'ngoundieu',
      name: 'Ngoundieu',
      subtitle: 'Collectif APPART',
      image: '/images/Ngoundieu.jpg',
      link: 'https://linktr.ee/appart',
      bio: 'Rappeur montréalais qui marie hip-hop rétro et modernité avec une plume authentique.',
      group: 'APPART',
    },
    {
      id: 'lil-deezy',
      name: 'LIL DEEZY',
      subtitle: 'Collectif APPART',
      image: '/images/lil-deezy.jpg',
      link: 'https://linktr.ee/appart',
      bio: 'Artiste sénégalo-canadien bilingue, entre rythmes modernes et énergie scénique brute.',
      group: 'APPART',
    },
    {
      id: 'alone',
      name: 'A.L.O.N.E',
      subtitle: 'Collectif APPART',
      image: '/images/Alone.jpg',
      link: 'https://linktr.ee/appart',
      bio: 'Plume introspective, ses textes explorent la solitude, le doute et la résilience.',
      group: 'APPART',
    },
    {
      id: 'orunmila',
      name: 'ORUNMILA',
      subtitle: 'Collectif SSK',
      image: '/images/ORUNMILA.JPG',
      link: 'https://linktr.ee/southsykemet',
      bio: 'La partie Divine de la trinité SSK, portée par une présence scénique magnétique.',
      group: 'SSK',
    },
    {
      id: 'firelox-eshu',
      name: 'FIRELOX / ESHU',
      subtitle: 'Collectif SSK',
      image: '/images/firelox-eshu.jpg',
      link: 'https://linktr.ee/southsykemet',
      bio: "La partie Ombre de SSK, une identité affirmée et une énergie frontale sur scène.",
      group: 'SSK',
    },
    {
      id: 'murasaki',
      name: 'MURASAKI',
      subtitle: 'Collectif SSK',
      image: '/images/MURASAKI.jpg',
      link: 'https://linktr.ee/southsykemet',
      bio: "L'union des extrêmes, une approche artistique hybride entre intensité et finesse.",
      group: 'SSK',
    },
  ]

  const collectifs = [
    {
      id: 'collectif-appart',
      name: 'Collectif APPART',
      subtitle: 'Booking & Assistance',
      image: '/images/Appart.JPG',
      link: 'https://linktr.ee/appart',
      bio: 'Collectif montréalais né en 2018, APPART rassemble des artistes aux univers variés autour d’une identité commune et d’une synergie forte.',
    },
    {
      id: 'collectif-ssk',
      name: 'Collectif SSK',
      subtitle: 'SouthSyKemet',
      image: '/images/groupe-2.jpg',
      link: 'https://linktr.ee/southsykemet',
      bio: 'SSK représente la vision et la détermination de la Rive-Sud. Une trinité artistique portée par ORUNMILA, FIRELOX/ESHU et MURASAKI.',
    },
  ]

  return (
    <section id="artistes" className="artists-section">
      <div className="container">
        <div className="section-header lumos-reveal">
          <span className="section-number">01</span>
          <h2 className="section-title">Artistes</h2>
          <p className="section-subtitle">Représentant la scène émergente montréalaise</p>
        </div>

        <div className="artists-mini-nav lumos-reveal" style={{ animationDelay: '0.04s' }}>
          <button
            type="button"
            className={`artists-mini-btn ${view === 'artists' ? 'active' : ''}`}
            onClick={() => setView('artists')}
          >
            Artistes
          </button>
          <button
            type="button"
            className={`artists-mini-btn ${view === 'collectifs' ? 'active' : ''}`}
            onClick={() => setView('collectifs')}
          >
            Collectifs
          </button>
        </div>

        {view === 'artists' ? (
          <div className="artist-cards-grid">
            {artists.map((artist, index) => (
              <div key={artist.id} className="lumos-reveal" style={{ animationDelay: `${0.05 + index * 0.04}s` }}>
                <ExpandableCard
                  title={artist.name}
                  src={artist.image}
                  description={`${artist.subtitle} • ${artist.group}`}
                  className="exp-card--tile"
                >
                  <div className="artist-expand-content">
                    <p>{artist.bio}</p>
                    <a href={artist.link} target="_blank" rel="noopener noreferrer" className="group-link">
                      Linktree →
                    </a>
                  </div>
                </ExpandableCard>
              </div>
            ))}
          </div>
        ) : (
          <div className="artist-cards-grid">
            {collectifs.map((group, index) => (
              <div key={group.id} className="lumos-reveal" style={{ animationDelay: `${0.06 + index * 0.08}s` }}>
                <ExpandableCard title={group.name} src={group.image} description={group.subtitle} className="exp-card--tile">
                  <div className="artist-expand-content">
                    <p>{group.bio}</p>
                    <a href={group.link} target="_blank" rel="noopener noreferrer" className="group-link">
                      Linktree du collectif →
                    </a>
                  </div>
                </ExpandableCard>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Artists
