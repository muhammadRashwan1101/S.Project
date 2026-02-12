import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LanguageContext';
import { SunIcon, MoonIcon, GlobeIcon } from "./Icons";
import { useResponsive } from '../../hooks/useResponsive';

export function SettingsSwitches({ onLogout, showLogout = false }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const { isMobile, isTablet } = useResponsive();
  const isRTL = lang === 'ar';
  const isSmallScreen = isMobile || isTablet;

  return (
    <div style={{ 
      position: "absolute", 
      top: window.innerWidth <= 480 ? 12 : 20, 
      right: isRTL ? 'auto' : (window.innerWidth <= 480 ? 12 : 20),
      left: isRTL ? (window.innerWidth <= 480 ? 12 : 20) : 'auto',
      zIndex: 10, 
      display: "flex", 
      alignItems: "center",
      flexDirection: isRTL ? "row" : "row-reverse"
    }}>
      <div style={{ display: "flex", gap: window.innerWidth <= 480 ? 6 : 8, alignItems: "center" }}>
        <button
          onClick={toggleTheme}
          style={{
            width: window.innerWidth <= 480 ? 36 : 44,
            height: window.innerWidth <= 480 ? 36 : 44,
            padding: 0,
            border: '1.5px solid rgba(255,255,255,.6)',
            borderRadius: window.innerWidth <= 480 ? 8 : 10,
            background: 'var(--card-bg)',
            backdropFilter: 'blur(20px)',
            color: 'var(--ink)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow)'
          }}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
          style={{ 
            width: isSmallScreen ? (window.innerWidth <= 480 ? 36 : 44) : 'auto',
            height: window.innerWidth <= 480 ? 36 : 44,
            background: "var(--card-bg)", 
            backdropFilter: "blur(20px)", 
            border: "1.5px solid rgba(255,255,255,.6)", 
            borderRadius: window.innerWidth <= 480 ? 8 : 10, 
            cursor: "pointer", 
            color: "var(--azure)", 
            transition: "all .2s", 
            boxShadow: "var(--shadow)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: isSmallScreen ? 0 : 8,
            padding: isSmallScreen ? 0 : '0 16px',
            fontSize: window.innerWidth <= 480 ? 12 : 14,
            fontWeight: 500
          }}
        >
          {isSmallScreen ? <GlobeIcon /> : (lang === 'en' ? 'العربية' : 'English')}
        </button>
      </div>
      {showLogout && (
        <button
          onClick={onLogout}
          style={{
            height: window.innerWidth <= 480 ? 36 : 44,
            padding: window.innerWidth <= 480 ? '0 12px' : '0 16px',
            border: '1.5px solid rgba(212,117,106,.6)',
            borderRadius: window.innerWidth <= 480 ? 8 : 10,
            background: 'var(--card-bg)',
            backdropFilter: 'blur(20px)',
            color: 'var(--coral)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow)',
            fontSize: window.innerWidth <= 480 ? 12 : 14,
            fontWeight: 500,
            marginLeft: isRTL ? 0 : (window.innerWidth <= 480 ? 12 : 16),
            marginRight: isRTL ? (window.innerWidth <= 480 ? 12 : 16) : 0
          }}
        >
          {t('logout')}
        </button>
      )}
    </div>
  );
}
