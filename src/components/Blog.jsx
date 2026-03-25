import { motion } from 'framer-motion'
import '../styles/blog.css'

const Blog = () => {
  const articles = [
    {
      id: 1,
      category: 'Sortie musicale',
      title: 'OIABM:GEMINI (Deluxe) - Le projet qui redéfinit la collaboration',
      excerpt: 'Retour sur le séminaire de 9 jours qui a réuni 15 artistes et 7 producteurs pour créer un EP de 10 morceaux unique en son genre.',
      date: '8 Novembre 2025',
      image: '/images/blog-gemini.jpg',
      link: 'https://hyperfollow.com/lumosmtl'
    },
    {
      id: 2,
      category: 'Événement',
      title: 'OIABM 4 - Une quatrième édition mémorable',
      excerpt: 'Plus de 500 personnes réunies pour célébrer la scène émergente montréalaise. Retour sur les moments forts du festival.',
      date: '5 Juillet 2025',
      image: '/images/blog-oiabm4.jpg',
      link: '#'
    },
    {
      id: 3,
      category: 'Artiste',
      title: 'KaMa nominé au Gala Dynastie 2025',
      excerpt: 'Notre artiste KaMa en nomination pour "Artiste Musical de l\'année". Une reconnaissance méritée pour son travail acharné.',
      date: '15 Mars 2025',
      image: '/images/blog-kama.jpg',
      link: '#'
    },
    {
      id: 4,
      category: 'Collaboration',
      title: 'Lumos x Ngoundieu & Friends - Un succès retentissant',
      excerpt: 'Retour sur cette collaboration exceptionnelle qui a mis en lumière le talent de Ngoundieu et du Collectif APPART.',
      date: '5 Septembre 2024',
      image: '/images/blog-ngoundieu.jpg',
      link: '#'
    },
    {
      id: 5,
      category: 'Événement',
      title: 'Freshman Triumph 3 - Le freestyle à son apogée',
      excerpt: 'La troisième édition de notre compétition de freestyle a révélé de nouveaux talents prometteurs de la scène montréalaise.',
      date: '2 Mai 2024',
      image: '/images/blog-freshman.jpg',
      link: '#'
    },
    {
      id: 6,
      category: 'Communauté',
      title: 'SSK: La Rive-Sud s\'impose sur la scène',
      excerpt: 'Portrait du collectif SouthSyKemet et de leur impact grandissant sur la scène hip-hop québécoise.',
      date: '20 Mars 2024',
      image: '/images/blog-ssk.jpg',
      link: '#'
    }
  ]

  return (
    <section id="articles" className="blog-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">05</span>
          <h2 className="section-title">Articles & Actualités</h2>
          <p className="section-subtitle">
            Les dernières nouvelles de la scène
          </p>
        </motion.div>

        <div className="blog-grid">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="blog-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  Lire la suite
                  <span className="link-arrow">→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog