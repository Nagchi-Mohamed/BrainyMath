import { useSettings } from '../context/SettingsContext';
import { translations } from '../translations';

const DEFAULT_LANGUAGE = 'en';

export const useTranslation = () => {
  const { language } = useSettings();

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations[language] || translations[DEFAULT_LANGUAGE];
    
    // Try to get translation in current language
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // If not found, try fallback language
        if (language !== DEFAULT_LANGUAGE) {
          value = translations[DEFAULT_LANGUAGE];
          for (const fallbackKey of keys) {
            if (value && value[fallbackKey]) {
              value = value[fallbackKey];
            } else {
              console.warn(`Translation key not found: ${key} in language ${language} or fallback ${DEFAULT_LANGUAGE}`);
              return key;
            }
          }
        } else {
          console.warn(`Translation key not found: ${key} in language ${language}`);
          return key;
        }
      }
    }

    // Handle string interpolation
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : `{{${paramKey}}}`;
      });
    }
    
    return value;
  };

  return { t, currentLanguage: language };
}; 