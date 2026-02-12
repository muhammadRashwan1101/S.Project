import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { Toast } from "../components/UI/Toast";
import { PlusIcon, UsersIcon, TrashIcon } from "../components/UI/Icons";
import { accountsDB, saveAccountsDB } from "../utils/dataStore";

const CopyIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>);

export function ManageDependentsModal({ guardianData, onClose, onUpdate }) {
  const { t } = useLang();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDependent, setNewDependent] = useState({
    fullName: '',
    nationalId: '',
    email: '',
    phone: '',
    address: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Find pending dependent created by this guardian
  const pendingDependent = accountsDB.find(acc => 
    acc.role === 'dependent' && 
    acc.guardianToken === guardianData.token && 
    !acc.isLinked
  );

  const handleAddDependent = () => {
    if (!newDependent.fullName || !newDependent.nationalId || !newDependent.email) {
      setToastMsg(t('err2'));
      setShowToast(true);
      return;
    }

    const dependentToken = `${guardianData.token}-DEP-${Date.now().toString().slice(-4)}`;

    const dependent = {
      id: Date.now(),
      role: 'dependent',
      ...newDependent,
      guardianToken: guardianData.token,
      token: dependentToken,
      password: 'demo1234',
      location: guardianData.safeZoneCenter || guardianData.location || { lat: 30.0444, lng: 31.2357 },
      photo: null,
      isLinked: false
    };

    accountsDB.push(dependent);
    saveAccountsDB();
    
    // Don't link dependent to guardian until they sign up with token
    const updatedGuardian = { ...guardianData };

    onUpdate(updatedGuardian);
    setToastMsg(t('dependentAdded'));
    setShowToast(true);
    setShowAddForm(false);
    setNewDependent({ fullName: '', nationalId: '', email: '', phone: '', address: '' });
  };

  const handleDeleteDependent = () => {
    if (!confirm(t('confirmDelete'))) return;

    const updatedGuardian = {
      ...guardianData,
      dependent: null
    };

    const depIndex = accountsDB.findIndex(acc => acc.email === guardianData.dependent.email);
    if (depIndex !== -1) {
      accountsDB.splice(depIndex, 1);
      saveAccountsDB();
    }

    onUpdate(updatedGuardian);
    setToastMsg(t('dependentDeleted'));
    setShowToast(true);
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      {showToast && <Toast msg={toastMsg} onClose={() => setShowToast(false)} />}
      
      <div className="modal-card" style={{ maxWidth: 600, maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <UsersIcon /> {t('manageDependents')}
            </h2>
            <button onClick={onClose} style={{
              background: 'transparent',
              border: 'none',
              fontSize: 28,
              cursor: 'pointer',
              color: 'var(--ink-muted)',
              lineHeight: 1
            }}>
              ×
            </button>
          </div>

          {!showAddForm && !guardianData.dependent && !pendingDependent && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
              style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <PlusIcon /> {t('addDependent')}
            </button>
          )}

          {showAddForm && (
            <div style={{
              background: 'var(--ice-blue)',
              borderRadius: 12,
              padding: 20,
              marginBottom: 20
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t('patInfo')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                  className="input-base"
                  type="text"
                  placeholder={t('patName')}
                  value={newDependent.fullName}
                  onChange={(e) => setNewDependent({ ...newDependent, fullName: e.target.value })}
                />
                <input
                  className="input-base"
                  type="text"
                  placeholder={t('patId')}
                  value={newDependent.nationalId}
                  onChange={(e) => setNewDependent({ ...newDependent, nationalId: e.target.value })}
                />
                <input
                  className="input-base"
                  type="email"
                  placeholder={t('patEmail')}
                  value={newDependent.email}
                  onChange={(e) => setNewDependent({ ...newDependent, email: e.target.value })}
                />
                <input
                  className="input-base"
                  type="tel"
                  placeholder={t('patPhone')}
                  value={newDependent.phone}
                  onChange={(e) => setNewDependent({ ...newDependent, phone: e.target.value })}
                />
                <textarea
                  className="input-base"
                  placeholder={t('patAddr')}
                  value={newDependent.address}
                  onChange={(e) => setNewDependent({ ...newDependent, address: e.target.value })}
                  rows={3}
                />
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={handleAddDependent} className="btn-primary" style={{ flex: 1 }}>
                    {t('create')}
                  </button>
                  <button onClick={() => setShowAddForm(false)} className="btn-primary btn-secondary" style={{ flex: 1 }}>
                    {t('back')}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t('dependentsList')}</h3>
            {!guardianData.dependent && !pendingDependent ? (
              <p style={{ color: 'var(--ink-muted)', textAlign: 'center', padding: 20, fontSize: 14 }}>
                {t('noDependents')}
              </p>
            ) : pendingDependent && !guardianData.dependent ? (
              <div style={{
                background: 'var(--ice-blue)',
                borderRadius: 12,
                padding: 16
              }}>
                <p style={{ fontWeight: 600, marginBottom: 4, fontSize: 15 }}>{pendingDependent.fullName}</p>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 8 }}>{pendingDependent.email}</p>
                <div style={{ background: 'rgba(74, 144, 164, 0.1)', padding: 10, borderRadius: 8 }}>
                  <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 4 }}>{t('dependentToken')}:</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <code style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: 'var(--azure)', flex: 1 }}>
                      {pendingDependent.token}
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(pendingDependent.token);
                        setToastMsg(t('copied'));
                        setShowToast(true);
                      }}
                      style={{
                        background: 'var(--azure)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontSize: 11,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0
                      }}
                    >
                      <CopyIcon />
                    </button>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 6, fontStyle: 'italic' }}>
                    {t('shareToken')}
                  </p>
                </div>
              </div>
            ) : (
              <div style={{
                background: 'var(--ice-blue)',
                borderRadius: 12,
                padding: 16
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: 4, fontSize: 15 }}>{guardianData.dependent.fullName}</p>
                    <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 8 }}>{guardianData.dependent.email}</p>
                  </div>
                  <button
                    onClick={handleDeleteDependent}
                    style={{
                      background: 'var(--coral)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      marginLeft: 12,
                      flexShrink: 0
                    }}
                  >
                    <TrashIcon /> {t('deleteDependent')}
                  </button>
                </div>
                {guardianData.dependent.token && (
                  <div style={{ background: 'rgba(74, 144, 164, 0.1)', padding: 10, borderRadius: 8 }}>
                    <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 4 }}>{t('dependentToken')}:</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <code style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: 'var(--azure)', flex: 1 }}>
                        {guardianData.dependent.token}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(guardianData.dependent.token);
                          setToastMsg(t('copied'));
                          setShowToast(true);
                        }}
                        style={{
                          background: 'var(--azure)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '4px 8px',
                          cursor: 'pointer',
                          fontSize: 11,
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          flexShrink: 0
                        }}
                      >
                        <CopyIcon />
                      </button>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 6, fontStyle: 'italic' }}>
                      {t('shareToken')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
