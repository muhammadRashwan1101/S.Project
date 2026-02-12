import { useState, useEffect } from "react";
import { useLang } from "../../context/LanguageContext";
import { useResponsive } from "../../hooks/useResponsive";
import { SettingsSwitches } from "../../components/UI/SettingsSwitches";
import { Toast } from "../../components/UI/Toast";import { calculateDistance } from "../../utils/helpers";
import LostReportsViewer from "../../modals/LostReportsViewer";
import LocationPicker from "../../components/LocationPicker";
import DashboardView from "./DashboardView";
import MapView from "./MapView";
import { useNavigate } from "react-router-dom";
import {ProfileModal} from "../../modals/ProfileModal";
import {ManageDependentsModal} from "../../modals/ManageDependentsModal";
import SideNavbar from "../../components/SideNavbar";

export default function HomePage({ guardianData: initialGuardianData }) {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const { isMobile, isTablet } = useResponsive();
  const isSmallScreen = isMobile || isTablet;
  const isRTL = lang === 'ar';
  const [view, setView] = useState("dashboard");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isEditingSafeZone, setIsEditingSafeZone] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showTestLocationPicker, setShowTestLocationPicker] = useState(false);
  const [testLocation, setTestLocation] = useState(() => {
    const saved = localStorage.getItem('sanad-test-location');
    return saved ? JSON.parse(saved) : null;
  });
  const [useTestLocation, setUseTestLocation] = useState(() => {
    const saved = localStorage.getItem('sanad-use-test-location');
    return saved === 'true';
  });
  const [isTrackingPaused, setIsTrackingPaused] = useState(() => {
    const saved = localStorage.getItem('sanad-tracking-paused');
    return saved === 'true';
  });
  const [isDependentLocationHidden, setIsDependentLocationHidden] = useState(() => {
    const saved = localStorage.getItem('sanad-dependent-location-hidden');
    return saved === 'true';
  });
  const [autoHiddenByReport, setAutoHiddenByReport] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showManageDependents, setShowManageDependents] = useState(false);
  const [activeNav, setActiveNav] = useState('homepage');

  const getLatestGuardianData = () => {
    const accounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
    return accounts.find(acc => acc.email === initialGuardianData.email) || initialGuardianData;
  };
  
  const [guardianData, setGuardianData] = useState(() => getLatestGuardianData());

  const updateGuardianData = (newData) => {
    setGuardianData(newData);
    const accounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
    const updatedAccounts = accounts.map(acc => 
      acc.email === newData.email ? newData : acc
    );
    localStorage.setItem("sanad-accounts", JSON.stringify(updatedAccounts));
  };
  const handleLogout = () => { navigate('/') };
  const activeReportsCount = (guardianData.lostReports || []).filter(r => r.status === 'active').length;
  
  useEffect(() => {
    const latestData = getLatestGuardianData();
    setGuardianData(latestData);
  }, [view]);

  const [dependentLiveLocation, setDependentLiveLocation] = useState(guardianData.location || { lat: 30.0444, lng: 31.2357 });
  const [safeZoneCenter, setSafeZoneCenter] = useState(guardianData.safeZoneCenter || guardianData.location || { lat: 30.0444, lng: 31.2357 });

  // Auto-hide dependent marker when there's an active lost report;
  // when all reports are retrieved, show dependent location and place it inside the safe zone
  useEffect(() => {
    const active = (guardianData.lostReports || []).some(r => r.status === 'active');
    if (active) {
      // only mark as auto-hidden when caused by an active report
      setIsDependentLocationHidden(true);
      setAutoHiddenByReport(true);
      // Don't show toast for missing alert - user will see the red warning banner
    } else {
      // If we previously auto-hidden due to a report, restore marker and location.
      // Do not override a manual hide set by the user.
      if (autoHiddenByReport) {
        const restoredLoc = guardianData.safeZoneCenter || guardianData.location || { lat: 30.0444, lng: 31.2357 };
        setDependentLiveLocation(restoredLoc);

        // persist restored location into accounts so other components see the change
        const accounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
        const updatedAccounts = accounts.map(acc => acc.email === guardianData.email ? { ...acc, location: restoredLoc } : acc);
        localStorage.setItem("sanad-accounts", JSON.stringify(updatedAccounts));

        setIsDependentLocationHidden(false);
        setAutoHiddenByReport(false);
        setToastMsg(t('dependentLocationShown'));
        setShowToast(true);
      }
    }
  }, [guardianData.lostReports]);

  useEffect(() => {
    if (guardianData.safeZoneCenter) {
      setSafeZoneCenter(guardianData.safeZoneCenter);
    }
  }, [guardianData.safeZoneCenter]);

  useEffect(() => {
    if (useTestLocation || isTrackingPaused) return;

    const watchId = navigator.geolocation?.watchPosition(
      (position) => {
        const newLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setDependentLiveLocation(newLoc);
        
        const currentAccounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
        const updatedAccounts = currentAccounts.map(acc => {
          if (acc.email === guardianData.email) {
            return { ...acc, location: newLoc };
          }
          return acc;
        });
        localStorage.setItem("sanad-accounts", JSON.stringify(updatedAccounts));
      },
      (error) => {
        console.log('Geolocation error:', error);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => {
      if (watchId) navigator.geolocation?.clearWatch(watchId);
    };
  }, [useTestLocation, isTrackingPaused, guardianData.email]);

  const currentDependentLocation = useTestLocation ? testLocation : dependentLiveLocation;

  const copyToken = () => {
    navigator.clipboard.writeText(guardianData.token);
    setToastMsg(t('copied'));
    setShowToast(true);
  };

  const handleSafeZoneUpdate = (newLocation) => {
    setSafeZoneCenter(newLocation);
    setShowLocationPicker(false);
    setIsEditingSafeZone(false);
    
    const currentAccounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
    const updatedAccounts = currentAccounts.map(acc => {
      if (acc.email === guardianData.email) {
        return { ...acc, safeZoneCenter: newLocation };
      }
      return acc;
    });
    localStorage.setItem("sanad-accounts", JSON.stringify(updatedAccounts));
    
    const updatedGuardian = { ...guardianData, safeZoneCenter: newLocation };
    setGuardianData(updatedGuardian);
    
    setToastMsg(t('safeZoneUpdated'));
    setShowToast(true);
  };

  const handleTestLocationSet = (newLocation) => {
    setTestLocation(newLocation);
    setUseTestLocation(true);
    localStorage.setItem('sanad-test-location', JSON.stringify(newLocation));
    localStorage.setItem('sanad-use-test-location', 'true');
    setShowTestLocationPicker(false);
    setToastMsg(t('testLocSet'));
    setShowToast(true);
  };

  const resetToActualLocation = () => {
    setUseTestLocation(false);
    setTestLocation(null);
    localStorage.removeItem('sanad-test-location');
    localStorage.setItem('sanad-use-test-location', 'false');
    setToastMsg(t('returnToActual'));
    setShowToast(true);
  };

  const toggleTracking = () => {
    const newPausedState = !isTrackingPaused;
    setIsTrackingPaused(newPausedState);
    localStorage.setItem('sanad-tracking-paused', newPausedState.toString());
    setToastMsg(newPausedState ? t('trackingPaused') : t('trackingResumed'));
    setShowToast(true);
  };

  const toggleDependentLocation = () => {
    const newHiddenState = !isDependentLocationHidden;
    setIsDependentLocationHidden(newHiddenState);
    localStorage.setItem('sanad-dependent-location-hidden', newHiddenState.toString());
    setToastMsg(newHiddenState ? t('dependentLocationCleared') : t('dependentLocationShown'));
    setShowToast(true);
  };

  const distance = calculateDistance(
    currentDependentLocation.lat,
    currentDependentLocation.lng,
    safeZoneCenter.lat,
    safeZoneCenter.lng
  );
  const safeZoneRadius = (guardianData.safeZoneRadius || 500) / 1000;
  // Determine outside state purely by distance vs radius (hidden marker shouldn't force navigation)
  const isOutsideSafeZone = distance > safeZoneRadius;

  // Track previous outside state so we only auto-navigate when the dependent transitions from inside -> outside
  const prevOutsideRef = useState(null);

  useEffect(() => {
    const prev = prevOutsideRef[0];
    if ((prev === false || prev === null) && isOutsideSafeZone && view === 'dashboard') {
      setView('map');
    }
    // update previous value
    prevOutsideRef[1](isOutsideSafeZone);
    // only run when isOutsideSafeZone or view changes
  }, [isOutsideSafeZone, view]);

  useEffect(() => {
    if (view === 'dashboard') setActiveNav('homepage');
    else if (view === 'services') setActiveNav('services');
    else if (view === 'faqs') setActiveNav('faqs');
    else if (view === 'dependent') setActiveNav('dependent');
  }, [view]);

  if (view === "reports") {
    return <LostReportsViewer guardianData={guardianData} onBack={() => setView("dashboard")} onUpdateGuardian={updateGuardianData} />;
  }

  if (view === "services") {
    return (
      <>
        <SideNavbar activeNav={activeNav} setView={setView} setActiveNav={setActiveNav} navigate={navigate} homeRoute={'/home'} />
        <div style={{ marginLeft: isRTL ? 0 : (isSmallScreen ? 0 : '104px'), marginRight: isRTL ? (isSmallScreen ? 0 : '104px') : 0, marginBottom: isSmallScreen ? '64px' : 0, padding: isSmallScreen ? '20px 16px' : '40px 24px', minHeight: '100vh', background: 'var(--ice-blue)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: isSmallScreen ? '24px' : '32px', fontWeight: '700', color: 'var(--ink)', marginBottom: '24px' }}>Services</h1>
            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', borderRadius: '16px', padding: '32px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)' }}>
              <p style={{ fontSize: '16px', color: 'var(--ink-light)', lineHeight: '1.6' }}>
                Our services include real-time location tracking, safe zone monitoring, emergency alerts, and comprehensive reporting features to ensure the safety and well-being of your dependents.
              </p>
              <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'rgba(74,144,164,.1)', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--azure)', marginBottom: '8px' }}>Location Tracking</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>Real-time GPS monitoring with safe zone alerts.</p>
                </div>
                <div style={{ padding: '16px', background: 'rgba(212,117,106,.1)', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--coral)', marginBottom: '8px' }}>Emergency Alerts</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>Instant notifications when dependents leave safe zones.</p>
                </div>
                <div style={{ padding: '16px', background: 'rgba(212,167,106,.1)', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--gold)', marginBottom: '8px' }}>Reporting</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>Comprehensive lost dependent reporting system.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (view === "faqs") {
    return (
      <>
        <SideNavbar activeNav={activeNav} setView={setView} setActiveNav={setActiveNav} navigate={navigate} homeRoute={'/home'} />
        <div style={{ marginLeft: isRTL ? 0 : (isSmallScreen ? 0 : '104px'), marginRight: isRTL ? (isSmallScreen ? 0 : '104px') : 0, marginBottom: isSmallScreen ? '64px' : 0, padding: isSmallScreen ? '20px 16px' : '40px 24px', minHeight: '100vh', background: 'var(--ice-blue)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: isSmallScreen ? '24px' : '32px', fontWeight: '700', color: 'var(--ink)', marginBottom: '24px' }}>Frequently Asked Questions</h1>
            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', borderRadius: '16px', padding: '32px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--azure)', marginBottom: '8px' }}>How does location tracking work?</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-light)', lineHeight: '1.6' }}>
                  Our app uses GPS technology to track the real-time location of your dependents. You can set up safe zones and receive alerts when they leave these areas.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--azure)', marginBottom: '8px' }}>What happens if my dependent gets lost?</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-light)', lineHeight: '1.6' }}>
                  You can immediately report a lost dependent through the app. This triggers our emergency response system and shares location data with authorities if needed.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--azure)', marginBottom: '8px' }}>Is my data secure?</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-light)', lineHeight: '1.6' }}>
                  Yes, we prioritize data security and privacy. All location data is encrypted and only accessible to authorized guardians. We comply with all relevant data protection regulations.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--azure)', marginBottom: '8px' }}>How do I set up safe zones?</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-light)', lineHeight: '1.6' }}>
                  In the dashboard, navigate to the map view and use the location picker to set your safe zone center. You can adjust the radius to define the area you want to monitor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (view === "map") {
    return (
      <>
        {showToast && <Toast msg={toastMsg} onClose={() => setShowToast(false)} />}
        {showLocationPicker && (
          <LocationPicker
            initialLocation={safeZoneCenter}
            onLocationSelected={handleSafeZoneUpdate}
            onCancel={() => {
              setShowLocationPicker(false);
              setIsEditingSafeZone(false);
            }}
          />
        )}
        {showTestLocationPicker && (
          <LocationPicker
            initialLocation={testLocation || currentDependentLocation}
            onLocationSelected={handleTestLocationSet}
            onCancel={() => setShowTestLocationPicker(false)}
            showSafeZone={true}
            safeZoneCenter={safeZoneCenter}
            safeZoneRadius={guardianData.safeZoneRadius || 500}
          />
        )}
        <SideNavbar activeNav={activeNav} setView={setView} setActiveNav={setActiveNav} navigate={navigate} homeRoute={'/home'} />
        <MapView
          guardianData={guardianData}
          dependentLocation={currentDependentLocation}
          safeZoneCenter={safeZoneCenter}
          onBack={() => setView("dashboard")}
          onEditSafeZone={() => {
            setIsEditingSafeZone(true);
            setShowLocationPicker(true);
          }}
          onSetTestLocation={() => setShowTestLocationPicker(true)}
          onResetTestLocation={resetToActualLocation}
          isUsingTestLocation={useTestLocation}
          isTrackingPaused={isTrackingPaused}
          onToggleTracking={toggleTracking}
          isDependentLocationHidden={isDependentLocationHidden}
          onToggleDependentLocation={toggleDependentLocation}
        />
      </>
    );
  }

  return (
    <>
      {showToast && <Toast msg={toastMsg} onClose={() => setShowToast(false)} />}
      {showLocationPicker && (
        <LocationPicker
          initialLocation={safeZoneCenter}
          onLocationSelected={handleSafeZoneUpdate}
          onCancel={() => {
            setShowLocationPicker(false);
            setIsEditingSafeZone(false);
          }}
        />
      )}
      {showTestLocationPicker && (
        <LocationPicker
          initialLocation={testLocation || currentDependentLocation}
          onLocationSelected={handleTestLocationSet}
          onCancel={() => setShowTestLocationPicker(false)}
        />
      )}
      <div style={{display:'flex'}}>
        <SideNavbar activeNav={activeNav} setView={setView} setActiveNav={setActiveNav} navigate={navigate} homeRoute={'/home'} />
        <div style={{flex:1, marginLeft: isRTL ? 0 : (isSmallScreen ? 0 : '104px'), marginRight: isRTL ? (isSmallScreen ? 0 : '104px') : 0, marginBottom: isSmallScreen ? '64px' : 0}}>
          <DashboardView
            guardianData={guardianData}
            dependentLocation={currentDependentLocation}
            safeZoneCenter={safeZoneCenter}
            onLogout={handleLogout}
            onViewMap={() => setView("map")}
            onCopyToken={copyToken}
            onEditSafeZone={() => {
              setIsEditingSafeZone(true);
              setShowLocationPicker(true);
            }}
            onViewProfile={() => setShowProfile(true)}
            onManageDependents={() => setShowManageDependents(true)}
            isOutsideSafeZone={isOutsideSafeZone}
            isUsingTestLocation={useTestLocation}
            activeReportsCount={activeReportsCount}
            onViewReports={() => setView("reports")}
            isDependentLocationHidden={isDependentLocationHidden}
            showProfile={showProfile}
            setShowProfile={setShowProfile}
            showManageDependents={showManageDependents}
            setShowManageDependents={setShowManageDependents}
            updateGuardianData={updateGuardianData}
          />
        </div>
      </div>
    </>
  );
}
