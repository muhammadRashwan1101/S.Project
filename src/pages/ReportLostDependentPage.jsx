import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { useResponsive } from "../hooks/useResponsive";
import { SettingsSwitches } from "../components/UI/SettingsSwitches";
import { UploadIcon, XIcon, CheckIcon } from "../components/UI/Icons";
import { accountsDB, lostReportsDB, saveLostReportsDB, saveAccountsDB } from "../utils/dataStore";
import { matchImage, getDeviceInfo } from "../utils/helpers";
import LandingLogo from "../components/LandingLogo";

export function ReportLostDependentPage({ onBack }) {
  const navigate = useNavigate();
  const { t } = useLang();
  const { isMobile } = useResponsive();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedImage) {
      alert('Please upload an image first');
      return;
    }

    setIsSubmitting(true);

    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const currentLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setLocation(currentLocation);

      let matchedAccount = null;
      for (const acc of accountsDB) {
        if (acc.role === 'guardian') {
          const photosToCheck = acc.dependent?.photos || (acc.dependent?.photo ? [acc.dependent.photo] : null);
          if (photosToCheck && matchImage(uploadedImage, photosToCheck)) {
            matchedAccount = acc;
            break;
          }
        }
      }

      if (matchedAccount) {
        const report = {
          id: `report-${Date.now()}`,
          dependentName: matchedAccount.dependent.fullName,
          dependentId: matchedAccount.dependent.nationalId,
          guardianEmail: matchedAccount.email,
          reportedAt: new Date().toISOString(),
          location: currentLocation,
          image: uploadedImage,
          deviceInfo: getDeviceInfo(),
          status: 'active',
          retrievedAt: null
        };

        lostReportsDB.push(report);
        saveLostReportsDB();

        const guardianIndex = accountsDB.findIndex(acc => acc.email === matchedAccount.email);
        if (guardianIndex !== -1) {
          accountsDB[guardianIndex].lostReports = accountsDB[guardianIndex].lostReports || [];
          accountsDB[guardianIndex].lostReports.push({
            id: report.id,
            dependentName: report.dependentName,
            dependentId: report.dependentId,
            reportedAt: report.reportedAt,
            location: report.location,
            deviceInfo: report.deviceInfo,
            status: report.status,
            retrievedAt: report.retrievedAt
          });
          saveAccountsDB();
        }

        setMatchResult('match');
        setSubmitted(true);
      } else {
        setMatchResult('no-match');
      }
    } catch (error) {
      alert('Unable to get location. Please enable location services.');
    }

    setIsSubmitting(false);
  };

  if (submitted && matchResult === 'match') {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? 16 : 24 }}>
        <div className="mesh-bg" /><div className="texture-overlay" />
        <SettingsSwitches />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, textAlign: "center" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}><LandingLogo /></div>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: isMobile ? 16 : 20, padding: isMobile ? 24 : 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,#4ade80,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 6px 28px rgba(76,175,80,.3)", color: "#fff" }}>
              <CheckIcon />
            </div>
            <h2 style={{ fontSize: isMobile ? 20 : 24, marginBottom: 12, color: "#16a34a" }}>{t('reportSubmitted')}</h2>
            <p style={{ color: "var(--ink-muted)", marginBottom: 24 }}>{t('imageMatches')}</p>
            {location && (
              <div style={{ background: "rgba(74,144,164,.1)", borderRadius: 12, padding: 16, marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: "var(--ink)" }}>
                  <strong>{t('lastSeenLocation')}:</strong><br />
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              </div>
            )}
            <button className="btn-primary" onClick={() => navigate('/')}>{t('back')}</button>
          </div>
        </div>
      </div>
    );
  }

  if (matchResult === 'no-match') {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? 16 : 24 }}>
        <div className="mesh-bg" /><div className="texture-overlay" />
        <SettingsSwitches />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, textAlign: "center" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}><LandingLogo /></div>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: isMobile ? 16 : 20, padding: isMobile ? 24 : 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,#d4756a,#c0635a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 6px 28px rgba(212,117,106,.3)", color: "#fff" }}>
              <XIcon />
            </div>
            <h2 style={{ fontSize: isMobile ? 20 : 24, marginBottom: 12, color: "var(--coral)" }}>{t('noMatch')}</h2>
            <p style={{ color: "var(--ink-muted)", marginBottom: 24 }}>{t('imageNoMatch')}</p>
            <button className="btn-primary" onClick={() => { setMatchResult(null); setUploadedImage(null); setImagePreview(null); }}>
              {t('back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? 16 : 24 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <SettingsSwitches />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}><LandingLogo /></div>
        <button onClick={() => navigate('/')} style={{ background: "transparent", border: "none", color: "var(--azure)", fontSize: isMobile ? 13 : 14, fontWeight: 600, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
          ← {t('back')}
        </button>
        
        <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: isMobile ? 16 : 20, padding: isMobile ? 24 : 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h2 style={{ fontSize: isMobile ? 20 : 24, marginBottom: 8 }}>{t('reportLost')}</h2>
          <p style={{ fontSize: isMobile ? 13 : 14, color: "var(--ink-muted)", marginBottom: 24 }}>{t('reportLostDesc')}</p>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: isMobile ? 13 : 14, fontWeight: 600, marginBottom: 8, color: "var(--ink)" }}>
              {t('uploadImage')}
            </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="file-upload" />
            <label htmlFor="file-upload" className="btn-secondary" style={{ marginBottom: 12, padding: "10px 16px", fontSize: isMobile ? 13 : 15, whiteSpace: "nowrap", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", border: "none" }}>
              <UploadIcon /> {t('uploadPhoto')}
            </label>

            {imagePreview && (
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <img src={imagePreview} alt="Preview" className="photo-preview" />
              </div>
            )}
          </div>

          <button className="btn-primary" onClick={handleSubmit} disabled={!uploadedImage || isSubmitting} style={{ opacity: (!uploadedImage || isSubmitting) ? 0.5 : 1 }}>
            {isSubmitting ? t('sharingLocation') : t('submitReport')}
          </button>
        </div>
      </div>
    </div>
  );
}
