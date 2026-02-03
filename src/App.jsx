import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

/* ═══════════════════════════════════════════════════════════════
   LANGUAGE CONTEXT & TRANSLATIONS
   ═══════════════════════════════════════════════════════════════ */
const LanguageContext = createContext();

const TR = {
  en: {
    app: "Sanad", tag: "Safe, connected, always together.", signUp: "Sign Up", logIn: "Log In", logout: "Logout", back: "Back", backDash: "Back to Dashboard", terms: "Terms", privacy: "Privacy", byContinuing: "By continuing you agree to our", create: "Create Account", join: "Join Sanad and start caring", guard: "Guardian", pat: "Patient", email: "Email", pass: "Password", confirmPass: "Confirm Password", name: "Full Name", natId: "National ID", phone: "Phone", addr: "Address", patInfo: "Patient Information", patName: "Patient Full Name", patId: "Patient National ID", patEmail: "Patient Email", patPhone: "Patient Phone", patAddr: "Patient Address", guardEmail: "Guardian Email", guardToken: "Guardian Token (e.g. XXXX-XXXX-XXXX)", already: "Already have an account?", dontHave: "Don't have an account?", welcomeBack: "Welcome Back", loginMsg: "Log in to continue caring", demoMsg: "Demo Credentials:", created: "Account Created!", shareMsg: "Share this token with your patient so they can link their account", yourToken: "YOUR LINKING TOKEN", copyToken: "Copy Token", contDash: "Continue to Dashboard", keepSafe: "Keep this token safe. You can find it again in your dashboard settings.", copied: "Token copied to clipboard!", welcome: "Welcome", dash: "Dashboard", patStatus: "Patient Status", inside: "Inside Safe Zone", outside: "Outside Safe Zone", patInside: "Patient is within designated area", patOutside: "Alert: Patient has left safe zone", patInfoTitle: "Patient Info", nameLabel: "Name", quickAct: "Quick Actions", viewMap: "View Live Map & Geofence", copyLink: "Copy Linking Token", recent: "Recent Activity", insideMsg: "Patient inside safe zone", outsideMsg: "Patient left safe zone", locUpdate: "Location updated", sysCheck: "System check completed", now: "Just now", min: "min ago", liveTrack: "Live Location Tracking", monPat: "Monitor patient location in real-time and configure the safe zone radius", radius: "Safe Zone Radius", inZone: "Inside Zone", outZone: "Outside Zone", curLoc: "Current Location", dist: "Distance from center", how: "How It Works:", tip1: "The blue zone shows the safe area around the center point", tip2: "The coral marker shows the patient's current location", tip3: "Adjust the radius slider to customize the safe zone size", tip4: "You'll receive alerts when the patient leaves the safe zone", tip5: "Status is automatically sent to the backend (console.log)", alertTitle: "Patient Left Safe Zone!", alertSub: "Check location immediately", err1: "Please fill in all guardian and patient fields", err2: "Please fill in all patient fields", err3: "Passwords do not match", err4: "Invalid token. Please check with your guardian.", err5: "Please enter both email and password", err6: "Invalid credentials"
  },
  ar: {
    app: "سند", tag: "آمن، متصل، معاً دائماً", signUp: "إنشاء حساب", logIn: "تسجيل الدخول", logout: "تسجيل الخروج", back: "رجوع", backDash: "العودة إلى لوحة التحكم", terms: "الشروط", privacy: "الخصوصية", byContinuing: "بالمتابعة، أنت توافق على", create: "إنشاء حساب", join: "انضم إلى سند وابدأ الرعاية", guard: "الوصي", pat: "المريض", email: "البريد الإلكتروني", pass: "كلمة المرور", confirmPass: "تأكيد كلمة المرور", name: "الاسم الكامل", natId: "الرقم القومي", phone: "رقم الهاتف", addr: "العنوان", patInfo: "معلومات المريض", patName: "الاسم الكامل للمريض", patId: "الرقم القومي للمريض", patEmail: "البريد الإلكتروني للمريض", patPhone: "رقم هاتف المريض", patAddr: "عنوان المريض", guardEmail: "البريد الإلكتروني للوصي", guardToken: "رمز الوصي (مثال: XXXX-XXXX-XXXX)", already: "لديك حساب بالفعل؟", dontHave: "ليس لديك حساب؟", welcomeBack: "مرحباً بعودتك", loginMsg: "سجل الدخول للمتابعة", demoMsg: "بيانات تجريبية:", created: "تم إنشاء الحساب!", shareMsg: "شارك هذا الرمز مع مريضك حتى يتمكن من ربط حسابه", yourToken: "رمز الربط الخاص بك", copyToken: "نسخ الرمز", contDash: "المتابعة إلى لوحة التحكم", keepSafe: "احتفظ بهذا الرمز بأمان. يمكنك العثور عليه مرة أخرى في إعدادات لوحة التحكم.", copied: "تم نسخ الرمز!", welcome: "مرحباً", dash: "لوحة التحكم", patStatus: "حالة المريض", inside: "داخل المنطقة الآمنة", outside: "خارج المنطقة الآمنة", patInside: "المريض داخل المنطقة المحددة", patOutside: "تنبيه: المريض غادر المنطقة الآمنة", patInfoTitle: "معلومات المريض", nameLabel: "الاسم", quickAct: "إجراءات سريعة", viewMap: "عرض الخريطة المباشرة", copyLink: "نسخ رمز الربط", recent: "النشاط الأخير", insideMsg: "المريض داخل المنطقة الآمنة", outsideMsg: "⚠️ المريض غادر المنطقة الآمنة", locUpdate: "تم تحديث الموقع", sysCheck: "تم فحص النظام", now: "الآن", min: "دقيقة مضت", liveTrack: "تتبع الموقع المباشر", monPat: "راقب موقع المريض في الوقت الفعلي وقم بتكوين نصف قطر المنطقة الآمنة", radius: "نصف قطر المنطقة الآمنة", inZone: "✓ داخل المنطقة", outZone: "⚠️ خارج المنطقة", curLoc: "الموقع الحالي", dist: "المسافة من المركز", how: "كيف يعمل:", tip1: "المنطقة الزرقاء توضح المنطقة الآمنة حول نقطة المركز", tip2: "العلامة المرجانية توضح موقع المريض الحالي", tip3: "اضبط شريط التمرير لتخصيص حجم المنطقة الآمنة", tip4: "ستتلقى تنبيهات عندما يغادر المريض المنطقة الآمنة", tip5: "يتم إرسال الحالة تلقائياً إلى الخادم", alertTitle: "المريض غادر المنطقة الآمنة!", alertSub: "تحقق من الموقع فوراً", err1: "يرجى ملء جميع حقول الوصي والمريض", err2: "يرجى ملء جميع حقول المريض", err3: "كلمات المرور غير متطابقة", err4: "رمز غير صالح. يرجى التحقق مع الوصي الخاص بك.", err5: "يرجى إدخال البريد الإلكتروني وكلمة المرور", err6: "بيانات اعتماد غير صالحة"
  }
};

