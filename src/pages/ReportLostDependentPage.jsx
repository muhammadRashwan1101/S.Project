import { useState, useRef } from "react";
import { useLang } from "../context/LanguageContext";
import { LangSwitch } from "../components/UI/LangSwitch";
import { Toast } from "../components/UI/Toast";
import { UploadIcon, XIcon, CheckIcon } from "../components/UI/Icons";
import { accountsDB, lostReportsDB, saveLostReportsDB, saveAccountsDB } from "../utils/dataStore";
import { matchImage, getDeviceInfo } from "../utils/helpers";

export function ReportLostDependentPage({ onBack }) {
  const { t } = useLang();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setUploadedImage(base64);
        setImagePreview(base64);
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
      const currentLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      setLocation(currentLocation);

      let matchedAccount = null;
      console.log('Checking for image match. Uploaded image length:', uploadedImage?.length);
      console.log('Number of guardian accounts with photos:', accountsDB.filter(acc => acc.role === 'guardian' && (acc.dependent?.photo || acc.dependent?.photos)).length);
      
      for (const acc of accountsDB) {
        if (acc.role === 'guardian') {
          const photosToCheck = acc.dependent?.photos || (acc.dependent?.photo ? [acc.dependent.photo] : null);
          if (photosToCheck) {
            console.log(`Checking guardian ${acc.email}, dependent has ${Array.isArray(photosToCheck) ? photosToCheck.length : 1} photo(s)`);
            if (matchImage(uploadedImage, photosToCheck)) {
              console.log('Match found with dependent:', acc.dependent.fullName);
              matchedAccount = acc;
              break;
            }
          }
        }
      }
      
      if (!matchedAccount) {
        console.log('No match found in database');
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
          // Store metadata (without image) to save space
          const reportMetadata = {
            id: report.id,
            dependentName: report.dependentName,
            dependentId: report.dependentId,
            reportedAt: report.reportedAt,
            location: report.location,
            deviceInfo: report.deviceInfo,
            status: report.status,
            retrievedAt: report.retrievedAt
          };
          accountsDB[guardianIndex].lostReports.push(reportMetadata);
          saveAccountsDB();
        }

        setMatchResult('match');
        setSubmitted(true);
      } else {
        setMatchResult('no-match');
      }
    } catch (error) {
      console.error('Location error:', error);
      alert('Unable to get location. Please enable location services.');
    }

    setIsSubmitting(false);
  };

  if (submitted && matchResult === 'match') {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
        <div className="mesh-bg" /><div className="texture-overlay" />
        <LangSwitch />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, textAlign: "center" }}>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,#4ade80,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 6px 28px rgba(76,175,80,.3)", color: "#fff" }}>
              <CheckIcon />
            </div>
            <h2 style={{ fontSize: 24, marginBottom: 12, color: "#16a34a" }}>{t('reportSubmitted')}</h2>
            <p style={{ color: "var(--ink-muted)", marginBottom: 24 }}>{t('imageMatches')}</p>
            {location && (
              <div style={{ background: "rgba(74,144,164,.1)", borderRadius: 12, padding: 16, marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: "var(--ink)" }}>
                  <strong>{t('lastSeenLocation')}:</strong><br />
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              </div>
            )}
            <button className="btn-primary" onClick={onBack}>
              {t('back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (matchResult === 'no-match') {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
        <div className="mesh-bg" /><div className="texture-overlay" />
        <LangSwitch />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, textAlign: "center" }}>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,#d4756a,#c0635a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 6px 28px rgba(212,117,106,.3)", color: "#fff" }}>
              <XIcon />
            </div>
            <h2 style={{ fontSize: 24, marginBottom: 12, color: "var(--coral)" }}>{t('noMatch')}</h2>
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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,.9)", border: "1px solid rgba(0,0,0,.1)", borderRadius: 12, padding: "10px 20px", marginBottom: 20, cursor: "pointer", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          ← {t('back')}
        </button>
        
        <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h2 style={{ fontSize: 24, marginBottom: 8 }}>{t('reportLost')}</h2>
          <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 24 }}>{t('reportLostDesc')}</p>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: "var(--ink)" }}>
              {t('uploadImage')}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <button
              className="btn-secondary"
              onClick={() => fileInputRef.current?.click()}
              style={{ 
                marginBottom: 12, 
                padding: "10px 16px", 
                fontSize: 15, 
                whiteSpace: "nowrap",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
                border: "none",
                overflow: "visible"
              }}
            >
              📤 {t('uploadPhoto')}
            </button>

            {imagePreview && (
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <img src={imagePreview} alt="Preview" className="photo-preview" />
              </div>
            )}
          </div>

          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!uploadedImage || isSubmitting}
            style={{ opacity: (!uploadedImage || isSubmitting) ? 0.5 : 1 }}
          >
            {isSubmitting ? t('sharingLocation') : t('submitReport')}
          </button>
        </div>
      </div>
    </div>
  );
}
