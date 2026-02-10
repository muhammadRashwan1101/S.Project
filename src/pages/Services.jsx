import { useLang } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import SideNavbar from '../components/SideNavbar';
import { LangSwitch } from '../components/UI/LangSwitch';
import LogoHeader from '../components/LogoHeader';

const ShieldIcon = () => (<img src="/assets/logo.png" alt="Logo" style={{ width: 22, height: 22, objectFit: 'contain' }} />);
const LocationIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
const GeofenceIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);
const EmergencyIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
const HeartIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>);
const BrainIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>);
const ChartIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>);
const UsersIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const ClipboardIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>);
const MessageIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);

function ServiceCard({ icon: Icon, title, description, delay }) {
  return (
    <div 
      className={`fade-up fade-up-d${delay}`}
      style={{ 
        background: 'var(--card-bg)', 
        backdropFilter: 'blur(20px)', 
        borderRadius: 16, 
        padding: 28, 
        boxShadow: 'var(--shadow)', 
        border: '1px solid rgba(255,255,255,.6)',
        transition: 'all .3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
        e.currentTarget.style.borderColor = 'var(--azure)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,.6)';
      }}
    >
      <div style={{ 
        width: 56, 
        height: 56, 
        borderRadius: 12, 
        background: 'linear-gradient(135deg, var(--azure-pale), rgba(74,144,164,.15))', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'var(--azure)',
        marginBottom: 16,
        border: '1px solid var(--azure)'
      }}>
        <Icon />
      </div>
      <h3 style={{ 
        fontSize: 18, 
        fontWeight: 600, 
        marginBottom: 10,
        color: 'var(--ink)',
        fontFamily: "'Fraunces',serif"
      }}>
        {title}
      </h3>
      <p style={{ 
        fontSize: 14, 
        lineHeight: 1.6,
        color: 'var(--ink-muted)' 
      }}>
        {description}
      </p>
    </div>
  );
}

export default function ServicesPage() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const isRTL = lang === 'ar';

  const services = [
    { icon: LocationIcon, titleKey: 'service1Title', descKey: 'service1Desc' },
    { icon: GeofenceIcon, titleKey: 'service2Title', descKey: 'service2Desc' },
    { icon: EmergencyIcon, titleKey: 'service3Title', descKey: 'service3Desc' },
    { icon: HeartIcon, titleKey: 'service4Title', descKey: 'service4Desc' },
    { icon: BrainIcon, titleKey: 'service5Title', descKey: 'service5Desc' },
    { icon: ChartIcon, titleKey: 'service6Title', descKey: 'service6Desc' },
    { icon: UsersIcon, titleKey: 'service7Title', descKey: 'service7Desc' },
    { icon: ClipboardIcon, titleKey: 'service8Title', descKey: 'service8Desc' },
    { icon: MessageIcon, titleKey: 'service9Title', descKey: 'service9Desc' },
  ];

  return (
    <>
      <SideNavbar activeNav="services" navigate={navigate} />
      <div style={{ marginLeft: isRTL ? 0 : '250px', marginRight: isRTL ? '250px' : 0 }}>
        <div style={{ minHeight: "100vh", position: "relative", padding: "24px 24px 80px" }}>
          <div className="mesh-bg" />
          <div className="texture-overlay" />
          <LangSwitch />
          
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 56, marginTop: 60 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <LogoHeader />
          </div>
          
          <h2 style={{ 
            fontSize: 36, 
            fontWeight: 600, 
            marginBottom: 12,
            fontFamily: "'Fraunces',serif",
            color: 'var(--ink)'
          }}>
            {t('servicesTitle')}
          </h2>
          
          <p style={{ 
            fontSize: 16, 
            color: "var(--ink-muted)",
            maxWidth: 600,
            margin: '0 auto'
          }}>
            {t('servicesSubtitle')}
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: 24,
          marginTop: 48
        }}>
          {services.map((service, idx) => (
            <ServiceCard 
              key={idx}
              icon={service.icon}
              title={t(service.titleKey)}
              description={t(service.descKey)}
              delay={idx + 1}
            />
          ))}
        </div>
          </div>
        </div>
      </div>
    </>
  );
}