function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('sanad-lang') || 'en');
  useEffect(() => { 
    localStorage.setItem('sanad-lang', lang); 
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; 
    document.documentElement.lang = lang; 
  }, [lang]);
  const t = (k) => TR[lang][k] || k;
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

function useLang() { return useContext(LanguageContext); }

/* ═══════════════════════════════════════════════════════════════
   FAKE AUTH STORE
   ═══════════════════════════════════════════════════════════════ */
const DEMO_ACCOUNTS = [
  { email: "guardian@demo.com", password: "demo1234", role: "guardian", fullName: "Ahmed Hassan", nationalId: "30101011234", phone: "+20 123 456 7890", address: "15 Tahrir St, Cairo", patient: { fullName: "Sara Hassan", nationalId: "85050512345", email: "sara@demo.com", phone: "+20 987 654 3210", address: "15 Tahrir St, Cairo" }, location: { lat: 30.0444, lng: 31.2357 }, token: "DEMO-TKNA-ABCD" },
  { email: "patient@demo.com", password: "demo1234", role: "patient", linkedToken: "DEMO-TKNA-ABCD" }
];
const accountsDB = JSON.parse(localStorage.getItem("sanad-accounts")) || [...DEMO_ACCOUNTS];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
   ═══════════════════════════════════════════════════════════════ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=Tajawal:wght@300;400;500;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--ice-blue:#e8f4f8;--sky-white:#f0f9ff;--ink:#1a1a1a;--ink-light:#5a5550;--ink-muted:#8a857e;--azure:#4a90a4;--azure-light:#6db4c7;--azure-dark:#2d6b7d;--azure-pale:#e3f2f7;--coral:#d4756a;--coral-light:#e8948b;--cyan:#3d9db5;--cyan-pale:#daf2f7;--card-bg:rgba(255,255,255,0.72);--shadow:0 2px 24px rgba(26,26,26,0.07);--shadow-hover:0 6px 32px rgba(26,26,26,0.13)}
    body{font-family:'DM Sans',system-ui,sans-serif;background:var(--ice-blue);color:var(--ink);min-height:100vh;-webkit-font-smoothing:antialiased}
    [lang="ar"] body{font-family:'Tajawal','DM Sans',system-ui,sans-serif}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#b8d4dc;border-radius:3px}
    .texture-overlay{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");opacity:.6}
    .mesh-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 70% 50% at 10% 20%,rgba(74,144,164,.12) 0%,transparent 70%),radial-gradient(ellipse 60% 60% at 90% 80%,rgba(61,157,181,.10) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 50% 50%,rgba(109,180,199,.08) 0%,transparent 70%)}
    .input-base{width:100%;background:rgba(255,255,255,.8);border:1.5px solid #d4e8ef;border-radius:10px;padding:13px 16px;font-family:inherit;font-size:14px;color:var(--ink);transition:border-color .25s,box-shadow .25s,background .25s;outline:none}
    .input-base::placeholder{color:var(--ink-muted)}
    .input-base:focus{border-color:var(--azure);box-shadow:0 0 0 3px rgba(74,144,164,.15);background:#fff}
    .input-base.err{border-color:var(--coral)}
    .btn-primary{width:100%;background:var(--azure);color:#fff;border:none;border-radius:10px;padding:14px;font-family:inherit;font-size:15px;font-weight:600;letter-spacing:.02em;cursor:pointer;transition:background .2s,transform .15s,box-shadow .2s;position:relative;overflow:hidden}
    .btn-primary:hover{background:var(--azure-dark);box-shadow:0 4px 16px rgba(74,144,164,.3);transform:translateY(-1px)}
    .btn-primary:active{transform:translateY(0)}
    .btn-primary:disabled{background:#b5b0a8;cursor:not-allowed;transform:none;box-shadow:none}
    .btn-coral{background:var(--coral)!important}.btn-coral:hover{background:#c0635a!important;box-shadow:0 4px 16px rgba(212,117,106,.35)!important}
    .btn-secondary{background:#fff;color:var(--ink);border:1.5px solid #d4e8ef}
    .btn-secondary:hover{border-color:var(--azure);background:var(--azure-pale)}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    .btn-primary:not(:disabled)::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.15) 50%,transparent 100%);background-size:200% 100%;animation:shimmer 2.5s infinite linear}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    .fade-up{animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both}
    .fade-up-d1{animation-delay:.08s}.fade-up-d2{animation-delay:.16s}.fade-up-d3{animation-delay:.24s}.fade-up-d4{animation-delay:.32s}.fade-up-d5{animation-delay:.40s}
    @keyframes toastSlide{from{opacity:0;transform:translateX(100px)}to{opacity:1;transform:translateX(0)}}
    .toast{position:fixed;top:24px;right:24px;z-index:9999;background:var(--ink);color:#fff;padding:14px 22px;border-radius:12px;font-size:14px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,.2);animation:toastSlide .35s cubic-bezier(.22,1,.36,1) both;max-width:320px;display:flex;align-items:center;gap:10px}
    .modal-backdrop{position:fixed;inset:0;background:rgba(26,26,26,.45);backdrop-filter:blur(6px);z-index:800;display:flex;align-items:center;justify-content:center;padding:20px}
    @keyframes modalPop{from{opacity:0;transform:scale(.94) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .modal-card{background:#fff;border-radius:22px;box-shadow:0 24px 60px rgba(0,0,0,.18);animation:modalPop .3s cubic-bezier(.22,1,.36,1) both;max-width:520px;width:100%;max-height:90vh;overflow-y:auto}
    .leaflet-container{border-radius:12px;font-family:inherit!important;z-index:1}
    .leaflet-control-zoom{margin:8px!important}
    .leaflet-popup-content-wrapper{border-radius:10px;font-family:inherit}
    @keyframes alertPulse{0%,100%{opacity:1}50%{opacity:.7}}
    .zone-alert{position:fixed;top:80px;right:24px;z-index:9998;background:var(--coral);color:#fff;padding:16px 24px;border-radius:12px;font-size:14px;font-weight:600;box-shadow:0 8px 32px rgba(212,117,106,.4);animation:alertPulse 1.5s ease-in-out infinite;display:flex;align-items:center;gap:12px}
    .tab-pill{display:flex;background:#f0ece7;border-radius:10px;padding:3px;gap:3px}
    .tab-pill button{flex:1;border:none;background:none;border-radius:8px;padding:8px 0;font-family:inherit;font-size:13px;font-weight:600;color:var(--ink-muted);cursor:pointer;transition:all .2s}
    .tab-pill button.active{background:#fff;color:var(--ink);box-shadow:0 1px 6px rgba(0,0,0,.1)}
    @keyframes spin{to{transform:rotate(360deg)}}
    .spinner{width:20px;height:20px;border:2.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite}
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════ */
const Icon = ({ d, w = 20, h = 20, ...p }) => (<svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d={d} />{p.children}</svg>);
const ShieldIcon = () => <Icon w={22} h={22} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>;
const UserIcon  = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="8" r="4"/></svg>);
const HeartIcon = () => <Icon d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>;
const CopyIcon  = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>);
const ArrowLeft = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>);
const CheckCircle= () => (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const LinkIcon  = () => (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>);
const LocIcon   = () => (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>);
const PinIcon   = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
const XIcon     = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
const LogInIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>);
const LogOutIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>);
const MapIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>);
const AlertIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
const GlobeIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);

/* ═══════════════════════════════════════════════════════════════
   LANGUAGE SWITCHER
   ═══════════════════════════════════════════════════════════════ */
function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 1000 }}>
      <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} style={{ background: 'rgba(255,255,255,.9)', border: '1.5px solid #d4e8ef', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--ink)', transition: 'all .2s', boxShadow: '0 2px 8px rgba(0,0,0,.1)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--azure)'; e.currentTarget.style.background = 'var(--azure-pale)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#d4e8ef'; e.currentTarget.style.background = 'rgba(255,255,255,.9)'; }}>
        <GlobeIcon />
        {lang === 'en' ? 'العربية' : 'English'}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GEOFENCING UTILITY
   ═══════════════════════════════════════════════════════════════ */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/* ═══════════════════════════════════════════════════════════════
   LIVE MAP WITH GEOFENCING
   ═══════════════════════════════════════════════════════════════ */
function LiveMapWithGeofence({ centerLat, centerLng, radius, onRadiusChange, onZoneStatusChange }) {
  const { t } = useLang();
  const mapRef = useRef(null);
  const circleRef = useRef(null);
  const markerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [userPosition, setUserPosition] = useState(null);
  const [isOutsideZone, setIsOutsideZone] = useState(false);
  const [leaflet, setLeaflet] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setLeaflet(window.L);
      document.body.appendChild(script);
    } else if (window.L) {
      setLeaflet(window.L);
    }
  }, []);

  useEffect(() => {
    if (!leaflet || !mapRef.current || mapRef.current._leaflet_id) return;
    const map = leaflet.map(mapRef.current).setView([centerLat, centerLng], 15);
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map);
    const centerIcon = leaflet.divIcon({ className: 'custom-div-icon', html: `<div style="width:24px;height:24px;background:var(--azure);border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>`, iconSize: [24, 24], iconAnchor: [12, 12] });
    markerRef.current = leaflet.marker([centerLat, centerLng], { icon: centerIcon }).addTo(map).bindPopup('Safe Zone Center');
    circleRef.current = leaflet.circle([centerLat, centerLng], { color: 'var(--azure)', fillColor: 'var(--azure)', fillOpacity: 0.15, radius: radius, weight: 2 }).addTo(map);
    mapRef.current._leafletMap = map;
    return () => { if (map) map.remove(); };
  }, [leaflet, centerLat, centerLng]);

  useEffect(() => { if (circleRef.current) { circleRef.current.setRadius(radius); } }, [radius]);

  useEffect(() => {
    if (!leaflet || !mapRef.current?._leafletMap) return;
    const map = mapRef.current._leafletMap;
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition({ lat: latitude, lng: longitude });
          if (!userMarkerRef.current) {
            const userIcon = leaflet.divIcon({ className: 'custom-div-icon', html: `<div style="width:20px;height:20px;background:var(--coral);border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>`, iconSize: [20, 20], iconAnchor: [10, 10] });
            userMarkerRef.current = leaflet.marker([latitude, longitude], { icon: userIcon }).addTo(map).bindPopup('Your Location');
          } else {
            userMarkerRef.current.setLatLng([latitude, longitude]);
          }
          const distance = calculateDistance(centerLat, centerLng, latitude, longitude);
          const outsideZone = distance > radius;
          if (outsideZone !== isOutsideZone) {
            setIsOutsideZone(outsideZone);
            onZoneStatusChange(!outsideZone);
          }
        },
        (error) => { console.error('Geolocation error:', error); },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }
    return () => { if (watchId) navigator.geolocation.clearWatch(watchId); };
  }, [leaflet, centerLat, centerLng, radius, isOutsideZone, onZoneStatusChange]);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={mapRef} style={{ height: '400px', width: '100%', borderRadius: '12px', border: '2px solid #d4e8ef' }} />
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-light)' }}>{t('radius')}: {radius}m</label>
          <span style={{ fontSize: 12, fontWeight: 600, color: isOutsideZone ? 'var(--coral)' : 'var(--azure)', padding: '4px 12px', background: isOutsideZone ? 'rgba(212,117,106,.1)' : 'rgba(74,144,164,.1)', borderRadius: 6 }}>
            {isOutsideZone ? t('outZone') : t('inZone')}
          </span>
        </div>
        <input type="range" min="50" max="5000" step="50" value={radius} onChange={(e) => onRadiusChange(Number(e.target.value))} style={{ width: '100%', height: 6, borderRadius: 3, background: 'linear-gradient(to right, var(--azure), var(--azure-light))', outline: 'none', WebkitAppearance: 'none' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-muted)', marginTop: 4 }}>
          <span>50m</span><span>5000m</span>
        </div>
      </div>
      {userPosition && (
        <div style={{ marginTop: 12, padding: 10, background: 'rgba(255,255,255,.8)', borderRadius: 8, fontSize: 12, border: '1px solid #d4e8ef' }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{t('curLoc')}:</div>
          <div>Lat: {userPosition.lat.toFixed(6)}, Lng: {userPosition.lng.toFixed(6)}</div>
          <div style={{ marginTop: 4, color: 'var(--ink-muted)' }}>{t('dist')}: {calculateDistance(centerLat, centerLng, userPosition.lat, userPosition.lng).toFixed(0)}m</div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIGN UP PAGE
   ═══════════════════════════════════════════════════════════════ */
function SignUpPage({ onGuardianSignUp, onSwitchToLogin, onBack }) {
  const { t } = useLang();
  const [role, setRole] = useState("guardian");
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "", fullName: "", nationalId: "", phone: "", address: "", patientName: "", patientNationalId: "", patientEmail: "", patientPhone: "", patientAddress: "", token: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (role === "guardian") {
      if (!form.email || !form.password || !form.fullName || !form.nationalId || !form.phone || !form.address || !form.patientName || !form.patientNationalId || !form.patientEmail || !form.patientPhone || !form.patientAddress) {
        setErr(t('err1'));
        return;
      }
      if (form.password !== form.confirmPassword) {
        setErr(t('err3'));
        return;
      }
      setLoading(true);
      await new Promise(r => setTimeout(r, 800));
      const token = generateToken();
      const guardianData = { email: form.email, password: form.password, role: "guardian", fullName: form.fullName, nationalId: form.nationalId, phone: form.phone, address: form.address, patient: { fullName: form.patientName, nationalId: form.patientNationalId, email: form.patientEmail, phone: form.patientPhone, address: form.patientAddress }, location: { lat: 30.0444, lng: 31.2357 }, token };
      accountsDB.push(guardianData);
      localStorage.setItem("sanad-accounts", JSON.stringify(accountsDB));
      setLoading(false);
      onGuardianSignUp(guardianData);
    } else {
      if (!form.email || !form.password || !form.token) {
        setErr(t('err2'));
        return;
      }
      if (form.password !== form.confirmPassword) {
        setErr(t('err3'));
        return;
      }
      setLoading(true);
      await new Promise(r => setTimeout(r, 800));
      const guardian = accountsDB.find(a => a.role === "guardian" && a.token === form.token);
      if (!guardian) {
        setErr(t('err4'));
        setLoading(false);
        return;
      }
      const patientData = { email: form.email, password: form.password, role: "patient", linkedToken: form.token };
      accountsDB.push(patientData);
      setLoading(false);
      onSwitchToLogin();
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />
      {onBack && (
        <button onClick={onBack} style={{ position: 'absolute', top: 24, left: 24, zIndex: 10, background: 'rgba(255,255,255,.9)', border: '1.5px solid #d4e8ef', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--ink)', transition: 'all .2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--azure)'; e.currentTarget.style.background = 'var(--azure-pale)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#d4e8ef'; e.currentTarget.style.background = 'rgba(255,255,255,.9)'; }}>
          <ArrowLeft /> {t('back')}
        </button>
      )}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 300, marginBottom: 6 }}>{t('create')}</h1>
          <p style={{ fontSize: 14, color: "var(--ink-muted)" }}>{t('join')}</p>
        </div>
        <div className="fade-up fade-up-d1" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 28, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <div className="tab-pill" style={{ marginBottom: 20 }}>
            <button className={role === "guardian" ? "active" : ""} onClick={() => setRole("guardian")}>👤 {t('guard')}</button>
            <button className={role === "patient" ? "active" : ""} onClick={() => setRole("patient")}>💙 {t('pat')}</button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {role === "guardian" ? (
              <>
                <div><input className="input-base" type="email" placeholder={t('guardEmail')} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div><input className="input-base" type="password" placeholder={t('pass')} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
                <div><input className="input-base" type="password" placeholder={t('confirmPass')} value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} /></div>
                <div><input className="input-base" type="text" placeholder={t('name')} value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} /></div>
                <div><input className="input-base" type="text" placeholder={t('natId')} value={form.nationalId} onChange={e => setForm({ ...form, nationalId: e.target.value })} /></div>
                <div><input className="input-base" type="tel" placeholder={t('phone')} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                <div><input className="input-base" type="text" placeholder={t('addr')} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
                <div style={{ borderTop: "1.5px solid #d4e8ef", paddingTop: 14, marginTop: 6 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "var(--ink-light)" }}>{t('patInfo')}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <input className="input-base" type="text" placeholder={t('patName')} value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })} />
                    <input className="input-base" type="text" placeholder={t('patId')} value={form.patientNationalId} onChange={e => setForm({ ...form, patientNationalId: e.target.value })} />
                    <input className="input-base" type="email" placeholder={t('patEmail')} value={form.patientEmail} onChange={e => setForm({ ...form, patientEmail: e.target.value })} />
                    <input className="input-base" type="tel" placeholder={t('patPhone')} value={form.patientPhone} onChange={e => setForm({ ...form, patientPhone: e.target.value })} />
                    <input className="input-base" type="text" placeholder={t('patAddr')} value={form.patientAddress} onChange={e => setForm({ ...form, patientAddress: e.target.value })} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div><input className="input-base" type="email" placeholder={t('patEmail')} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div><input className="input-base" type="password" placeholder={t('pass')} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
                <div><input className="input-base" type="password" placeholder={t('confirmPass')} value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} /></div>
                <div><input className="input-base" type="text" placeholder={t('guardToken')} value={form.token} onChange={e => setForm({ ...form, token: e.target.value.toUpperCase() })} /></div>
              </>
            )}
            {err && <p style={{ fontSize: 13, color: "var(--coral)", margin: 0 }}>{err}</p>}
            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 8 }}>
              {loading ? <div className="spinner" style={{ margin: "0 auto" }} /> : t('create')}
            </button>
          </form>
          <p style={{ fontSize: 13, color: "var(--ink-muted)", textAlign: "center", marginTop: 18 }}>
            {t('already')} <span style={{ color: "var(--azure)", cursor: "pointer", fontWeight: 600 }} onClick={onSwitchToLogin}>{t('logIn')}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LOGIN PAGE
   ═══════════════════════════════════════════════════════════════ */
