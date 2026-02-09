import { useState } from "react";
import { useLang } from "../../context/LanguageContext";
import { LangSwitch } from "../../components/UI/LangSwitch";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/UI/Toast";
import { CheckIcon } from "../../components/UI/Icons";
import Logo from "../../components/Logo";

export function TokenPage({ guardianData, onGoHome }) {
  const navigate = useNavigate()
  const { t } = useLang();
  const [showToast, setShowToast] = useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(guardianData.token);
    setShowToast(true);
  };

  return (
    <>
    <LangSwitch />
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      {showToast && <Toast msg={t('copied')} onClose={() => setShowToast(false)} />}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <Logo width={60} height={60} />
          </div>
          <h1 className="appName" style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>
            {t('app')}
          </h1>
        </div>
        <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 40, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg,#4ade80,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 40 }}>✓</div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 26, fontWeight: 600, marginBottom: 12 }}>{t('created')}</h2>
          <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 32 }}>{t('shareMsg')}</p>
          <div style={{ background: "var(--azure-pale)", padding: 20, borderRadius: 12, marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--azure)", marginBottom: 8 }}>{t('yourToken')}</div>
            <div style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: "var(--ink)", letterSpacing: 2 }}>{guardianData.token}</div>
          </div>
          <button className="btn-primary" onClick={copyToken} style={{ marginBottom: 12 }}>
            📋 &nbsp;{t('copyToken')}
          </button>
          <button className="btn-primary btn-secondary" onClick={() => navigate("/home")}>
            {t('contDash')}
          </button>
          <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 20 }}>{t('keepSafe')}</p>
        </div>
      </div>
    </div>
    </>
  );
}
