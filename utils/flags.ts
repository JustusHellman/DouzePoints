export const countryToIsoMap: Record<string, string> = {
  'Albania': 'al', 'Andorra': 'ad', 'Armenia': 'am', 'Australia': 'au', 'Austria': 'at',
  'Azerbaijan': 'az', 'Belarus': 'by', 'Belgium': 'be', 'Bosnia & Herzegovina': 'ba', 'Bosnia and Herzegovina': 'ba',
  'Bulgaria': 'bg', 'Croatia': 'hr', 'Cyprus': 'cy', 'Czechia': 'cz', 'Czech Republic': 'cz',
  'Denmark': 'dk', 'Estonia': 'ee', 'Finland': 'fi', 'France': 'fr',
  'Georgia': 'ge', 'Germany': 'de', 'Greece': 'gr', 'Hungary': 'hu',
  'Iceland': 'is', 'Ireland': 'ie', 'Israel': 'il', 'Italy': 'it',
  'Latvia': 'lv', 'Lithuania': 'lt', 'Luxembourg': 'lu', 'Malta': 'mt',
  'Moldova': 'md', 'Monaco': 'mc', 'Montenegro': 'me', 'Morocco': 'ma',
  'Netherlands': 'nl', 'The Netherlands': 'nl', 'North Macedonia': 'mk', 'Norway': 'no',
  'Poland': 'pl', 'Portugal': 'pt', 'Romania': 'ro', 'San Marino': 'sm',
  'Serbia': 'rs', 'Slovenia': 'si', 'Spain': 'es', 'Sweden': 'se',
  'Switzerland': 'ch', 'Turkey': 'tr', 'Ukraine': 'ua', 'United Kingdom': 'gb',
  'Yugoslavia': 'rs', 'Serbia and Montenegro': 'rs', 'Serbia & Montenegro': 'rs', 'Russia': 'ru',
  'Slovakia': 'sk'
};

export const getCountryIso = (country: string): string | null => {
  return countryToIsoMap[country] || null;
};

export const getCountryFlagUrl = (country: string): string | null => {
  const iso = getCountryIso(country);
  if (!iso) return null;
  return `https://flagcdn.com/w160/${iso}.png`;
};

export const getCountryFlag = (country: string): string => {
  const flags: Record<string, string> = {
    'Albania': '🇦🇱', 'Armenia': '🇦🇲', 'Australia': '🇦🇺', 'Austria': '🇦🇹',
    'Azerbaijan': '🇦🇿', 'Belgium': '🇧🇪', 'Bosnia & Herzegovina': '🇧🇦', 'Bosnia and Herzegovina': '🇧🇦',
    'Bulgaria': '🇧🇬', 'Croatia': '🇭🇷', 'Cyprus': '🇨🇾', 'Czechia': '🇨🇿', 'Czech Republic': '🇨🇿',
    'Denmark': '🇩🇰', 'Estonia': '🇪🇪', 'Finland': '🇫🇮', 'France': '🇫🇷',
    'Georgia': '🇬🇪', 'Germany': '🇩🇪', 'Greece': '🇬🇷', 'Hungary': '🇭🇺',
    'Iceland': '🇮🇸', 'Ireland': '🇮🇪', 'Israel': '🇮🇱', 'Italy': '🇮🇹',
    'Latvia': '🇱🇻', 'Lithuania': '🇱🇹', 'Luxembourg': '🇱🇺', 'Malta': '🇲🇹',
    'Moldova': '🇲🇩', 'Monaco': '🇲🇨', 'Montenegro': '🇲🇪', 'Netherlands': '🇳🇱', 'The Netherlands': '🇳🇱',
    'North Macedonia': '🇲🇰', 'Norway': '🇳🇴', 'Poland': '🇵🇱', 'Portugal': '🇵🇹',
    'Romania': '🇷🇴', 'San Marino': '🇸🇲', 'Serbia': '🇷🇸', 'Slovenia': '🇸🇮',
    'Spain': '🇪🇸', 'Sweden': '🇸🇪', 'Switzerland': '🇨🇭', 'Turkey': '🇹🇷',
    'Ukraine': '🇺🇦', 'United Kingdom': '🇬🇧', 'Yugoslavia': '🇷🇸', 'Morocco': '🇲🇦', 'Serbia and Montenegro': '🇷🇸', 'Serbia & Montenegro': '🇷🇸', 'Russia': '🇷🇺',
    'Slovakia': '🇸🇰', 'Andorra': '🇦🇩', 'Belarus': '🇧🇾'
  };
  return flags[country] || '🏳️';
};