function LoginPage({ onGuardianLogin, onSwitchToSignUp, onBack }) {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !password) {
      setErr(t('err5'));
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const account = accountsDB.find(a => a.email === email && a.password === password);
    if (!account) {
      setErr(t('err6'));
      setLoading(false);
      return;
    }
    setLoading(false);
    onGuardianLogin(account);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />
      {onBack && (
        <button onClick={onBack} style={{ position: 'absolute', top: 24, left: 24, zIndex: 10, background: 'rgba(255,255,255,.9)', border: '1.5px solid #d4e8ef', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--ink)', transition: 'all .2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--azure)'; e.currentTarget.style.background = 'var(--azure-pale)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#d4e8ef'; e.currentTarget.style.background = 'rgba(255,255,255,.9)'; }}>
          <ArrowLeft /> {t('back')}
        </button>
      )}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 300, marginBottom: 6 }}>{t('welcomeBack')}</h1>
          <p style={{ fontSize: 14, color: "var(--ink-muted)" }}>{t('loginMsg')}</p>
        </div>
        <div className="fade-up fade-up-d1" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 28, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><input className="input-base" type="email" placeholder={t('email')} value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div><input className="input-base" type="password" placeholder={t('pass')} value={password} onChange={e => setPassword(e.target.value)} /></div>
            <div style={{ padding: 12, background: 'var(--azure-pale)', borderRadius: 10, fontSize: 12, border: '1px solid var(--azure)' }}>
              <div style={{ fontWeight: 600, marginBottom: 6, color: 'var(--azure-dark)' }}>🔑 {t('demoMsg')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, color: 'var(--ink-light)' }}>
                <div><strong>{t('guard')}:</strong> guardian@demo.com / demo1234</div>
                <div><strong>{t('pat')}:</strong> patient@demo.com / demo1234</div>
              </div>
            </div>
            {err && <p style={{ fontSize: 13, color: "var(--coral)", margin: 0 }}>{err}</p>}
            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 8 }}>
              {loading ? <div className="spinner" style={{ margin: "0 auto" }} /> : t('logIn')}
            </button>
          </form>
          <p style={{ fontSize: 13, color: "var(--ink-muted)", textAlign: "center", marginTop: 18 }}>
            {t('dontHave')} <span style={{ color: "var(--azure)", cursor: "pointer", fontWeight: 600 }} onClick={onSwitchToSignUp}>{t('signUp')}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOKEN PAGE
   ═══════════════════════════════════════════════════════════════ */
