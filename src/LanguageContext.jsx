import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr')

  // Charger la langue sauvegardée
  useEffect(() => {
    const savedLang = localStorage.getItem('lumos-language')
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      setLanguage(savedLang)
    }
  }, [])

  // Sauvegarder quand ça change
  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('lumos-language', lang)
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}