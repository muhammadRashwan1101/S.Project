import { useLang } from "../context/LanguageContext";
import { Toast } from "../components/UI/Toast";
import PhotoUploader from "../components/PhotoUploader";
import { accountsDB, saveAccountsDB } from "../utils/dataStore";
import { saveSession } from "../utils/sessionManager";
import { useState, useEffect, useRef } from "react";

const CopyIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>);
const CheckIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
const UploadIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>);

export function ProfileModal({ guardianData, onClose, onUpdate }) {
  const { t } = useLang();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef(null);
  const [dependentPhotos, setDependentPhotos] = useState(
    Array.isArray(guardianData.dependent?.photos)
      ? guardianData.dependent.photos
      : (guardianData.dependent?.photo ? [guardianData.dependent.photo] : [])
  );
  const [photoPreviews, setPhotoPreviews] = useState(
    Array.isArray(guardianData.dependent?.photos)
      ? guardianData.dependent.photos
      : (guardianData.dependent?.photo ? [guardianData.dependent.photo] : [])
  );

  useEffect(() => {
    setDependentPhotos(Array.isArray(guardianData.dependent?.photos) ? guardianData.dependent.photos : (guardianData.dependent?.photo ? [guardianData.dependent.photo] : []));
    setPhotoPreviews(Array.isArray(guardianData.dependent?.photos) ? guardianData.dependent.photos : (guardianData.dependent?.photo ? [guardianData.dependent.photo] : []));
  }, [guardianData.dependent?.photos, guardianData.dependent?.photo]);

  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = [...dependentPhotos];
    const newPreviews = [...photoPreviews];

    for (let i = 0; i < files.length && newPhotos.length < 5; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;
      const reader = new FileReader();
      reader.onload = (event) => {
        newPhotos.push(event.target.result);
        newPreviews.push(event.target.result);
        setDependentPhotos([...newPhotos]);
        setPhotoPreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    }

    e.target.value = '';
  };

  const removePhoto = (index) => {
    const newPhotos = dependentPhotos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    setDependentPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  const handleSavePhotos = () => {
    const updatedGuardian = {
      ...guardianData,
      dependent: {
        ...guardianData.dependent,
        photos: dependentPhotos
      }
    };

    if (guardianData.dependent) {
      // Update dependent account (top-level dependent user) if present
      const depIndex = accountsDB.findIndex(acc => 
        acc.role === 'dependent' && (
          (guardianData.dependent.email && acc.email === guardianData.dependent.email) ||
          (guardianData.dependent.nationalId && acc.nationalId === guardianData.dependent.nationalId)
        )
      );
      if (depIndex !== -1) {
        accountsDB[depIndex] = { ...accountsDB[depIndex], photos: dependentPhotos };
      }

      // Update guardian's nested dependent in-memory as well
      const guardianIndex = accountsDB.findIndex(acc => acc.email === guardianData.email);
      if (guardianIndex !== -1) {
        accountsDB[guardianIndex] = {
          ...accountsDB[guardianIndex],
          dependent: {
            ...accountsDB[guardianIndex].dependent,
            photos: dependentPhotos
          }
        };
      }

      // Persist the updated accountsDB (saveAccountsDB handles session/local fallback)
      saveAccountsDB();

      // Ensure localStorage reflects latest accountsDB (some environments may use session fallback)
      try {
        localStorage.setItem('sanad-accounts', JSON.stringify(accountsDB));
      } catch (e) {
        // ignore - saveAccountsDB already attempted sessionStorage fallback
      }

      // Update session and notify parent
      saveSession(updatedGuardian);
      if (onUpdate) onUpdate(updatedGuardian);
    }

    setToastMsg(t('photoUpdated'));
    setShowToast(true);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(guardianData.token).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };
  
  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      {showToast && <Toast msg={toastMsg} onClose={() => setShowToast(false)} />}
      <div className="modal-card" style={{ maxWidth: 600, margin: '0 8px' }}>
        <div style={{ padding: window.innerWidth <= 480 ? 16 : 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: window.innerWidth <= 480 ? 16 : 24 }}>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: window.innerWidth <= 480 ? 18 : 24, fontWeight: 600 }}>{t('myProfile')}</h2>
            <button onClick={onClose} style={{ background: "transparent", border: "none", fontSize: 24, cursor: "pointer", color: "var(--ink-muted)" }}>×</button>
          </div>

          <div style={{ background: "var(--azure-pale)", padding: window.innerWidth <= 480 ? 12 : 20, borderRadius: 12, marginBottom: window.innerWidth <= 480 ? 12 : 20 }}>
            <h3 style={{ fontSize: window.innerWidth <= 480 ? 15 : 18, fontWeight: 600, marginBottom: window.innerWidth <= 480 ? 12 : 16, color: "var(--azure)" }}>{t('guardianInfo')}</h3>
            <div style={{ display: "grid", gap: window.innerWidth <= 480 ? 8 : 12, fontSize: window.innerWidth <= 480 ? 13 : 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{t('name')}:</span>
                <span>{guardianData.fullName}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{t('email')}:</span>
                <span>{guardianData.email}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{t('natId')}:</span>
                <span>{guardianData.nationalId}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{t('phone')}:</span>
                <span>{guardianData.phone}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{t('addr')}:</span>
                <span>{guardianData.address}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{t('guardToken')}:</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontFamily: "monospace", background: "#fff", padding: "8px 12px", borderRadius: 6, flex: 1, fontSize: 13, wordBreak: "break-all", color: "#1f2937" }}>{guardianData.token}</span>
                  <button
                    onClick={handleCopyToken}
                    style={{
                      padding: "8px 12px",
                      background: copySuccess ? "var(--green)" : "var(--azure)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    }}
                  >
                    {copySuccess ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {guardianData.dependent ? (
            <div style={{ background: "var(--cyan-pale)", padding: window.innerWidth <= 480 ? 12 : 20, borderRadius: 12 }}>
              <h3 style={{ fontSize: window.innerWidth <= 480 ? 15 : 18, fontWeight: 600, marginBottom: window.innerWidth <= 480 ? 12 : 16, color: "var(--cyan)" }}>{t('dependentLinked')}</h3>
              
              <div style={{ marginBottom: window.innerWidth <= 480 ? 12 : 20 }}>
                <h4 style={{ fontSize: window.innerWidth <= 480 ? 13 : 14, fontWeight: 600, marginBottom: 12, color: "var(--cyan)" }}>{t('patPhoto')} ({photoPreviews.length}/5)</h4>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
                {photoPreviews.length === 0 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: "10px 14px",
                      fontSize: 13,
                      backgroundColor: "var(--azure)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      cursor: "pointer",
                      marginBottom: 12
                    }}
                  >
                    <UploadIcon />
                    {t('uploadPhoto')}
                  </button>
                )}
                {photoPreviews.length > 0 && (
                  <div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: window.innerWidth <= 480 ? 'repeat(auto-fill, minmax(80px, 1fr))' : 'repeat(auto-fill, minmax(100px, 1fr))',
                      gap: '8px',
                      marginBottom: 12
                    }}>
                      {photoPreviews.map((preview, index) => (
                        <div key={index} style={{ position: 'relative', width: '100%' }}>
                          <img
                            src={preview}
                            alt={`Dependent ${index + 1}`}
                            style={{
                              width: '100%',
                              height: window.innerWidth <= 480 ? 80 : 100,
                              borderRadius: 8,
                              objectFit: 'cover',
                              border: '2px solid var(--cyan)'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              backgroundColor: 'var(--coral)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '28px',
                              height: '28px',
                              padding: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontSize: '16px',
                              fontWeight: 'bold',
                              boxShadow: '0 2px 8px rgba(212,117,106,0.4)',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {photoPreviews.length < 5 && (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: window.innerWidth <= 480 ? 80 : 100,
                            borderRadius: 8,
                            border: '2px dashed var(--ink-muted)',
                            color: 'var(--ink-muted)',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ textAlign: 'center', fontSize: 28 }}>+</div>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleSavePhotos}
                      style={{
                        padding: "8px 16px",
                        fontSize: 12,
                        backgroundColor: "var(--cyan)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      {t('save')}
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{t('name')}:</span>
                <span>{guardianData.dependent.fullName}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{t('email')}:</span>
                <span>{guardianData.dependent.email}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{t('natId')}:</span>
                <span>{guardianData.dependent.nationalId}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{t('phone')}:</span>
                <span>{guardianData.dependent.phone}</span>
              </div>
            </div>
          ) : (
            <div style={{ background: "rgba(212,117,106,.1)", padding: window.innerWidth <= 480 ? 12 : 20, borderRadius: 12, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: window.innerWidth <= 480 ? 8 : 12, flexDirection: window.innerWidth <= 480 ? "column" : "row" }}>
              <div style={{ fontSize: window.innerWidth <= 480 ? 28 : 32 }}>⏳</div>
              <div style={{ textAlign: window.innerWidth <= 480 ? "center" : "left" }}>
                <h3 style={{ fontSize: window.innerWidth <= 480 ? 14 : 16, fontWeight: 600, marginBottom: 4, color: "var(--coral)" }}>{t('noDependentLinked')}</h3>
                <p style={{ fontSize: window.innerWidth <= 480 ? 12 : 13, color: "var(--ink-muted)" }}>{t('waitingForDependent')}</p>
              </div>
            </div>
          )}

          <button className="btn-primary" onClick={onClose} style={{ marginTop: window.innerWidth <= 480 ? 16 : 24, width: '100%' }}>
            {t('closeProfile')}
          </button>
        </div>
      </div>
    </div>
  );
}