function TokenPage({ guardianData, onGoHome }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(guardianData.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      {copied && <div className="toast">✓ {t('copied')}</div>}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 440, textAlign: "center" }}>
        <div className="fade-up" style={{ color: "var(--azure)", marginBottom: 20 }}><CheckCircle /></div>
        <h1 className="fade-up fade-up-d1" style={{ fontFamily: "'Fraunces',serif", fontSize: 26, fontWeight: 300, marginBottom: 10 }}>{t('created')}</h1>
        <p className="fade-up fade-up-d2" style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 32 }}>{t('shareMsg')}</p>
        <div className="fade-up fade-up-d3" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 28, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <div style={{ background: "linear-gradient(135deg,var(--azure-pale),#fff)", borderRadius: 14, padding: 20, marginBottom: 20, border: "2px dashed var(--azure)" }}>
            <p style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 8, fontWeight: 600 }}>{t('yourToken')}</p>
            <p style={{ fontSize: 24, fontWeight: 600, letterSpacing: 2, fontFamily: "monospace", color: "var(--azure)" }}>{guardianData.token}</p>
          </div>
          <button className="btn-primary" onClick={handleCopy} style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <CopyIcon /> {t('copyToken')}
          </button>
          <button className="btn-primary btn-secondary" onClick={onGoHome}>{t('contDash')}</button>
        </div>
        <p className="fade-up fade-up-d4" style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 24 }}>{t('keepSafe')}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE (DASHBOARD)
   ═══════════════════════════════════════════════════════════════ */
