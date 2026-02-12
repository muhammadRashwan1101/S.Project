import { useState, useEffect, useRef } from "react";
import { useLang } from "../../context/LanguageContext";
import { LangSwitch } from "../../components/UI/LangSwitch";
import { EditIcon, NavigationIcon, AlertIcon, MapPinIcon, PlayIcon, PauseIcon, EyeIcon, EyeOffIcon, RotateCcwIcon } from "../../components/UI/Icons";
import { calculateDistance } from "../../utils/helpers";
import { saveSession } from "../../utils/sessionManager";

export default function MapView({ guardianData, dependentLocation, safeZoneCenter, onBack, onEditSafeZone, onSetTestLocation, onResetTestLocation, isUsingTestLocation, isTrackingPaused, onToggleTracking, isDependentLocationHidden, onToggleDependentLocation }) {
  const { t } = useLang();
  const mapRef = useRef(null);
  const circleRef = useRef(null);
  const centerMarkerRef = useRef(null);
  const dependentMarkerRef = useRef(null);
  const [radius, setRadius] = useState(guardianData.safeZoneRadius || 500);
  const [prevOutsideState, setPrevOutsideState] = useState(false);

  const distance = calculateDistance(dependentLocation.lat, dependentLocation.lng, safeZoneCenter.lat, safeZoneCenter.lng);
  const isOutside = distance > (radius / 1000) || isDependentLocationHidden;

  useEffect(() => {
    if (radius !== guardianData.safeZoneRadius) {
      const accounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
      const updatedAccounts = accounts.map(acc => acc.email === guardianData.email ? { ...acc, safeZoneRadius: radius } : acc);
      localStorage.setItem("sanad-accounts", JSON.stringify(updatedAccounts));
      const updatedGuardian = updatedAccounts.find(acc => acc.email === guardianData.email);
      if (updatedGuardian) saveSession(updatedGuardian);
    }
  }, [radius, guardianData.email, guardianData.safeZoneRadius]);

  useEffect(() => {
    if (isOutside && !prevOutsideState) {
      if (isDependentLocationHidden) {
        console.log("ALERT: Dependent location hidden - cannot track!", { reason: "marker_hidden", timestamp: new Date().toISOString() });
      } else {
        console.log("ALERT: Dependent left safe zone!", { reason: "zone_breach", distance: distance.toFixed(3), radius: (radius / 1000).toFixed(3), timestamp: new Date().toISOString() });
      }
    }
    setPrevOutsideState(isOutside);
  }, [isOutside, isDependentLocationHidden]);

  useEffect(() => {
    const initMap = () => {
      if (typeof window === 'undefined' || !window.L) {
        setTimeout(initMap, 100);
        return;
      }

      const L = window.L;

      const existingMap = document.getElementById('live-map');
      if (existingMap) existingMap.innerHTML = '';

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map('live-map').setView([safeZoneCenter.lat, safeZoneCenter.lng], 14);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map);

      const circle = L.circle([safeZoneCenter.lat, safeZoneCenter.lng], { color: '#4a90a4', fillColor: '#4a90a4', fillOpacity: 0.15, radius }).addTo(map);
      circleRef.current = circle;

      const centerMarker = L.marker([safeZoneCenter.lat, safeZoneCenter.lng], { icon: L.divIcon({ className: 'custom-marker', html: '<div style="background:#4a90a4;width:16px;height:16px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>', iconSize: [16, 16] }) }).addTo(map).bindPopup(`<b>${t('curLoc')} (Center)</b>`);
      centerMarkerRef.current = centerMarker;

      if (!isDependentLocationHidden) {
        const dependentMarker = L.marker([dependentLocation.lat, dependentLocation.lng], { icon: L.divIcon({ className: 'custom-marker', html: '<div style="background:#d4756a;width:20px;height:20px;border-radius:50%;border:4px solid #fff;box-shadow:0 3px 12px rgba(212,117,106,.5)"></div>', iconSize: [20, 20] }) }).addTo(map).bindPopup(`<b>${guardianData.dependent?.fullName || 'Dependent'}</b><br/>${t('curLoc')}`);
        dependentMarkerRef.current = dependentMarker;
      } else {
        dependentMarkerRef.current = null;
      }

      const activeReports = (guardianData.lostReports || []).filter(r => r.status === 'active');
      activeReports.forEach(report => {
        window.L.marker([report.location.lat, report.location.lng], { icon: window.L.divIcon({ className: 'lost-report-marker', html: '<div style="width:32px;height:32px;background:#ff6b6b;border-radius:50%;border:3px solid white;box-shadow:0 2px 12px rgba(255,107,107,.5);display:flex;align-items:center;justify-content:center;font-size:18px;">🚨</div>', iconSize: [32, 32], iconAnchor: [16, 16] }) }).addTo(map).bindPopup(`
          <div style="padding:8px;">
            <strong>${t('reportedAt')}:</strong><br/>
            ${new Date(report.reportedAt).toLocaleString()}<br/><br/>
            <strong>${t('lastSeenLocation')}</strong>
          </div>
        `);
      });
    };
    initMap();

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
      circleRef.current = null; centerMarkerRef.current = null; dependentMarkerRef.current = null;
    };
  }, [safeZoneCenter]);

  useEffect(() => {
    if (circleRef.current && mapRef.current) {
      circleRef.current.setRadius(radius);
      mapRef.current.fitBounds(circleRef.current.getBounds(), { padding: [50, 50] });
    }
  }, [radius]);

  useEffect(() => {
    if (dependentMarkerRef.current) {
      dependentMarkerRef.current.setLatLng([dependentLocation.lat, dependentLocation.lng]);
    }
  }, [dependentLocation]);

  useEffect(() => {
    if (!mapRef.current) return;
    const L = window.L; if (!L) return;
    if (isDependentLocationHidden && dependentMarkerRef.current) { mapRef.current.removeLayer(dependentMarkerRef.current); dependentMarkerRef.current = null; }
    else if (!isDependentLocationHidden && !dependentMarkerRef.current) {
      const dependentMarker = L.marker([dependentLocation.lat, dependentLocation.lng], { icon: L.divIcon({ className: 'custom-marker', html: '<div style="background:#d4756a;width:20px;height:20px;border-radius:50%;border:4px solid #fff;box-shadow:0 3px 12px rgba(212,117,106,.5)"></div>', iconSize: [20,20] }) }).addTo(mapRef.current).bindPopup(`<b>${guardianData.dependent?.fullName || 'Dependent'}</b><br/>${t('curLoc')}`);
      dependentMarkerRef.current = dependentMarker;
    }
  }, [isDependentLocationHidden, dependentLocation, guardianData.dependent]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ice-blue)", position: "relative" }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: window.innerWidth <= 768 ? 16 : 24 }}>
        <button onClick={onBack} style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", border: "1.5px solid rgba(255,255,255,.6)", borderRadius: 10, padding: window.innerWidth <= 480 ? "8px 16px" : "10px 20px", fontSize: window.innerWidth <= 480 ? 13 : 14, fontWeight: 600, color: "var(--azure)", cursor: "pointer", marginBottom: 20, boxShadow: "var(--shadow)" }}>
          ← {t('backDash')}
        </button>

        {isOutside && guardianData.dependent && (
          <div className="fade-up alert-pulse" style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", color: "#fff", padding: window.innerWidth <= 480 ? 16 : 20, borderRadius: window.innerWidth <= 480 ? 12 : 16, marginBottom: 20, boxShadow: "0 8px 32px rgba(220, 38, 38, 0.4)", border: "2px solid #fca5a5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: window.innerWidth <= 480 ? 12 : 16 }}>
              <div style={{ fontSize: window.innerWidth <= 480 ? 32 : 40 }}><AlertIcon /></div>
              <div>
                <h3 style={{ fontSize: window.innerWidth <= 480 ? 15 : 18, fontWeight: 700, marginBottom: 4 }}>{isDependentLocationHidden ? t('dependentUntrackable') : t('alertTitle')}</h3>
                <p style={{ fontSize: window.innerWidth <= 480 ? 12 : 13, opacity: 0.95 }}>{guardianData.dependent.fullName} {isDependentLocationHidden ? t('dependentMissingAlert') : t('alertSub').toLowerCase()}</p>
              </div>
            </div>
          </div>
        )}

        {isUsingTestLocation && (
          <div style={{ background: "var(--azure-pale)", color: "var(--azure-dark)", padding: window.innerWidth <= 480 ? 12 : 16, borderRadius: 12, marginBottom: 20, fontSize: window.innerWidth <= 480 ? 12 : 14, display: "flex", flexDirection: window.innerWidth <= 480 ? "column" : "row", alignItems: window.innerWidth <= 480 ? "stretch" : "center", justifyContent: "space-between", gap: window.innerWidth <= 480 ? 12 : 0 }}>
            <AlertIcon /> {t('usingTestLoc')}
            <button className="btn-primary btn-coral" onClick={onResetTestLocation} style={{ width: window.innerWidth <= 480 ? "100%" : "auto", padding: "8px 16px", fontSize: 13 }}>{t('resetToActual')}</button>
          </div>
        )}

        {isTrackingPaused && (
          <div style={{ background: "#fef3c7", color: "#92400e", padding: window.innerWidth <= 480 ? 12 : 16, borderRadius: 12, marginBottom: 20, fontSize: window.innerWidth <= 480 ? 12 : 14, border: "2px solid #fbbf24" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <PauseIcon />
              <strong>{t('demoMode')}</strong>
            </div>
            <p style={{ fontSize: window.innerWidth <= 480 ? 11 : 12, opacity: 0.9 }}>{t('trackingPausedNote')}</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth <= 1024 ? "1fr" : "1fr 320px", gap: 20 }}>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <div style={{ padding: window.innerWidth <= 480 ? 16 : 20, borderBottom: "1px solid rgba(74,144,164,.15)" }}>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: window.innerWidth <= 480 ? 18 : 22, fontWeight: 600 }}>{t('liveTrack')}</h2>
              <p style={{ fontSize: window.innerWidth <= 480 ? 12 : 13, color: "var(--ink-muted)", marginTop: 4 }}>{t('monPat')}</p>
            </div>
            <div id="live-map" style={{ height: window.innerWidth <= 768 ? 350 : 500 }}></div>
          </div>

          <div className="fade-up fade-up-d1">
            <div style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: window.innerWidth <= 480 ? 16 : 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", marginBottom: 16 }}>
              <h3 style={{ fontSize: window.innerWidth <= 480 ? 14 : 16, fontWeight: 600, marginBottom: 16 }}>{t('radius')}</h3>
              <input type="range" min="100" max="2000" step="50" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} style={{ width: "100%", marginBottom: 12 }} />
              <div style={{ fontSize: window.innerWidth <= 480 ? 20 : 24, fontWeight: 700, color: "var(--azure)", textAlign: "center", marginBottom: 16 }}>{radius >= 1000 ? `${(radius / 1000).toFixed(1)} km` : `${radius} m`}</div>

              <div style={{ padding: window.innerWidth <= 480 ? 12 : 16, background: isOutside ? "rgba(212,117,106,.1)" : "rgba(74,222,128,.1)", borderRadius: 12, border: `2px solid ${isOutside ? "var(--coral)" : "#4ade80"}`, textAlign: "center" }}>
                <div style={{ fontSize: window.innerWidth <= 480 ? 13 : 14, fontWeight: 600, color: isOutside ? "var(--coral)" : "#16a34a", marginBottom: 4 }}>{isOutside ? t('outZone') : t('inZone')}</div>
                <div style={{ fontSize: window.innerWidth <= 480 ? 11 : 12, color: "var(--ink-muted)" }}>{t('dist')}: {(distance * 1000).toFixed(0)}m</div>
              </div>
            </div>

            <div style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: window.innerWidth <= 480 ? 16 : 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", marginBottom: 16 }}>
              <h3 style={{ fontSize: window.innerWidth <= 480 ? 14 : 16, fontWeight: 600, marginBottom: 12 }}>{t('quickAct')}</h3>
              <button className="btn-primary" onClick={onEditSafeZone} style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}>
                <EditIcon /> {t('editSafeZone')}
              </button>
              <button className="btn-primary btn-secondary" onClick={onSetTestLocation} style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}><MapPinIcon /> {t('setTestLoc')}</button>
              {isUsingTestLocation && (<button className="btn-primary btn-coral" onClick={onResetTestLocation} style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}><RotateCcwIcon /> {t('resetToActual')}</button>)}
              <div style={{ borderTop: "1px solid rgba(74,144,164,.15)", paddingTop: 12, marginTop: 4, marginBottom: 12 }}>
                <button className={`btn-primary ${isTrackingPaused ? 'btn-secondary' : 'btn-coral'}`} onClick={onToggleTracking} style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}>{isTrackingPaused ? <PlayIcon /> : <PauseIcon />} {isTrackingPaused ? t('resumeTracking') : t('pauseTracking')}</button>
                <button className={`btn-primary ${isDependentLocationHidden ? 'btn-secondary' : 'btn-coral'}`} onClick={onToggleDependentLocation} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}>{isDependentLocationHidden ? <EyeIcon /> : <EyeOffIcon />} {isDependentLocationHidden ? t('showDependentLocation') : t('clearDependentLocation')}</button>
              </div>
            </div>

            <div style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: window.innerWidth <= 480 ? 16 : 20, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
              <h3 style={{ fontSize: window.innerWidth <= 480 ? 13 : 14, fontWeight: 600, marginBottom: 12, color: "var(--azure)" }}>{t('how')}</h3>
              <ul style={{ fontSize: window.innerWidth <= 480 ? 11 : 12, lineHeight: 1.8, color: "var(--ink-light)", paddingLeft: 20 }}>
                <li>{t('tip1')}</li>
                <li>{t('tip2')}</li>
                <li>{t('tip3')}</li>
                <li>{t('tip4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
