import { useState, useEffect } from "react";
import { useLang } from "../../context/LanguageContext";
import { Toast } from "../../components/UI/Toast";
import { calculateDistance } from "../../utils/helpers";
import LostReportsViewer from "../../modals/LostReportsViewer";
import LocationPicker from "../../components/LocationPicker";
import DashboardView from "./DashboardView";
import MapView from "./MapView";
import {ProfileModal} from "../../modals/ProfileModal";
import {ManageDependentsModal} from "../../modals/ManageDependentsModal";

export default function HomePage({ guardianData: initialGuardianData, onLogout }) {
  const { t } = useLang();
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
      setToastMsg(t('dependentMissingAlert'));
      setShowToast(true);
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

  if (view === "reports") {
    return <LostReportsViewer guardianData={guardianData} onBack={() => setView("dashboard")} onUpdateGuardian={updateGuardianData} />;
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
      <DashboardView
        guardianData={guardianData}
        dependentLocation={currentDependentLocation}
        safeZoneCenter={safeZoneCenter}
        onLogout={onLogout}
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
    </>
  );
}
