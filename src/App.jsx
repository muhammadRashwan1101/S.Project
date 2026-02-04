import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

/* ═══════════════════════════════════════════════════════════════
   LANGUAGE CONTEXT & TRANSLATIONS
   ═══════════════════════════════════════════════════════════════ */
const LanguageContext = createContext();

const TR = {
  en: {
    app: "Sanad", tag: "Safe, connected, always together.", signUp: "Sign Up", logIn: "Log In", logout: "Logout", back: "Back", backDash: "Back to Dashboard", terms: "Terms", privacy: "Privacy", byContinuing: "By continuing you agree to our", create: "Create Account", join: "Join Sanad and start caring", guard: "Guardian", pat: "Patient", email: "Email", pass: "Password", confirmPass: "Confirm Password", name: "Full Name", natId: "National ID", phone: "Phone", addr: "Address", patInfo: "Patient Information", patName: "Patient Full Name", patId: "Patient National ID", patEmail: "Patient Email", patPhone: "Patient Phone", patAddr: "Patient Address", guardEmail: "Guardian Email", guardToken: "Guardian Token (e.g. XXXX-XXXX-XXXX)", already: "Already have an account?", dontHave: "Don't have an account?", welcomeBack: "Welcome Back", loginMsg: "Log in to continue caring", demoMsg: "Demo Credentials:", created: "Account Created!", shareMsg: "Share this token with your patient so they can link their account", yourToken: "YOUR LINKING TOKEN", copyToken: "Copy Token", contDash: "Continue to Dashboard", keepSafe: "Keep this token safe. You can find it again in your dashboard settings.", copied: "Token copied to clipboard!", welcome: "Welcome", dash: "Dashboard", patStatus: "Patient Status", inside: "Inside Safe Zone", outside: "Outside Safe Zone", patInside: "Patient is within designated area", patOutside: "Alert: Patient has left safe zone", patInfoTitle: "Patient Info", nameLabel: "Name", quickAct: "Quick Actions", viewMap: "View Live Map & Geofence", copyLink: "Copy Linking Token", recent: "Recent Activity", insideMsg: "Patient inside safe zone", outsideMsg: "Patient left safe zone", locUpdate: "Location updated", sysCheck: "System check completed", now: "Just now", min: "min ago", liveTrack: "Live Location Tracking", monPat: "Monitor patient location in real-time and configure the safe zone radius", radius: "Safe Zone Radius", inZone: "Inside Zone", outZone: "Outside Zone", curLoc: "Current Location", dist: "Distance from center", how: "How It Works:", tip1: "The blue zone shows the safe area around the center point", tip2: "The coral marker shows the patient's current location", tip3: "Adjust the radius slider to customize the safe zone size", tip4: "You'll receive alerts when the patient leaves the safe zone", tip5: "Status is automatically sent to the backend (console.log)", alertTitle: "Patient Left Safe Zone!", alertSub: "Check location immediately", err1: "Please fill in all guardian and patient fields", err2: "Please fill in all patient fields", err3: "Passwords do not match", err4: "Invalid token. Please check with your guardian.", err5: "Please enter both email and password", err6: "Invalid credentials",
    selectRole: "Select Your Role", selectRoleMsg: "Choose how you'll be using Sanad", guardianRole: "I'm a Guardian", guardianDesc: "Monitor and care for a patient", patientRole: "I'm a Patient", patientDesc: "Connect with my guardian", continue: "Continue", chooseLocation: "Choose Location", locationMsg: "Set your safe zone center location", searchLocation: "Search for a location...", useCurrentLoc: "Use Current Location", dragPin: "Drag the pin to your desired location", clickMap: "Or click anywhere on the map", confirmLoc: "Confirm Location", locPermDenied: "Location permission denied", editSafeZone: "Edit Safe Zone", saveChanges: "Save Changes", testLocation: "Test Patient Location", setTestLoc: "Set Test Location", currentTestLoc: "Current Test Location", resetToActual: "Reset to Actual Location", viewOnMap: "View on Map", locationSaved: "Location saved successfully!", safeZoneUpdated: "Safe zone updated!", usingTestLoc: "Using test location", testLocSet: "Test location set", returnToActual: "Returned to actual location", locating: "Getting your location...", mapInstructions: "Search, click on map, or drag the marker to set location", myProfile: "My Profile", guardianInfo: "Guardian Information", noPatientLinked: "No patient linked yet", waitingForPatient: "Waiting for patient to sign up with your token", patientLinked: "Patient Linked", viewProfile: "View Profile", closeProfile: "Close"
  },
  ar: {
    app: "سند", tag: "آمن، متصل، معاً دائماً", signUp: "إنشاء حساب", logIn: "تسجيل الدخول", logout: "تسجيل الخروج", back: "رجوع", backDash: "العودة إلى لوحة التحكم", terms: "الشروط", privacy: "الخصوصية", byContinuing: "بالمتابعة، أنت توافق على", create: "إنشاء حساب", join: "انضم إلى سند وابدأ الرعاية", guard: "الوصي", pat: "المريض", email: "البريد الإلكتروني", pass: "كلمة المرور", confirmPass: "تأكيد كلمة المرور", name: "الاسم الكامل", natId: "الرقم القومي", phone: "رقم الهاتف", addr: "العنوان", patInfo: "معلومات المريض", patName: "الاسم الكامل للمريض", patId: "الرقم القومي للمريض", patEmail: "البريد الإلكتروني للمريض", patPhone: "رقم هاتف المريض", patAddr: "عنوان المريض", guardEmail: "البريد الإلكتروني للوصي", guardToken: "رمز الوصي (مثال: XXXX-XXXX-XXXX)", already: "لديك حساب بالفعل؟", dontHave: "ليس لديك حساب؟", welcomeBack: "مرحباً بعودتك", loginMsg: "سجل الدخول للمتابعة", demoMsg: "بيانات تجريبية:", created: "تم إنشاء الحساب!", shareMsg: "شارك هذا الرمز مع مريضك حتى يتمكن من ربط حسابه", yourToken: "رمز الربط الخاص بك", copyToken: "نسخ الرمز", contDash: "المتابعة إلى لوحة التحكم", keepSafe: "احتفظ بهذا الرمز بأمان. يمكنك العثور عليه مرة أخرى في إعدادات لوحة التحكم.", copied: "تم نسخ الرمز!", welcome: "مرحباً", dash: "لوحة التحكم", patStatus: "حالة المريض", inside: "داخل المنطقة الآمنة", outside: "خارج المنطقة الآمنة", patInside: "المريض داخل المنطقة المحددة", patOutside: "تنبيه: المريض غادر المنطقة الآمنة", patInfoTitle: "معلومات المريض", nameLabel: "الاسم", quickAct: "إجراءات سريعة", viewMap: "عرض الخريطة المباشرة", copyLink: "نسخ رمز الربط", recent: "النشاط الأخير", insideMsg: "المريض داخل المنطقة الآمنة", outsideMsg: "⚠️ المريض غادر المنطقة الآمنة", locUpdate: "تم تحديث الموقع", sysCheck: "تم فحص النظام", now: "الآن", min: "دقيقة مضت", liveTrack: "تتبع الموقع المباشر", monPat: "راقب موقع المريض في الوقت الفعلي وقم بتكوين نصف قطر المنطقة الآمنة", radius: "نصف قطر المنطقة الآمنة", inZone: "✓ داخل المنطقة", outZone: "⚠️ خارج المنطقة", curLoc: "الموقع الحالي", dist: "المسافة من المركز", how: "كيف يعمل:", tip1: "المنطقة الزرقاء توضح المنطقة الآمنة حول نقطة المركز", tip2: "العلامة المرجانية توضح موقع المريض الحالي", tip3: "اضبط شريط التمرير لتخصيص حجم المنطقة الآمنة", tip4: "ستتلقى تنبيهات عندما يغادر المريض المنطقة الآمنة", tip5: "يتم إرسال الحالة تلقائياً إلى الخادم", alertTitle: "المريض غادر المنطقة الآمنة!", alertSub: "تحقق من الموقع فوراً", err1: "يرجى ملء جميع حقول الوصي والمريض", err2: "يرجى ملء جميع حقول المريض", err3: "كلمات المرور غير متطابقة", err4: "رمز غير صالح. يرجى التحقق مع الوصي الخاص بك.", err5: "يرجى إدخال البريد الإلكتروني وكلمة المرور", err6: "بيانات اعتماد غير صالحة",
    selectRole: "اختر دورك", selectRoleMsg: "اختر كيف ستستخدم سند", guardianRole: "أنا وصي", guardianDesc: "مراقبة والعناية بمريض", patientRole: "أنا مريض", patientDesc: "الاتصال مع الوصي الخاص بي", continue: "متابعة", chooseLocation: "اختر الموقع", locationMsg: "حدد موقع مركز المنطقة الآمنة", searchLocation: "ابحث عن موقع...", useCurrentLoc: "استخدم الموقع الحالي", dragPin: "اسحب الدبوس إلى الموقع المطلوب", clickMap: "أو انقر في أي مكان على الخريطة", confirmLoc: "تأكيد الموقع", locPermDenied: "تم رفض إذن الموقع", editSafeZone: "تعديل المنطقة الآمنة", saveChanges: "حفظ التغييرات", testLocation: "اختبار موقع المريض", setTestLoc: "تعيين موقع اختباري", currentTestLoc: "الموقع الاختباري الحالي", resetToActual: "العودة للموقع الفعلي", viewOnMap: "عرض على الخريطة", locationSaved: "تم حفظ الموقع بنجاح!", safeZoneUpdated: "تم تحديث المنطقة الآمنة!", usingTestLoc: "استخدام موقع اختباري", testLocSet: "تم تعيين موقع اختباري", returnToActual: "تم العودة للموقع الفعلي", locating: "جاري تحديد موقعك...", mapInstructions: "ابحث، انقر على الخريطة، أو اسحب العلامة لتحديد الموقع", myProfile: "ملفي الشخصي", guardianInfo: "معلومات الوصي", noPatientLinked: "لا يوجد مريض مرتبط بعد", waitingForPatient: "في انتظار المريض للتسجيل باستخدام الرمز الخاص بك", patientLinked: "المريض مرتبط", viewProfile: "عرض الملف الشخصي", closeProfile: "إغلاق"
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
   SESSION MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */
const SESSION_KEY = 'sanad-session';
const SESSION_ID_KEY = 'sanad-session-id';

// Generate unique session ID for this tab/window
function generateSessionId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Save session with tab-specific session ID
function saveSession(userData) {
  const sessionId = generateSessionId();
  localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
  sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  return sessionId;
}

// Get current session and validate it's for this tab
function getSession() {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    const currentSessionId = sessionStorage.getItem(SESSION_ID_KEY);
    
    if (!sessionData || !currentSessionId) {
      return null;
    }
    
    return JSON.parse(sessionData);
  } catch (e) {
    console.error('Session parse error:', e);
    return null;
  }
}

// Clear session
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_ID_KEY);
}

