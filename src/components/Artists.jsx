import { useState } from 'react'
import '../styles/artists.css'
import { ExpandableCard } from './ui/ExpandableCard'
import { useLanguage } from '../LanguageContext'

const Artists = () => {
  const [view, setView] = useState('artists')
  const { t, language } = useLanguage()

  const pick = (fr, en) => (language === 'en' ? en : fr)

  const artists = [
    {
      id: 'kama',
      name: 'KaMa',
      subtitle: pick("L'Existentialisme Noir", 'Black existentialism'),
      image: '/images/kama.webp',
      link: 'https://linktr.ee/quatrelettres',
      bio: pick(
        "KaMa est un rappeur montréalais originaire de la RD Congo, fondateur et membre du collectif créatif NESO. Il arrive au Québec à l’âge de 5 ans et grandit dans le quartier Hochelaga-Maisonneuve où il forge son identité artistique.\n\nSa musique se distingue par une maîtrise technique au micro, des textes riches en émotions et une écriture qui mêle récits d’immigration, critique sociale et références sociopolitiques. Son projet OIABM et son travail sur l’EP GEMINI ont confirmé son impact dans la scène émergente.\n\nEn 2025, KaMa est nommé au Gala Dynastie dans la catégorie Artiste Musical de l’année, puis double l’affiche aux Francofolies. Aujourd’hui, il cumule performances live, collaborations et relais médiatiques, avec une direction artistique claire: représenter une nouvelle génération montréalaise.",
        'KaMa is a Montreal rapper originally from DR Congo, founder and member of the NESO creative collective. He arrived in Quebec at age 5 and grew up in Hochelaga-Maisonneuve, where he shaped his artistic identity.\n\nHis music stands out for sharp technical control, emotionally rich writing, and lyrics that blend immigration stories, social critique, and sociopolitical references. Projects like OIABM and his work on the GEMINI EP confirmed his impact on the emerging scene.\n\nIn 2025, KaMa was nominated at Gala Dynastie (Musical Artist of the Year) and performed twice at the Francofolies. He now stacks live shows, collaborations, and media attention with a clear artistic direction: representing a new Montreal generation.',
      ),
      accomplishments: pick(
        [
          'Nomination Gala Dynastie 2025',
          'Double représentation Francofolies 2025',
          '35 prestations live et 25 relais médiatiques',
          'Projet OIABM:GEMINI et collaborations scéniques majeures',
        ],
        [
          'Gala Dynastie 2025 nomination',
          'Two performances at Francofolies 2025',
          '35 live shows and 25 media features',
          'OIABM:GEMINI project and major stage collaborations',
        ],
      ),
      group: 'Lumos',
    },
    {
      id: 'hakey-law',
      name: 'Hakey Law',
      subtitle: pick('Collectif APPART', 'APPART collective'),
      image: '/images/hakey-law.webp',
      link: 'https://linktr.ee/lawkey.d',
      bio: pick(
        "Hakey Law, artiste d’origine sénégalaise, forge un univers où la mélancolie rencontre l’ego-trap avec une énergie singulière. Visionnaire et toujours à l’avant‑garde, il explore sans cesse de nouvelles sonorités et utilise l’autotune comme véritable instrument de création.\n\nCréatif et polyvalent, il navigue entre les styles et capte rapidement les tendances émergentes. Sa force réside dans un contraste assumé : des titres profondément introspectifs qui côtoient des morceaux centrés sur la fête, l’argent et le lifestyle. Une dualité qui définit pleinement l’identité artistique de Hakey Law.",
        "Hakey Law, an artist of Senegalese origin, shapes a universe where melancholy meets ego-trap with a singular energy. Visionary and always ahead of the curve, he constantly explores new sounds and uses autotune as a true creative instrument.\n\nCreative and versatile, he moves between styles and quickly captures emerging trends. His strength lies in an embraced contrast: deeply introspective tracks alongside songs focused on celebration, money, and lifestyle. A duality that fully defines Hakey Law’s artistic identity.",
      ),
      accomplishments: pick(
        ['Membre du Collectif APPART', 'Présence scénique remarquée à Montréal'],
        ['Member of the APPART collective', 'Notable live presence in Montreal'],
      ),
      group: 'APPART',
    },
    {
      id: 'kyusei',
      name: 'Kyūsei',
      subtitle: pick('Collectif APPART', 'APPART collective'),
      image: '/images/ky-sei.webp',
      link: 'https://linktr.ee/kyusei',
      bio: pick(
        "Kyūsei est un artiste d’origine sénégalaise et togolaise basé à Montréal, reconnu pour sa polyvalence vocale et sa capacité à passer du rap à la trap en passant par l’afro. Il intègre des influences boom bap dans ses placements et ses rythmes, tout en construisant un univers introspectif, mélodique et authentique.\n\nSon écriture lui permet d’explorer les contrastes entre fragilité émotionnelle et assurance scénique, ce qui fait de lui une figure montante de la scène émergente montréalaise.",
        "Kyūsei is an artist of Senegalese and Togolese origin based in Montreal, known for vocal versatility and the ability to move from rap to trap to Afro. He weaves boom-bap influences into his flows and rhythms while building an introspective, melodic, and authentic universe.\n\nHis writing explores contrasts between emotional fragility and on-stage confidence, making him a rising figure in Montreal’s emerging scene.",
      ),
      accomplishments: pick(
        ['Membre du Collectif APPART', 'Approche musicale hybride rap/trap/afro'],
        ['Member of the APPART collective', 'Hybrid rap/trap/afro approach'],
      ),
      group: 'APPART',
    },
    {
      id: 'damnibra',
      name: 'DAMNIBRA',
      subtitle: pick('Collectif APPART', 'APPART collective'),
      image: '/images/damnibra.webp',
      link: 'https://linktr.ee/damnibra',
      bio: pick(
        "Plutôt silencieux de nature, IBRA, aussi appelé DAMNIBRA, laisse sa musique parler à sa place. Ses créations, façonnées par les humeurs changeantes, sont une véritable invitation à un univers sensoriel riche. Il mélange sonorités cloud, rythmes ouest‑africains et palettes introspectives pour nous offrir une sortie unique en son genre.\n\nEntre artiste et producteur, il développe une direction artistique forte qui fait le lien entre vulnérabilité émotionnelle et puissance sonore.",
        "Naturally quiet, IBRA—also known as DAMNIBRA—lets his music speak for him. His creations, shaped by changing moods, invite listeners into a rich sensory world. He blends cloud textures, West African rhythms, and introspective palettes to deliver a release that feels truly unique.\n\nAs both an artist and a producer, he builds a strong artistic direction that bridges emotional vulnerability and sonic power.",
      ),
      accomplishments: pick(
        ['Membre du Collectif APPART', 'Artiste & producteur'],
        ['Member of the APPART collective', 'Artist & producer'],
      ),
      group: 'APPART',
    },
    {
      id: 'ngoundieu',
      name: 'Ngoundieu',
      subtitle: pick('Collectif APPART', 'APPART collective'),
      image: '/images/ngoundieu.webp',
      link: 'https://linktr.ee/ngoundieu',
      bio: pick(
        "Originaire du Sénégal, Ngoundieu est un talentueux rappeur basé à Montréal, Canada, qui se distingue par son approche innovante et son authenticité. Son style unique fusionne des influences hip‑hop rétro, rappelant les grandes heures du rap classique, avec les sonorités modernes du genre, créant une signature sonore captivante.\n\nÀ travers ses morceaux, il parvient à mêler des éléments traditionnels de la culture africaine avec les réalités de la vie urbaine contemporaine au Canada, offrant une perspective riche et nuancée de son parcours.",
        "Originally from Senegal, Ngoundieu is a talented rapper based in Montreal, Canada, who stands out for his innovative approach and authenticity. His unique style fuses retro hip-hop influences—echoing the great eras of classic rap—with modern genre sounds, creating a captivating sonic signature.\n\nAcross his songs, he weaves traditional elements of African culture with the realities of contemporary urban life in Canada, offering a rich and nuanced perspective on his journey.",
      ),
      accomplishments: pick(
        ['Membre du Collectif APPART', 'Style rétro-moderne distinctif'],
        ['Member of the APPART collective', 'Distinct retro-modern style'],
      ),
      group: 'APPART',
    },
    {
      id: 'lil-deezy',
      name: 'LIL DEEZY',
      subtitle: pick('Collectif APPART', 'APPART collective'),
      image: '/images/lil-deezy.webp',
      link: 'https://linktr.ee/lildeezy',
      bio: pick(
        "Aussi connu sous le nom de SLICE JACK, LIL DEEZY est un artiste sénégalo‑canadien né au Canada et élevé sur les deux côtés de l’Atlantique. Il intègre différents styles musicaux dans sa pratique, explorant les ponts entre ses deux cultures.\n\nAvec plus d’une dizaine de projets à son actif, LIL DEEZY s’impose comme un nom incontournable de la scène rap montréalaise, autant en anglais qu’en français.",
        "Also known as SLICE JACK, LIL DEEZY is a Senegalese-Canadian artist born in Canada and raised on both sides of the Atlantic. He integrates multiple musical styles into his work, exploring bridges between his two cultures.\n\nWith more than a dozen projects to his name, LIL DEEZY has established himself as an essential name in Montreal’s rap scene—both in English and in French.",
      ),
      accomplishments: pick(
        ['Membre du Collectif APPART', 'Énergie live reconnue'],
        ['Member of the APPART collective', 'Recognized live energy'],
      ),
      group: 'APPART',
    },
    {
      id: 'alone',
      name: 'A.L.O.N.E',
      subtitle: pick('Collectif APPART', 'APPART collective'),
      image: '/images/alone.webp',
      link: 'https://linktr.ee/lscalone',
      bio: pick(
        "A.L.O.N.E est un artiste émergent montréalais membre du collectif APPART, reconnu pour sa plume introspective et ses morceaux imprégnés d’amour et/ou de tristesse. Inspiré par des artistes comme Laylow, Josman, Yseult, mais aussi par des légendes telles que Charles Aznavour, Edith Piaf ou Louis Armstrong, il construit un univers où la vulnérabilité devient force.\n\nSon projet « LOVE ASSASSIN » marque une étape clé de sa démarche : un court‑métrage et un concept album entre spleen, romance et passion. Il y promet d’explorer les frontières entre douleur et espoir. Plongez dans son univers pour ne pas en ressortir indemne.",
        "A.L.O.N.E is an emerging Montreal artist and a member of the APPART collective, known for introspective writing and songs steeped in love and/or sadness. Inspired by artists like Laylow, Josman, and Yseult—as well as legends such as Charles Aznavour, Édith Piaf, and Louis Armstrong—he builds a world where vulnerability becomes strength.\n\nHis project “LOVE ASSASSIN” marks a key step in his journey: a short film and a concept album blending spleen, romance, and passion. Through it, he promises to explore the border between pain and hope. Step into his universe at your own risk.",
      ),
      accomplishments: pick(
        ['Membre du Collectif APPART', 'Écriture introspective'],
        ['Member of the APPART collective', 'Introspective writing'],
      ),
      group: 'APPART',
    },
    {
      id: 'orunmila',
      name: 'ORUNMILA',
      subtitle: pick('Collectif SSK', 'SSK collective'),
      image: '/images/orunmila.webp',
      link: 'https://linktr.ee/southsykemet',
      bio: pick(
        'La partie Divine de la trinité SSK, portée par une présence scénique magnétique.',
        'The Divine side of the SSK trinity, carried by a magnetic stage presence.',
      ),
      accomplishments: pick(['Collectif SSK', 'Partie Divine'], ['SSK collective', 'Divine side']),
      group: 'SSK',
    },
    {
      id: 'firelox-eshu',
      name: 'FIRELOX / ESHU',
      subtitle: pick('Collectif SSK', 'SSK collective'),
      image: '/images/firelox-eshu.webp',
      link: 'https://linktr.ee/southsykemet',
      bio: pick(
        "La partie Ombre de SSK, une identité affirmée et une énergie frontale sur scène.",
        'The Shadow side of SSK: bold identity and a head-on stage energy.',
      ),
      accomplishments: pick(['Collectif SSK', 'Partie Ombre'], ['SSK collective', 'Shadow side']),
      group: 'SSK',
    },
    {
      id: 'murasaki',
      name: 'MURASAKI',
      subtitle: pick('Collectif SSK', 'SSK collective'),
      image: '/images/murasaki.webp',
      link: 'https://linktr.ee/southsykemet',
      bio: pick(
        "L'union des extrêmes, une approche artistique hybride entre intensité et finesse.",
        'A union of extremes: a hybrid artistic approach balancing intensity and finesse.',
      ),
      accomplishments: pick(['Collectif SSK', "L'union des extrêmes"], ['SSK collective', 'Union of extremes']),
      group: 'SSK',
    },
  ]

  const collectifs = [
    {
      id: 'collectif-appart',
      name: 'Collectif APPART',
      subtitle: pick('Booking & Assistance', 'Booking & support'),
      image: '/images/appart.webp',
      link: 'https://linktr.ee/appart',
      bio: pick(
        "APPART est un collectif montréalais créé en 2018 composé de huit talents sénégalais unis par une même vision : faire rayonner leurs rêves à travers la musique, malgré les obstacles et la distance. Fondé par Barto, Kyusei et Hakey, le groupe s’est rapidement élargi avec l’arrivée de LIL DEEZY, JEUNE MK, Ngoundieu, IBRA et Abdoubatz, leurs beatmakers et architectes sonores. Ensemble, ils forment un noyau solide où chaque voix apporte sa couleur, son vécu et son énergie.\n\nBasés à Montréal, loin de leur Sénégal natal, les membres d’APPART ont transformé un simple appartement en véritable sanctuaire créatif. C’est dans ce lieu que se sont forgés leur identité et leur unité : des nuits blanches à écrire, produire, douter, rêver, souvent seuls face à la réalité de l’exil, mais toujours portés par la même ambition.\n\nLe nom APPART rend hommage à cet espace intime où tout a commencé : une pièce où se mêlent solitude, persévérance et dépassement de soi. Leur musique raconte ce parcours : celui d’Africains déterminés à ne rien lâcher, à se donner les moyens d’atteindre leurs objectifs.\n\nEnsemble, ils forment un collectif où se croisent introspection, technique, mélodie et storytelling. La diversité des flows et des influences crée une alchimie unique.",
        "APPART is a Montreal collective created in 2018, made up of eight Senegalese talents united by a shared vision: to make their dreams shine through music despite obstacles and distance. Founded by Barto, Kyusei, and Hakey, the group quickly expanded with the arrival of LIL DEEZY, JEUNE MK, Ngoundieu, IBRA, and Abdoubatz—their beatmakers and sound architects. Together, they form a solid core where each voice brings its own color, lived experience, and energy.\n\nBased in Montreal, far from their native Senegal, APPART members transformed a simple apartment into a true creative sanctuary. In that place, their identity and unity were forged: sleepless nights writing, producing, doubting, dreaming—often alone in the face of exile, yet always driven by the same ambition.\n\nThe name APPART pays tribute to that intimate space where everything began: a room where solitude, perseverance, and self-overcoming meet. Their music tells that journey—Africans determined to never give up and to build the means to reach their goals.\n\nTogether, they form a collective where introspection, technique, melody, and storytelling collide. The diversity of flows and influences creates a unique alchemy.",
      ),
    },
    {
      id: 'collectif-ssk',
      name: 'Collectif SSK',
      subtitle: 'SouthSyKemet',
      image: '/images/groupe-2.webp',
      link: 'https://linktr.ee/southsykemet',
      bio: pick(
        "D’une ère à l’autre, il y a toujours ces Héros mythique qui ont changé le paysage du monde dans lequel ils ont vécus. SouthSyKemet est composé d’Héros de cette trempe. Établit sur la Rive-Sud de Montréal, le collectif SSK (SouthSyKemet ; prononcé “South Sai Kemet”) s’inspire d’influences mondiale et notamment du Sud des Etats-Unis (d’où le Sy qui remplace Side). Fondé par ORUNMILA, ce collectif, qui s’avère être une table ronde, représente l’acharnement, la détermination, la passion, la volonté et le rêve.\n\nQui sont ORUNMILA, FIRELOX & MURASAKI ?\n\n3 personnes, 1 entité ;\n\n1. ORUNMILA représente la partie la plus Divine en chacun de nous, sa couleur est Bleu 🔵🧙🏿\n2. FIRELOX / ESHU représente la partie de l’Ombre en chacun de nous, sa couleur est Rouge 🔴👹\n3. MURASAKI représente le Milieu, l’Union des deux extrêmes. Sa couleur est Mauve 🟣🧝🏿\n\n“Cette table ronde qui vous semble si loin, vous y avez votre place! Croyez-y, prenez la, nous n’attendons que vous!” - ORUNMILA",
        "From one era to the next, there are always mythical heroes who changed the landscape of the world they lived in. SouthSyKemet is made of heroes of that caliber. Established on Montreal’s South Shore, the SSK collective (SouthSyKemet; pronounced “South Sai Kemet”) draws inspiration from global influences—especially from the Southern United States (hence the “Sy” replacing “Side”). Founded by ORUNMILA, this collective—like a round table—represents relentlessness, determination, passion, willpower, and dreams.\n\nWho are ORUNMILA, FIRELOX & MURASAKI?\n\n3 people, 1 entity;\n\n1. ORUNMILA represents the most Divine part within each of us, its color is Blue 🔵🧙🏿\n2. FIRELOX / ESHU represents the Shadow part within each of us, its color is Red 🔴👹\n3. MURASAKI represents the Middle, the Union of the two extremes. Its color is Purple 🟣🧝🏿\n\n“This round table that seems so far away—you have your place there! Believe in it, take it, we are only waiting for you!” - ORUNMILA",
      ),
    },
  ]

  return (
    <section id="artistes" className="artists-section">
      <div className="container">
        <div className="section-header lumos-reveal">
          <span className="section-number">{t.artists.sectionNumber}</span>
          <h2 className="section-title">{t.artists.title}</h2>
          <p className="section-subtitle">{t.artists.subtitle}</p>
        </div>

        <div className="artists-mini-nav lumos-reveal" style={{ animationDelay: '0.04s' }}>
          <button
            type="button"
            className={`artists-mini-btn ${view === 'artists' ? 'active' : ''}`}
            onClick={() => setView('artists')}
          >
            {t.nav.artists}
          </button>
          <button
            type="button"
            className={`artists-mini-btn ${view === 'collectifs' ? 'active' : ''}`}
            onClick={() => setView('collectifs')}
          >
            {pick('Collectifs', 'Collectives')}
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
                      {pick('Linktree →', 'Linktree →')}
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
                      {pick('Linktree du collectif →', 'Collective Linktree →')}
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
