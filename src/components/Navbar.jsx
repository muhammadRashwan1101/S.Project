import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { useResponsive } from "../hooks/useResponsive";

export default function Navbar() {
  const navigate = useNavigate();
  const { t } = useLang();
  const { isMobile } = useResponsive();

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: "var(--card-bg)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,.6)",
      boxShadow: "var(--shadow)",
      padding: isMobile ? "10px 12px" : "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <div style={{ fontFamily: "'Fraunces',serif", fontSize: isMobile ? 16 : 18, fontWeight: 700, color: "var(--ink)", cursor: "pointer" }} onClick={() => navigate('/')}>
        {t('app')}
      </div>
      <div style={{ display: "flex", gap: isMobile ? 6 : 12 }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--azure)",
            fontSize: isMobile ? 12 : 14,
            fontWeight: 600,
            cursor: "pointer",
            padding: isMobile ? "6px 8px" : "8px 12px",
            borderRadius: 8,
            transition: "background 0.3s ease",
            minHeight: "44px"
          }}
          onMouseEnter={(e) => e.target.style.background = "var(--azure-pale)"}
          onMouseLeave={(e) => e.target.style.background = "transparent"}
        >
          {t('logIn')}
        </button>
        <button
          onClick={() => navigate('/report')}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--coral)",
            fontSize: isMobile ? 12 : 14,
            fontWeight: 600,
            cursor: "pointer",
            padding: isMobile ? "6px 8px" : "8px 12px",
            borderRadius: 8,
            transition: "background 0.3s ease",
            minHeight: "44px"
          }}
          onMouseEnter={(e) => e.target.style.background = "rgba(212,117,106,.1)"}
          onMouseLeave={(e) => e.target.style.background = "transparent"}
        >
          {isMobile ? t('report') || 'Report' : t('reportLost')}
        </button>
        <button
          onClick={() => navigate('/signup')}
          style={{
            background: "var(--azure)",
            border: "none",
            color: "white",
            fontSize: isMobile ? 12 : 14,
            fontWeight: 600,
            cursor: "pointer",
            padding: isMobile ? "6px 10px" : "8px 12px",
            borderRadius: 8,
            transition: "all 0.3s ease",
            transform: "translateY(0)",
            boxShadow: "0 2px 8px rgba(74,144,164,.3)",
            minHeight: "44px"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 4px 12px rgba(74,144,164,.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 8px rgba(74,144,164,.3)";
          }}
        >
          {t('signUp')}
        </button>
      </div>
    </nav>
  );
}
