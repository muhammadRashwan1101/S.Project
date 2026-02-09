import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { GlobalStyle } from './constants/styles';
import LandingPage from './pages/LandingPage';
import {SignUpPage} from './pages/Auth/SignUpPage';
import {LoginPage} from './pages/Auth/LoginPage';
import {TokenPage} from './pages/Auth/TokenPage';
import {ReportLostDependentPage} from './pages/ReportLostDependentPage';
import DependentHomePage from './pages/Dashboard/DependentHomePage';
import HomePage from './pages/Dashboard/HomePage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import ServicesPage from './pages/Services';
import ProductsPage from './pages/Product';
import CareGuidePage from './pages/careGuide';
import { initializeSessionId, getSession } from './utils/sessionManager';
import { initializeAccounts, accountsDB } from './utils/dataStore';
import { ensureAccountDefaults } from './utils/helpers';

function AppContent() {
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
      if (freshGuardian && freshGuardian.role !== 'dependent') {
        setGuardianData(ensureAccountDefaults(freshGuardian));
      }
    }

    setLoading(false);
  }, []);

  // Listen for session changes (login/logout)
  useEffect(() => {
    const checkSession = () => {
      const session = getSession();
      if (session && session.email && session.role !== 'dependent') {
        const freshGuardian = accountsDB.find(acc => acc.email === session.email);
        if (freshGuardian) {
          setGuardianData(ensureAccountDefaults(freshGuardian));
        }
      } else {
        setGuardianData(null);
      }
    };

    window.addEventListener('storage', checkSession);
    return () => window.removeEventListener('storage', checkSession);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--ice-blue)', fontSize: 18 }}>
        ⏳ Loading...
      </div>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/token" element={<TokenPage guardianData={guardianData} />} />
        <Route path="/report" element={<ReportLostDependentPage />} />
        <Route path="/home" element={guardianData ? <HomePage guardianData={guardianData} updateGuardianData={setGuardianData} /> : <LandingPage />} />
        <Route path="/dependent-home" element={<DependentHomePage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/careguide" element={<CareGuidePage />} />
      </Routes>
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