// Initialize session ID for this tab if user is logged in
function initializeSessionId() {
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (sessionData && !sessionStorage.getItem(SESSION_ID_KEY)) {
    sessionStorage.setItem(SESSION_ID_KEY, generateSessionId());
  }
}

/* ═══════════════════════════════════════════════════════════════
   FAKE AUTH STORE
   ═══════════════════════════════════════════════════════════════ */
const DEMO_ACCOUNTS = [
  { email: "guardian@demo.com", password: "demo1234", role: "guardian", fullName: "Ahmed Hassan", nationalId: "30101011234", phone: "+20 123 456 7890", address: "15 Tahrir St, Cairo", patient: null, location: { lat: 30.0444, lng: 31.2357 }, safeZoneCenter: { lat: 30.0444, lng: 31.2357 }, token: "DEMO-TKNA-ABCD" },
  { email: "patient@demo.com", password: "demo1234", role: "patient", fullName: "Sara Hassan", nationalId: "85050512345", phone: "+20 987 654 3210", linkedToken: "DEMO-TKNA-ABCD" }
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
    [dir="rtl"] .toast{right:auto;left:24px}
    .modal-backdrop{position:fixed;inset:0;background:rgba(26,26,26,.45);backdrop-filter:blur(6px);z-index:800;display:flex;align-items:center;justify-content:center;padding:20px}
    @keyframes modalPop{from{opacity:0;transform:scale(.94) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .modal-card{background:#fff;border-radius:22px;box-shadow:0 24px 60px rgba(0,0,0,.18);animation:modalPop .3s cubic-bezier(.22,1,.36,1) both;max-width:520px;width:100%;max-height:90vh;overflow-y:auto}
    .leaflet-container{border-radius:12px;font-family:inherit!important;z-index:1}
    .leaflet-control-zoom{margin:8px!important}
    .leaflet-popup-content-wrapper{border-radius:10px;font-family:inherit}
    @keyframes alertPulse{0%,100%{opacity:1}50%{opacity:.7}}
    .alert-pulse{animation:alertPulse 1.5s ease-in-out infinite}
    .role-card{background:var(--card-bg);backdrop-filter:blur(20px);border-radius:16px;padding:24px;border:2px solid rgba(255,255,255,.6);cursor:pointer;transition:all .25s;text-align:center}
    .role-card:hover{border-color:var(--azure);box-shadow:var(--shadow-hover);transform:translateY(-2px)}
    .role-card.selected{border-color:var(--azure);background:var(--azure-pale);box-shadow:0 0 0 3px rgba(74,144,164,.15)}
    .location-search{position:absolute;top:16px;left:50%;transform:translateX(-50%);z-index:1000;width:90%;max-width:400px}
    [dir="rtl"] .location-search{left:auto;right:50%;transform:translateX(50%)}
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const LogInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const NavigationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} style={{ position: "fixed", top: 20, right: 20, zIndex: 900, background: "var(--card-bg)", backdropFilter: "blur(20px)", border: "1.5px solid rgba(255,255,255,.6)", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "var(--azure)", transition: "all .2s", boxShadow: "var(--shadow)" }}>
      {lang === 'en' ? 'عربي' : 'English'}
    </button>
  );
}

function Toast({ msg, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return <div className="toast"><CheckIcon /> {msg}</div>;
}

/* ═══════════════════════════════════════════════════════════════
   ROLE SELECTION PAGE
   ═══════════════════════════════════════════════════════════════ */
function RoleSelectionPage({ onRoleSelected, onBack }) {
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
              className={`role-card ${selectedRole === 'patient' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('patient')}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🧑‍🦳</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{t('patientRole')}</h3>
              <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>{t('patientDesc')}</p>
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

/* ═══════════════════════════════════════════════════════════════
   LOCATION PICKER COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function LocationPicker({ initialLocation, onLocationSelected, onCancel, showSafeZone, safeZoneCenter, safeZoneRadius }) {
  const { t } = useLang();
  const [location, setLocation] = useState(initialLocation || { lat: 30.0444, lng: 31.2357 });
  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Wait for Leaflet to load
    const initMap = () => {
      if (typeof window === 'undefined' || !window.L) {
        setTimeout(initMap, 100);
        return;
      }
      
      const L = window.L;
      
      // Clean up any existing map
      const existingMap = document.getElementById('location-picker-map');
      if (existingMap) {
        existingMap.innerHTML = '';
      }

      const map = L.map('location-picker-map').setView([location.lat, location.lng], 13);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Add safe zone circle if showSafeZone is true
      if (showSafeZone && safeZoneCenter) {
        L.circle([safeZoneCenter.lat, safeZoneCenter.lng], {
          color: '#4a90a4',
          fillColor: '#4a90a4',
          fillOpacity: 0.15,
          radius: safeZoneRadius || 500
        }).addTo(map);

        // Add center marker for safe zone
        L.marker([safeZoneCenter.lat, safeZoneCenter.lng], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:#4a90a4;width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>',
            iconSize: [14, 14]
          })
        }).addTo(map).bindPopup('<b>Safe Zone Center</b>');
      }

      const marker = L.marker([location.lat, location.lng], { draggable: true }).addTo(map);
      markerRef.current = marker;

      marker.on('dragend', function(e) {
        const pos = e.target.getLatLng();
        setLocation({ lat: pos.lat, lng: pos.lng });
        reverseGeocode(pos.lat, pos.lng);
      });

      map.on('click', function(e) {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setLocation({ lat, lng });
        reverseGeocode(lat, lng);
      });

      reverseGeocode(location.lat, location.lng);
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      setAddress(data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    } catch (error) {
      setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newLat = parseFloat(lat);
        const newLng = parseFloat(lon);
        
        setLocation({ lat: newLat, lng: newLng });
        
        if (mapRef.current && markerRef.current) {
          mapRef.current.setView([newLat, newLng], 15);
          markerRef.current.setLatLng([newLat, newLng]);
        }
        
        reverseGeocode(newLat, newLng);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const getCurrentLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          
          if (mapRef.current && markerRef.current) {
            mapRef.current.setView([latitude, longitude], 15);
            markerRef.current.setLatLng([latitude, longitude]);
          }
          
          reverseGeocode(latitude, longitude);
          setIsLocating(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert(t('locPermDenied'));
          setIsLocating(false);
        }
      );
    } else {
      alert(t('locPermDenied'));
      setIsLocating(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal-card" style={{ maxWidth: 700 }}>
        <div style={{ padding: 24 }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{t('chooseLocation')}</h2>
          <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: 20 }}>{t('mapInstructions')}</p>

          <div style={{ position: "relative", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                className="input-base"
                placeholder={t('searchLocation')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
                style={{ flex: 1 }}
              />
              <button 
                className="btn-primary" 
                onClick={searchLocation}
                disabled={isSearching}
                style={{ width: 'auto', padding: '0 20px' }}
              >
                🔍
              </button>
              <button 
                className="btn-primary btn-secondary" 
                onClick={getCurrentLocation}
                disabled={isLocating}
                style={{ width: 'auto', padding: '0 20px' }}
                title={t('useCurrentLoc')}
              >
                {isLocating ? '...' : <NavigationIcon />}
              </button>
            </div>
          </div>

          <div style={{ position: "relative", height: 400, marginBottom: 16, borderRadius: 12, overflow: "hidden" }}>
            <div id="location-picker-map" style={{ height: "100%", width: "100%" }}></div>
          </div>

          <div style={{ background: "var(--azure-pale)", padding: 12, borderRadius: 10, marginBottom: 16, fontSize: 13 }}>
            <div style={{ display: "flex", alignItems: "start", gap: 8 }}>
              <MapPinIcon />
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{t('curLoc')}:</div>
                <div style={{ color: "var(--ink-light)" }}>{address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-primary btn-secondary" onClick={onCancel} style={{ flex: 1 }}>
              {t('back')}
            </button>
            <button className="btn-primary" onClick={() => onLocationSelected(location, address)} style={{ flex: 1 }}>
              {t('confirmLoc')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIGN UP PAGE
   ═══════════════════════════════════════════════════════════════ */
function SignUpPage({ onGuardianSignUp, onSwitchToLogin, onBack }) {
  const { t } = useLang();
  const [role, setRole] = useState(null);
  const [showRoleSelection, setShowRoleSelection] = useState(true);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationAddress, setLocationAddress] = useState('');

  const [guardianForm, setGuardianForm] = useState({
    email: "", password: "", confirmPassword: "", fullName: "", nationalId: "", phone: "", address: ""
  });
  const [patientForm, setPatientForm] = useState({
    fullName: "", nationalId: "", email: "", phone: "", address: "", guardianEmail: "", guardianToken: ""
  });
  const [err, setErr] = useState("");

  if (showRoleSelection) {
    return (
      <RoleSelectionPage 
        onRoleSelected={(selectedRole) => {
          setRole(selectedRole);
          setShowRoleSelection(false);
        }}
        onBack={onBack}
      />
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (role === "guardian") {
      if (!guardianForm.email || !guardianForm.password || !guardianForm.fullName || !guardianForm.nationalId || !guardianForm.phone || !selectedLocation) {
        setErr(t('err1'));
        return;
      }
      if (guardianForm.password !== guardianForm.confirmPassword) {
        setErr(t('err3'));
        return;
      }

      const token = `LINK-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const newAccount = {
        email: guardianForm.email,
        password: guardianForm.password,
        role: "guardian",
        fullName: guardianForm.fullName,
        nationalId: guardianForm.nationalId,
        phone: guardianForm.phone,
        address: locationAddress || `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`,
        patient: null, // No patient initially
        location: selectedLocation,
        safeZoneCenter: selectedLocation,
        token
      };

      accountsDB.push(newAccount);
      localStorage.setItem("sanad-accounts", JSON.stringify(accountsDB));
      onGuardianSignUp(newAccount);
    } else {
      if (!patientForm.fullName || !patientForm.nationalId || !patientForm.email || !patientForm.phone || !patientForm.guardianEmail || !patientForm.guardianToken) {
        setErr(t('err2'));
        return;
      }

      const guardianIndex = accountsDB.findIndex(acc => acc.role === "guardian" && acc.email === patientForm.guardianEmail && acc.token === patientForm.guardianToken);
      if (guardianIndex === -1) {
        setErr(t('err4'));
        return;
      }

      const guardian = accountsDB[guardianIndex];

      // Create patient account
      const newPatient = {
        email: patientForm.email,
        password: guardianForm.password || "patient123",
        role: "patient",
        fullName: patientForm.fullName,
        nationalId: patientForm.nationalId,
        phone: patientForm.phone,
        linkedToken: patientForm.guardianToken
      };

      // Update guardian account with patient info
      accountsDB[guardianIndex] = {
        ...guardian,
        patient: {
          fullName: patientForm.fullName,
          nationalId: patientForm.nationalId,
          email: patientForm.email,
          phone: patientForm.phone,
          address: guardian.address
        }
      };

      accountsDB.push(newPatient);
      localStorage.setItem("sanad-accounts", JSON.stringify(accountsDB));
      // Save session for patient
      saveSession(newPatient);
      onGuardianSignUp(accountsDB[guardianIndex]);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24, paddingTop: 80, paddingBottom: 80 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />

      {showLocationPicker && (
        <LocationPicker
          initialLocation={selectedLocation}
          onLocationSelected={(loc, addr) => {
            setSelectedLocation(loc);
            setLocationAddress(addr);
            setShowLocationPicker(false);
          }}
          onCancel={() => setShowLocationPicker(false)}
        />
      )}

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>
        <button onClick={() => setShowRoleSelection(true)} style={{ background: "transparent", border: "none", color: "var(--azure)", fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
          ← {t('back')}
        </button>

        <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
            {role === "guardian" ? `${t('create')} - ${t('guard')}` : `${t('create')} - ${t('pat')}`}
          </h2>
          <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 24 }}>{t('join')}</p>

          {err && <div style={{ background: "rgba(212,117,106,.1)", color: "var(--coral)", padding: 12, borderRadius: 10, fontSize: 13, marginBottom: 16 }}>{err}</div>}

          <form onSubmit={handleSubmit}>
            {role === "guardian" && (
              <>
                <input className="input-base" type="email" placeholder={t('email')} value={guardianForm.email} onChange={(e) => setGuardianForm({ ...guardianForm, email: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="password" placeholder={t('pass')} value={guardianForm.password} onChange={(e) => setGuardianForm({ ...guardianForm, password: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="password" placeholder={t('confirmPass')} value={guardianForm.confirmPassword} onChange={(e) => setGuardianForm({ ...guardianForm, confirmPassword: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="text" placeholder={t('name')} value={guardianForm.fullName} onChange={(e) => setGuardianForm({ ...guardianForm, fullName: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="text" placeholder={t('natId')} value={guardianForm.nationalId} onChange={(e) => setGuardianForm({ ...guardianForm, nationalId: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="tel" placeholder={t('phone')} value={guardianForm.phone} onChange={(e) => setGuardianForm({ ...guardianForm, phone: e.target.value })} style={{ marginBottom: 12 }} required />
                
                <div style={{ marginBottom: 12 }}>
                  <button 
                    type="button"
                    className="btn-primary btn-secondary" 
                    onClick={() => setShowLocationPicker(true)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  >
                    <MapPinIcon />
                    {selectedLocation ? t('editSafeZone') : t('chooseLocation')}
                  </button>
                  {selectedLocation && (
                    <div style={{ marginTop: 8, fontSize: 12, color: "var(--ink-muted)", background: "var(--azure-pale)", padding: 8, borderRadius: 6 }}>
                      📍 {locationAddress || `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`}
                    </div>
                  )}
                </div>
              </>
            )}

            {role === "patient" && (
              <>
                <input className="input-base" type="text" placeholder={t('name')} value={patientForm.fullName} onChange={(e) => setPatientForm({ ...patientForm, fullName: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="text" placeholder={t('natId')} value={patientForm.nationalId} onChange={(e) => setPatientForm({ ...patientForm, nationalId: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="email" placeholder={t('email')} value={patientForm.email} onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="tel" placeholder={t('phone')} value={patientForm.phone} onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="password" placeholder={t('pass')} value={guardianForm.password} onChange={(e) => setGuardianForm({ ...guardianForm, password: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="email" placeholder={t('guardEmail')} value={patientForm.guardianEmail} onChange={(e) => setPatientForm({ ...patientForm, guardianEmail: e.target.value })} style={{ marginBottom: 12 }} required />
                <input className="input-base" type="text" placeholder={t('guardToken')} value={patientForm.guardianToken} onChange={(e) => setPatientForm({ ...patientForm, guardianToken: e.target.value })} required />
              </>
            )}

            <button type="submit" className="btn-primary" style={{ marginTop: 24 }}>{t('create')}</button>
          </form>

          <p style={{ textAlign: "center", fontSize: 13, color: "var(--ink-muted)", marginTop: 20 }}>
            {t('already')} <span onClick={onSwitchToLogin} style={{ color: "var(--azure)", cursor: "pointer", fontWeight: 600 }}>{t('logIn')}</span>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !password) {
      setErr(t('err5'));
      return;
    }
    const account = accountsDB.find(acc => acc.email === email && acc.password === password);
    if (!account) {
      setErr(t('err6'));
      return;
    }
    // Save session for persistent login
    saveSession(account);
    onGuardianLogin(account);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", color: "var(--azure)", fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
          ← {t('back')}
        </button>
        <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{t('welcomeBack')}</h2>
          <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 24 }}>{t('loginMsg')}</p>
          
          {err && <div style={{ background: "rgba(212,117,106,.1)", color: "var(--coral)", padding: 12, borderRadius: 10, fontSize: 13, marginBottom: 16 }}>{err}</div>}
          
          <div style={{ background: "var(--azure-pale)", padding: 12, borderRadius: 10, fontSize: 12, marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{t('demoMsg')}</div>
            <div>📧 guardian@demo.com / patient@demo.com</div>
            <div>🔑 demo1234</div>
          </div>

          <form onSubmit={handleSubmit}>
            <input className="input-base" type="email" placeholder={t('email')} value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 12 }} required />
            <input className="input-base" type="password" placeholder={t('pass')} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="btn-primary" style={{ marginTop: 20 }}>{t('logIn')}</button>
          </form>

          <p style={{ textAlign: "center", fontSize: 13, color: "var(--ink-muted)", marginTop: 20 }}>
            {t('dontHave')} <span onClick={onSwitchToSignUp} style={{ color: "var(--azure)", cursor: "pointer", fontWeight: 600 }}>{t('signUp')}</span>
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
  const [showToast, setShowToast] = useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(guardianData.token);
    setShowToast(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      {showToast && <Toast msg={t('copied')} onClose={() => setShowToast(false)} />}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>
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
          <button className="btn-primary btn-secondary" onClick={onGoHome}>
            {t('contDash')}
          </button>
          <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 20 }}>{t('keepSafe')}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROFILE MODAL
   ═══════════════════════════════════════════════════════════════ */
function ProfileModal({ guardianData, onClose }) {
  const { t } = useLang();
  
  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" style={{ maxWidth: 600 }}>
        <div style={{ padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 600 }}>{t('myProfile')}</h2>
            <button onClick={onClose} style={{ background: "transparent", border: "none", fontSize: 24, cursor: "pointer", color: "var(--ink-muted)" }}>×</button>
          </div>

          {/* Guardian Info */}
          <div style={{ background: "var(--azure-pale)", padding: 20, borderRadius: 12, marginBottom: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--azure)" }}>{t('guardianInfo')}</h3>
            <div style={{ display: "grid", gap: 12, fontSize: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{t('name')}:</span>
                <span>{guardianData.fullName}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{t('email')}:</span>
                <span>{guardianData.email}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{t('natId')}:</span>
                <span>{guardianData.nationalId}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{t('phone')}:</span>
                <span>{guardianData.phone}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{t('addr')}:</span>
                <span>{guardianData.address}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{t('guardToken')}:</span>
                <span style={{ fontFamily: "monospace", background: "#fff", padding: "4px 8px", borderRadius: 4 }}>{guardianData.token}</span>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          {guardianData.patient ? (
            <div style={{ background: "var(--cyan-pale)", padding: 20, borderRadius: 12 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--cyan)" }}>{t('patientLinked')}</h3>
              <div style={{ display: "grid", gap: 12, fontSize: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>{t('name')}:</span>
                  <span>{guardianData.patient.fullName}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>{t('email')}:</span>
                  <span>{guardianData.patient.email}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>{t('natId')}:</span>
                  <span>{guardianData.patient.nationalId}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>{t('phone')}:</span>
                  <span>{guardianData.patient.phone}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: "rgba(212,117,106,.1)", padding: 20, borderRadius: 12, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--coral)" }}>{t('noPatientLinked')}</h3>
              <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>{t('waitingForPatient')}</p>
            </div>
          )}

          <button className="btn-primary" onClick={onClose} style={{ marginTop: 24 }}>
            {t('closeProfile')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE / DASHBOARD
   ═══════════════════════════════════════════════════════════════ */
function HomePage({ guardianData, onLogout }) {
  const { t } = useLang();
  const [view, setView] = useState("dashboard");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isEditingSafeZone, setIsEditingSafeZone] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showTestLocationPicker, setShowTestLocationPicker] = useState(false);
  const [testLocation, setTestLocation] = useState(null);
  const [useTestLocation, setUseTestLocation] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Get patient's current location (either test or actual from geolocation)
  const [patientLiveLocation, setPatientLiveLocation] = useState(guardianData.location || { lat: 30.0444, lng: 31.2357 });
  const [safeZoneCenter, setSafeZoneCenter] = useState(guardianData.safeZoneCenter || guardianData.location || { lat: 30.0444, lng: 31.2357 });

  // Track patient's actual location via geolocation
  useEffect(() => {
    if (useTestLocation) return; // Don't update if using test location

    const watchId = navigator.geolocation?.watchPosition(
      (position) => {
        const newLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setPatientLiveLocation(newLoc);
        
        // Update in database
        const updatedAccounts = accountsDB.map(acc => {
          if (acc.email === guardianData.email) {
            return { ...acc, location: newLoc };
          }
          return acc;
        });
        localStorage.setItem("sanad-accounts", JSON.stringify(updatedAccounts));
      },
      (error) => {
        console.log('Geolocation error:', error);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => {
      if (watchId) navigator.geolocation?.clearWatch(watchId);
    };
  }, [useTestLocation, guardianData.email]);

  const currentPatientLocation = useTestLocation ? testLocation : patientLiveLocation;

  const copyToken = () => {
    navigator.clipboard.writeText(guardianData.token);
    setToastMsg(t('copied'));
    setShowToast(true);
  };

  const handleSafeZoneUpdate = (newLocation, address) => {
    setSafeZoneCenter(newLocation);
    setShowLocationPicker(false);
    setIsEditingSafeZone(false);
    
    // Update in database
    const updatedAccounts = accountsDB.map(acc => {
      if (acc.email === guardianData.email) {
        return { ...acc, safeZoneCenter: newLocation };
      }
      return acc;
    });
    localStorage.setItem("sanad-accounts", JSON.stringify(updatedAccounts));
    
    setToastMsg(t('safeZoneUpdated'));
    setShowToast(true);
  };

  const handleTestLocationSet = (newLocation, address) => {
    setTestLocation(newLocation);
    setUseTestLocation(true);
    setShowTestLocationPicker(false);
    setToastMsg(t('testLocSet'));
    setShowToast(true);
  };

  const resetToActualLocation = () => {
    setUseTestLocation(false);
    setTestLocation(null);
    setToastMsg(t('returnToActual'));
    setShowToast(true);
  };

  // Check if patient is outside safe zone
  const distance = calculateDistance(
    currentPatientLocation.lat,
    currentPatientLocation.lng,
    safeZoneCenter.lat,
    safeZoneCenter.lng
  );
  const safeZoneRadius = 0.5; // km
  const isOutsideSafeZone = distance > safeZoneRadius;

  // Auto-navigate to map if patient is outside
  useEffect(() => {
    if (isOutsideSafeZone && view === "dashboard") {
      setView("map");
    }
  }, [isOutsideSafeZone]);

  if (view === "map") {
    return (
      <>
        {showToast && <Toast msg={toastMsg} onClose={() => setShowToast(false)} />}
        {showProfile && <ProfileModal guardianData={guardianData} onClose={() => setShowProfile(false)} />}
        {showLocationPicker && (
          <LocationPicker
            initialLocation={safeZoneCenter}
            onLocationSelected={handleSafeZoneUpdate}
            onCancel={() => {
              setShowLocationPicker(false);
              setIsEditingSafeZone(false);
            }}
          />
        )}
        {showTestLocationPicker && (
          <LocationPicker
            initialLocation={testLocation || currentPatientLocation}
            onLocationSelected={handleTestLocationSet}
            onCancel={() => setShowTestLocationPicker(false)}
            showSafeZone={true}
            safeZoneCenter={safeZoneCenter}
            safeZoneRadius={500}
          />
        )}
        <MapView
          guardianData={guardianData}
          patientLocation={currentPatientLocation}
          safeZoneCenter={safeZoneCenter}
          onBack={() => setView("dashboard")}
          onEditSafeZone={() => {
            setIsEditingSafeZone(true);
            setShowLocationPicker(true);
          }}
          onSetTestLocation={() => setShowTestLocationPicker(true)}
          onResetTestLocation={resetToActualLocation}
          isUsingTestLocation={useTestLocation}
        />
      </>
    );
  }

  return (
    <>
      {showToast && <Toast msg={toastMsg} onClose={() => setShowToast(false)} />}
      {showProfile && <ProfileModal guardianData={guardianData} onClose={() => setShowProfile(false)} />}
      {showLocationPicker && (
        <LocationPicker
          initialLocation={safeZoneCenter}
          onLocationSelected={handleSafeZoneUpdate}
          onCancel={() => {
            setShowLocationPicker(false);
            setIsEditingSafeZone(false);
          }}
        />
      )}
      {showTestLocationPicker && (
        <LocationPicker
          initialLocation={testLocation || currentPatientLocation}
          onLocationSelected={handleTestLocationSet}
          onCancel={() => setShowTestLocationPicker(false)}
        />
      )}
      <DashboardView
        guardianData={guardianData}
        patientLocation={currentPatientLocation}
        safeZoneCenter={safeZoneCenter}
        onLogout={onLogout}
        onViewMap={() => setView("map")}
        onCopyToken={copyToken}
        onEditSafeZone={() => {
          setIsEditingSafeZone(true);
          setShowLocationPicker(true);
        }}
        onViewProfile={() => setShowProfile(true)}
        isOutsideSafeZone={isOutsideSafeZone}
        isUsingTestLocation={useTestLocation}
      />
    </>
  );
}

function DashboardView({ guardianData, patientLocation, safeZoneCenter, onLogout, onViewMap, onCopyToken, onEditSafeZone, onViewProfile, isOutsideSafeZone, isUsingTestLocation }) {
  const { t } = useLang();
  const distance = calculateDistance(patientLocation.lat, patientLocation.lng, safeZoneCenter.lat, safeZoneCenter.lng);
  const safeZoneRadius = 0.5;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ice-blue)", position: "relative", paddingBottom: 40 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 600, marginBottom: 4 }}>{t('welcome')}, {guardianData.fullName.split(' ')[0]}</h1>
            <p style={{ fontSize: 14, color: "var(--ink-muted)" }}>{t('dash')}</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={onViewProfile} className="btn-primary btn-secondary" style={{ width: "auto", padding: "10px 20px", fontSize: 14 }}>
              👤 {t('viewProfile')}
            </button>
            <button onClick={onLogout} className="btn-primary btn-coral" style={{ width: "auto", padding: "10px 20px", fontSize: 14 }}>
              {t('logout')}
            </button>
          </div>
        </div>

        {/* Critical Alert - More Visible */}
        {guardianData.patient && isOutsideSafeZone && (
          <div 
            className="fade-up alert-pulse" 
            style={{ 
              background: "linear-gradient(135deg, #dc2626, #b91c1c)", 
              color: "#fff", 
              padding: 24, 
              borderRadius: 16, 
              marginBottom: 24,
              boxShadow: "0 8px 32px rgba(220, 38, 38, 0.4)",
              border: "2px solid #fca5a5",
              cursor: "pointer"
            }}
            onClick={onViewMap}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 48 }}>🚨</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{t('alertTitle')}</h3>
                <p style={{ fontSize: 14, opacity: 0.95 }}>{t('alertSub')}</p>
                <p style={{ fontSize: 13, marginTop: 8, opacity: 0.9 }}>
                  {t('dist')}: {distance.toFixed(2)} km ({(distance * 1000).toFixed(0)}m)
                </p>
              </div>
              <div style={{ fontSize: 28 }}>→</div>
            </div>
          </div>
        )}

        {isUsingTestLocation && (
          <div style={{ background: "var(--azure-pale)", color: "var(--azure-dark)", padding: 16, borderRadius: 12, marginBottom: 24, fontSize: 14, textAlign: "center" }}>
            ⚠️ {t('usingTestLoc')}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 24 }}>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-muted)", marginBottom: 16 }}>{t('patStatus')}</h3>
            {guardianData.patient ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: isOutsideSafeZone ? "var(--coral)" : "#4ade80", boxShadow: isOutsideSafeZone ? "0 0 8px var(--coral)" : "0 0 8px #4ade80" }} />
                  <span style={{ fontSize: 18, fontWeight: 600, color: isOutsideSafeZone ? "var(--coral)" : "#16a34a" }}>
                    {isOutsideSafeZone ? t('outside') : t('inside')}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--ink-light)" }}>
                  {isOutsideSafeZone ? t('patOutside') : t('patInside')}
                </p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0", color: "var(--ink-muted)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
                <div style={{ fontSize: 13 }}>{t('noPatientLinked')}</div>
              </div>
            )}
          </div>

          <div className="fade-up fade-up-d1" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-muted)", marginBottom: 16 }}>{t('patInfoTitle')}</h3>
            {guardianData.patient ? (
              <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                <div><strong>{t('nameLabel')}:</strong> {guardianData.patient.fullName}</div>
                <div><strong>{t('email')}:</strong> {guardianData.patient.email}</div>
                <div><strong>{t('phone')}:</strong> {guardianData.patient.phone}</div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0", color: "var(--ink-muted)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
                <div style={{ fontSize: 13 }}>{t('noPatientLinked')}</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>{t('waitingForPatient')}</div>
              </div>
            )}
          </div>
        </div>

        <div className="fade-up fade-up-d2" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t('quickAct')}</h3>
          <div style={{ display: "grid", gap: 12 }}>
            <button className="btn-primary" onClick={onViewMap} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              🗺️ {t('viewMap')}
            </button>
            <button className="btn-primary btn-secondary" onClick={onEditSafeZone} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <EditIcon /> {t('editSafeZone')}
            </button>
            <button className="btn-primary btn-secondary" onClick={onCopyToken} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              📋 {t('copyLink')}
            </button>
          </div>
        </div>

        <div className="fade-up fade-up-d3" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t('recent')}</h3>
          <ActivityLog isOutside={isOutsideSafeZone} hasPatient={!!guardianData.patient} />
        </div>
      </div>
    </div>
  );
}

function ActivityLog({ isOutside, hasPatient }) {
  const { t } = useLang();
  const activities = hasPatient 
    ? [
        { icon: isOutside ? "⚠️" : "✓", msg: isOutside ? t('outsideMsg') : t('insideMsg'), time: t('now'), type: isOutside ? "alert" : "normal" },
        { icon: "📍", msg: t('locUpdate'), time: `2 ${t('min')}`, type: "normal" },
        { icon: "🔍", msg: t('sysCheck'), time: `15 ${t('min')}`, type: "normal" }
      ]
    : [
        { icon: "📍", msg: t('locUpdate'), time: `2 ${t('min')}`, type: "normal" },
        { icon: "🔍", msg: t('sysCheck'), time: `15 ${t('min')}`, type: "normal" }
      ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {activities.map((act, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: act.type === "alert" ? "rgba(212,117,106,.08)" : "rgba(74,144,164,.05)", borderRadius: 10, border: `1px solid ${act.type === "alert" ? "rgba(212,117,106,.2)" : "rgba(74,144,164,.15)"}` }}>
          <span style={{ fontSize: 20 }}>{act.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: act.type === "alert" ? "var(--coral)" : "var(--ink)" }}>{act.msg}</div>
            <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>{act.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MapView({ guardianData, patientLocation, safeZoneCenter, onBack, onEditSafeZone, onSetTestLocation, onResetTestLocation, isUsingTestLocation }) {
  const { t } = useLang();
  const mapRef = useRef(null);
  const circleRef = useRef(null);
  const centerMarkerRef = useRef(null);
  const patientMarkerRef = useRef(null);
  const [radius, setRadius] = useState(500);
  const [prevOutsideState, setPrevOutsideState] = useState(false);

  const distance = calculateDistance(patientLocation.lat, patientLocation.lng, safeZoneCenter.lat, safeZoneCenter.lng);
  const isOutside = distance > (radius / 1000);

  useEffect(() => {
    if (isOutside && !prevOutsideState) {
      console.log("ALERT: Patient left safe zone!", { distance: distance.toFixed(3), radius: (radius / 1000).toFixed(3), timestamp: new Date().toISOString() });
    }
    setPrevOutsideState(isOutside);
  }, [isOutside]);

  useEffect(() => {
    // Wait for Leaflet to load
    const initMap = () => {
      if (typeof window === 'undefined' || !window.L) {
        setTimeout(initMap, 100);
        return;
      }

      const L = window.L;
      
      // Clean up any existing map
      const existingMap = document.getElementById('live-map');
      if (existingMap) {
        existingMap.innerHTML = '';
      }

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map('live-map').setView([safeZoneCenter.lat, safeZoneCenter.lng], 14);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const circle = L.circle([safeZoneCenter.lat, safeZoneCenter.lng], {
        color: '#4a90a4',
        fillColor: '#4a90a4',
        fillOpacity: 0.15,
        radius: radius
      }).addTo(map);
      circleRef.current = circle;

      const centerMarker = L.marker([safeZoneCenter.lat, safeZoneCenter.lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: '<div style="background:#4a90a4;width:16px;height:16px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>',
          iconSize: [16, 16]
        })
      }).addTo(map).bindPopup(`<b>${t('curLoc')} (Center)</b>`);
      centerMarkerRef.current = centerMarker;

      const patientMarker = L.marker([patientLocation.lat, patientLocation.lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: '<div style="background:#d4756a;width:20px;height:20px;border-radius:50%;border:4px solid #fff;box-shadow:0 3px 12px rgba(212,117,106,.5)"></div>',
          iconSize: [20, 20]
        })
      }).addTo(map).bindPopup(`<b>${guardianData.patient?.fullName || 'Patient'}</b><br/>${t('curLoc')}`);
      patientMarkerRef.current = patientMarker;
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      circleRef.current = null;
      centerMarkerRef.current = null;
      patientMarkerRef.current = null;
    };
  }, [safeZoneCenter]); // Re-initialize when safe zone center changes

  useEffect(() => {
    if (circleRef.current && mapRef.current) {
      circleRef.current.setRadius(radius);
      mapRef.current.fitBounds(circleRef.current.getBounds(), { padding: [50, 50] });
    }
  }, [radius]);

  useEffect(() => {
    if (patientMarkerRef.current) {
      patientMarkerRef.current.setLatLng([patientLocation.lat, patientLocation.lng]);
    }
  }, [patientLocation]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ice-blue)", position: "relative" }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        <button onClick={onBack} style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", border: "1.5px solid rgba(255,255,255,.6)", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, color: "var(--azure)", cursor: "pointer", marginBottom: 20, boxShadow: "var(--shadow)" }}>
          ← {t('backDash')}
        </button>

        {isOutside && guardianData.patient && (
          <div className="fade-up alert-pulse" style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", color: "#fff", padding: 20, borderRadius: 16, marginBottom: 20, boxShadow: "0 8px 32px rgba(220, 38, 38, 0.4)", border: "2px solid #fca5a5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 40 }}>🚨</div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{t('alertTitle')}</h3>
                <p style={{ fontSize: 13, opacity: 0.95 }}>{guardianData.patient.fullName} {t('alertSub').toLowerCase()}</p>
              </div>
            </div>
          </div>
        )}

        {isUsingTestLocation && (
          <div style={{ background: "var(--azure-pale)", color: "var(--azure-dark)", padding: 16, borderRadius: 12, marginBottom: 20, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>⚠️ {t('usingTestLoc')}</span>
            <button className="btn-primary btn-coral" onClick={onResetTestLocation} style={{ width: "auto", padding: "8px 16px", fontSize: 13 }}>
              {t('resetToActual')}
            </button>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <div style={{ padding: 20, borderBottom: "1px solid rgba(74,144,164,.15)" }}>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 600 }}>{t('liveTrack')}</h2>
              <p style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 4 }}>{t('monPat')}</p>
            </div>
            <div id="live-map" style={{ height: 500 }}></div>
          </div>

          <div className="fade-up fade-up-d1">
            <div style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t('radius')}</h3>
              <input type="range" min="100" max="2000" step="50" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} style={{ width: "100%", marginBottom: 12 }} />
              <div style={{ fontSize: 24, fontWeight: 700, color: "var(--azure)", textAlign: "center", marginBottom: 16 }}>
                {radius >= 1000 ? `${(radius / 1000).toFixed(1)} km` : `${radius} m`}
              </div>

              <div style={{ padding: 16, background: isOutside ? "rgba(212,117,106,.1)" : "rgba(74,222,128,.1)", borderRadius: 12, border: `2px solid ${isOutside ? "var(--coral)" : "#4ade80"}`, textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: isOutside ? "var(--coral)" : "#16a34a", marginBottom: 4 }}>
                  {isOutside ? t('outZone') : t('inZone')}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>
                  {t('dist')}: {(distance * 1000).toFixed(0)}m
                </div>
              </div>
            </div>

            <div style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t('quickAct')}</h3>
              <button className="btn-primary" onClick={onEditSafeZone} style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <EditIcon /> {t('editSafeZone')}
              </button>
              <button className="btn-primary btn-secondary" onClick={onSetTestLocation} style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                📍 {t('setTestLoc')}
              </button>
              {isUsingTestLocation && (
                <button className="btn-primary btn-coral" onClick={onResetTestLocation} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  ↩️ {t('resetToActual')}
                </button>
              )}
            </div>

            <div style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 20, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--azure)" }}>{t('how')}</h3>
              <ul style={{ fontSize: 12, lineHeight: 1.8, color: "var(--ink-light)", paddingLeft: 20 }}>
                <li>{t('tip1')}</li>
                <li>{t('tip2')}</li>
                <li>{t('tip3')}</li>
                <li>{t('tip4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("landing");
  const [guardianData, setGuardianData] = useState(null);

  // Initialize session on mount - restore user session if exists
  useEffect(() => {
    initializeSessionId();
    const session = getSession();
    if (session) {
      // User is logged in, restore their session
      if (session.role === "patient") {
        const guardian = accountsDB.find(
          g => g.role === "guardian" && g.token === session.linkedToken
        );
        setGuardianData(guardian || null);
      } else {
        setGuardianData(session);
      }
      setPage("home");
    }
  }, []);

  const handleLogout = () => {
    clearSession();
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

  // Load Leaflet CSS and JS
  useEffect(() => {
    // Add Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Add Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <LanguageProvider>
      <GlobalStyle />
      {page === "landing" && <Landing />}
      {page === "signup" && (
        <SignUpPage
          onGuardianSignUp={(data) => { 
            saveSession(data); 
            setGuardianData(data); 
            setPage("token"); 
          }}
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