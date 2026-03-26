import '../styles/artists.css'
import { ExpandableCard } from './ui/ExpandableCard'

const Artists = () => {
  const soloArtists = [
    {
      id: 'kama',
      name: 'KaMa',
      tag: 'Booking & Management',
      subtitle: "L'Existentialisme Noir",
      bio: "Rappeur montréalais originaire de la RD Congo, reconnu pour sa maîtrise technique et son écriture incisive qui mêle récits d'immigration, commentaire social et références sociopolitiques.",
      achievements: ['Nomination Gala Dynastie 2025', 'Double représentation Francofolies 2025', '35 prestations live, 25 relais médiatiques'],
      link: 'https://linktr.ee/quatrelettres',
      image: '/images/Kama.jpg',
    },
  ]

  const groups = [
    {
      id: 'appart',
      name: 'Collectif APPART',
      tag: 'Booking & Assistance',
      subtitle: 'Huit talents sénégalais unis',
      bio: "Collectif montréalais créé en 2018, transformant un appartement en sanctuaire créatif. Introspection, technique, mélodie et storytelling.",
      link: 'https://linktr.ee/appart',
      image: '/images/Appart.JPG',
      members: [
        { id: 'hakeylaw', name: 'Hakey Law', role: 'Artiste', image: '/images/Hakey Law.jpeg' },
        { id: 'kyusei', name: 'Kyūsei', role: 'Artiste', image: '/images/Kyusei.jpg' },
        { id: 'damnibra', name: 'DAMNIBRA', role: 'Artiste & Producteur', image: '/images/DamnIbra.jpeg' },
        { id: 'ngoundieu', name: 'Ngoundieu', role: 'Artiste', image: '/images/Ngoundieu.jpg' },
        { id: 'lildeezy', name: 'LIL DEEZY', role: 'Artiste', image: '/images/Lil Deezy.jpeg' },
        { id: 'alone', name: 'A.L.O.N.E', role: 'Artiste', image: '/images/Alone.jpg' },
      ],
      note: "Les liens Linktree individuels seront ajoutés dès réception.",
    },
    {
      id: 'ssk',
      name: 'Collectif SSK',
      tag: 'SouthSyKemet',
      subtitle: 'Héros de la Rive-Sud',
      bio: "Établi sur la Rive-Sud de Montréal, SSK représente l'acharnement, la détermination et le rêve. Une table ronde inspirée du Sud des États-Unis.",
      link: 'https://linktr.ee/southsykemet',
      image: '/images/Groupe2.jpg',
      members: [
        { id: 'orunmila', name: 'ORUNMILA', role: 'La partie Divine', image: '/images/ORUNMILA.JPG' },
        { id: 'firelox', name: 'FIRELOX/ESHU', role: "La partie de l'Ombre", image: '/images/FIRELOX_ESHU.jpg' },
        { id: 'murasaki', name: 'MURASAKI', role: "L'Union des extrêmes", image: '/images/MURASAKI.jpg' },
      ],
      note: "Les liens Linktree individuels seront ajoutés dès réception.",
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

        <div className="artists-grid">
          {soloArtists.map((artist, index) => (
            <div
              key={artist.id}
              className="artist-card lumos-reveal"
              style={{ animationDelay: `${0.08 + index * 0.08}s` }}
            >
              <div className="artist-image">
                <img className="artist-photo" src={artist.image} alt={artist.name} loading="lazy" decoding="async" />
              </div>

              <div className="artist-content">
                <span className="artist-tag">{artist.tag}</span>
                <h3 className="artist-name">{artist.name}</h3>
                <p className="artist-subtitle">{artist.subtitle}</p>
                <p className="artist-bio">{artist.bio}</p>

                {artist.achievements && (
                  <ul className="artist-achievements">
                    {artist.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}

                <a href={artist.link} target="_blank" rel="noopener noreferrer" className="artist-link artist-listen-btn">
                  Écouter →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="artist-groups">
          {groups.map((group, index) => (
            <div key={group.id} className="lumos-reveal" style={{ animationDelay: `${0.12 + index * 0.1}s` }}>
              <ExpandableCard title={group.name} src={group.image} description={group.subtitle}>
                <div className="group-expanded">
                  <div className="group-expanded__head">
                    <p className="group-expanded__tag">{group.tag}</p>
                    <p className="group-expanded__bio">{group.bio}</p>
                    <div className="group-expanded__actions">
                      <a href={group.link} target="_blank" rel="noopener noreferrer" className="group-link">
                        Découvrir le collectif →
                      </a>
                    </div>
                    {group.note && <p className="group-expanded__note">{group.note}</p>}
                  </div>

                  <div className="group-members-grid">
                    {group.members.map((m) => (
                      <div key={m.id} className="member-card">
                        <div className="member-card__imgWrap">
                          <img src={m.image} alt={m.name} loading="lazy" decoding="async" />
                        </div>
                        <div className="member-card__body">
                          <div className="member-card__name">{m.name}</div>
                          <div className="member-card__role">{m.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ExpandableCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Artists
