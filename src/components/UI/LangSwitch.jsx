import { useLang } from "../../context/LanguageContext";

export function LangSwitch({ inline = false }) {
  const { lang, setLang } = useLang();
  const isRTL = lang === 'ar';
  
  return (
    <button 
      onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
      style={{ 
        position: inline ? "static" : "fixed", 
        top: inline ? 'auto' : (window.innerWidth <= 480 ? 12 : 20), 
        left: inline ? 'auto' : (isRTL ? (window.innerWidth <= 480 ? 60 : 72) : 'auto'),
        right: inline ? 'auto' : (isRTL ? 'auto' : (window.innerWidth <= 480 ? 60 : 72)), 
        zIndex: inline ? 'auto' : 900, 
        height: window.innerWidth <= 480 ? 40 : 44,
        background: "var(--card-bg)", 
        backdropFilter: "blur(20px)", 
        border: "1.5px solid rgba(255,255,255,.6)", 
        borderRadius: window.innerWidth <= 480 ? 8 : 10, 
        padding: window.innerWidth <= 480 ? "0 12px" : "0 16px", 
        fontSize: window.innerWidth <= 480 ? 12 : 13, 
        fontWeight: 600, 
        cursor: "pointer", 
        color: "var(--azure)", 
        transition: "all .2s", 
        boxShadow: "var(--shadow)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap"
      }}
    >
      {lang === 'en' ? 'عربي' : 'English'}
    </button>
  );
}
