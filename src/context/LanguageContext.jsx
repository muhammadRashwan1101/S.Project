import { createContext, useContext, useState, useEffect } from "react";
import { TR } from "../constants/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('sanad-lang') || 'en');
  
  useEffect(() => { 
    localStorage.setItem('sanad-lang', lang); 
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; 
    document.documentElement.lang = lang; 
  }, [lang]);

  const t = (k) => TR[lang][k] || k;
  
  return <LanguageContext.Provider value={{ lang, setLang, t, TR: TR[lang] }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
