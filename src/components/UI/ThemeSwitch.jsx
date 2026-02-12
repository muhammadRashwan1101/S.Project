import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LanguageContext';
import {SunIcon, MoonIcon} from "../../components/UI/Icons"

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLang();
  const isRTL = lang === 'ar';

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: window.innerWidth <= 480 ? 12 : 20,
        left: isRTL ? 'auto' : (window.innerWidth <= 480 ? 12 : 20),
        right: isRTL ? (window.innerWidth <= 480 ? 12 : 20) : 'auto',
        zIndex: 900,
        width: window.innerWidth <= 480 ? 40 : 44,
        height: window.innerWidth <= 480 ? 40 : 44,
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
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
