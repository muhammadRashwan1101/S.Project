import { useState, memo } from 'react';
import { useLang } from '../context/LanguageContext';
import { getSession } from '../utils/sessionManager';
import Logo from './Logo';
import { HomeIcon, SubscriptionIcon, UsersIcon, ProductIcon, CareGuideIcon, ChevronRightIcon } from './UI/Icons';

const SideNavbar = ({ activeNav, navigate, homeRoute, setView, setActiveNav }) => {
  const { t, lang } = useLang();
  const [isHovered, setIsHovered] = useState(() => {
    const saved = localStorage.getItem('sanad-sidebar-hovered');
    return saved === 'true';
  });

  // Determine home route based on session if not explicitly provided
  const session = getSession();
  const defaultHomeRoute = session?.role === 'dependent' ? '/dependent-home' : '/home';
  const finalHomeRoute = homeRoute || defaultHomeRoute;
  const isRTL = lang === 'ar';
  const handleMouseEnter = () => {
    setIsHovered(true);
    localStorage.setItem('sanad-sidebar-hovered', 'true');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    localStorage.setItem('sanad-sidebar-hovered', 'false');
  };

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
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(15px)',
      borderRadius: isRTL ? '15px 0 0 15px' : '0 15px 15px 0',
      border: '1px solid rgba(0,0,0,0.1)',
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
      <button
        onClick={() => {
          if (setView) {
            setView('dashboard');
            if (setActiveNav) setActiveNav('homepage');
          }
          navigate(finalHomeRoute);
        }}
        style={{
          width: isHovered ? '100%' : '44px',
          padding: '12px',
          border: 'none',
          borderRadius: '8px',
          background: activeNav === 'homepage' ? (isHovered ? 'var(--azure)' : 'rgba(0,123,167,0.2)') : 'transparent',
          color: activeNav === 'homepage' ? (isHovered ? '#fff' : 'var(--azure)') : 'var(--ink)',
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
          <HomeIcon />
        </span>
        {isHovered && t('homepage')}
      </button>
      <button
        onClick={() => navigate('/subscriptions')}
        style={{
          width: isHovered ? '100%' : '44px',
          padding: '12px',
          border: 'none',
          borderRadius: '8px',
          background: activeNav === 'subscriptions' ? (isHovered ? 'var(--azure)' : 'rgba(0,123,167,0.2)') : 'transparent',
          color: activeNav === 'subscriptions' ? (isHovered ? '#fff' : 'var(--azure)') : 'var(--ink)',
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
          <SubscriptionIcon />
        </span>
        {isHovered && t('subscriptions')}
      </button>
      <button
        onClick={() => navigate('/services')}
        style={{
          width: isHovered ? '100%' : '44px',
          padding: '12px',
          border: 'none',
          borderRadius: '8px',
          background: activeNav === 'services' ? (isHovered ? 'var(--azure)' : 'rgba(0,123,167,0.2)') : 'transparent',
          color: activeNav === 'services' ? (isHovered ? '#fff' : 'var(--azure)'): 'var(--ink)',
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
          <UsersIcon />
        </span>
        {isHovered && t('services')}
      </button>
      <button
        onClick={() => navigate('/products')}
        style={{
          width: isHovered ? '100%' : '44px',
          padding: '12px',
          border: 'none',
          borderRadius: '8px',
          background: activeNav === 'products' ? (isHovered ? 'var(--azure)' : 'rgba(0,123,167,0.2)') : 'transparent',
          color: activeNav === 'products' ? (isHovered ? '#fff' : 'var(--azure)') : 'var(--ink)',
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
          <ProductIcon />
        </span>
        {isHovered && t('products')}
      </button>
      <button
        onClick={() => navigate('/careguide')}
        style={{
          width: isHovered ? '100%' : '44px',
          padding: '12px',
          border: 'none',
          borderRadius: '8px',
          background: activeNav === 'questions' ? (isHovered ? 'var(--azure)' : 'rgba(0,123,167,0.2)') : 'transparent',
          color: activeNav === 'questions' ? (isHovered ? '#fff' : 'var(--azure)') : 'var(--ink)',
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
          <CareGuideIcon />
        </span>
        {isHovered && t('careGuide')}
      </button>
    </div>
    <div style={{
      borderTop: isHovered ? '1px solid rgba(0,0,0,0.1)' : 'none',
      paddingTop: isHovered ? '16px' : '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px'
    }}>
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
