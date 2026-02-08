import { useState, useEffect } from 'react';
import { LanguageProvider, useLang } from './context/LanguageContext';
import { GlobalStyle } from './constants/styles';
import LandingPage from './pages/LandingPage';
import {SignUpPage} from './pages/Auth/SignUpPage';
import {LoginPage} from './pages/Auth/LoginPage';
import {TokenPage} from './pages/Auth/TokenPage';
import {ReportLostDependentPage} from './pages/ReportLostDependentPage';
import HomePage from './pages/Dashboard/HomePage';
import { initializeSessionId, getSession, clearSession, saveSession } from './utils/sessionManager';
import { initializeAccounts, accountsDB } from './utils/dataStore';
import { ensureAccountDefaults } from './utils/helpers';
import { LangSwitch } from './components/UI/LangSwitch';
import { ShieldIcon, LogInIcon } from './components/UI/Icons';

function AppContent() {
  const { t } = useLang();
  const [page, setPage] = useState('landing');
  const [guardianData, setGuardianData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize app on mount
  useEffect(() => {
    // Load Leaflet CSS and JS
    const link = document.createElement('link');
    link.id = 'leaflet-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.id = 'leaflet-js';
    script.src = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.js';
    script.async = true;
    document.head.appendChild(script);

    // Initialize session and accounts
    initializeSessionId();
    initializeAccounts();

    const session = getSession();
    if (session && session.email) {
      // Restore from fresh data, not stale session
      const freshGuardian = accountsDB.find(acc => acc.email === session.email);
      if (freshGuardian) {
        setGuardianData(ensureAccountDefaults(freshGuardian));
        setPage('home');
      } else {
        setPage('landing');
      }
    } else {
      setPage('landing');
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--ice-blue)', fontSize: 18 }}>
        ⏳ Loading...
      </div>
    );
  }

  const handleSignUp = () => setPage('signup');
  const handleLogIn = () => setPage('login');
  const handleReportLost = () => setPage('report');

  const handleGuardianSignUp = (data) => {
    saveSession(data);
    setGuardianData(data);
    setPage('token');
  };

  const handleGuardianLogin = (data) => {
    saveSession(data);
    setGuardianData(data);
    setPage('home');
  };

  const handleTokenPageDone = () => {
    setPage('home');
  };

  const handleLogout = () => {
    clearSession();
    setGuardianData(null);
    setPage('landing');
  };

  const handleBackToLanding = () => {
    setPage('landing');
  };

  return (
    <>
      <GlobalStyle />
      {page === 'landing' && (
        <LandingPage
          onSignUp={handleSignUp}
          onLogIn={handleLogIn}
          onReportLost={handleReportLost}
        />
      )}
      {page === 'signup' && (
        <SignUpPage
          onGuardianSignUp={handleGuardianSignUp}
          onSwitchToLogin={handleLogIn}
          onBack={handleBackToLanding}
        />
      )}
      {page === 'login' && (
        <LoginPage
          onGuardianLogin={handleGuardianLogin}
          onSwitchToSignUp={handleSignUp}
          onBack={handleBackToLanding}
        />
      )}
      {page === 'token' && (
        <TokenPage
          guardianData={guardianData}
          onGoHome={handleTokenPageDone}
        />
      )}
      {page === 'report' && (
        <ReportLostDependentPage
          onBack={handleBackToLanding}
        />
      )}
      {page === 'home' && guardianData && (
        <HomePage
          guardianData={guardianData}
          updateGuardianData={setGuardianData}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
