import { useState, memo } from 'react';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { getSession } from '../utils/sessionManager';
import { useResponsive } from '../hooks/useResponsive';
import Logo from './Logo';
import { HomeIcon, SubscriptionIcon, UsersIcon, ProductIcon, CareGuideIcon, ChevronRightIcon, SunIcon, MoonIcon } from './UI/Icons';

const SideNavbar = ({ activeNav, navigate, homeRoute, setView, setActiveNav }) => {
  const { t, lang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const isSmallScreen = isMobile || isTablet;
  
  const [isHovered, setIsHovered] = useState(() => {
    const saved = localStorage.getItem('sanad-sidebar-hovered');
    return saved === 'true';
  });

  const session = getSession();
  const defaultHomeRoute = session?.role === 'dependent' ? '/dependent-home' : '/home';
  const finalHomeRoute = homeRoute || defaultHomeRoute;
  const isRTL = lang === 'ar';
  
  const handleMouseEnter = () => {
    if (!isSmallScreen) {
      setIsHovered(true);
      localStorage.setItem('sanad-sidebar-hovered', 'true');
    }
  };

  const handleMouseLeave = () => {
    if (!isSmallScreen) {
      setIsHovered(false);
      localStorage.setItem('sanad-sidebar-hovered', 'false');
    }
  };

  const navItems = [
    { key: 'homepage', icon: <HomeIcon />, label: t('homepage'), route: finalHomeRoute, onClick: () => { if (setView) { setView('dashboard'); if (setActiveNav) setActiveNav('homepage'); } navigate(finalHomeRoute); } },
    { key: 'subscriptions', icon: <SubscriptionIcon />, label: t('subscriptions'), route: '/subscriptions', onClick: () => navigate('/subscriptions') },
    { key: 'services', icon: <UsersIcon />, label: t('services'), route: '/services', onClick: () => navigate('/services') },
    { key: 'products', icon: <ProductIcon />, label: t('products'), route: '/products', onClick: () => navigate('/products') },
    { key: 'questions', icon: <CareGuideIcon />, label: t('careGuide'), route: '/careguide', onClick: () => navigate('/careguide') }
  ];

  // Mobile Bottom Navigation
  if (isSmallScreen) {
    return (
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'var(--card-bg)',
        backdropFilter: 'blur(15px)',
        borderTop: '1px solid var(--azure-pale)',
        padding: '8px 12px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        gap: '4px'
      }}>
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={item.onClick}
            style={{
              flex: 1,
              maxWidth: '80px',
              padding: '8px 4px',
              border: 'none',
              borderRadius: '8px',
              background: activeNav === item.key ? 'var(--azure)' : 'transparent',
              color: activeNav === item.key ? '#fff' : 'var(--ink)',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: '500',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              minHeight: '48px'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
              {item.icon}
            </span>
            <span style={{ fontSize: '9px', textAlign: 'center', lineHeight: '1.2' }}>{item.label}</span>
          </button>
        ))}
      </div>
    );
  }

  // Desktop Side Navigation
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        left: isRTL ? 'auto' : 0,
        right: isRTL ? 0 : 'auto',
        top: 20,
        bottom: 20,
        width: isHovered ? '220px' : '84px',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(15px)',
        borderRadius: isRTL ? '15px 0 0 15px' : '0 15px 15px 0',
        border: '1px solid var(--azure-pale)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        zIndex: 10,
        transition: 'width 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={item.onClick}
            style={{
              width: isHovered ? '100%' : '44px',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              background: activeNav === item.key ? (isHovered ? 'var(--azure)' : 'rgba(74,144,164,0.2)') : 'transparent',
              color: activeNav === item.key ? (isHovered ? '#fff' : 'var(--azure)') : 'var(--ink)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: isHovered ? 'flex-start' : 'center',
              minHeight: '44px'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
              {item.icon}
            </span>
            {isHovered && item.label}
          </button>
        ))}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '100%',
          borderTop: '1px solid var(--azure-pale)',
          paddingTop: '12px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            onClick={toggleTheme}
            style={{
              width: isHovered ? '100%' : '44px',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              background: 'transparent',
              color: 'var(--ink)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'center',
              minHeight: '44px'
            }}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            <span style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </span>
            {isHovered && (theme === 'light' ? t('darkMode') || 'Dark Mode' : t('lightMode') || 'Light Mode')}
          </button>
        </div>
        {isHovered ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Logo width={32} height={32} style={{ animation: 'none' }} />
              <span className="appName" style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>
                {t('app')}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
              © {new Date().getFullYear()}
            </div>
          </>
        ) : (
          <Logo width={28} height={28} style={{ animation: 'none' }} />
        )}
      </div>
    </div>
  );
};

export default memo(SideNavbar, () => true);
