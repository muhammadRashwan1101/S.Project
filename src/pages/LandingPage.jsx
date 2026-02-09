import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { LangSwitch } from "../components/UI/LangSwitch";
import Logo from "../components/Logo";
export default function LandingPage() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <div style={{ minHeight: "100vh", background: "var(--ice-blue)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />

      {/* Animated Background Elements */}
      <div style={{ position: "absolute", top: "-50%", left: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,144,164,.1) 0%, transparent 70%)", filter: "blur(40px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,117,106,.08) 0%, transparent 70%)", filter: "blur(40px)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", maxWidth: 800, margin: "0 auto", width: "100%" }}>
        {/* Logo / Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
            <Logo />
          </div>
          <h1 className="appName" style={{ fontFamily: "'Fraunces',serif", fontSize: window.innerWidth <= 480 ? 36 : 56, fontWeight: 700, marginBottom: 16, color: "var(--ink)" }}>
            {t('app')}
          </h1>
          <p style={{ fontSize: window.innerWidth <= 480 ? 13 : 15, color: "var(--ink-muted)", fontStyle: "italic" }}>
            {t('tagline')}
          </p>
        </div>

        {/* Feature Highlights */}
        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth <= 640 ? "1fr" : "1fr 1fr", gap: 20, marginBottom: 40, width: "100%" }}>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t('featureMonitor')}</h3>
            <p style={{ fontSize: 13, color: "var(--ink-light)", lineHeight: 1.6 }}>
              {t('featureMonitorDesc')}
            </p>
          </div>

          <div className="fade-up fade-up-d1" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚨</div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t('featureAlerts')}</h3>
            <p style={{ fontSize: 13, color: "var(--ink-light)", lineHeight: 1.6 }}>
              {t('featureAlertsDesc')}
            </p>
          </div>

          <div className="fade-up fade-up-d2" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t('featureSharing')}</h3>
            <p style={{ fontSize: 13, color: "var(--ink-light)", lineHeight: 1.6 }}>
              {t('featureSharingDesc')}
            </p>
          </div>

          <div className="fade-up fade-up-d3" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t('featureReporting')}</h3>
            <p style={{ fontSize: 13, color: "var(--ink-light)", lineHeight: 1.6 }}>
              {t('featureReportingDesc')}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth <= 640 ? "1fr" : "1fr 1fr 1fr", gap: 12, width: "100%" }}>
          <button
            onClick={() => navigate('/signup')}
            className="btn-primary fade-up fade-up-d1"
            style={{
              padding: window.innerWidth <= 480 ? "10px 14px" : "10px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: "translateY(0)",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 24px rgba(0,0,0,.15)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,.08)"; }}
          >
            ➕ {t('signUp')}
          </button>

          <button
            onClick={() => navigate('/login')}
            className="btn-primary btn-secondary fade-up fade-up-d2"
            style={{
              padding: window.innerWidth <= 480 ? "10px 14px" : "10px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: "translateY(0)",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 24px rgba(0,0,0,.1)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,.08)"; }}
          >
            🔐 {t('logIn')}
          </button>

          <button
            onClick={() => navigate('/report')}
            className="btn-primary btn-danger fade-up fade-up-d3"
            style={{
              padding: window.innerWidth <= 480 ? "10px 14px" : "10px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: "translateY(0)",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 24px rgba(239,68,68,.3)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,.08)"; }}
          >
            🆘 {t('reportLost')}
          </button>
        </div>

        {/* Footer Info */}
        <div style={{ marginTop: 40, textAlign: "center", fontSize: 12, color: "var(--ink-muted)" }}>
          <p>{t('secure')} • {t('private')} • {t('fast')}</p>
        </div>
      </div>
    </div>
  );
}
