import { useLang } from "../../context/LanguageContext";

export function LangSwitch() {
  const { lang, setLang } = useLang();
  const isRTL = lang === 'ar';
  
  return (
    <button 
      onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
      style={{ 
        position: "fixed", 
        top: window.innerWidth <= 480 ? 12 : 20, 
        left: isRTL ? (window.innerWidth <= 480 ? 12 : 20) : 'auto',
        right: isRTL ? 'auto' : (window.innerWidth <= 480 ? 12 : 20), 
        zIndex: 900, 
        background: "var(--card-bg)", 
        backdropFilter: "blur(20px)", 
        border: "1.5px solid rgba(255,255,255,.6)", 
        borderRadius: window.innerWidth <= 480 ? 8 : 10, 
        padding: window.innerWidth <= 480 ? "6px 12px" : "8px 16px", 
        fontSize: window.innerWidth <= 480 ? 12 : 13, 
        fontWeight: 600, 
        cursor: "pointer", 
        color: "var(--azure)", 
        transition: "all .2s", 
        boxShadow: "var(--shadow)" 
      }}
    >
      {lang === 'en' ? 'عربي' : 'English'}
    </button>
  );
}
