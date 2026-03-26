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
      image: '/images/kama.webp',
      link: 'https://linktr.ee/quatrelettres',
      bio: "KaMa est un rappeur montréalais originaire de la RD Congo, fondateur et membre du collectif créatif NESO. Il arrive au Québec à l’âge de 5 ans et grandit dans le quartier Hochelaga-Maisonneuve où il forge son identité artistique.\n\nSa musique se distingue par une maîtrise technique au micro, des textes riches en émotions et une écriture qui mêle récits d’immigration, critique sociale et références sociopolitiques. Son projet OIABM et son travail sur l’EP GEMINI ont confirmé son impact dans la scène émergente.\n\nEn 2025, KaMa est nommé au Gala Dynastie dans la catégorie Artiste Musical de l’année, puis double l’affiche aux Francofolies. Aujourd’hui, il cumule performances live, collaborations et relais médiatiques, avec une direction artistique claire: représenter une nouvelle génération montréalaise.",
      accomplishments: [
        'Nomination Gala Dynastie 2025',
        'Double représentation Francofolies 2025',
        '35 prestations live et 25 relais médiatiques',
        'Projet OIABM:GEMINI et collaborations scéniques majeures',
      ],
      group: 'Lumos',
    },
    {
      id: 'hakey-law',
      name: 'Hakey Law',
      subtitle: 'Collectif APPART',
      image: '/images/hakey-law.webp',
      link: 'https://linktr.ee/appart',
      bio: 'Visionnaire du texte, mélange introspection et ego-trap dans une énergie singulière.',
      accomplishments: ['Membre du Collectif APPART', 'Présence scénique remarquée à Montréal'],
      group: 'APPART',
    },
    {
      id: 'kyusei',
      name: 'Kyūsei',
      subtitle: 'Collectif APPART',
      image: '/images/ky-sei.webp',
      link: 'https://linktr.ee/appart',
      bio: 'Polyvalent et créatif, il fusionne rap, trap et afro dans un univers authentique.',
      accomplishments: ['Membre du Collectif APPART', 'Approche musicale hybride rap/trap/afro'],
      group: 'APPART',
    },
    {
      id: 'damnibra',
      name: 'DAMNIBRA',
      subtitle: 'Collectif APPART',
      image: '/images/damnibra.webp',
      link: 'https://linktr.ee/appart',
      bio: 'Artiste et producteur à la direction créative marquée, entre cloud et influences afro.',
      accomplishments: ['Membre du Collectif APPART', 'Artiste & producteur'],
      group: 'APPART',
    },
    {
      id: 'ngoundieu',
      name: 'Ngoundieu',
      subtitle: 'Collectif APPART',
      image: '/images/ngoundieu.webp',
      link: 'https://linktr.ee/appart',
      bio: 'Rappeur montréalais qui marie hip-hop rétro et modernité avec une plume authentique.',
      accomplishments: ['Membre du Collectif APPART', 'Style rétro-moderne distinctif'],
      group: 'APPART',
    },
    {
      id: 'lil-deezy',
      name: 'LIL DEEZY',
      subtitle: 'Collectif APPART',
      image: '/images/lil-deezy.webp',
      link: 'https://linktr.ee/appart',
      bio: 'Artiste sénégalo-canadien bilingue, entre rythmes modernes et énergie scénique brute.',
      accomplishments: ['Membre du Collectif APPART', 'Énergie live reconnue'],
      group: 'APPART',
    },
    {
      id: 'alone',
      name: 'A.L.O.N.E',
      subtitle: 'Collectif APPART',
      image: '/images/alone.webp',
      link: 'https://linktr.ee/appart',
      bio: 'Plume introspective, ses textes explorent la solitude, le doute et la résilience.',
      accomplishments: ['Membre du Collectif APPART', 'Écriture introspective'],
      group: 'APPART',
    },
    {
      id: 'orunmila',
      name: 'ORUNMILA',
      subtitle: 'Collectif SSK',
      image: '/images/orunmila.webp',
      link: 'https://linktr.ee/southsykemet',
      bio: 'La partie Divine de la trinité SSK, portée par une présence scénique magnétique.',
      accomplishments: ['Collectif SSK', 'Partie Divine'],
      group: 'SSK',
    },
    {
      id: 'firelox-eshu',
      name: 'FIRELOX / ESHU',
      subtitle: 'Collectif SSK',
      image: '/images/firelox-eshu.webp',
      link: 'https://linktr.ee/southsykemet',
      bio: "La partie Ombre de SSK, une identité affirmée et une énergie frontale sur scène.",
      accomplishments: ['Collectif SSK', "Partie Ombre"],
      group: 'SSK',
    },
    {
      id: 'murasaki',
      name: 'MURASAKI',
      subtitle: 'Collectif SSK',
      image: '/images/murasaki.webp',
      link: 'https://linktr.ee/southsykemet',
      bio: "L'union des extrêmes, une approche artistique hybride entre intensité et finesse.",
      accomplishments: ['Collectif SSK', "L'union des extrêmes"],
      group: 'SSK',
    },
  ]

  const collectifs = [
    {
      id: 'collectif-appart',
      name: 'Collectif APPART',
      subtitle: 'Booking & Assistance',
      image: '/images/appart.webp',
      link: 'https://linktr.ee/appart',
      bio: 'Collectif montréalais né en 2018, APPART rassemble des artistes aux univers variés autour d’une identité commune et d’une synergie forte.',
    },
    {
      id: 'collectif-ssk',
      name: 'Collectif SSK',
      subtitle: 'SouthSyKemet',
      image: '/images/groupe-2.webp',
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
                    {artist.accomplishments && (
                      <ul className="artist-expand-list">
                        {artist.accomplishments.map((item) => (
                          <li key={`${artist.id}-${item}`}>{item}</li>
                        ))}
                      </ul>
                    )}
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
