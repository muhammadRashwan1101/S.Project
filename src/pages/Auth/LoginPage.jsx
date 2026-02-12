import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../context/LanguageContext";
import { useResponsive } from "../../hooks/useResponsive";
import { SettingsSwitches } from "../../components/UI/SettingsSwitches";
import { LogInIcon } from "../../components/UI/Icons";
import { accountsDB } from "../../utils/dataStore";
import { saveSession } from "../../utils/sessionManager";
import { ensureAccountDefaults } from "../../utils/helpers";
import LandingLogo from "../../components/LandingLogo";

export function LoginPage() {
  const navigate = useNavigate();
  const { t } = useLang();
  const { isMobile } = useResponsive();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !password) {
      setErr(t('err5'));
      return;
    }
    let account = accountsDB.find(acc => acc.email === email && acc.password === password);
    if (!account) {
      setErr(t('err6'));
      return;
    }
    
    account = ensureAccountDefaults(account);
    saveSession(account);
    window.dispatchEvent(new Event('storage'));
    if (account.role === 'dependent') {
      navigate('/dependent-home');
    } else {
      navigate('/home');
    }
  };

  return (
    <>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? 16 : 24, paddingTop: isMobile ? 80 : 100 }}>
        <div className="mesh-bg" /><div className="texture-overlay" />
        <SettingsSwitches />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <LandingLogo />
          </div>
          <button onClick={() => navigate('/')} style={{ background: "transparent", border: "none", color: "var(--azure)", fontSize: isMobile ? 13 : 14, fontWeight: 600, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
            ← {t('back')}
          </button>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: isMobile ? 16 : 20, padding: isMobile ? 24 : 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 8 }}>{t('welcomeBack')}</h2>
            <p style={{ fontSize: isMobile ? 13 : 14, color: "var(--ink-muted)", marginBottom: 24 }}>{t('loginMsg')}</p>
            
            {err && <div style={{ background: "rgba(212,117,106,.1)", color: "var(--coral)", padding: 12, borderRadius: 10, fontSize: isMobile ? 12 : 13, marginBottom: 16 }}>{err}</div>}
            
            <div style={{ background: "var(--azure-pale)", padding: 12, borderRadius: 10, fontSize: isMobile ? 11 : 12, marginBottom: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{t('demoMsg')}</div>
              <div>📧 guardian@demo.com / dependent@demo.com</div>
              <div>🔑 demo1234</div>
            </div>

            <form onSubmit={handleSubmit}>
              <input className="input-base" type="email" placeholder={t('email')} value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 12 }} required />
              <input className="input-base" type="password" placeholder={t('pass')} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="btn-primary" style={{ marginTop: 20 }}>{t('logIn')}</button>
            </form>

            <p style={{ textAlign: "center", fontSize: isMobile ? 12 : 13, color: "var(--ink-muted)", marginTop: 20 }}>
              {t('dontHave')} <span onClick={() => navigate('/signup')} style={{ color: "var(--azure)", cursor: "pointer", fontWeight: 600 }}>{t('signUp')}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
