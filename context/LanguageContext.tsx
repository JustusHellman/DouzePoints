
// @refresh reset
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { en } from '../locales/en/index.ts';
import { es } from '../locales/es/index.ts';
import { fr } from '../locales/fr/index.ts';
import { it } from '../locales/it/index.ts';
import { de } from '../locales/de/index.ts';
import { pl } from '../locales/pl/index.ts';
import { sv } from '../locales/sv/index.ts';
import { uk } from '../locales/uk/index.ts';
import { pt } from '../locales/pt/index.ts';
import { nl } from '../locales/nl/index.ts';
import { fi } from '../locales/fi/index.ts';
import { el } from '../locales/el/index.ts';
import { TranslationSchema } from '../locales/types.ts';

export type Language = 'en' | 'es' | 'fr' | 'it' | 'de' | 'pl' | 'sv' | 'uk' | 'pt' | 'nl' | 'fi' | 'el';

export const SUPPORTED_LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, TranslationSchema> = { en, es, fr, it, de, pl, sv, uk, pt, nl, fi, el };

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('euro-lang') as Language;
    if (stored && SUPPORTED_LANGUAGES.some(l => l.code === stored)) {
      return stored;
    }

    // Try browser languages in order of preference
    const browserLangs = navigator.languages || [navigator.language];
    for (const lang of browserLangs) {
      const code = lang.split('-')[0] as Language;
      if (SUPPORTED_LANGUAGES.some(l => l.code === code)) {
        return code;
      }
    }

    return 'en';
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = React.useCallback((key: string, params?: Record<string, any>): any => {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English if current language is missing key
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let fallback: any = translations['en'];
        for (const fk of keys) {
            if (fallback && typeof fallback === 'object') {
                fallback = fallback[fk];
            } else {
                fallback = undefined;
            }
        }
        value = fallback || key;
        break;
      }
    }

    if (typeof value === 'string' && params) {
      Object.keys(params).forEach(paramKey => {
        value = value.replace(new RegExp(`{${paramKey}}`, 'g'), params[paramKey]);
      });
    }

    return value;
  }, [language]);

  const handleSetLanguage = React.useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('euro-lang', lang);
  }, []);

  const contextValue = React.useMemo(() => ({ 
    language, 
    setLanguage: handleSetLanguage, 
    t 
  }), [language, handleSetLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
};