function HomePage({ guardianData, onLogout }) {
  const { t } = useLang();
  const [view, setView] = useState("dashboard");
  const [radius, setRadius] = useState(500);
  const [zoneStatus, setZoneStatus] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleZoneStatusChange = useCallback((isInside) => {
    setZoneStatus(isInside);
    if (!isInside) {
      setShowAlert(true);
      console.log('🚨 ALERT: Patient has left the safe zone!');
      console.log('Backend status: false');
      setTimeout(() => setShowAlert(false), 10000);
    } else {
      setShowAlert(false);
      console.log('✅ Patient is within safe zone');
      console.log('Backend status: true');
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ice-blue)", position: "relative" }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      {showAlert && (
        <div className="zone-alert">
          <AlertIcon />
          <div>
            <div style={{ fontWeight: 700 }}>{t('alertTitle')}</div>
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 2 }}>{t('alertSub')}</div>
          </div>
          <button onClick={() => setShowAlert(false)} style={{ background: 'rgba(255,255,255,.2)', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', color: '#fff' }}>
            <XIcon />
          </button>
        </div>
      )}
      <header style={{ background: "rgba(255,255,255,.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid #d4e8ef", position: "sticky", top: 0, zIndex: 100, padding: "16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,var(--azure),var(--azure-dark))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <ShieldIcon />
            </div>
            <div>
              <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 600 }}>{t('app')}</h1>
              <p style={{ fontSize: 12, color: "var(--ink-muted)" }}>
                {guardianData ? `${t('welcome')}, ${guardianData.fullName.split(' ')[0]}` : t('dash')}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <LangSwitch />
            {view === "map" && (
              <button onClick={() => setView("dashboard")} style={{ background: '#fff', border: '1.5px solid #d4e8ef', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--ink)', transition: 'all .2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--azure)'; e.currentTarget.style.background = 'var(--azure-pale)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#d4e8ef'; e.currentTarget.style.background = '#fff'; }}>
                <ArrowLeft /> {t('backDash')}
              </button>
            )}
            <button onClick={onLogout} style={{ background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all .2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#c0635a'; e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--coral)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <LogOutIcon /> {t('logout')}
            </button>
          </div>
        </div>
      </header>
      <main style={{ position: "relative", zIndex: 1, padding: 32, maxWidth: 1200, margin: "0 auto" }}>
        {view === "dashboard" && guardianData && (
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.5)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>🏥 {t('patStatus')}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ padding: 12, background: zoneStatus ? 'rgba(74,144,164,.1)' : 'rgba(212,117,106,.1)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: zoneStatus ? 'var(--azure)' : 'var(--coral)' }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: zoneStatus ? 'var(--azure-dark)' : 'var(--coral)' }}>
                      {zoneStatus ? t('inside') : t('outside')}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 2 }}>
                      {zoneStatus ? t('patInside') : t('patOutside')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.5)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>👤 {t('patInfoTitle')}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { l: t('nameLabel'), i: "👤", v: guardianData?.patient?.fullName || "—" },
                  { l: t('email'), i: "📧", v: guardianData?.patient?.email || "—" },
                  { l: t('phone'), i: "📱", v: guardianData?.patient?.phone || "—" },
                ].map(x => (
                  <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #f0ece7" }}>
                    <span style={{ fontSize: 17 }}>{x.i}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 11, color: "var(--ink-muted)" }}>{x.l}</p>
                      <p style={{ fontSize: 13, fontWeight: 600 }}>{x.v}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg,var(--azure-pale),#e8f4f8)", borderRadius: 16, padding: 20, boxShadow: "var(--shadow)", border: "1px solid rgba(74,144,164,.2)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>⚡ {t('quickAct')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button className="btn-primary" onClick={() => setView("map")} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <MapIcon /> {t('viewMap')}
                </button>
                <button className="btn-primary btn-secondary" onClick={() => alert(`Your linking token: ${guardianData.token}`)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <CopyIcon /> {t('copyLink')}
                </button>
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg,#daf2f7,#e8f4f8)", borderRadius: 16, padding: 18, boxShadow: "var(--shadow)", border: "1px solid #b8d4dc", gridColumn: 'span 2' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--cyan)" }}>🔔 {t('recent')}</h3>
              {[
                { t: zoneStatus ? t('insideMsg') : t('outsideMsg'), time: t('now'), d: zoneStatus ? "var(--azure)" : "var(--coral)" },
                { t: t('locUpdate'), time: `2 ${t('min')}`, d: "var(--azure)" },
                { t: t('sysCheck'), time: `5 ${t('min')}`, d: "var(--cyan)" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 2 ? "1px solid #b8d4dc" : "none" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: a.d, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, flex: 1, fontWeight: i === 0 && !zoneStatus ? 600 : 400 }}>{a.t}</span>
                  <span style={{ fontSize: 12, color: "var(--ink-muted)" }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {view === "map" && guardianData && (
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, fontFamily: "'Fraunces',serif" }}>{t('liveTrack')}</h2>
            <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 24 }}>{t('monPat')}</p>
            <LiveMapWithGeofence centerLat={guardianData.location.lat} centerLng={guardianData.location.lng} radius={radius} onRadiusChange={setRadius} onZoneStatusChange={handleZoneStatusChange} />
            <div style={{ marginTop: 20, padding: 16, background: 'var(--azure-pale)', borderRadius: 10, fontSize: 13 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>ℹ️ {t('how')}</div>
              <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--ink-light)' }}>
                <li>{t('tip1')}</li>
                <li>{t('tip2')}</li>
                <li>{t('tip3')}</li>
                <li>{t('tip4')}</li>
                <li>{t('tip5')}</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */
function generateToken() {
  const ch = "ABCDEFGHKMNPQRST23456789";
  let t = "";
  for (let i = 0; i < 12; i++) { 
    t += ch[Math.floor(Math.random() * ch.length)]; 
    if ((i + 1) % 4 === 0 && i < 11) t += "-"; 
  }
  return t;
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("landing");
  const [guardianData, setGuardianData] = useState(null);

  const handleLogout = () => {
    setGuardianData(null);
    setPage("landing");
  };

  const Landing = () => {
    const { t } = useLang();
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
        <div className="mesh-bg" /><div className="texture-overlay" />
        <LangSwitch />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, textAlign: "center" }}>
          <div className="fade-up" style={{ marginBottom: 44 }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,var(--azure),var(--azure-dark))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 6px 28px rgba(74,144,164,.3)", color: "#fff" }}>
              <ShieldIcon />
            </div>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 30, fontWeight: 300, letterSpacing: "-.02em" }}>{t('app')}</h1>
            <p style={{ fontSize: 15, color: "var(--ink-muted)", marginTop: 6 }}>{t('tag')}</p>
          </div>
          <div className="fade-up fade-up-d1" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: "32px 24px", boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <button className="btn-primary" onClick={() => setPage("signup")} style={{ marginBottom: 12 }}>
              👤 &nbsp;{t('signUp')}
            </button>
            <button className="btn-primary btn-secondary" onClick={() => setPage("login")}>
              <LogInIcon /> &nbsp;{t('logIn')}
            </button>
          </div>
          <p className="fade-up fade-up-d2" style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 24 }}>
            {t('byContinuing')} <span style={{ color: "var(--azure)", cursor: "pointer" }}>{t('terms')}</span> &amp; <span style={{ color: "var(--azure)", cursor: "pointer" }}>{t('privacy')}</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <LanguageProvider>
      <GlobalStyle />
      {page === "landing" && <Landing />}
      {page === "signup" && (
        <SignUpPage
          onGuardianSignUp={(data) => { setGuardianData(data); setPage("token"); }}
          onSwitchToLogin={() => setPage("login")}
          onBack={() => setPage("landing")}
        />
      )}
      {page === "login" && (
        <LoginPage
          onGuardianLogin={(acc) => {
            if (acc.role === "patient") {
              const guardian = accountsDB.find(
                g => g.role === "guardian" && g.token === acc.linkedToken
              );
              setGuardianData(guardian || null);
            } else {
              setGuardianData(acc);
            }
            setPage("home");
          }}
          onSwitchToSignUp={() => setPage("signup")}  
          onBack={() => setPage("landing")}
        />
      )}
      {page === "token" && <TokenPage guardianData={guardianData} onGoHome={() => setPage("home")} />}
      {page === "home" && <HomePage guardianData={guardianData} onLogout={handleLogout} />}
    </LanguageProvider>
  );
}
