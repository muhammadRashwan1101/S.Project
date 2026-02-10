import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../context/LanguageContext";
import { LangSwitch } from "../../components/UI/LangSwitch";
import RoleSelectionPage from "./RoleSelectionPage";
import LocationPicker from "../../components/LocationPicker";
import { MapPinIcon } from "../../components/UI/Icons";
import PhotoUploader from "../../components/PhotoUploader";
import { accountsDB, saveAccountsDB } from "../../utils/dataStore";
import { saveSession } from "../../utils/sessionManager";
import Logo from "../../components/Logo";

export function SignUpPage() {
  const navigate = useNavigate();
  const { t } = useLang();

  const handleBack = () => navigate('/');
  const handleSwitchToLogin = () => navigate('/login');
  const [role, setRole] = useState(null);
  const [showRoleSelection, setShowRoleSelection] = useState(true);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationAddress, setLocationAddress] = useState('');
  const [dependentPhotos, setDependentPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = [...dependentPhotos];
      const newPreviews = [...photoPreviews];
      
      for (let i = 0; i < files.length && newPhotos.length < 5; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          newPhotos.push(base64);
          newPreviews.push(base64);
          
          if (newPhotos.length <= 5) {
            setDependentPhotos([...newPhotos]);
            setPhotoPreviews([...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  const removePhoto = (index) => {
    const newPhotos = dependentPhotos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    setDependentPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  const [guardianForm, setGuardianForm] = useState({
    email: "", password: "", confirmPassword: "", fullName: "", nationalId: "", phone: "", address: ""
  });
  const [dependentForm, setDependentForm] = useState({
    fullName: "", nationalId: "", email: "", phone: "", address: "", guardianEmail: "", guardianToken: "", password: ""
  });
  const [err, setErr] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isExistingDependent, setIsExistingDependent] = useState(false);
  const [existingDependentData, setExistingDependentData] = useState(null);

  const verifyToken = () => {
    if (!dependentForm.guardianToken) {
      setErr(t('err4'));
      return;
    }

    const existingDep = accountsDB.find(acc => 
      acc && acc.role === 'dependent' && acc.token && dependentForm.guardianToken && acc.token === dependentForm.guardianToken
    );

    if (existingDep) {
      setIsExistingDependent(true);
      setExistingDependentData(existingDep);
      setTokenVerified(true);
      setErr("");
      setDependentForm({
        ...dependentForm,
        fullName: existingDep.fullName,
        nationalId: existingDep.nationalId,
        phone: existingDep.phone
      });
    } else {
      const guardian = accountsDB.find(acc => 
        acc && acc.role === 'guardian' && acc.token && dependentForm.guardianToken && acc.token === dependentForm.guardianToken
      );
      
      if (guardian) {
        setIsExistingDependent(false);
        setExistingDependentData(null);
        setTokenVerified(true);
        setErr("");
        setDependentForm({ ...dependentForm, guardianEmail: guardian.email });
      } else {
        setErr(t('err4'));
        setTokenVerified(false);
      }
    }
  };

  if (showRoleSelection) {
    return (
      <RoleSelectionPage
        onRoleSelected={(selectedRole) => {
          setRole(selectedRole);
          setShowRoleSelection(false);
        }}
        onBack={handleBack}
      />
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (role === "guardian") {
      if (!guardianForm.email || !guardianForm.password || !guardianForm.fullName || !guardianForm.nationalId || !guardianForm.phone || !selectedLocation) {
        setErr(t('err1'));
        return;
      }
      if (guardianForm.password !== guardianForm.confirmPassword) {
        setErr(t('err3'));
        return;
      }

      const token = `LINK-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const newAccount = {
        email: guardianForm.email,
        password: guardianForm.password,
        role: "guardian",
        fullName: guardianForm.fullName,
        nationalId: guardianForm.nationalId,
        phone: guardianForm.phone,
        address: locationAddress || `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`,
        dependent: null,
        location: selectedLocation,
        safeZoneCenter: selectedLocation,
        safeZoneRadius: 500,
        token
      };

      accountsDB.push(newAccount);
      saveAccountsDB();
      saveSession(newAccount);
      navigate('/token');
    } else {
      if (!dependentForm.guardianToken) {
        setErr(t('err2'));
        return;
      }

      const existingDependent = accountsDB.find(acc => 
        acc && acc.role === 'dependent' && acc.token && dependentForm.guardianToken && acc.token === dependentForm.guardianToken
      );

      if (existingDependent) {
        if (!dependentForm.email || !dependentForm.password) {
          setErr(t('err5'));
          return;
        }

        const depIndex = accountsDB.findIndex(acc => acc.id === existingDependent.id);
        if (depIndex !== -1) {
          accountsDB[depIndex] = {
            ...existingDependent,
            email: dependentForm.email,
            password: dependentForm.password,
            isLinked: true
          };

          const guardianIndex = accountsDB.findIndex(acc => 
            acc && acc.role === 'guardian' && acc.token && existingDependent.guardianToken && acc.token === existingDependent.guardianToken
          );
          
          if (guardianIndex !== -1) {
            accountsDB[guardianIndex].dependent = accountsDB[depIndex];
            saveAccountsDB();
            saveSession(accountsDB[depIndex]);
            navigate('/dependent-home');
          }
        }
      } else {
        if (!dependentForm.fullName || !dependentForm.nationalId || !dependentForm.email || !dependentForm.phone || !dependentForm.guardianEmail) {
          setErr(t('err2'));
          return;
        }

        const guardianIndex = accountsDB.findIndex(acc => acc && acc.role === "guardian" && acc.email === dependentForm.guardianEmail && acc.token && dependentForm.guardianToken && acc.token === dependentForm.guardianToken);
        if (guardianIndex === -1) {
          setErr(t('err4'));
          return;
        }

        const guardian = accountsDB[guardianIndex];

        const newDependent = {
          email: dependentForm.email,
          password: dependentForm.password || "dependent123",
          role: "dependent",
          fullName: dependentForm.fullName,
          nationalId: dependentForm.nationalId,
          phone: dependentForm.phone,
          linkedToken: dependentForm.guardianToken,
          photos: dependentPhotos,
          isLinked: true
        };

        accountsDB[guardianIndex] = {
          ...guardian,
          dependent: {
            fullName: dependentForm.fullName,
            nationalId: dependentForm.nationalId,
            email: dependentForm.email,
            phone: dependentForm.phone,
            address: guardian.address,
            photos: dependentPhotos
          }
        };

        accountsDB.push(newDependent);
        saveAccountsDB();
        saveSession(newDependent);
        navigate('/dependent-home');
      }
    }
  };

  return (
    <>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: window.innerWidth <= 480 ? 16 : 24, paddingTop: window.innerWidth <= 480 ? 140 : 160, paddingBottom: window.innerWidth <= 480 ? 60 : 80 }}>
        <div className="mesh-bg" /><div className="texture-overlay" />
        <LangSwitch />

      {showLocationPicker && (
        <LocationPicker
          initialLocation={selectedLocation}
          onLocationSelected={(loc, addr) => {
            setSelectedLocation(loc);
            setLocationAddress(addr);
            setShowLocationPicker(false);
          }}
          onCancel={() => setShowLocationPicker(false)}
        />
      )}

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <Logo width={60} height={60} />
          </div>
          <h1 className="appName" style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>
            {t('app')}
          </h1>
        </div>
        <button onClick={() => setShowRoleSelection(true)} style={{ background: "transparent", border: "none", color: "var(--azure)", fontSize: window.innerWidth <= 480 ? 13 : 14, fontWeight: 600, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
          ← {t('back')}
        </button>

        <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: window.innerWidth <= 480 ? 16 : 20, padding: window.innerWidth <= 480 ? 24 : 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: window.innerWidth <= 480 ? 20 : 24, fontWeight: 600, marginBottom: 8 }}>
            {role === "guardian" ? `${t('create')} - ${t('guard')}` : `${t('create')} - ${t('pat')}`}
          </h2>
          <p style={{ fontSize: window.innerWidth <= 480 ? 13 : 14, color: "var(--ink-muted)", marginBottom: 24 }}>{t('join')}</p>

          {err && <div style={{ background: "rgba(212,117,106,.1)", color: "var(--coral)", padding: 12, borderRadius: 10, fontSize: window.innerWidth <= 480 ? 12 : 13, marginBottom: 16 }}>{err}</div>}

          <form onSubmit={handleSubmit}>
            {role === "guardian" && (
              <>
                <input className="input-base" type="email" placeholder={t('email')} value={guardianForm.email} onChange={(e) => setGuardianForm({ ...guardianForm, email: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="password" placeholder={t('pass')} value={guardianForm.password} onChange={(e) => setGuardianForm({ ...guardianForm, password: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="password" placeholder={t('confirmPass')} value={guardianForm.confirmPassword} onChange={(e) => setGuardianForm({ ...guardianForm, confirmPassword: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="text" placeholder={t('name')} value={guardianForm.fullName} onChange={(e) => setGuardianForm({ ...guardianForm, fullName: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="text" placeholder={t('natId')} value={guardianForm.nationalId} onChange={(e) => setGuardianForm({ ...guardianForm, nationalId: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="tel" placeholder={t('phone')} value={guardianForm.phone} onChange={(e) => setGuardianForm({ ...guardianForm, phone: e.target.value })} style={{ marginBottom: 12 }} required />

                <div style={{ marginBottom: 12 }}>
                  <button 
                    type="button"
                    className="btn-primary btn-secondary" 
                    onClick={() => setShowLocationPicker(true)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}
                  >
                    <MapPinIcon />
                    {selectedLocation ? t('editSafeZone') : t('chooseLocation')}
                  </button>
                  {selectedLocation && (
                    <div style={{ marginTop: 8, fontSize: window.innerWidth <= 480 ? 11 : 12, color: "var(--ink-muted)", background: "var(--azure-pale)", padding: 8, borderRadius: 6, wordBreak: "break-all" }}>
                      📍 {locationAddress || `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`}
                    </div>
                  )}
                </div>
              </>
            )}

            {role === "dependent" && (
              <>
                {!tokenVerified ? (
                  <>
                    <div style={{ background: 'var(--azure-pale)', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 14 }}>
                      <p style={{ marginBottom: 8 }}>
                        <strong>{t('guardToken')}</strong>
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                        {t('tokenMessage')}
                      </p>
                    </div>
                    <input 
                      className="input-base" 
                      type="text" 
                      placeholder={t('guardToken')} 
                      value={dependentForm.guardianToken} 
                      onChange={(e) => setDependentForm({ ...dependentForm, guardianToken: e.target.value })} 
                      style={{ marginBottom: 12 }}
                    />
                    <button 
                      type="button" 
                      className="btn-primary" 
                      onClick={verifyToken}
                      style={{ marginTop: 12 }}
                    >
                      {t('continue')}
                    </button>
                  </>
                ) : isExistingDependent ? (
                  <>
                    <div style={{ background: 'var(--azure-pale)', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 14 }}>
                      <p style={{ marginBottom: 8 }}>
                        <strong>✓ Account Found!</strong>
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 8 }}>
                        {existingDependentData?.fullName}
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                        Create your login credentials to link this account
                      </p>
                    </div>
                    <input 
                      className="input-base" 
                      type="email" 
                      placeholder={t('email')} 
                      value={dependentForm.email} 
                      onChange={(e) => setDependentForm({ ...dependentForm, email: e.target.value })} 
                      style={{ marginBottom: 12 }} 
                      required 
                    />
                    <input 
                      className="input-base" 
                      type="password" 
                      placeholder={t('pass')} 
                      value={dependentForm.password} 
                      onChange={(e) => setDependentForm({ ...dependentForm, password: e.target.value })} 
                      style={{ marginBottom: 12 }} 
                      required 
                    />
                  </>
                ) : (
                  <>
                    <div style={{ background: 'var(--azure-pale)', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 14 }}>
                      <p style={{ marginBottom: 8 }}>
                        <strong>{t('tokenVerified')}</strong>
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                        {t('completeInfo')}
                      </p>
                    </div>
                    <input className="input-base" type="text" placeholder={t('name')} value={dependentForm.fullName} onChange={(e) => setDependentForm({ ...dependentForm, fullName: e.target.value })} style={{ marginBottom: 12 }} required />
                    <input className="input-base" type="text" placeholder={t('natId')} value={dependentForm.nationalId} onChange={(e) => setDependentForm({ ...dependentForm, nationalId: e.target.value })} style={{ marginBottom: 12 }} required />
                    <input className="input-base" type="email" placeholder={t('email')} value={dependentForm.email} onChange={(e) => setDependentForm({ ...dependentForm, email: e.target.value })} style={{ marginBottom: 12 }} required />
                    <input className="input-base" type="tel" placeholder={t('phone')} value={dependentForm.phone} onChange={(e) => setDependentForm({ ...dependentForm, phone: e.target.value })} style={{ marginBottom: 12 }} required />
                    <input className="input-base" type="password" placeholder={t('pass')} value={dependentForm.password} onChange={(e) => setDependentForm({ ...dependentForm, password: e.target.value })} style={{ marginBottom: 12 }} required />
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: "var(--ink)" }}>
                        {t('patPhoto')}
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                      />
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ 
                          padding: "10px 14px", 
                          fontSize: 13, 
                          whiteSpace: "nowrap",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          cursor: "pointer"
                        }}
                      >
                        <span style={{ fontSize: 16, lineHeight: 1 }}>📷</span>
                        {t('uploadPhoto')} ({dependentPhotos.length}/5)
                      </button>
                      {photoPreviews.length > 0 && (
                        <div style={{ marginTop: 12 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12 }}>
                            {photoPreviews.map((preview, index) => (
                              <div key={index} style={{ position: 'relative' }}>
                                <img src={preview} alt={`Dependent ${index + 1}`} style={{ width: '100%', height: 100, borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <button
                                  type="button"
                                  onClick={() => removePhoto(index)}
                                  style={{
                                    position: 'absolute',
                                    top: -8,
                                    right: -8,
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: 24,
                                    height: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    fontWeight: 'bold'
                                  }}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            {(role === "guardian" || (role === "dependent" && tokenVerified)) && (
              <button type="submit" className="btn-primary" style={{ marginTop: 24 }}>{t('create')}</button>
            )}
          </form>

          <p style={{ textAlign: "center", fontSize: window.innerWidth <= 480 ? 12 : 13, color: "var(--ink-muted)", marginTop: 20 }}>
            {t('already')} <span onClick={handleSwitchToLogin} style={{ color: "var(--azure)", cursor: "pointer", fontWeight: 600 }}>{t('logIn')}</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
