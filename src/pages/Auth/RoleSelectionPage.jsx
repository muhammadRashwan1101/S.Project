import { useState } from "react";
import { useLang } from "../../context/LanguageContext";
import { LangSwitch } from "../../components/UI/LangSwitch";

export default function RoleSelectionPage({ onRoleSelected, onBack }) {
  const { t } = useLang();
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />
      
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", color: "var(--azure)", fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
          ← {t('back')}
        </button>

        <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 600, marginBottom: 8, textAlign: "center" }}>{t('selectRole')}</h2>
          <p style={{ fontSize: 14, color: "var(--ink-muted)", textAlign: "center", marginBottom: 32 }}>{t('selectRoleMsg')}</p>

          <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
            <div 
              className={`role-card ${selectedRole === 'guardian' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('guardian')}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>👨‍⚕️</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{t('guardianRole')}</h3>
              <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>{t('guardianDesc')}</p>
            </div>

            <div 
              className={`role-card ${selectedRole === 'dependent' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('dependent')}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🧑‍🦳</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{t('dependentRole')}</h3>
              <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>{t('dependentDesc')}</p>
            </div>
          </div>

          <button 
            className="btn-primary" 
            disabled={!selectedRole}
            onClick={() => selectedRole && onRoleSelected(selectedRole)}
          >
            {t('continue')}
          </button>
        </div>
      </div>
    </div>
  );
}
