import { motion } from 'framer-motion'
import '../styles/artists.css'

const Artists = () => {
  const artists = [
    {
      id: 'kama',
      name: 'KaMa',
      tag: 'Booking & Management',
      subtitle: "L'Existentialisme Noir",
      bio: "Rappeur montréalais originaire de la RD Congo, reconnu pour sa maîtrise technique et son écriture incisive qui mêle récits d'immigration, commentaire social et références sociopolitiques.",
      achievements: [
        'Nomination Gala Dynastie 2025',
        'Double représentation Francofolies 2025',
        '35 prestations live, 25 relais médiatiques'
      ],
      link: 'https://linktr.ee/quatrelettres',
      image: '/images/kama.jpg'
    },
    {
      id: 'appart',
      name: 'COLLECTIF APPART',
      tag: 'Booking & Assistance',
      subtitle: 'Huit talents sénégalais unis',
      bio: "Collectif montréalais créé en 2018, transformant un appartement en sanctuaire créatif. Introspection, technique, mélodie et storytelling.",
      members: [
        { name: 'Barto Bart', style: 'Rap caviar - Punchlines poétiques' },
        { name: 'Hakey Law', style: 'Mélancolie meets égo-trap' },
        { name: 'Kyūsei', style: 'Polyvalence rap, trap, afro' },
        { name: 'DAMNIBRA', style: 'Sonorités cloud, rythmiques ouest-africaines' },
        { name: 'Ngoundieu', style: 'Hip-hop rétro fusionné au moderne' },
        { name: 'LIL DEEZY', style: 'Sénégalo-canadien bilingue' },
        { name: 'A.L.O.N.E', style: 'Plume introspective, amour et tristesse' }
      ],
      link: 'https://linktr.ee/appart',
      image: '/images/appart.jpg'
    },
    {
      id: 'ssk',
      name: 'COLLECTIF SSK',
      tag: 'SouthSyKemet',
      subtitle: 'Héros de la Rive-Sud',
      bio: "Établi sur la Rive-Sud de Montréal, SSK représente l'acharnement, la détermination et le rêve. Une table ronde inspirée du Sud des États-Unis.",
      trinity: [
        { name: 'ORUNMILA', role: 'La partie Divine', color: 'Bleu 🔵' },
        { name: 'FIRELOX/ESHU', role: "La partie de l'Ombre", color: 'Rouge 🔴' },
        { name: 'MURASAKI', role: "L'Union des extrêmes", color: 'Mauve 🟣' }
      ],
      quote: 'Cette table ronde qui vous semble si loin, vous y avez votre place!',
      link: 'https://linktr.ee/southsykemet',
      image: '/images/ssk.jpg'
    }
  ]

  return (
    <section id="artistes" className="artists-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">01</span>
          <h2 className="section-title">Artistes</h2>
          <p className="section-subtitle">
            Représentant la scène émergente montréalaise
          </p>
        </motion.div>

        <div className="artists-grid">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              className="artist-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="artist-image">
                <div className="image-placeholder">
                  {artist.name}
                </div>
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

                {artist.members && (
                  <div className="artist-members">
                    <h4>Membres:</h4>
                    {artist.members.map((member, i) => (
                      <div key={i} className="member-item">
                        <strong>{member.name}</strong> - {member.style}
                      </div>
                    ))}
                  </div>
                )}

                {artist.trinity && (
                  <div className="artist-trinity">
                    {artist.trinity.map((person, i) => (
                      <div key={i} className="trinity-item">
                        <strong>{person.name}</strong> - {person.role} ({person.color})
                      </div>
                    ))}
                    {artist.quote && (
                      <blockquote className="artist-quote">
                        "{artist.quote}"
                      </blockquote>
                    )}
                  </div>
                )}

                <a 
                  href={artist.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="artist-link"
                >
                  Écouter →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Artists