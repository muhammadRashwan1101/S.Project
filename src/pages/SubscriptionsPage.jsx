import { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import  SideNavbar  from "../components/SideNavbar"
import { LangSwitch } from "../components/UI/LangSwitch";
import LogoHeader from '../components/LogoHeader';
/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
   ═══════════════════════════════════════════════════════════════ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=Tajawal:wght@300;400;500;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--ice-blue:#e8f4f8;--sky-white:#f0f9ff;--ink:#1a1a1a;--ink-light:#5a5550;--ink-muted:#8a857e;--azure:#4a90a4;--azure-light:#6db4c7;--azure-dark:#2d6b7d;--azure-pale:#e3f2f7;--coral:#d4756a;--coral-light:#e8948b;--cyan:#3d9db5;--cyan-pale:#daf2f7;--gold:#d4a76a;--gold-light:#e8c48b;--gold-dark:#b8904d;--card-bg:rgba(255,255,255,0.72);--shadow:0 2px 24px rgba(26,26,26,0.07);--shadow-hover:0 6px 32px rgba(26,26,26,0.13)}
    body{font-family:'DM Sans',system-ui,sans-serif;background:var(--ice-blue);color:var(--ink);min-height:100vh;-webkit-font-smoothing:antialiased}
    [lang="ar"] body{font-family:'Tajawal','DM Sans',system-ui,sans-serif}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#b8d4dc;border-radius:3px}
    .texture-overlay{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");opacity:.6}
    .mesh-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 70% 50% at 10% 20%,rgba(74,144,164,.12) 0%,transparent 70%),radial-gradient(ellipse 60% 60% at 90% 80%,rgba(61,157,181,.10) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 50% 50%,rgba(109,180,199,.08) 0%,transparent 70%)}
    .btn-primary{width:100%;background:var(--azure);color:#fff;border:none;border-radius:10px;padding:14px;font-family:inherit;font-size:15px;font-weight:600;letter-spacing:.02em;cursor:pointer;transition:background .2s,transform .15s,box-shadow .2s;position:relative;overflow:hidden}
    .btn-primary:hover{background:var(--azure-dark);box-shadow:0 4px 16px rgba(74,144,164,.3);transform:translateY(-1px)}
    .btn-primary:active{transform:translateY(0)}
    .btn-gold{background:var(--gold)!important}.btn-gold:hover{background:var(--gold-dark)!important;box-shadow:0 4px 16px rgba(212,167,106,.35)!important}
    .btn-coral{background:var(--coral)!important}.btn-coral:hover{background:#c0635a!important;box-shadow:0 4px 16px rgba(212,117,106,.35)!important}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    .btn-primary::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.15) 50%,transparent 100%);background-size:200% 100%;animation:shimmer 2.5s infinite linear}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    .fade-up{animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both}
    .fade-up-d1{animation-delay:.08s}.fade-up-d2{animation-delay:.16s}.fade-up-d3{animation-delay:.24s}
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════ */
const ShieldIcon = () => (<img src="/assets/logo.png" alt="Logo" style={{ width: 22, height: 22, objectFit: 'contain' }} />);
const CheckIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
const GlobeIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);


/* ═══════════════════════════════════════════════════════════════
   PRICING PAGE
   ═══════════════════════════════════════════════════════════════ */
function PricingPage() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [currentPlan] = useState('forall'); // Mock current plan
  const [view, setView] = useState("pricing");
  const [activeNav, setActiveNav] = useState('subscriptions');

  useEffect(() => {
    if (view === 'pricing') setActiveNav('subscriptions');
    else if (view === 'services') setActiveNav('services');
    else if (view === 'faqs') setActiveNav('faqs');
  }, [view]);

  if (view === "services") {
    return (
      <>
        <SideNavbar activeNav={activeNav} setView={setView} setActiveNav={setActiveNav} navigate={navigate} />
        <div style={{ marginLeft: '250px', padding: '40px 24px', minHeight: '100vh', background: 'var(--ice-blue)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--ink)', marginBottom: '24px' }}>Services</h1>
            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', borderRadius: '16px', padding: '32px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)' }}>
              <p style={{ fontSize: '16px', color: 'var(--ink-light)', lineHeight: '1.6' }}>
                Our services include real-time location tracking, safe zone monitoring, emergency alerts, and comprehensive reporting features to ensure the safety and well-being of your dependents.
              </p>
              <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'rgba(74,144,164,.1)', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--azure)', marginBottom: '8px' }}>Location Tracking</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>Real-time GPS monitoring with safe zone alerts.</p>
                </div>
                <div style={{ padding: '16px', background: 'rgba(212,117,106,.1)', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--coral)', marginBottom: '8px' }}>Emergency Alerts</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>Instant notifications when dependents leave safe zones.</p>
                </div>
                <div style={{ padding: '16px', background: 'rgba(212,167,106,.1)', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--gold)', marginBottom: '8px' }}>Reporting</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>Comprehensive lost dependent reporting system.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (view === "faqs") {
    return (
      <>
        <SideNavbar activeNav={activeNav} setView={setView} setActiveNav={setActiveNav} navigate={navigate} />
        <div style={{ marginLeft: '250px', padding: '40px 24px', minHeight: '100vh', background: 'var(--ice-blue)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--ink)', marginBottom: '24px' }}>Frequently Asked Questions</h1>
            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', borderRadius: '16px', padding: '32px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--azure)', marginBottom: '8px' }}>How does location tracking work?</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-light)', lineHeight: '1.6' }}>
                  Our app uses GPS technology to track the real-time location of your dependents. You can set up safe zones and receive alerts when they leave these areas.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--azure)', marginBottom: '8px' }}>What happens if my dependent gets lost?</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-light)', lineHeight: '1.6' }}>
                  You can immediately report a lost dependent through the app. This triggers our emergency response system and shares location data with authorities if needed.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--azure)', marginBottom: '8px' }}>Is my data secure?</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-light)', lineHeight: '1.6' }}>
                  Yes, we prioritize data security and privacy. All location data is encrypted and only accessible to authorized guardians. We comply with all relevant data protection regulations.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--azure)', marginBottom: '8px' }}>How do I set up safe zones?</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-light)', lineHeight: '1.6' }}>
                  In the dashboard, navigate to the map view and use the location picker to set your safe zone center. You can adjust the radius to define the area you want to monitor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (view === "dependent") {
    return (
      <>
        <SideNavbar activeNav={activeNav} setView={setView} setActiveNav={setActiveNav} navigate={navigate} />
        <div style={{ marginLeft: '250px' }}>
          <DependentHomePageIn />
        </div>
      </>
    );
  }

  const plans = [
    {
      id: 'forall',
      name: t('planForAll'),
      tagline: t('tagForAll'),
      price: 0,
      color: 'var(--azure)',
      btnClass: '',
      features: [
        t('feat1_1'),
        t('feat1_2'),
        t('feat1_3'),
        t('feat1_4'),
        t('feat1_5'),
      ]
    },
    {
      id: 'gold',
      name: t('planGold'),
      tagline: t('tagGold'),
      price: 299,
      color: 'var(--gold)',
      btnClass: 'btn-gold',
      popular: true,
      features: [
        t('feat2_1'),
        t('feat2_2'),
        t('feat2_3'),
        t('feat2_4'),
        t('feat2_5'),
        t('feat2_6'),
        t('feat2_7'),
      ]
    },
    {
      id: 'vip',
      name: t('planVIP'),
      tagline: t('tagVIP'),
      price: 699,
      color: 'var(--coral)',
      btnClass: 'btn-coral',
      features: [
        t('feat3_1'),
        t('feat3_2'),
        t('feat3_3'),
        t('feat3_4'),
        t('feat3_5'),
        t('feat3_6'),
        t('feat3_7'),
        t('feat3_8'),
        t('feat3_9'),
      ]
    }
  ];

  return (
    <>
      <div style={{ display: 'flex' }}>
        <SideNavbar activeNav={activeNav} setView={setView} setActiveNav={setActiveNav} navigate={navigate} />
        <div style={{ flex: 1, marginLeft: '250px' }}>
          <div style={{ minHeight: "100vh", position: "relative", padding: "40px 24px 60px" }}>
            <div className="mesh-bg" />
            <div className="texture-overlay" />
            <LangSwitch />
            {/* Header */}
            <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 48, marginTop: 60 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <LogoHeader />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8, fontFamily: "'Fraunces',serif" }}>
            {t('pricing')}
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink-muted)" }}>
            {t('pricingSubtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: 24, 
          maxWidth: 1100,
          margin: "0 auto"
        }}>
          {plans.map((plan, idx) => (
            <div 
              key={plan.id}
              className={`fade-up fade-up-d${idx + 1}`}
              style={{ 
                background: plan.popular ? "linear-gradient(135deg, rgba(212,167,106,.08), rgba(255,255,255,.85))" : "var(--card-bg)", 
                backdropFilter: "blur(20px)", 
                borderRadius: 20, 
                padding: 28, 
                boxShadow: plan.popular ? "0 8px 40px rgba(212,167,106,.2)" : "var(--shadow)", 
                border: plan.popular ? "2px solid var(--gold)" : "1px solid rgba(255,255,255,.6)",
                position: 'relative',
                transition: 'transform .3s, box-shadow .3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = plan.popular ? "0 12px 48px rgba(212,167,106,.25)" : "var(--shadow-hover)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = plan.popular ? "0 8px 40px rgba(212,167,106,.2)" : "var(--shadow)";
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--gold)',
                  color: '#3f3f3f',
                  padding: '6px 20px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '.5px',
                  boxShadow: '0 4px 12px rgba(212,167,106,.4)'
                }}>
                  ⭐ {t('popular')}
                </div>
              )}

              {/* Plan Header */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ 
                  fontSize: 22, 
                  fontWeight: 600, 
                  marginBottom: 6,
                  color: plan.color,
                  fontFamily: "'Fraunces',serif"
                }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: 20 }}>
                  {plan.tagline}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>{t('egp')}</span>
                  <span style={{ fontSize: 40, fontWeight: 700, color: plan.color }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>/ {t('month')}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                className={`btn-primary ${plan.btnClass}`}
                disabled={currentPlan === plan.id}
                style={{ 
                  marginBottom: 24,
                  opacity: currentPlan === plan.id ? 0.7 : 1,
                  cursor: currentPlan === plan.id ? 'not-allowed' : 'pointer'
                }}
              >
                {currentPlan === plan.id ? t('currentPlan') : t('selectPlan')}
              </button>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {plan.features.map((feature, i) => (
                  <div 
                    key={i}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 10,
                      fontSize: 14
                    }}
                  >
                    <div style={{ 
                      marginTop: 2,
                      color: plan.color,
                      flexShrink: 0
                    }}>
                      <CheckIcon />
                    </div>
                    <span style={{ color: 'var(--ink-light)' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUBSCRIPTIONS PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function SubscriptionsPage() {
  return <PricingPage />;
}
