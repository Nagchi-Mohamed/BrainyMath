import { useSettings } from '../context/SettingsContext';
import { translations } from '../translations';

export const useTranslation = () => {
  const { language } = useSettings();

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value;
  };

  return { t };
}; 