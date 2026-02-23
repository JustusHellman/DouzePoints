
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { en } from '../locales/en.ts';
import { es } from '../locales/es.ts';
import { fr } from '../locales/fr.ts';
import { it } from '../locales/it.ts';
import { de } from '../locales/de.ts';
import { TranslationSchema } from '../locales/types.ts';

type Language = 'en' | 'es' | 'fr' | 'it' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, TranslationSchema> = { en, es, fr, it, de };

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('euro-lang') as Language) || 'en';
  });

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English if current language is missing key
        let fallback: any = translations['en'];
        for (const fk of keys) {
            if (fallback && typeof fallback === 'object') {
                fallback = fallback[fk];
            } else {
                fallback = undefined;
            }
        }
        return fallback || key;
      }
    }
    return value || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('euro-lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
};
