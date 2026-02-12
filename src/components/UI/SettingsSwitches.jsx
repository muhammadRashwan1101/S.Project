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
      top: 20, 
      right: isRTL ? 'auto' : 20,
      left: isRTL ? 20 : 'auto',
      zIndex: 10, 
      display: "flex", 
      alignItems: "center",
      flexDirection: isRTL ? "row" : "row-reverse"
    }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          onClick={toggleTheme}
          style={{
            width: 44,
            height: 44,
            padding: 0,
            border: '1.5px solid rgba(255,255,255,.6)',
            borderRadius: 10,
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
            width: isSmallScreen ? 44 : 'auto',
            height: 44,
            background: "var(--card-bg)", 
            backdropFilter: "blur(20px)", 
            border: "1.5px solid rgba(255,255,255,.6)", 
            borderRadius: 10, 
            cursor: "pointer", 
            color: "var(--azure)", 
            transition: "all .2s", 
            boxShadow: "var(--shadow)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: isSmallScreen ? 0 : 8,
            padding: isSmallScreen ? 0 : '0 16px',
            fontSize: 14,
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
            height: 44,
            padding: '0 16px',
            border: '1.5px solid rgba(212,117,106,.6)',
            borderRadius: 10,
            background: 'var(--card-bg)',
            backdropFilter: 'blur(20px)',
            color: 'var(--coral)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow)',
            fontSize: 14,
            fontWeight: 500,
            marginLeft: isRTL ? 0 : 16,
            marginRight: isRTL ? 16 : 0
          }}
        >
          {t('logout')}
        </button>
      )}
    </div>
  );
}
