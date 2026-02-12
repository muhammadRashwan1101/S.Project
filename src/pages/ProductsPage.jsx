import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../hooks/useResponsive';
import SideNavbar from '../components/SideNavbar';
import LogoHeader from '../components/LogoHeader';
import { SparklesIcon, ClipboardIcon } from '../components/UI/Icons';

const ShieldIcon = () => (<img src="/assets/logo.png" alt="Logo" style={{ width: 22, height: 22, objectFit: 'contain' }} />);
const CheckIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
const WatchIcon = () => (<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"/></svg>);
const ChipIcon = () => (<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>);

function ProductCard({ product, delay, showDetails, onToggleDetails }) {
  const { t } = useLang();

  return (
    <div 
      style={{ 
        background: 'var(--card-bg)', 
        backdropFilter: 'blur(20px)', 
        borderRadius: 20, 
        overflow: 'hidden',
        boxShadow: 'var(--shadow)', 
        border: '1px solid rgba(255,255,255,.6)',
        transition: 'all .3s ease'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    >
      <div style={{ 
        background: product.bgGradient,
        padding: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {product.badgeKey && (
          <div style={{ position: 'absolute', top: 16, right: 16 }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '.5px',
              background: product.badgeBg,
              color: '#fff'
            }}>⭐ {t(product.badgeKey).toUpperCase()}</span>
          </div>
        )}
        <div style={{ 
          width: 120, 
          height: 120, 
          borderRadius: '50%',
          background: 'rgba(255,255,255,.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: product.iconColor,
          boxShadow: '0 8px 32px rgba(0,0,0,.12)'
        }}>
          {product.icon}
        </div>
      </div>

      <div style={{ padding: 32 }}>
        <h3 style={{ 
          fontSize: 22, 
          fontWeight: 600, 
          marginBottom: 6,
          color: 'var(--ink)',
          fontFamily: "'Fraunces',serif"
        }}>
          {t(product.nameKey)}
        </h3>
        <p style={{ 
          fontSize: 14, 
          color: 'var(--ink-muted)',
          marginBottom: 20
        }}>
          {t(product.taglineKey)}
        </p>

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 14, color: 'var(--ink-muted)' }}>{t('egp')}</span>
            <span style={{ fontSize: 36, fontWeight: 700, color: 'var(--azure)' }}>
              {t(product.priceKey)}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          <button className="btn-primary" style={{width: '100%'}}>
            {t('addToCart')}
          </button>
          <button 
            className="btn-primary btn-secondary"
            onClick={onToggleDetails}
            style={{width: '100%', background: '#fff', color: 'var(--azure)', border: '1.5px solid var(--azure)'}}
          >
            {t('viewDetails')}
          </button>
        </div>

        {showDetails && (
          <div style={{ 
            borderTop: '1.5px solid #d4e8ef',
            paddingTop: 20,
            animation: 'fadeUp .3s ease'
          }}>
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ 
                fontSize: 14, 
                fontWeight: 600, 
                marginBottom: 12,
                color: 'var(--ink-light)'
              }}>
                ✨ {t('features')}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {product.featuresKeys.map((featKey, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ color: 'var(--azure)', marginTop: 2, flexShrink: 0 }}>
                      <CheckIcon />
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--ink-light)' }}>
                      {t(featKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 12,
                color: 'var(--ink-light)'
              }}>
                <ClipboardIcon /> {t('specs')}
              </h4>
              <div style={{ 
                background: 'var(--azure-pale)', 
                borderRadius: 10, 
                padding: 14,
                fontSize: 12,
                color: 'var(--ink-light)',
                lineHeight: 1.8
              }}>
                {product.specsKeys.map((specKey, idx) => (
                  <div key={idx}>{t(specKey)}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  const isSmallScreen = isMobile || isTablet;
  const [expandedProducts, setExpandedProducts] = useState({});
  const isRTL = lang === 'ar';

  const products = [
    {
      id: 1,
      nameKey: 'product1Name',
      taglineKey: 'product1Tagline',
      priceKey: 'product1Price',
      icon: <WatchIcon />,
      iconColor: 'var(--azure)',
      bgGradient: 'linear-gradient(135deg, var(--azure-pale), rgba(74,144,164,.15))',
      badgeKey: 'popular',
      badgeBg: 'linear-gradient(135deg,var(--gold),#c69558)',
      featuresKeys: [
        'product1Feat1',
        'product1Feat2',
        'product1Feat3',
        'product1Feat4',
        'product1Feat5',
        'product1Feat6',
      ],
      specsKeys: [
        'product1Spec1',
        'product1Spec2',
        'product1Spec3',
        'product1Spec4',
      ]
    },
    {
      id: 2,
      nameKey: 'product2Name',
      taglineKey: 'product2Tagline',
      priceKey: 'product2Price',
      icon: <ChipIcon />,
      iconColor: 'var(--coral)',
      bgGradient: 'linear-gradient(135deg, rgba(212,117,106,.12), rgba(212,117,106,.06))',
      badgeKey: 'advanced',
      badgeBg: 'linear-gradient(135deg,var(--azure),var(--azure-dark))',
      featuresKeys: [
        'product2Feat1',
        'product2Feat2',
        'product2Feat3',
        'product2Feat4',
        'product2Feat5',
        'product2Feat6',
      ],
      specsKeys: [
        'product2Spec1',
        'product2Spec2',
        'product2Spec3',
        'product2Spec4',
      ]
    }
  ];

  return (
    <>
      <SideNavbar activeNav="products" navigate={navigate} />
      <div style={{ marginLeft: isRTL ? 0 : (isSmallScreen ? 0 : '104px'), marginRight: isRTL ? (isSmallScreen ? 0 : '104px') : 0, marginBottom: isSmallScreen ? '64px' : 0 }}>
        <div style={{ minHeight: "100vh", position: "relative", padding: isSmallScreen ? "20px 16px 80px" : "24px 24px 80px" }}>
          <div className="mesh-bg" />
          <div className="texture-overlay" />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
            <div className="fade-up" style={{ textAlign: "center", marginBottom: isSmallScreen ? 40 : 56, marginTop: isSmallScreen ? 20 : 60 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <LogoHeader />
          </div>
          
          <h2 style={{ 
            fontSize: isSmallScreen ? 28 : 36, 
            fontWeight: 600, 
            marginBottom: 12,
            fontFamily: "'Fraunces',serif",
            color: 'var(--ink)'
          }}>
            {t('productsTitle')}
          </h2>
          
          <p style={{ 
            fontSize: isSmallScreen ? 14 : 16, 
            color: "var(--ink-muted)",
            maxWidth: 600,
            margin: '0 auto'
          }}>
            {t('productsSubtitle')}
          </p>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: isSmallScreen ? "1fr" : "repeat(auto-fit, minmax(400px, 1fr))", 
              gap: isSmallScreen ? 20 : 32,
              marginTop: isSmallScreen ? 32 : 48,
              alignItems: 'start'
            }}>
              {products.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  delay={idx + 1}
                  showDetails={expandedProducts[product.id] || false}
                  onToggleDetails={() => setExpandedProducts(prev => ({ ...prev, [product.id]: !prev[product.id] }))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
