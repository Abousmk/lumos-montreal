import '../styles/blog.css'
import { useLanguage } from '../LanguageContext'

const Blog = () => {
  const { t, language } = useLanguage()
  const pick = (fr, en) => (language === 'en' ? en : fr)
  const articles = [
    {
      id: 1,
      category: pick('Sortie musicale', 'Music release'),
      title: pick(
        'OIABM:GEMINI (Deluxe) - Le projet qui redéfinit la collaboration',
        'OIABM:GEMINI (Deluxe) - The project redefining collaboration',
      ),
      excerpt: pick(
        'Retour sur le séminaire de 9 jours qui a réuni 15 artistes et 7 producteurs pour créer un EP de 10 morceaux unique en son genre.',
        'A look back at the 9-day seminar that brought together 15 artists and 7 producers to create a unique 10-track EP.',
      ),
      date: pick('8 Novembre 2025', 'November 8, 2025'),
      image: '/images/blog-gemini.jpg',
      link: 'https://hyperfollow.com/lumosmtl',
    },
    {
      id: 2,
      category: pick('Événement', 'Event'),
      title: pick('OIABM 4 - Une quatrième édition mémorable', 'OIABM 4 - A memorable fourth edition'),
      excerpt: pick(
        'Plus de 500 personnes réunies pour célébrer la scène émergente montréalaise. Retour sur les moments forts du festival.',
        'Over 500 people gathered to celebrate Montreal’s emerging scene. A recap of the festival highlights.',
      ),
      date: pick('5 Juillet 2025', 'July 5, 2025'),
      image: '/images/blog-oiabm4.jpg',
      link: 'https://hyperfollow.com/lumosmtl',
    },
    {
      id: 3,
      category: pick('Artiste', 'Artist'),
      title: pick('KaMa nominé au Gala Dynastie 2025', 'KaMa nominated at Gala Dynastie 2025'),
      excerpt: pick(
        'Notre artiste KaMa en nomination pour "Artiste Musical de l\'année". Une reconnaissance méritée pour son travail acharné.',
        'Our artist KaMa is nominated for "Musical Artist of the Year". A deserved recognition for his hard work.',
      ),
      date: pick('15 Mars 2025', 'March 15, 2025'),
      image: '/images/blog-kama.jpg',
      link: 'https://hyperfollow.com/lumosmtl',
    },
    {
      id: 4,
      category: pick('Collaboration', 'Collaboration'),
      title: pick(
        'Lumos x Ngoundieu & Friends - Un succès retentissant',
        'Lumos x Ngoundieu & Friends - A major success',
      ),
      excerpt: pick(
        'Retour sur cette collaboration exceptionnelle qui a mis en lumière le talent de Ngoundieu et du Collectif APPART.',
        'A look back at this outstanding collaboration that spotlighted Ngoundieu and the APPART collective.',
      ),
      date: pick('5 Septembre 2024', 'September 5, 2024'),
      image: '/images/blog-ngoundieu.jpg',
      link: 'https://hyperfollow.com/lumosmtl',
    },
    {
      id: 5,
      category: pick('Événement', 'Event'),
      title: pick('Freshman Triumph 3 - Le freestyle à son apogée', 'Freshman Triumph 3 - Freestyle at its peak'),
      excerpt: pick(
        'La troisième édition de notre compétition de freestyle a révélé de nouveaux talents prometteurs de la scène montréalaise.',
        'The third edition of our freestyle competition revealed promising new talent from Montreal.',
      ),
      date: pick('2 Mai 2024', 'May 2, 2024'),
      image: '/images/blog-freshman.jpg',
      link: 'https://hyperfollow.com/lumosmtl',
    },
    {
      id: 6,
      category: pick('Communauté', 'Community'),
      title: pick("SSK: La Rive-Sud s'impose sur la scène", 'SSK: The South Shore steps forward'),
      excerpt: pick(
        'Portrait du collectif SouthSyKemet et de leur impact grandissant sur la scène hip-hop québécoise.',
        'A profile of the SouthSyKemet collective and their growing impact on Quebec’s hip-hop scene.',
      ),
      date: pick('20 Mars 2024', 'March 20, 2024'),
      image: '/images/blog-ssk.jpg',
      link: 'https://hyperfollow.com/lumosmtl',
    },
  ]

  return (
    <section id="articles" className="blog-section">
      <div className="container">
        <div className="section-header lumos-reveal">
          <span className="section-number">{t.blog.sectionNumber}</span>
          <h2 className="section-title">{t.blog.title}</h2>
          <p className="section-subtitle">{t.blog.subtitle}</p>
        </div>

        <div className="blog-grid">
          {articles.map((article, index) => (
            <article
              key={article.id}
              className="blog-card lumos-reveal"
              style={{ animationDelay: `${0.06 + index * 0.07}s` }}
            >
              <div className="blog-image">
                <div className="image-placeholder">
                  <span className="category-badge">{article.category}</span>
                </div>
              </div>

              <div className="blog-content">
                <span className="blog-date">{article.date}</span>
                <h3 className="blog-title">{article.title}</h3>
                <p className="blog-excerpt">{article.excerpt}</p>

                <a
                  href={article.link}
                  className="blog-link"
                  target={article.link.startsWith('http') ? '_blank' : '_self'}
                  rel={article.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  {t.blog.readMore}
                  <span className="link-arrow">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
