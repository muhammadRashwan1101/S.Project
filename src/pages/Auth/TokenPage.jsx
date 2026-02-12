import { useState } from "react";
import { useLang } from "../../context/LanguageContext";
import { LangSwitch } from "../../components/UI/LangSwitch";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/UI/Toast";
import { CheckIcon } from "../../components/UI/Icons";
import LandingLogo from "../../components/LandingLogo";
import { getSession } from "../../utils/sessionManager";

const CopyIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>);
const CheckIconLarge = () => (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);

export function TokenPage({ guardianData }) {
  const navigate = useNavigate()
  const { t } = useLang();
  const [showToast, setShowToast] = useState(false);

  const session = getSession();
  const data = guardianData || session;

  if (!data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--ice-blue)', fontSize: 18 }}>
        ⏳ Loading...
      </div>
    );
  }

  const copyToken = () => {
    navigator.clipboard.writeText(data.token);
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
            <LandingLogo width={60} height={60} />
          </div>
          <h1 className="appName" style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>
            {t('app')}
          </h1>
        </div>
        <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 40, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg,#4ade80,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "#fff" }}><CheckIconLarge /></div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 26, fontWeight: 600, marginBottom: 12 }}>{t('created')}</h2>
          <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 32 }}>{t('shareMsg')}</p>
          <div style={{ background: "var(--azure-pale)", padding: 20, borderRadius: 12, marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--azure)", marginBottom: 8 }}>{t('yourToken')}</div>
            <div style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: "var(--ink)", letterSpacing: 2 }}>{data.token}</div>
          </div>
          <button className="btn-primary" onClick={copyToken} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CopyIcon /> {t('copyToken')}
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
