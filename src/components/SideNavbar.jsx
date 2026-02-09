import { useLang } from '../context/LanguageContext';
import { getSession } from '../utils/sessionManager';
import Logo from './Logo';

const SideNavbar = ({ activeNav, navigate, homeRoute, setView, setActiveNav }) => {
  const { t } = useLang();
  
  // Determine home route based on session if not explicitly provided
  const session = getSession();
  const defaultHomeRoute = session?.role === 'dependent' ? '/dependent-home' : '/home';
  const finalHomeRoute = homeRoute || defaultHomeRoute;
  return (
  <div style={{
    position: 'fixed',
    left: 20,
    top: 20,
    bottom: 20,
    width: '220px',
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(15px)',
    borderRadius: '15px',
    border: '1px solid rgba(0,0,0,0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    zIndex: 10
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <button
        onClick={() => {
          if (setView) {
            setView('dashboard');
            if (setActiveNav) setActiveNav('homepage');
          }
          navigate(finalHomeRoute);
        }}
        style={{
          padding: '12px 16px',
          border: 'none',
          borderRadius: '8px',
          background: activeNav === 'homepage' ? 'var(--azure)' : 'transparent',
          color: activeNav === 'homepage' ? '#fff' : 'var(--ink)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
      >
        {t('homepage')}
      </button>
      <button
        onClick={() => navigate('/subscriptions')}
        style={{
          padding: '12px 16px',
          border: 'none',
          borderRadius: '8px',
          background: activeNav === 'subscriptions' ? 'var(--azure)' : 'transparent',
          color: activeNav === 'subscriptions' ? '#fff' : 'var(--ink)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
      >
        {t('subscriptions')}
      </button>
      <button
        onClick={() => navigate('/services')}
        style={{
          padding: '12px 16px',
          border: 'none',
          borderRadius: '8px',
          background: activeNav === 'services' ? 'var(--azure)' : 'transparent',
          color: activeNav === 'services' ? '#fff' : 'var(--ink)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
      >
        {t('services')}
      </button>
      <button
        onClick={() => navigate('/products')}
        style={{
          padding: '12px 16px',
          border: 'none',
          borderRadius: '8px',
          background: activeNav === 'products' ? 'var(--azure)' : 'transparent',
          color: activeNav === 'products' ? '#fff' : 'var(--ink)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
      >
        {t('products')}
      </button>
      <button
        onClick={() => navigate('/careguide')}
        style={{
          padding: '12px 16px',
          border: 'none',
          borderRadius: '8px',
          background: activeNav === 'questions' ? 'var(--azure)' : 'transparent',
          color: activeNav === 'questions' ? '#fff' : 'var(--ink)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
      >
        {t('careGuide')}
      </button>
    </div>
    <div style={{
      borderTop: '1px solid rgba(0,0,0,0.1)',
      paddingTop: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Logo width={32} height={32} style={{ animation: 'none' }} />
        <span className="appName" style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>
          {t('app')}
        </span>
      </div>
      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
        © {new Date().getFullYear()}
      </div>
    </div>
  </div>
  );
};

export default SideNavbar;
