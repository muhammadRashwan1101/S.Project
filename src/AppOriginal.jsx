import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

/* ═══════════════════════════════════════════════════════════════
   IMPORTANT: Add this meta tag to your HTML <head> for mobile responsiveness:
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   LANGUAGE CONTEXT & TRANSLATIONS
   ═══════════════════════════════════════════════════════════════ */
const LanguageContext = createContext();

const TR = {
  en: {
    app: "Sanad", tag: "Safe, connected, always together.", signUp: "Sign Up", logIn: "Log In", logout: "Logout", back: "Back", backDash: "Back to Dashboard", terms: "Terms", privacy: "Privacy", byContinuing: "By continuing you agree to our", create: "Create Account", join: "Join Sanad and start caring", guard: "Guardian", pat: "Dependent", email: "Email", pass: "Password", confirmPass: "Confirm Password", name: "Full Name", natId: "National ID", phone: "Phone", addr: "Address", patInfo: "Dependent Information", patName: "Dependent Full Name", patId: "Dependent National ID", patEmail: "Dependent Email", patPhone: "Dependent Phone", patAddr: "Dependent Address", guardEmail: "Guardian Email", guardToken: "Guardian Token (e.g. XXXX-XXXX-XXXX)", already: "Already have an account?", dontHave: "Don't have an account?", welcomeBack: "Welcome Back", loginMsg: "Log in to continue caring", demoMsg: "Demo Credentials:", created: "Account Created!", shareMsg: "Share this token with your dependent so they can link their account", yourToken: "YOUR LINKING TOKEN", copyToken: "Copy Token", contDash: "Continue to Dashboard", keepSafe: "Keep this token safe. You can find it again in your dashboard settings.", copied: "Token copied to clipboard!", welcome: "Welcome", dash: "Dashboard", patStatus: "Dependent Status", inside: "Inside Safe Zone", outside: "Outside Safe Zone", patInside: "Dependent is within designated area", patOutside: "Alert: Dependent has left safe zone", patInfoTitle: "Dependent Info", nameLabel: "Name", quickAct: "Quick Actions", viewMap: "View Live Map & Geofence", copyLink: "Copy Linking Token", recent: "Recent Activity", insideMsg: "Dependent inside safe zone", outsideMsg: "Dependent left safe zone", locUpdate: "Location updated", sysCheck: "System check completed", now: "Just now", min: "min ago", liveTrack: "Live Location Tracking", monPat: "Monitor dependent location in real-time and configure the safe zone radius", radius: "Safe Zone Radius", inZone: "Inside Zone", outZone: "Outside Zone", curLoc: "Current Location", dist: "Distance from center", how: "How It Works:", tip1: "The blue zone shows the safe area around the center point", tip2: "The coral marker shows the dependent's current location", tip3: "Adjust the radius slider to customize the safe zone size", tip4: "You'll receive alerts when the dependent leaves the safe zone", tip5: "Status is automatically sent to the backend (console.log)", alertTitle: "Dependent Left Safe Zone!", alertSub: "Check location immediately", err1: "Please fill in all guardian and dependent fields", err2: "Please fill in all dependent fields", err3: "Passwords do not match", err4: "Invalid token. Please check with your guardian.", err5: "Please enter both email and password", err6: "Invalid credentials",
    selectRole: "Select Your Role", selectRoleMsg: "Choose how you'll be using Sanad", guardianRole: "Guardian", guardianDesc: "Monitor and care for a dependent", dependentRole: "Care Recipient", dependentDesc: "Connect with my guardian", continue: "Continue", chooseLocation: "Choose Location", locationMsg: "Set your safe zone center location", searchLocation: "Search for a location...", useCurrentLoc: "Use Current Location", dragPin: "Drag the pin to your desired location", clickMap: "Or click anywhere on the map", confirmLoc: "Confirm Location", locPermDenied: "Location permission denied", editSafeZone: "Edit Safe Zone", saveChanges: "Save Changes", testLocation: "Test Dependent Location", setTestLoc: "Set Test Location", currentTestLoc: "Current Test Location", resetToActual: "Reset to Actual Location", viewOnMap: "View on Map", locationSaved: "Location saved successfully!", safeZoneUpdated: "Safe zone updated!", usingTestLoc: "Using test location", testLocSet: "Test location set", returnToActual: "Returned to actual location", locating: "Getting your location...", mapInstructions: "Search, click on map, or drag the marker to set location", myProfile: "My Profile", guardianInfo: "Guardian Information", noDependentLinked: "No dependent linked yet", waitingForDependent: "Waiting for dependent to sign up with your token", dependentLinked: "Dependent Linked", viewProfile: "View Profile", closeProfile: "Close",
    // NEW: Dependent Photo & Reporting
    patPhoto: "Dependent Photo",
    uploadPhoto: "Upload Photo",
    reportLost: "Report Lost Dependent",
    reportLostDesc: "Help us find a lost dependent",
    takePhoto: "Take Photo",
    uploadImage: "Upload Image",
    submitReport: "Submit Report",
    reportSubmitted: "Report Submitted Successfully!",
    matchFound: "Match Found!",
    noMatch: "No Match Found",
    imageMatches: "The uploaded image matches our records",
    imageNoMatch: "The uploaded image does not match any dependent in our records",
    sharingLocation: "Sharing your location...",
    locationShared: "Location shared successfully",
    retrieved: "Retrieved",
    markRetrieved: "Mark as Retrieved",
    dependentRetrieved: "Dependent Retrieved Successfully!",
    lostReports: "Lost Dependent Reports",
    reportDetails: "Report Details",
    reportedAt: "Reported At",
    reportedBy: "Reported By",
    lastSeenLocation: "Last Seen Location",
    duration: "Duration",
    deviceInfo: "Device Information",
    retrievedAt: "Retrieved At",
    active: "Active",
    noReports: "No reports available",
    viewReports: "View Reports",
    reportHistory: "Report History",
    browser: "Browser",
    os: "Operating System",
    platform: "Platform",
    pending: "Pending",
    // Testing Mode
    demoMode: "Demo Mode",
    pauseTracking: "Pause Location Tracking",
    resumeTracking: "Resume Location Tracking",
    trackingPaused: "Location tracking paused",
    trackingResumed: "Location tracking resumed",
    trackingPausedNote: "Real-time location updates are paused for demo purposes",
    clearDependentLocation: "Hide Dependent Marker",
    showDependentLocation: "Show Dependent Marker",
    dependentLocationCleared: "Dependent marker hidden",
    dependentLocationShown: "Dependent marker visible",
    dependentUntrackable: "Dependent Cannot Be Tracked!",
    dependentMissingAlert: "is currently untrackable - location unknown",
    untrackableStatus: "⚠️ Untrackable",
    dependentLocationUnknown: "Dependent location is currently Unknown",
    // NEW: Patient Management & Photo Upload
    manageDependents: "Manage Dependents",
    addDependent: "Add Dependent",
    deleteDependent: "Delete Dependent",
    confirmDelete: "Are you sure you want to remove this dependent?",
    dependentAdded: "Dependent added successfully!",
    dependentDeleted: "Dependent removed successfully!",
    addPhoto: "Add Photo",
    changePhoto: "Change Photo",
    photoUpdated: "Photo updated successfully!",
    noDependents: "No dependents found",
    dependentsList: "Your Dependents",
    dependentToken: "Dependent Token",
    shareToken: "Share this token with the dependent to link their account"
  },
  ar: {
    app: "سند", tag: "آمن، متصل، معاً دائماً", signUp: "إنشاء حساب", logIn: "تسجيل الدخول", logout: "تسجيل الخروج", back: "رجوع", backDash: "العودة إلى لوحة التحكم", terms: "الشروط", privacy: "الخصوصية", byContinuing: "بالمتابعة، أنت توافق على", create: "إنشاء حساب", join: "انضم إلى سند وابدأ الرعاية", guard: "الوصي", pat: "متلقّي الرعاية", email: "البريد الإلكتروني", pass: "كلمة المرور", confirmPass: "تأكيد كلمة المرور", name: "الاسم الكامل", natId: "الرقم القومي", phone: "رقم الهاتف", addr: "العنوان", patInfo: "معلومات متلقّي الرعاية", patName: "الاسم الكامل لمتلقّي الرعاية", patId: "الرقم القومي لمتلقّي الرعاية", patEmail: "البريد الإلكتروني لمتلقّي الرعاية", patPhone: "رقم هاتف متلقّي الرعاية", patAddr: "عنوان متلقّي الرعاية", guardEmail: "البريد الإلكتروني للوصي", guardToken: "رمز الوصي (مثال: XXXX-XXXX-XXXX)", already: "لديك حساب بالفعل؟", dontHave: "ليس لديك حساب؟", welcomeBack: "مرحباً بعودتك", loginMsg: "سجل الدخول للمتابعة", demoMsg: "بيانات تجريبية:", created: "تم إنشاء الحساب!", shareMsg: "شارك هذا الرمز مع متلقّي الرعايةك حتى يتمكن من ربط حسابه", yourToken: "رمز الربط الخاص بك", copyToken: "نسخ الرمز", contDash: "المتابعة إلى لوحة التحكم", keepSafe: "احتفظ بهذا الرمز بأمان. يمكنك العثور عليه مرة أخرى في إعدادات لوحة التحكم.", copied: "تم نسخ الرمز!", welcome: "مرحباً", dash: "لوحة التحكم", patStatus: "حالة متلقّي الرعاية", inside: "داخل المنطقة الآمنة", outside: "خارج المنطقة الآمنة", patInside: "متلقّي الرعاية داخل المنطقة المحددة", patOutside: "تنبيه: متلقّي الرعاية غادر المنطقة الآمنة", patInfoTitle: "معلومات متلقّي الرعاية", nameLabel: "الاسم", quickAct: "إجراءات سريعة", viewMap: "عرض الخريطة المباشرة", copyLink: "نسخ رمز الربط", recent: "النشاط الأخير", insideMsg: "متلقّي الرعاية داخل المنطقة الآمنة", outsideMsg: "⚠️ متلقّي الرعاية غادر المنطقة الآمنة", locUpdate: "تم تحديث الموقع", sysCheck: "تم فحص النظام", now: "الآن", min: "دقيقة مضت", liveTrack: "تتبع الموقع المباشر", monPat: "راقب موقع متلقّي الرعاية في الوقت الفعلي وقم بتكوين نصف قطر المنطقة الآمنة", radius: "نصف قطر المنطقة الآمنة", inZone: "✓ داخل المنطقة", outZone: "⚠️ خارج المنطقة", curLoc: "الموقع الحالي", dist: "المسافة من المركز", how: "كيف يعمل:", tip1: "المنطقة الزرقاء توضح المنطقة الآمنة حول نقطة المركز", tip2: "العلامة المرجانية توضح موقع متلقّي الرعاية الحالي", tip3: "اضبط شريط التمرير لتخصيص حجم المنطقة الآمنة", tip4: "ستتلقى تنبيهات عندما يغادر متلقّي الرعاية المنطقة الآمنة", tip5: "يتم إرسال الحالة تلقائياً إلى الخادم", alertTitle: "متلقّي الرعاية غادر المنطقة الآمنة!", alertSub: "تحقق من الموقع فوراً", err1: "يرجى ملء جميع حقول الوصي ومتلقّي الرعاية", err2: "يرجى ملء جميع حقول متلقّي الرعاية", err3: "كلمات المرور غير متطابقة", err4: "رمز غير صالح. يرجى التحقق مع الوصي الخاص بك.", err5: "يرجى إدخال البريد الإلكتروني وكلمة المرور", err6: "بيانات اعتماد غير صالحة",
    selectRole: "اختر دورك", selectRoleMsg: "اختر كيف ستستخدم سند", guardianRole: "وصي", guardianDesc: "مراقبة والعناية بمتلقّي الرعاية", dependentRole: "متلقّي الرعاية", dependentDesc: "الاتصال مع الوصي الخاص بي", continue: "متابعة", chooseLocation: "اختر الموقع", locationMsg: "حدد موقع مركز المنطقة الآمنة", searchLocation: "ابحث عن موقع...", useCurrentLoc: "استخدم الموقع الحالي", dragPin: "اسحب الدبوس إلى الموقع المطلوب", clickMap: "أو انقر في أي مكان على الخريطة", confirmLoc: "تأكيد الموقع", locPermDenied: "تم رفض إذن الموقع", editSafeZone: "تعديل المنطقة الآمنة", saveChanges: "حفظ التغييرات", testLocation: "اختبار موقع متلقّي الرعاية", setTestLoc: "تعيين موقع اختباري", currentTestLoc: "الموقع الاختباري الحالي", resetToActual: "العودة للموقع الفعلي", viewOnMap: "عرض على الخريطة", locationSaved: "تم حفظ الموقع بنجاح!", safeZoneUpdated: "تم تحديث المنطقة الآمنة!", usingTestLoc: "استخدام موقع اختباري", testLocSet: "تم تعيين موقع اختباري", returnToActual: "تم العودة للموقع الفعلي", locating: "جاري تحديد موقعك...", mapInstructions: "ابحث، انقر على الخريطة، أو اسحب العلامة لتحديد الموقع", myProfile: "ملفي الشخصي", guardianInfo: "معلومات الوصي", noDependentLinked: "لا يوجد متلقّي رعاية مرتبط بعد", waitingForDependent: "في انتظار متلقّي الرعاية للتسجيل باستخدام الرمز الخاص بك", dependentLinked: "متلقّي الرعاية مرتبط", viewProfile: "عرض الملف الشخصي", closeProfile: "إغلاق",
    // NEW: Arabic translations
    patPhoto: "صورة متلقّي الرعاية",
    uploadPhoto: "رفع صورة",
    reportLost: "الإبلاغ عن متلقّي رعاية مفقود",
    reportLostDesc: "ساعدنا في العثور على متلقّي الرعاية المفقود",
    takePhoto: "التقاط صورة",
    uploadImage: "رفع صورة",
    submitReport: "إرسال البلاغ",
    reportSubmitted: "تم إرسال البلاغ بنجاح!",
    matchFound: "تم العثور على تطابق!",
    noMatch: "لم يتم العثور على تطابق",
    imageMatches: "الصورة المرفوعة تطابق سجلاتنا",
    imageNoMatch: "الصورة المرفوعة لا تطابق أي متلقّي رعاية في سجلاتنا",
    sharingLocation: "مشاركة موقعك...",
    locationShared: "تمت مشاركة الموقع بنجاح",
    retrieved: "تم الاستعادة",
    markRetrieved: "تحديد كمستعاد",
    dependentRetrieved: "تم استعادة متلقّي الرعاية بنجاح!",
    lostReports: "بلاغات المرضى المفقودين",
    reportDetails: "تفاصيل البلاغ",
    reportedAt: "تم البلاغ في",
    reportedBy: "المبلغ",
    lastSeenLocation: "آخر موقع شوهد فيه",
    duration: "المدة",
    deviceInfo: "معلومات الجهاز",
    retrievedAt: "تم الاستعادة في",
    active: "نشط",
    noReports: "لا توجد بلاغات",
    viewReports: "عرض البلاغات",
    reportHistory: "سجل البلاغات",
    browser: "المتصفح",
    os: "نظام التشغيل",
    platform: "المنصة",
    pending: "قيد الانتظار",
    // Testing Mode
    demoMode: "وضع العرض التوضيحي",
    pauseTracking: "إيقاف التتبع مؤقتاً",
    resumeTracking: "استئناف التتبع",
    trackingPaused: "تم إيقاف التتبع مؤقتاً",
    trackingResumed: "تم استئناف التتبع",
    trackingPausedNote: "تم إيقاف تحديثات الموقع المباشرة لأغراض العرض التوضيحي",
    clearDependentLocation: "إخفاء علامة متلقّي الرعاية",
    showDependentLocation: "إظهار علامة متلقّي الرعاية",
    dependentLocationCleared: "تم إخفاء علامة متلقّي الرعاية",
    dependentLocationShown: "علامة متلقّي الرعاية مرئية",
    dependentUntrackable: "لا يمكن تتبع متلقّي الرعاية!",
    dependentMissingAlert: "غير قابل للتتبع حالياً - الموقع غير معروف",
    untrackableStatus: "⚠️ غير قابل للتتبع",
    dependentLocationUnknown: "موقع متلقّي الرعاية غير معروف حالياً",
    // NEW: Patient Management & Photo Upload
    manageDependents: "إدارة متلقّي الرعاية",
    addDependent: "إضافة متلقّي رعاية",
    deleteDependent: "حذف متلقّي الرعاية",
    confirmDelete: "هل أنت متأكد من إزالة متلقّي الرعاية هذا؟",
    dependentAdded: "تمت إضافة متلقّي الرعاية بنجاح!",
    dependentDeleted: "تمت إزالة متلقّي الرعاية بنجاح!",
    addPhoto: "إضافة صورة",
    changePhoto: "تغيير الصورة",
    photoUpdated: "تم تحديث الصورة بنجاح!",
    noDependents: "لا يوجد متلقّي رعاية",
    dependentsList: "متلقّي الرعاية الخاصة بك",
    dependentToken: "رمز متلقّي الرعاية",
    shareToken: "شارك هذا الرمز مع متلقّي الرعاية لربط حسابه"
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
const DEMO_PATIENT_PHOTO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%234a90a4' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' dy='.3em' fill='white' font-family='Arial'%3ESH%3C/text%3E%3C/svg%3E";
const DEMO_VERSION = "1";
const DEMO_ACCOUNTS = [
  { email: "guardian@demo.com", password: "demo1234", role: "guardian", fullName: "Ahmed Hassan", nationalId: "30101011234", phone: "+20 123 456 7890", address: "15 Tahrir St, Cairo", dependent: { fullName: "Sara Hassan", nationalId: "85050512345", email: "dependent@demo.com", phone: "+20 987 654 3210", address: "15 Tahrir St, Cairo" }, location: { lat: 30.0444, lng: 31.2357 }, safeZoneCenter: { lat: 30.0444, lng: 31.2357 }, safeZoneRadius: 500, token: "DEMO-TKNA-ABCD" },
  { email: "dependent@demo.com", password: "demo1234", role: "dependent", fullName: "Sara Hassan", nationalId: "85050512345", phone: "+20 987 654 3210", linkedToken: "DEMO-TKNA-ABCD" }
];
function initializeAccounts() {
  const storedVersion = localStorage.getItem("sanad-demo-version");
  const storedAccounts = localStorage.getItem("sanad-accounts");

  // If version changed OR no accounts exist → reset demo data
  if (!storedAccounts || storedVersion !== DEMO_VERSION) {
    localStorage.setItem(
      "sanad-accounts",
      JSON.stringify(DEMO_ACCOUNTS)
    );
    localStorage.setItem("sanad-demo-version", DEMO_VERSION);
    return [...DEMO_ACCOUNTS];
  }

  return JSON.parse(storedAccounts);
}
const accountsDB = initializeAccounts();

// Add lost reports database
let lostReportsDB = JSON.parse(localStorage.getItem('sanad-lost-reports') || '[]');

function saveLostReportsDB() {
  localStorage.setItem('sanad-lost-reports', JSON.stringify(lostReportsDB));
}

function saveAccountsDB() {
  localStorage.setItem('sanad-accounts', JSON.stringify(accountsDB));
}

// Image matching function - for prototype, checks exact base64 match
function matchImage(uploadedImage, dependentPhoto) {
  // In a real app, this would use ML image recognition
  // For prototype: exact match with normalization
  
  if (!uploadedImage || !dependentPhoto) {
    return false;
  }
  
  // Helper to extract and normalize base64 data
  const extractBase64Data = (dataUrl) => {
    if (!dataUrl) return '';
    
    // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
    let base64Data = dataUrl;
    if (dataUrl.includes(',')) {
      base64Data = dataUrl.split(',')[1];
    } else if (dataUrl.includes(';base64')) {
      base64Data = dataUrl.split(';base64')[1];
    }
    
    // Remove all whitespace, newlines, and special characters
    base64Data = base64Data.replace(/\s+/g, '').replace(/[\r\n]+/g, '').trim();
    
    return base64Data;
  };
  
  const uploadedData = extractBase64Data(uploadedImage);
  const dependentData = extractBase64Data(dependentPhoto);
  
  // Log for debugging
  console.log('Uploaded image data length:', uploadedData.length);
  console.log('Dependent photo data length:', dependentData.length);
  console.log('First 50 chars of uploaded:', uploadedData.substring(0, 50));
  console.log('First 50 chars of dependent:', dependentData.substring(0, 50));
  
  // Direct comparison of base64 data
  const isMatch = uploadedData === dependentData;
  
  console.log('Match result:', isMatch);
  
  return isMatch;
}

// Get device information
function getDeviceInfo() {
  return {
    browser: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timestamp: new Date().toISOString()
  };
}

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
    .toggle-switch {
  position: relative; display: inline-block; width: 52px; height: 28px;
}
.toggle-switch input {
  opacity: 0; width: 0; height: 0;
}
.toggle-slider {
  position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc; transition: .4s; border-radius: 28px;
}
.toggle-slider:before {
  position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 4px;
  background-color: white; transition: .4s; border-radius: 50%;
}
input:checked + .toggle-slider {
  background-color: var(--sage);
}
input:checked + .toggle-slider:before {
  transform: translateX(24px);
}
input:disabled + .toggle-slider {
  background-color: #999; cursor: not-allowed; opacity: 0.6;
}
.photo-preview {
  width: 120px; height: 120px; border-radius: 12px; object-fit: cover;
  border: 2px solid rgba(74,144,164,.2); box-shadow: 0 2px 12px rgba(0,0,0,.08);
}
.report-card {
  background: var(--card-bg); border-radius: 12px; padding: 16px; margin-bottom: 12px;
  border-left: 4px solid var(--azure); box-shadow: var(--shadow);
}
.report-card.retrieved {
  border-left-color: var(--sage); opacity: 0.7;
}
.btn-danger {
  background: linear-gradient(135deg, var(--coral), #d45d5d); color: #fff;
  box-shadow: 0 2px 12px rgba(235,111,111,.25);
}
.btn-danger:hover { box-shadow: 0 4px 20px rgba(235,111,111,.35); }
    
    /* Mobile & Tablet Responsive Styles */
    @media (max-width: 768px) {
      .toast{top:12px;right:12px;left:12px;max-width:none;font-size:13px;padding:12px 16px}
      [dir="rtl"] .toast{left:12px;right:12px}
      .modal-backdrop{padding:12px}
      .modal-card{max-width:100%;border-radius:16px;max-height:95vh}
      .location-search{width:calc(100% - 24px);top:12px}
      .btn-primary{padding:12px;font-size:14px}
      .input-base{padding:11px 14px;font-size:13px}
    }
    
    @media (max-width: 480px) {
      .toast{font-size:12px;padding:10px 14px}
      .modal-card{border-radius:12px}
      .btn-primary{font-size:13px}
    }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
// const CameraIcon = () => (
//   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
//     <circle cx="12" cy="13" r="4"/>
//   </svg>
// );

const UploadIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
  </svg>
);

const XIcon = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
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

const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} style={{ position: "fixed", top: window.innerWidth <= 480 ? 12 : 20, right: window.innerWidth <= 480 ? 12 : 20, zIndex: 900, background: "var(--card-bg)", backdropFilter: "blur(20px)", border: "1.5px solid rgba(255,255,255,.6)", borderRadius: window.innerWidth <= 480 ? 8 : 10, padding: window.innerWidth <= 480 ? "6px 12px" : "8px 16px", fontSize: window.innerWidth <= 480 ? 12 : 13, fontWeight: 600, cursor: "pointer", color: "var(--azure)", transition: "all .2s", boxShadow: "var(--shadow)" }}>
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
              className={`role-card ${selectedRole === 'dependent' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('dependent')}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🧑‍🦳</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{t('dependentRole')}</h3>
              <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>{t('dependentDesc')}</p>
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
   Report PAGE
   ═══════════════════════════════════════════════════════════════ */
function ReportLostDependentPage({ onBack }) {
  const { t } = useLang();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setUploadedImage(base64);
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedImage) {
      alert('Please upload an image first');
      return;
    }

    setIsSubmitting(true);

    // Get location
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const currentLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      setLocation(currentLocation);
      // Check for matching dependent photo in database
      let matchedAccount = null;
      console.log('Checking for image match. Uploaded image length:', uploadedImage?.length);
      console.log('Number of guardian accounts with photos:', accountsDB.filter(acc => acc.role === 'guardian' && (acc.dependent?.photo || acc.dependent?.photos)).length);
      
      for (const acc of accountsDB) {
        if (acc.role === 'guardian') {
          const photosToCheck = acc.dependent?.photos || (acc.dependent?.photo ? [acc.dependent.photo] : null);
          if (photosToCheck) {
            console.log(`Checking guardian ${acc.email}, dependent has ${Array.isArray(photosToCheck) ? photosToCheck.length : 1} photo(s)`);
            if (matchImage(uploadedImage, photosToCheck)) {
              console.log('Match found with dependent:', acc.dependent.fullName);
              matchedAccount = acc;
              break;
            }
          }
        }
      }
      
      if (!matchedAccount) {
        console.log('No match found in database');
      }

      if (matchedAccount) {
        // Match found - create report
        const report = {
          id: `report-${Date.now()}`,
          dependentName: matchedAccount.dependent.fullName,
          dependentId: matchedAccount.dependent.nationalId,
          guardianEmail: matchedAccount.email,
          reportedAt: new Date().toISOString(),
          location: currentLocation,
          image: uploadedImage,
          deviceInfo: getDeviceInfo(),
          status: 'active',
          retrievedAt: null
        };

        // Add report to lost reports database
        lostReportsDB.push(report);
        saveLostReportsDB();

        // Add report to guardian's account
        const guardianIndex = accountsDB.findIndex(acc => acc.email === matchedAccount.email);
        if (guardianIndex !== -1) {
          accountsDB[guardianIndex].lostReports = accountsDB[guardianIndex].lostReports || [];
          accountsDB[guardianIndex].lostReports.push(report);
          saveAccountsDB();
        }

        setMatchResult('match');
        setSubmitted(true);
      } else {
        // No match found
        setMatchResult('no-match');
      }
    } catch (error) {
      console.error('Location error:', error);
      alert('Unable to get location. Please enable location services.');
    }

    setIsSubmitting(false);
  };

  if (submitted && matchResult === 'match') {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
        <div className="mesh-bg" /><div className="texture-overlay" />
        <LangSwitch />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, textAlign: "center" }}>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,var(--sage),#6a9a5a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 6px 28px rgba(127,176,105,.3)", color: "#fff" }}>
              <CheckIcon />
            </div>
            <h2 style={{ fontSize: 24, marginBottom: 12, color: "var(--sage)" }}>{t('reportSubmitted')}</h2>
            <p style={{ color: "var(--ink-muted)", marginBottom: 24 }}>{t('imageMatches')}</p>
            {location && (
              <div style={{ background: "rgba(74,144,164,.1)", borderRadius: 12, padding: 16, marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: "var(--ink)" }}>
                  <strong>{t('lastSeenLocation')}:</strong><br />
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              </div>
            )}
            <button className="btn-primary" onClick={onBack}>
              {t('back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (matchResult === 'no-match') {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
        <div className="mesh-bg" /><div className="texture-overlay" />
        <LangSwitch />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, textAlign: "center" }}>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,var(--coral),#d45d5d)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 6px 28px rgba(235,111,111,.3)", color: "#fff" }}>
              <XIcon />
            </div>
            <h2 style={{ fontSize: 24, marginBottom: 12, color: "var(--coral)" }}>{t('noMatch')}</h2>
            <p style={{ color: "var(--ink-muted)", marginBottom: 24 }}>{t('imageNoMatch')}</p>
            <button className="btn-primary" onClick={() => { setMatchResult(null); setUploadedImage(null); setImagePreview(null); }}>
              {t('back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 24 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,.9)", border: "1px solid rgba(0,0,0,.1)", borderRadius: 12, padding: "10px 20px", marginBottom: 20, cursor: "pointer", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          ← {t('back')}
        </button>
        
        <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h2 style={{ fontSize: 24, marginBottom: 8 }}>{t('reportLost')}</h2>
          <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 24 }}>{t('reportLostDesc')}</p>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: "var(--ink)" }}>
              {t('uploadImage')}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <button
              className="btn-secondary"
              onClick={() => fileInputRef.current?.click()}
              style={{ 
                marginBottom: 12, 
                padding: "10px 16px", 
                fontSize: 13, 
                whiteSpace: "nowrap",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
                border: "none",
                overflow: "visible"
              }}
            >
              📤 {t('uploadPhoto')}
            </button>

            {imagePreview && (
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <img src={imagePreview} alt="Preview" className="photo-preview" />
              </div>
            )}
          </div>

          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!uploadedImage || isSubmitting}
            style={{ opacity: (!uploadedImage || isSubmitting) ? 0.5 : 1 }}
          >
            {isSubmitting ? t('sharingLocation') : t('submitReport')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Lost Reports
   ═══════════════════════════════════════════════════════════════ */
  function LostReportsViewer({ guardianData, onBack, onUpdateGuardian }) {
  const { t } = useLang();
  const reports = guardianData.lostReports || [];

  const handleToggleRetrieved = (reportId) => {
    const reportIndex = guardianData.lostReports.findIndex(r => r.id === reportId);
    if (reportIndex === -1) return;

    const report = guardianData.lostReports[reportIndex];
    if (report.status === 'retrieved') return; // Already retrieved, locked

    // Update report status
    const updatedReports = [...guardianData.lostReports];
    updatedReports[reportIndex] = {
      ...report,
      status: 'retrieved',
      retrievedAt: new Date().toISOString()
    };

    // Update guardian data
    const updatedGuardian = {
      ...guardianData,
      lostReports: updatedReports
    };

    // Update in database
    const guardianIndex = accountsDB.findIndex(acc => acc.email === guardianData.email);
    if (guardianIndex !== -1) {
      accountsDB[guardianIndex] = updatedGuardian;
      saveAccountsDB();
    }

    // Update in lost reports database
    const globalReportIndex = lostReportsDB.findIndex(r => r.id === reportId);
    if (globalReportIndex !== -1) {
      lostReportsDB[globalReportIndex] = updatedReports[reportIndex];
      saveLostReportsDB();
    }

    onUpdateGuardian(updatedGuardian);
  };

  const formatDuration = (reportedAt, retrievedAt) => {
    const start = new Date(reportedAt);
    const end = retrievedAt ? new Date(retrievedAt) : new Date();
    const diffMs = end - start;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ${diffHours % 24}h`;
    if (diffHours > 0) return `${diffHours}h ${diffMins % 60}m`;
    return `${diffMins}m`;
  };

  return (
    <div style={{ minHeight: "100vh", padding: 24, position: "relative" }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,.9)", border: "1px solid rgba(0,0,0,.1)", borderRadius: 12, padding: "10px 20px", marginBottom: 20, cursor: "pointer", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          ← {t('backDash')}
        </button>

        <div style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h2 style={{ fontSize: 24, marginBottom: 24 }}>{t('lostReports')}</h2>

          {reports.length === 0 ? (
            <p style={{ color: "var(--ink-muted)", textAlign: "center", padding: 40 }}>{t('noReports')}</p>
          ) : (
            <div>
              {reports.map((report) => (
                <div key={report.id} className={`report-card ${report.status === 'retrieved' ? 'retrieved' : ''}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{report.dependentName}</h3>
                      <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>ID: {report.dependentId}</p>
                    </div>
                    <span style={{ 
                      padding: "4px 12px", 
                      borderRadius: 8, 
                      fontSize: 12, 
                      fontWeight: 600,
                      background: report.status === 'retrieved' ? 'var(--sage)' : 'var(--coral)',
                      color: '#fff'
                    }}>
                      {report.status === 'retrieved' ? t('retrieved') : t('active')}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16, fontSize: 14 }}>
                    <div>
                      <strong>{t('reportedAt')}:</strong><br />
                      {new Date(report.reportedAt).toLocaleString()}
                    </div>
                    <div>
                      <strong>{t('duration')}:</strong><br />
                      {formatDuration(report.reportedAt, report.retrievedAt)}
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <strong>{t('lastSeenLocation')}:</strong><br />
                      {report.location.lat.toFixed(6)}, {report.location.lng.toFixed(6)}
                    </div>
                  </div>

                  {report.image && (
                    <div style={{ marginBottom: 16 }}>
                      <img src={report.image} alt="Report" className="photo-preview" />
                    </div>
                  )}

                  <details style={{ marginBottom: 16, fontSize: 13 }}>
                    <summary style={{ cursor: "pointer", fontWeight: 600, marginBottom: 8 }}>{t('deviceInfo')}</summary>
                    <div style={{ background: "rgba(0,0,0,.03)", padding: 12, borderRadius: 8, fontSize: 12, fontFamily: "monospace" }}>
                      <div><strong>{t('platform')}:</strong> {report.deviceInfo.platform}</div>
                      <div><strong>{t('browser')}:</strong> {report.deviceInfo.browser}</div>
                      <div><strong>Screen:</strong> {report.deviceInfo.screenResolution}</div>
                    </div>
                  </details>

                  {report.retrievedAt && (
                    <div style={{ marginBottom: 16, padding: 12, background: "rgba(127,176,105,.1)", borderRadius: 8, fontSize: 14 }}>
                      <strong>{t('retrievedAt')}:</strong> {new Date(report.retrievedAt).toLocaleString()}
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={report.status === 'retrieved'}
                        onChange={() => handleToggleRetrieved(report.id)}
                        disabled={report.status === 'retrieved'}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    <span style={{ fontSize: 14, fontWeight: 600, color: report.status === 'retrieved' ? 'var(--sage)' : 'var(--ink)' }}>
                      {report.status === 'retrieved' ? t('retrieved') : t('markRetrieved')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
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
  const [dependentPhotos, setDependentPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = [...dependentPhotos];
      const newPreviews = [...photoPreviews];
      
      for (let i = 0; i < files.length && newPhotos.length < 5; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          newPhotos.push(base64);
          newPreviews.push(base64);
          
          if (newPhotos.length <= 5) {
            setDependentPhotos([...newPhotos]);
            setPhotoPreviews([...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  const removePhoto = (index) => {
    const newPhotos = dependentPhotos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    setDependentPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  const [dependentForm, setDependentForm] = useState({
    fullName: "", nationalId: "", email: "", phone: "", address: "", guardianEmail: "", guardianToken: "", password: ""
  });
  const [err, setErr] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isExistingDependent, setIsExistingDependent] = useState(false);
  const [existingDependentData, setExistingDependentData] = useState(null);

  // Function to verify token when dependent enters it
  const verifyToken = () => {
    if (!dependentForm.guardianToken) {
      setErr(t('err4'));
      return;
    }

    // Check if token belongs to existing dependent
    const existingDep = accountsDB.find(acc => 
      acc.role === 'dependent' && acc.token === dependentForm.guardianToken
    );

    if (existingDep) {
      // Existing dependent found
      setIsExistingDependent(true);
      setExistingDependentData(existingDep);
      setTokenVerified(true);
      setErr("");
      // Pre-fill the form with existing data
      setDependentForm({
        ...dependentForm,
        fullName: existingDep.fullName,
        nationalId: existingDep.nationalId,
        phone: existingDep.phone
      });
    } else {
      // Check if it's a guardian token for new dependent
      const guardian = accountsDB.find(acc => 
        acc.role === 'guardian' && acc.token === dependentForm.guardianToken
      );
      
      if (guardian) {
        setIsExistingDependent(false);
        setExistingDependentData(null);
        setTokenVerified(true);
        setErr("");
        setDependentForm({ ...dependentForm, guardianEmail: guardian.email });
      } else {
        setErr(t('err4'));
        setTokenVerified(false);
      }
    }
  };

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
        dependent: null, // No dependent initially
        location: selectedLocation,
        safeZoneCenter: selectedLocation,
        safeZoneRadius: 500, // Default radius in meters
        token
      };

      accountsDB.push(newAccount);
      localStorage.setItem("sanad-accounts", JSON.stringify(accountsDB));
      onGuardianSignUp(newAccount);
    } else {
      // Dependent signup flow
      if (!dependentForm.guardianToken) {
        setErr(t('err2'));
        return;
      }

      // First, check if this token belongs to an already-listed dependent
      const existingDependent = accountsDB.find(acc => 
        acc.role === 'dependent' && acc.token === dependentForm.guardianToken
      );

      if (existingDependent) {
        // Token matches an existing dependent - just link the account
        if (!dependentForm.email || !dependentForm.password) {
          setErr(t('err5'));
          return;
        }

        // Mark the dependent as linked and update with login credentials
        const depIndex = accountsDB.findIndex(acc => acc.id === existingDependent.id);
        if (depIndex !== -1) {
          accountsDB[depIndex] = {
            ...existingDependent,
            email: dependentForm.email,
            password: dependentForm.password,
            isLinked: true
          };

          // Find and update the guardian
          const guardianIndex = accountsDB.findIndex(acc => 
            acc.role === 'guardian' && acc.token === existingDependent.guardianToken
          );
          
          if (guardianIndex !== -1) {
            accountsDB[guardianIndex].dependent = accountsDB[depIndex];
            saveAccountsDB();
            saveSession(accountsDB[depIndex]);
            onGuardianSignUp(accountsDB[guardianIndex]);
          }
        }
      } else {
        // Token doesn't match existing dependent - check if it's a guardian token for new dependent
        if (!dependentForm.fullName || !dependentForm.nationalId || !dependentForm.email || !dependentForm.phone || !dependentForm.guardianEmail) {
          setErr(t('err2'));
          return;
        }

        const guardianIndex = accountsDB.findIndex(acc => acc.role === "guardian" && acc.email === dependentForm.guardianEmail && acc.token === dependentForm.guardianToken);
        if (guardianIndex === -1) {
          setErr(t('err4'));
          return;
        }

        const guardian = accountsDB[guardianIndex];

        // Create dependent account
        const newDependent = {
          email: dependentForm.email,
          password: dependentForm.password || "dependent123",
          role: "dependent",
          fullName: dependentForm.fullName,
          nationalId: dependentForm.nationalId,
          phone: dependentForm.phone,
          linkedToken: dependentForm.guardianToken,
          photos: dependentPhotos,
          isLinked: true
        };

        // Update guardian account with dependent info
        accountsDB[guardianIndex] = {
          ...guardian,
          dependent: {
            fullName: dependentForm.fullName,
            nationalId: dependentForm.nationalId,
            email: dependentForm.email,
            phone: dependentForm.phone,
            address: guardian.address,
            photos: dependentPhotos
          }
        };

        accountsDB.push(newDependent);
        localStorage.setItem("sanad-accounts", JSON.stringify(accountsDB));
        // Save session for dependent
        saveSession(newDependent);
        onGuardianSignUp(accountsDB[guardianIndex]);
      }
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: window.innerWidth <= 480 ? 16 : 24, paddingTop: window.innerWidth <= 480 ? 60 : 80, paddingBottom: window.innerWidth <= 480 ? 60 : 80 }}>
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
        <button onClick={() => setShowRoleSelection(true)} style={{ background: "transparent", border: "none", color: "var(--azure)", fontSize: window.innerWidth <= 480 ? 13 : 14, fontWeight: 600, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
          ← {t('back')}
        </button>

        <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: window.innerWidth <= 480 ? 16 : 20, padding: window.innerWidth <= 480 ? 24 : 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: window.innerWidth <= 480 ? 20 : 24, fontWeight: 600, marginBottom: 8 }}>
            {role === "guardian" ? `${t('create')} - ${t('guard')}` : `${t('create')} - ${t('pat')}`}
          </h2>
          <p style={{ fontSize: window.innerWidth <= 480 ? 13 : 14, color: "var(--ink-muted)", marginBottom: 24 }}>{t('join')}</p>

          {err && <div style={{ background: "rgba(212,117,106,.1)", color: "var(--coral)", padding: 12, borderRadius: 10, fontSize: window.innerWidth <= 480 ? 12 : 13, marginBottom: 16 }}>{err}</div>}

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
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}
                  >
                    <MapPinIcon />
                    {selectedLocation ? t('editSafeZone') : t('chooseLocation')}
                  </button>
                  {selectedLocation && (
                    <div style={{ marginTop: 8, fontSize: window.innerWidth <= 480 ? 11 : 12, color: "var(--ink-muted)", background: "var(--azure-pale)", padding: 8, borderRadius: 6, wordBreak: "break-all" }}>
                      📍 {locationAddress || `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`}
                    </div>
                  )}
                </div>
              </>
            )}

            {role === "dependent" && (
              <>
                {!tokenVerified ? (
                  // Step 1: Token verification
                  <>
                    <div style={{ background: 'var(--azure-pale)', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 14 }}>
                      <p style={{ marginBottom: 8 }}>
                        <strong>{t('guardToken')}</strong>
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                        Enter the token provided by your guardian to link your account
                      </p>
                    </div>
                    <input 
                      className="input-base" 
                      type="text" 
                      placeholder={t('guardToken')} 
                      value={dependentForm.guardianToken} 
                      onChange={(e) => setDependentForm({ ...dependentForm, guardianToken: e.target.value })} 
                      style={{ marginBottom: 12 }}
                    />
                    <button 
                      type="button" 
                      className="btn-primary" 
                      onClick={verifyToken}
                      style={{ marginTop: 12 }}
                    >
                      {t('continue')}
                    </button>
                  </>
                ) : isExistingDependent ? (
                  // Step 2a: Link existing dependent (only need email and password)
                  <>
                    <div style={{ background: 'var(--sage-pale)', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 14 }}>
                      <p style={{ marginBottom: 8 }}>
                        <strong>✓ Account Found!</strong>
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 8 }}>
                        {existingDependentData?.fullName}
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                        Create your login credentials to link this account
                      </p>
                    </div>
                    <input 
                      className="input-base" 
                      type="email" 
                      placeholder={t('email')} 
                      value={dependentForm.email} 
                      onChange={(e) => setDependentForm({ ...dependentForm, email: e.target.value })} 
                      style={{ marginBottom: 12 }} 
                      required 
                    />
                    <input 
                      className="input-base" 
                      type="password" 
                      placeholder={t('pass')} 
                      value={dependentForm.password} 
                      onChange={(e) => setDependentForm({ ...dependentForm, password: e.target.value })} 
                      style={{ marginBottom: 12 }} 
                      required 
                    />
                  </>
                ) : (
                  // Step 2b: New dependent signup (full form)
                  <>
                    <div style={{ background: 'var(--azure-pale)', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 14 }}>
                      <p style={{ marginBottom: 8 }}>
                        <strong>✓ Guardian Token Verified!</strong>
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                        Complete your information to create your account
                      </p>
                    </div>
                    <input className="input-base" type="text" placeholder={t('name')} value={dependentForm.fullName} onChange={(e) => setDependentForm({ ...dependentForm, fullName: e.target.value })} style={{ marginBottom: 12 }} required />
                    <input className="input-base" type="text" placeholder={t('natId')} value={dependentForm.nationalId} onChange={(e) => setDependentForm({ ...dependentForm, nationalId: e.target.value })} style={{ marginBottom: 12 }} required />
                    <input className="input-base" type="email" placeholder={t('email')} value={dependentForm.email} onChange={(e) => setDependentForm({ ...dependentForm, email: e.target.value })} style={{ marginBottom: 12 }} required />
                    <input className="input-base" type="tel" placeholder={t('phone')} value={dependentForm.phone} onChange={(e) => setDependentForm({ ...dependentForm, phone: e.target.value })} style={{ marginBottom: 12 }} required />
                    <input className="input-base" type="password" placeholder={t('pass')} value={dependentForm.password} onChange={(e) => setDependentForm({ ...dependentForm, password: e.target.value })} style={{ marginBottom: 12 }} required />
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: "var(--ink)" }}>
                        {t('patPhoto')}
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                      />
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ 
                          padding: "10px 14px", 
                          fontSize: 13, 
                          whiteSpace: "nowrap",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          cursor: "pointer"
                        }}
                      >
                        <span style={{ fontSize: 16, lineHeight: 1 }}>📷</span>
                        {t('uploadPhoto')}
                      </button>
                      {photoPreviews.length > 0 && (
                        <div style={{ marginTop: 12 }}>
                          <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                            gap: '8px'
                          }}>
                            {photoPreviews.map((preview, index) => (
                              <div key={index} style={{ position: 'relative', width: '100%' }}>
                                <img 
                                  src={preview} 
                                  alt={`Dependent ${index + 1}`} 
                                  style={{ 
                                    width: '100%', 
                                    height: 100, 
                                    borderRadius: 8, 
                                    objectFit: 'cover',
                                    border: '2px solid var(--azure)'
                                  }} 
                                />
                                <button
                                  type="button"
                                  onClick={() => removePhoto(index)}
                                  style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    backgroundColor: '#ff4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                            {photoPreviews.length < 5 && (
                              <div
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: 100,
                                  borderRadius: 8,
                                  border: '2px dashed var(--ink-muted)',
                                  color: 'var(--ink-muted)',
                                  cursor: 'pointer'
                                }}
                              >
                                <div style={{ textAlign: 'center', fontSize: 28 }}>+</div>
                              </div>
                            )}
                          </div>
                          <div style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-muted)', textAlign: 'center' }}>
                            {photoPreviews.length}/5
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            {(role === "guardian" || (role === "dependent" && tokenVerified)) && (
              <button type="submit" className="btn-primary" style={{ marginTop: 24 }}>{t('create')}</button>
            )}
          </form>

          <p style={{ textAlign: "center", fontSize: window.innerWidth <= 480 ? 12 : 13, color: "var(--ink-muted)", marginTop: 20 }}>
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
function ensureAccountDefaults(account) {
  // Ensure account has all required fields with defaults
  if (!account) return account;
  
  return {
    ...account,
    safeZoneRadius: account.safeZoneRadius || 500, // Default 500m if not set
    safeZoneCenter: account.safeZoneCenter || account.location || { lat: 30.0444, lng: 31.2357 },
    location: account.location || { lat: 30.0444, lng: 31.2357 },
    lostReports: account.lostReports || []
  };
}

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
    let account = accountsDB.find(acc => acc.email === email && acc.password === password);
    if (!account) {
      setErr(t('err6'));
      return;
    }
    
    // Ensure account has all defaults
    account = ensureAccountDefaults(account);
    
    // Save session for persistent login
    saveSession(account);
    onGuardianLogin(account);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: window.innerWidth <= 480 ? 16 : 24 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", color: "var(--azure)", fontSize: window.innerWidth <= 480 ? 13 : 14, fontWeight: 600, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
          ← {t('back')}
        </button>
        <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: window.innerWidth <= 480 ? 16 : 20, padding: window.innerWidth <= 480 ? 24 : 32, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: window.innerWidth <= 480 ? 20 : 24, fontWeight: 600, marginBottom: 8 }}>{t('welcomeBack')}</h2>
          <p style={{ fontSize: window.innerWidth <= 480 ? 13 : 14, color: "var(--ink-muted)", marginBottom: 24 }}>{t('loginMsg')}</p>
          
          {err && <div style={{ background: "rgba(212,117,106,.1)", color: "var(--coral)", padding: 12, borderRadius: 10, fontSize: window.innerWidth <= 480 ? 12 : 13, marginBottom: 16 }}>{err}</div>}
          
          <div style={{ background: "var(--azure-pale)", padding: 12, borderRadius: 10, fontSize: window.innerWidth <= 480 ? 11 : 12, marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{t('demoMsg')}</div>
            <div>📧 guardian@demo.com / dependent@demo.com</div>
            <div>🔑 demo1234</div>
          </div>

          <form onSubmit={handleSubmit}>
            <input className="input-base" type="email" placeholder={t('email')} value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 12 }} required />
            <input className="input-base" type="password" placeholder={t('pass')} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="btn-primary" style={{ marginTop: 20 }}>{t('logIn')}</button>
          </form>

          <p style={{ textAlign: "center", fontSize: window.innerWidth <= 480 ? 12 : 13, color: "var(--ink-muted)", marginTop: 20 }}>
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
   PHOTO UPLOADER COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function PhotoUploader({ currentPhoto, onPhotoChange }) {
  const { t } = useLang();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (currentPhoto) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          width: 140, 
          height: 140, 
          borderRadius: 12, 
          overflow: 'hidden', 
          margin: '0 auto 16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}>
          <img 
            src={currentPhoto} 
            alt="Dependent" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn-primary btn-secondary"
          style={{ width: 'auto', padding: '10px 20px', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          <CameraIcon /> {t('changePhoto')}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    );
  }

  return (
    <div>
      <div 
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: '2px dashed var(--azure)',
          borderRadius: 12,
          padding: 40,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: 'rgba(74, 144, 164, 0.05)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(74, 144, 164, 0.1)';
          e.currentTarget.style.borderColor = 'var(--azure-dark)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(74, 144, 164, 0.05)';
          e.currentTarget.style.borderColor = 'var(--azure)';
        }}
      >
        <div style={{ marginBottom: 12, color: 'var(--azure)', display: 'flex', justifyContent: 'center' }}>
          <PlusIcon />
        </div>
        <p style={{ color: 'var(--azure)', fontWeight: 600, fontSize: 15 }}>
          {t('addPhoto')}
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MANAGE DEPENDENTS MODAL
   ═══════════════════════════════════════════════════════════════ */
function ManageDependentsModal({ guardianData, onClose, onUpdate }) {
  const { t } = useLang();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDependent, setNewDependent] = useState({
    fullName: '',
    nationalId: '',
    email: '',
    phone: '',
    address: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleAddDependent = () => {
    if (!newDependent.fullName || !newDependent.nationalId || !newDependent.email) {
      setToastMsg(t('err2'));
      setShowToast(true);
      return;
    }

    // Generate unique token for this dependent
    const dependentToken = `${guardianData.token}-DEP-${Date.now().toString().slice(-4)}`;

    // Create new dependent account
    const dependent = {
      id: Date.now(),
      role: 'dependent',
      ...newDependent,
      guardianToken: guardianData.token,
      token: dependentToken,
      password: 'demo1234',
      location: guardianData.safeZoneCenter || guardianData.location || { lat: 30.0444, lng: 31.2357 },
      photo: null,
      isLinked: false // Not yet linked with a dependent account
    };

    // Add to accounts DB
    accountsDB.push(dependent);
    saveAccountsDB();
    
    // Update guardian data to link the new dependent
    const updatedGuardian = {
      ...guardianData,
      dependent: dependent
    };

    onUpdate(updatedGuardian);
    setToastMsg(t('dependentAdded'));
    setShowToast(true);
    setShowAddForm(false);
    setNewDependent({ fullName: '', nationalId: '', email: '', phone: '', address: '' });
  };

  const handleDeleteDependent = () => {
    if (!confirm(t('confirmDelete'))) return;

    // Remove dependent from guardianData
    const updatedGuardian = {
      ...guardianData,
      dependent: null
    };

    // Remove from accountsDB
    const depIndex = accountsDB.findIndex(acc => acc.email === guardianData.dependent.email);
    if (depIndex !== -1) {
      accountsDB.splice(depIndex, 1);
      saveAccountsDB();
    }

    onUpdate(updatedGuardian);
    setToastMsg(t('dependentDeleted'));
    setShowToast(true);
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      {showToast && <Toast msg={toastMsg} onClose={() => setShowToast(false)} />}
      
      <div className="modal-card" style={{ maxWidth: 600, maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <UsersIcon /> {t('manageDependents')}
            </h2>
            <button onClick={onClose} style={{
              background: 'transparent',
              border: 'none',
              fontSize: 28,
              cursor: 'pointer',
              color: 'var(--ink-muted)',
              lineHeight: 1
            }}>
              ×
            </button>
          </div>

          {!showAddForm && !guardianData.dependent && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
              style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <PlusIcon /> {t('addDependent')}
            </button>
          )}

          {showAddForm && (
            <div style={{
              background: 'var(--ice-blue)',
              borderRadius: 12,
              padding: 20,
              marginBottom: 20
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t('patInfo')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                  className="input-base"
                  type="text"
                  placeholder={t('patName')}
                  value={newDependent.fullName}
                  onChange={(e) => setNewDependent({ ...newDependent, fullName: e.target.value })}
                />
                <input
                  className="input-base"
                  type="text"
                  placeholder={t('patId')}
                  value={newDependent.nationalId}
                  onChange={(e) => setNewDependent({ ...newDependent, nationalId: e.target.value })}
                />
                <input
                  className="input-base"
                  type="email"
                  placeholder={t('patEmail')}
                  value={newDependent.email}
                  onChange={(e) => setNewDependent({ ...newDependent, email: e.target.value })}
                />
                <input
                  className="input-base"
                  type="tel"
                  placeholder={t('patPhone')}
                  value={newDependent.phone}
                  onChange={(e) => setNewDependent({ ...newDependent, phone: e.target.value })}
                />
                <textarea
                  className="input-base"
                  placeholder={t('patAddr')}
                  value={newDependent.address}
                  onChange={(e) => setNewDependent({ ...newDependent, address: e.target.value })}
                  rows={3}
                />
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={handleAddDependent} className="btn-primary" style={{ flex: 1 }}>
                    {t('create')}
                  </button>
                  <button onClick={() => setShowAddForm(false)} className="btn-primary btn-secondary" style={{ flex: 1 }}>
                    {t('back')}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t('dependentsList')}</h3>
            {!guardianData.dependent ? (
              <p style={{ color: 'var(--ink-muted)', textAlign: 'center', padding: 20, fontSize: 14 }}>
                {t('noDependents')}
              </p>
            ) : (
              <div style={{
                background: 'var(--ice-blue)',
                borderRadius: 12,
                padding: 16
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, marginBottom: 4, fontSize: 15 }}>{guardianData.dependent.fullName}</p>
                    <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 8 }}>{guardianData.dependent.email}</p>
                    {guardianData.dependent.token && (
                      <div style={{ background: 'rgba(74, 144, 164, 0.1)', padding: 10, borderRadius: 8, marginTop: 8 }}>
                        <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 4 }}>{t('dependentToken')}:</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <code style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: 'var(--azure)' }}>
                            {guardianData.dependent.token}
                          </code>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(guardianData.dependent.token);
                              setToastMsg(t('copied'));
                              setShowToast(true);
                            }}
                            style={{
                              background: 'var(--azure)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 6,
                              padding: '4px 8px',
                              cursor: 'pointer',
                              fontSize: 11,
                              fontWeight: 600
                            }}
                          >
                            📋
                          </button>
                        </div>
                        <p style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 6, fontStyle: 'italic' }}>
                          {t('shareToken')}
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleDeleteDependent}
                    style={{
                      background: 'var(--coral)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      marginLeft: 12
                    }}
                  >
                    <TrashIcon /> {t('deleteDependent')}
                  </button>
                </div>
              </div>
            )}
          </div>
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
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const fileInputRef = useRef(null);
  const [dependentPhotos, setDependentPhotos] = useState(
    Array.isArray(guardianData.dependent?.photos) 
      ? guardianData.dependent.photos 
      : (guardianData.dependent?.photo ? [guardianData.dependent.photo] : [])
  );
  const [photoPreviews, setPhotoPreviews] = useState(
    Array.isArray(guardianData.dependent?.photos) 
      ? guardianData.dependent.photos 
      : (guardianData.dependent?.photo ? [guardianData.dependent.photo] : [])
  );

  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = [...dependentPhotos];
    const newPreviews = [...photoPreviews];

    for (let i = 0; i < files.length && newPhotos.length < 5; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        newPhotos.push(event.target.result);
        newPreviews.push(event.target.result);
        setDependentPhotos([...newPhotos]);
        setPhotoPreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    }

    e.target.value = '';
  };

  const removePhoto = (index) => {
    const newPhotos = dependentPhotos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    setDependentPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  const handlePhotoChange = () => {
    // Update dependent photos in accountsDB
    if (guardianData.dependent) {
      const depIndex = accountsDB.findIndex(acc => acc.email === guardianData.dependent.email);
      if (depIndex !== -1) {
        accountsDB[depIndex].photos = dependentPhotos;
        saveAccountsDB();
        
        // Update guardian data
        const accounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
        const updatedAccounts = accounts.map(acc => {
          if (acc.email === guardianData.email) {
            return {
              ...acc,
              dependent: {
                ...acc.dependent,
                photos: dependentPhotos
              }
            };
          }
          return acc;
        });
        localStorage.setItem("sanad-accounts", JSON.stringify(updatedAccounts));
        saveSession({ ...guardianData, dependent: { ...guardianData.dependent, photos: dependentPhotos } });
      }
    }

    setToastMsg(t('photoUpdated'));
    setShowToast(true);
  };
  
  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      {showToast && <Toast msg={toastMsg} onClose={() => setShowToast(false)} />}
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

          {/* Dependent Info */}
          {guardianData.dependent ? (
            <div style={{ background: "var(--cyan-pale)", padding: 20, borderRadius: 12 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--cyan)" }}>{t('dependentLinked')}</h3>
              
              {/* Photo Uploader in Dependent Section */}
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--cyan)" }}>{t('patPhoto')} ({dependentPhotos.length}/5)</h4>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: "10px 14px",
                    fontSize: 13,
                    backgroundColor: "var(--azure)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    cursor: "pointer",
                    marginBottom: 12
                  }}
                >
                  <span style={{ fontSize: 16, lineHeight: 1 }}>📷</span>
                  {t('uploadPhoto')}
                </button>
                {photoPreviews.length > 0 && (
                  <div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                      gap: '8px',
                      marginBottom: 12
                    }}>
                      {photoPreviews.map((preview, index) => (
                        <div key={index} style={{ position: 'relative', width: '100%' }}>
                          <img
                            src={preview}
                            alt={`Dependent ${index + 1}`}
                            style={{
                              width: '100%',
                              height: 100,
                              borderRadius: 8,
                              objectFit: 'cover',
                              border: '2px solid var(--cyan)'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              backgroundColor: '#ff4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              padding: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {photoPreviews.length < 5 && (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 100,
                            borderRadius: 8,
                            border: '2px dashed var(--ink-muted)',
                            color: 'var(--ink-muted)',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ textAlign: 'center', fontSize: 28 }}>+</div>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handlePhotoChange}
                      style={{
                        padding: "8px 16px",
                        fontSize: 12,
                        backgroundColor: "var(--cyan)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      {t('save')}
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gap: 12, fontSize: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>{t('name')}:</span>
                  <span>{guardianData.dependent.fullName}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>{t('email')}:</span>
                  <span>{guardianData.dependent.email}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>{t('natId')}:</span>
                  <span>{guardianData.dependent.nationalId}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>{t('phone')}:</span>
                  <span>{guardianData.dependent.phone}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: "rgba(212,117,106,.1)", padding: 20, borderRadius: 12, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--coral)" }}>{t('noDependentLinked')}</h3>
              <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>{t('waitingForDependent')}</p>
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
function HomePage({ guardianData: initialGuardianData, onLogout }) {
  const { t } = useLang();
  const [view, setView] = useState("dashboard");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isEditingSafeZone, setIsEditingSafeZone] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showTestLocationPicker, setShowTestLocationPicker] = useState(false);
  const [testLocation, setTestLocation] = useState(() => {
    const saved = localStorage.getItem('sanad-test-location');
    return saved ? JSON.parse(saved) : null;
  });
  const [useTestLocation, setUseTestLocation] = useState(() => {
    const saved = localStorage.getItem('sanad-use-test-location');
    return saved === 'true';
  });
  const [isTrackingPaused, setIsTrackingPaused] = useState(() => {
    const saved = localStorage.getItem('sanad-tracking-paused');
    return saved === 'true';
  });
  const [isDependentLocationHidden, setIsDependentLocationHidden] = useState(() => {
    const saved = localStorage.getItem('sanad-dependent-location-hidden');
    return saved === 'true';
  });
  const [showProfile, setShowProfile] = useState(false);
  const [showManageDependents, setShowManageDependents] = useState(false);
  
  // Reload guardian data from localStorage to get latest updates (like radius changes)
  const getLatestGuardianData = () => {
    const accounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
    return accounts.find(acc => acc.email === initialGuardianData.email) || initialGuardianData;
  };
  
  // Initialize with latest data from localStorage (ensures safe zone and other updates persist)
  const [guardianData, setGuardianData] = useState(() => getLatestGuardianData());

  // Function to update guardian data in both state and localStorage
  const updateGuardianData = (newData) => {
    setGuardianData(newData);
    const accounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
    const updatedAccounts = accounts.map(acc => 
      acc.email === newData.email ? newData : acc
    );
    localStorage.setItem("sanad-accounts", JSON.stringify(updatedAccounts));
    saveSession(newData);
  };

  // Calculate active reports count
  const activeReportsCount = (guardianData.lostReports || []).filter(r => r.status === 'active').length;
  
  // Refresh guardian data when view changes to pick up any updates
  useEffect(() => {
    const latestData = getLatestGuardianData();
    setGuardianData(latestData);
  }, [view]);

  // Get dependent's current location (either test or actual from geolocation)
  const [dependentLiveLocation, setDependentLiveLocation] = useState(guardianData.location || { lat: 30.0444, lng: 31.2357 });
  const [safeZoneCenter, setSafeZoneCenter] = useState(guardianData.safeZoneCenter || guardianData.location || { lat: 30.0444, lng: 31.2357 });

  // Update safeZoneCenter when guardianData changes (including on mount)
  useEffect(() => {
    if (guardianData.safeZoneCenter) {
      setSafeZoneCenter(guardianData.safeZoneCenter);
    }
  }, [guardianData.safeZoneCenter]);

  // Track dependent's actual location via geolocation
  useEffect(() => {
    if (useTestLocation || isTrackingPaused) return; // Don't update if using test location or tracking is paused

    const watchId = navigator.geolocation?.watchPosition(
      (position) => {
        const newLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setDependentLiveLocation(newLoc);
        
        // Update in database - read fresh from localStorage
        const currentAccounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
        const updatedAccounts = currentAccounts.map(acc => {
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
  }, [useTestLocation, isTrackingPaused, guardianData.email]);

  const currentDependentLocation = useTestLocation ? testLocation : dependentLiveLocation;

  const copyToken = () => {
    navigator.clipboard.writeText(guardianData.token);
    setToastMsg(t('copied'));
    setShowToast(true);
  };

  const handleSafeZoneUpdate = (newLocation, address) => {
    setSafeZoneCenter(newLocation);
    setShowLocationPicker(false);
    setIsEditingSafeZone(false);
    
    // Read fresh data from localStorage
    const currentAccounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
    const updatedAccounts = currentAccounts.map(acc => {
      if (acc.email === guardianData.email) {
        return { ...acc, safeZoneCenter: newLocation };
      }
      return acc;
    });
    localStorage.setItem("sanad-accounts", JSON.stringify(updatedAccounts));
    
    // Update local guardian data
    const updatedGuardian = { ...guardianData, safeZoneCenter: newLocation };
    setGuardianData(updatedGuardian);
    
    // Update session to keep it in sync
    saveSession(updatedGuardian);
    
    setToastMsg(t('safeZoneUpdated'));
    setShowToast(true);
  };

  const handleTestLocationSet = (newLocation, address) => {
    setTestLocation(newLocation);
    setUseTestLocation(true);
    localStorage.setItem('sanad-test-location', JSON.stringify(newLocation));
    localStorage.setItem('sanad-use-test-location', 'true');
    setShowTestLocationPicker(false);
    setToastMsg(t('testLocSet'));
    setShowToast(true);
  };

  const resetToActualLocation = () => {
    setUseTestLocation(false);
    setTestLocation(null);
    localStorage.removeItem('sanad-test-location');
    localStorage.setItem('sanad-use-test-location', 'false');
    setToastMsg(t('returnToActual'));
    setShowToast(true);
  };

  const toggleTracking = () => {
    const newPausedState = !isTrackingPaused;
    setIsTrackingPaused(newPausedState);
    localStorage.setItem('sanad-tracking-paused', newPausedState.toString());
    setToastMsg(newPausedState ? t('trackingPaused') : t('trackingResumed'));
    setShowToast(true);
  };

  const toggleDependentLocation = () => {
    const newHiddenState = !isDependentLocationHidden;
    setIsDependentLocationHidden(newHiddenState);
    localStorage.setItem('sanad-dependent-location-hidden', newHiddenState.toString());
    setToastMsg(newHiddenState ? t('dependentLocationCleared') : t('dependentLocationShown'));
    setShowToast(true);
  };

  // Check if dependent is outside safe zone
  const distance = calculateDistance(
    currentDependentLocation.lat,
    currentDependentLocation.lng,
    safeZoneCenter.lat,
    safeZoneCenter.lng
  );
  const safeZoneRadius = (guardianData.safeZoneRadius || 500) / 1000; // Convert meters to km
  // Dependent is considered "outside" if either: (1) they're beyond the safe zone, OR (2) their marker is hidden (simulating being missing/untrackable)
  const isOutsideSafeZone = distance > safeZoneRadius || isDependentLocationHidden;

  // Auto-navigate to map if dependent is outside (only once per transition)
  const [hasAutoNavigated, setHasAutoNavigated] = useState(false);
  
  useEffect(() => {
    if (isOutsideSafeZone && view === "dashboard" && !hasAutoNavigated) {
      setView("map");
      setHasAutoNavigated(true);
    } else if (!isOutsideSafeZone && hasAutoNavigated) {
      // Reset flag when dependent returns inside
      setHasAutoNavigated(false);
    }
  }, [isOutsideSafeZone, view, hasAutoNavigated]);

  if (view === "reports") {
    return <LostReportsViewer guardianData={guardianData} onBack={() => setView("dashboard")} onUpdateGuardian={updateGuardianData} />;
  }

  if (view === "map") {
    return (
      <>
        {showToast && <Toast msg={toastMsg} onClose={() => setShowToast(false)} />}
        {showProfile && <ProfileModal guardianData={guardianData} onClose={() => setShowProfile(false)} />}
        {showManageDependents && <ManageDependentsModal guardianData={guardianData} onClose={() => setShowManageDependents(false)} onUpdate={updateGuardianData} />}
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
            initialLocation={testLocation || currentDependentLocation}
            onLocationSelected={handleTestLocationSet}
            onCancel={() => setShowTestLocationPicker(false)}
            showSafeZone={true}
            safeZoneCenter={safeZoneCenter}
            safeZoneRadius={guardianData.safeZoneRadius || 500}
          />
        )}
        <MapView
          guardianData={guardianData}
          dependentLocation={currentDependentLocation}
          safeZoneCenter={safeZoneCenter}
          onBack={() => setView("dashboard")}
          onEditSafeZone={() => {
            setIsEditingSafeZone(true);
            setShowLocationPicker(true);
          }}
          onSetTestLocation={() => setShowTestLocationPicker(true)}
          onResetTestLocation={resetToActualLocation}
          isUsingTestLocation={useTestLocation}
          isTrackingPaused={isTrackingPaused}
          onToggleTracking={toggleTracking}
          isDependentLocationHidden={isDependentLocationHidden}
          onToggleDependentLocation={toggleDependentLocation}
        />
      </>
    );
  }

  return (
    <>
      {showToast && <Toast msg={toastMsg} onClose={() => setShowToast(false)} />}
      {showProfile && <ProfileModal guardianData={guardianData} onClose={() => setShowProfile(false)} />}
      {showManageDependents && <ManageDependentsModal guardianData={guardianData} onClose={() => setShowManageDependents(false)} onUpdate={updateGuardianData} />}
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
          initialLocation={testLocation || currentDependentLocation}
          onLocationSelected={handleTestLocationSet}
          onCancel={() => setShowTestLocationPicker(false)}
        />
      )}
      <DashboardView
        guardianData={guardianData}
        dependentLocation={currentDependentLocation}
        safeZoneCenter={safeZoneCenter}
        onLogout={onLogout}
        onViewMap={() => setView("map")}
        onCopyToken={copyToken}
        onEditSafeZone={() => {
          setIsEditingSafeZone(true);
          setShowLocationPicker(true);
        }}
        onViewProfile={() => setShowProfile(true)}
        onManageDependents={() => setShowManageDependents(true)}
        isOutsideSafeZone={isOutsideSafeZone}
        isUsingTestLocation={useTestLocation}
        activeReportsCount={activeReportsCount}
        onViewReports={() => setView("reports")}
        isDependentLocationHidden={isDependentLocationHidden}
      />
    </>
  );
}

function DashboardView({ guardianData, dependentLocation, safeZoneCenter, onLogout, onViewMap, onCopyToken, onEditSafeZone, onViewProfile, onManageDependents, isOutsideSafeZone, isUsingTestLocation, activeReportsCount, onViewReports, isDependentLocationHidden }) {
  const { t } = useLang();
  const distance = calculateDistance(dependentLocation.lat, dependentLocation.lng, safeZoneCenter.lat, safeZoneCenter.lng);
  const effectiveOutside = isDependentLocationHidden || isOutsideSafeZone;
  
  // Calculate active reports count if not provided
  const reportsCount = activeReportsCount !== undefined ? activeReportsCount : (guardianData.lostReports || []).filter(r => r.status === 'active').length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ice-blue)", position: "relative", paddingBottom: 40 }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "16px 16px 0" }}>
        <div style={{ display: "flex", flexDirection: window.innerWidth <= 640 ? "column" : "row", justifyContent: "space-between", alignItems: window.innerWidth <= 640 ? "flex-start" : "center", marginBottom: window.innerWidth <= 640 ? 24 : 32, gap: window.innerWidth <= 640 ? 16 : 0 }}>
          <div>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: window.innerWidth <= 480 ? 22 : 28, fontWeight: 600, marginBottom: 4 }}>{t('welcome')}, {guardianData.fullName.split(' ')[0]}</h1>
            <p style={{ fontSize: window.innerWidth <= 480 ? 13 : 14, color: "var(--ink-muted)" }}>{t('dash')}</p>
          </div>
          <div style={{ display: "flex", gap: window.innerWidth <= 480 ? 8 : 12, flexWrap: "wrap", width: window.innerWidth <= 640 ? "100%" : "auto" }}>
            <button onClick={onViewProfile} className="btn-primary btn-secondary" style={{ width: window.innerWidth <= 640 ? "auto" : "auto", padding: window.innerWidth <= 480 ? "8px 16px" : "10px 20px", fontSize: window.innerWidth <= 480 ? 13 : 14, flex: window.innerWidth <= 640 ? "1" : "none" }}>
              👤 {window.innerWidth <= 480 ? "" : t('viewProfile')}
            </button>
            <button onClick={onManageDependents} className="btn-primary btn-secondary" style={{ width: window.innerWidth <= 640 ? "auto" : "auto", padding: window.innerWidth <= 480 ? "8px 14px" : "10px 18px", fontSize: window.innerWidth <= 480 ? 13 : 14, flex: window.innerWidth <= 640 ? "1" : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <UsersIcon /> {window.innerWidth <= 480 ? "" : t('manageDependents')}
            </button>
            <button onClick={onLogout} className="btn-primary btn-coral" style={{ width: window.innerWidth <= 640 ? "auto" : "auto", padding: window.innerWidth <= 480 ? "8px 16px" : "10px 20px", fontSize: window.innerWidth <= 480 ? 13 : 14, flex: window.innerWidth <= 640 ? "1" : "none" }}>
              {t('logout')}
            </button>
          </div>
        </div>

        {/* Critical Alert - More Visible */}
        {guardianData.dependent && (isOutsideSafeZone || isDependentLocationHidden) && (
          <div 
            className="fade-up alert-pulse" 
            style={{ 
              background: "linear-gradient(135deg, #dc2626, #b91c1c)", 
              color: "#fff", 
              padding: window.innerWidth <= 480 ? 16 : 24, 
              borderRadius: window.innerWidth <= 480 ? 12 : 16, 
              marginBottom: 24,
              boxShadow: "0 8px 32px rgba(220, 38, 38, 0.4)",
              border: "2px solid #fca5a5",
              cursor: "pointer"
            }}
            onClick={onViewMap}
          >
            <div style={{ display: "flex", alignItems: "center", gap: window.innerWidth <= 480 ? 12 : 16 }}>
              <div style={{ fontSize: window.innerWidth <= 480 ? 36 : 48 }}>🚨</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: window.innerWidth <= 480 ? 16 : 20, fontWeight: 700, marginBottom: 6 }}>
                  {isDependentLocationHidden ? t('dependentUntrackable') : t('alertTitle')}
                </h3>
                <p style={{ fontSize: window.innerWidth <= 480 ? 12 : 14, opacity: 0.95 }}>
                  {isDependentLocationHidden ? t('dependentMissingAlert') : t('alertSub')}
                </p>
                {!isDependentLocationHidden && (
                  <p style={{ fontSize: window.innerWidth <= 480 ? 11 : 13, marginTop: 8, opacity: 0.9 }}>
                    {t('dist')}: {distance.toFixed(2)} km ({(distance * 1000).toFixed(0)}m)
                  </p>
                )}
              </div>
              <div style={{ fontSize: window.innerWidth <= 480 ? 20 : 28 }}>→</div>
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
            {guardianData.dependent ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: effectiveOutside ? "var(--coral)" : "#4ade80", boxShadow: effectiveOutside ? "0 0 8px var(--coral)" : "0 0 8px #4ade80" }} />
                  <span style={{ fontSize: 18, fontWeight: 600, color: effectiveOutside ? "var(--coral)" : "#16a34a" }}>
                    {isDependentLocationHidden ? t('untrackableStatus') : (effectiveOutside ? t('outside') : t('inside'))}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--ink-light)" }}>
                  {isDependentLocationHidden ? t('dependentLocationUnknown') : (effectiveOutside ? t('patOutside') : t('patInside'))}
                </p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0", color: "var(--ink-muted)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
                <div style={{ fontSize: 13 }}>{t('noDependentLinked')}</div>
              </div>
            )}
          </div>
            <div className="stat-card" style={{ background: reportsCount > 0 ? "linear-gradient(135deg, rgba(235,111,111,.12), rgba(235,111,111,.06))" : "rgba(0,0,0,.02)",  borderRadius: 16, padding: 24, }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{reportsCount > 0 ? "🚨" : "📋"}</div>
              <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: 4 }}>{t('lostReports')}</p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: reportsCount > 0 ? "var(--coral)" : "var(--ink)" }}>
                {reportsCount} {t('active')}
              </h3>
              <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 8 }}>
                {(guardianData.lostReports || []).length} {t('reportHistory')}
              </p>
            </div>
          <div className="fade-up fade-up-d1" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-muted)", marginBottom: 16 }}>{t('patInfoTitle')}</h3>
            {guardianData.dependent ? (
              <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                <div><strong>{t('nameLabel')}:</strong> {guardianData.dependent.fullName}</div>
                <div><strong>{t('email')}:</strong> {guardianData.dependent.email}</div>
                <div><strong>{t('phone')}:</strong> {guardianData.dependent.phone}</div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0", color: "var(--ink-muted)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
                <div style={{ fontSize: 13 }}>{t('noDependentLinked')}</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>{t('waitingForDependent')}</div>
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
            {(guardianData.lostReports || []).length > 0 && (
              <button className="btn-primary btn-danger" onClick={onViewReports}>
                <AlertIcon /> {t('viewReports')} ({(guardianData.lostReports || []).length})
              </button>
            )}
        </div>
        </div>

        <div className="fade-up fade-up-d3" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t('recent')}</h3>
          <ActivityLog isOutside={effectiveOutside} hasDependent={!!guardianData.dependent} />
        </div>
      </div>
    </div>
  );
}

function ActivityLog({ isOutside, hasDependent }) {
  const { t } = useLang();
  const activities = hasDependent 
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

function MapView({ guardianData, dependentLocation, safeZoneCenter, onBack, onEditSafeZone, onSetTestLocation, onResetTestLocation, isUsingTestLocation, isTrackingPaused, onToggleTracking, isDependentLocationHidden, onToggleDependentLocation }) {
  const { t } = useLang();
  const mapRef = useRef(null);
  const circleRef = useRef(null);
  const centerMarkerRef = useRef(null);
  const dependentMarkerRef = useRef(null);
  const [radius, setRadius] = useState(guardianData.safeZoneRadius || 500);
  const [prevOutsideState, setPrevOutsideState] = useState(false);

  const distance = calculateDistance(dependentLocation.lat, dependentLocation.lng, safeZoneCenter.lat, safeZoneCenter.lng);
  // Dependent is considered "outside" if either: (1) they're beyond the safe zone, OR (2) their marker is hidden (simulating being missing/untrackable)
  const isOutside = distance > (radius / 1000) || isDependentLocationHidden;

  // Persist radius changes to database
  useEffect(() => {
    if (radius !== guardianData.safeZoneRadius) {
      const accounts = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
      const updatedAccounts = accounts.map(acc => {
        if (acc.email === guardianData.email) {
          return { ...acc, safeZoneRadius: radius };
        }
        return acc;
      });
      localStorage.setItem("sanad-accounts", JSON.stringify(updatedAccounts));
      
      // Update session to keep it in sync
      const updatedGuardian = updatedAccounts.find(acc => acc.email === guardianData.email);
      if (updatedGuardian) {
        saveSession(updatedGuardian);
      }
    }
  }, [radius, guardianData.email, guardianData.safeZoneRadius]);

  useEffect(() => {
    if (isOutside && !prevOutsideState) {
      if (isDependentLocationHidden) {
        console.log("ALERT: Dependent location hidden - cannot track!", { 
          reason: "marker_hidden",
          timestamp: new Date().toISOString() 
        });
      } else {
        console.log("ALERT: Dependent left safe zone!", { 
          reason: "zone_breach",
          distance: distance.toFixed(3), 
          radius: (radius / 1000).toFixed(3), 
          timestamp: new Date().toISOString() 
        });
      }
    }
    setPrevOutsideState(isOutside);
  }, [isOutside, isDependentLocationHidden]);

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

      // Only create dependent marker if not hidden
      if (!isDependentLocationHidden) {
        const dependentMarker = L.marker([dependentLocation.lat, dependentLocation.lng], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:#d4756a;width:20px;height:20px;border-radius:50%;border:4px solid #fff;box-shadow:0 3px 12px rgba(212,117,106,.5)"></div>',
            iconSize: [20, 20]
          })
        }).addTo(map).bindPopup(`<b>${guardianData.dependent?.fullName || 'Dependent'}</b><br/>${t('curLoc')}`);
        dependentMarkerRef.current = dependentMarker;
      } else {
        dependentMarkerRef.current = null;
      }
      // Add lost report markers if any
      const activeReports = (guardianData.lostReports || []).filter(r => r.status === 'active');
      activeReports.forEach(report => {
        window.L.marker([report.location.lat, report.location.lng], {
          icon: window.L.divIcon({
            className: 'lost-report-marker',
            html: '<div style="width:32px;height:32px;background:#ff6b6b;border-radius:50%;border:3px solid white;box-shadow:0 2px 12px rgba(255,107,107,.5);display:flex;align-items:center;justify-content:center;font-size:18px;">🚨</div>',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          })
        }).addTo(map).bindPopup(`
          <div style="padding:8px;">
            <strong>${t('reportedAt')}:</strong><br/>
            ${new Date(report.reportedAt).toLocaleString()}<br/><br/>
            <strong>${t('lastSeenLocation')}</strong>
          </div>
        `);
      });
    };
    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      circleRef.current = null;
      centerMarkerRef.current = null;
      dependentMarkerRef.current = null;
    };
  }, [safeZoneCenter]); // Re-initialize when safe zone center changes

  useEffect(() => {
    if (circleRef.current && mapRef.current) {
      circleRef.current.setRadius(radius);
      mapRef.current.fitBounds(circleRef.current.getBounds(), { padding: [50, 50] });
    }
  }, [radius]);

  useEffect(() => {
    if (dependentMarkerRef.current) {
      dependentMarkerRef.current.setLatLng([dependentLocation.lat, dependentLocation.lng]);
    }
  }, [dependentLocation]);

  // Handle showing/hiding dependent marker
  useEffect(() => {
    if (!mapRef.current) return;

    const L = window.L;
    if (!L) return;

    if (isDependentLocationHidden && dependentMarkerRef.current) {
      // Remove dependent marker
      mapRef.current.removeLayer(dependentMarkerRef.current);
      dependentMarkerRef.current = null;
    } else if (!isDependentLocationHidden && !dependentMarkerRef.current) {
      // Add dependent marker
      const dependentMarker = L.marker([dependentLocation.lat, dependentLocation.lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: '<div style="background:#d4756a;width:20px;height:20px;border-radius:50%;border:4px solid #fff;box-shadow:0 3px 12px rgba(212,117,106,.5)"></div>',
          iconSize: [20, 20]
        })
      }).addTo(mapRef.current).bindPopup(`<b>${guardianData.dependent?.fullName || 'Dependent'}</b><br/>${t('curLoc')}`);
      dependentMarkerRef.current = dependentMarker;
    }
  }, [isDependentLocationHidden, dependentLocation, guardianData.dependent]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ice-blue)", position: "relative" }}>
      <div className="mesh-bg" /><div className="texture-overlay" />
      <LangSwitch />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: window.innerWidth <= 768 ? 16 : 24 }}>
        <button onClick={onBack} style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", border: "1.5px solid rgba(255,255,255,.6)", borderRadius: 10, padding: window.innerWidth <= 480 ? "8px 16px" : "10px 20px", fontSize: window.innerWidth <= 480 ? 13 : 14, fontWeight: 600, color: "var(--azure)", cursor: "pointer", marginBottom: 20, boxShadow: "var(--shadow)" }}>
          ← {t('backDash')}
        </button>

        {isOutside && guardianData.dependent && (
          <div className="fade-up alert-pulse" style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", color: "#fff", padding: window.innerWidth <= 480 ? 16 : 20, borderRadius: window.innerWidth <= 480 ? 12 : 16, marginBottom: 20, boxShadow: "0 8px 32px rgba(220, 38, 38, 0.4)", border: "2px solid #fca5a5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: window.innerWidth <= 480 ? 12 : 16 }}>
              <div style={{ fontSize: window.innerWidth <= 480 ? 32 : 40 }}>🚨</div>
              <div>
                <h3 style={{ fontSize: window.innerWidth <= 480 ? 15 : 18, fontWeight: 700, marginBottom: 4 }}>
                  {isDependentLocationHidden ? t('dependentUntrackable') : t('alertTitle')}
                </h3>
                <p style={{ fontSize: window.innerWidth <= 480 ? 12 : 13, opacity: 0.95 }}>
                  {guardianData.dependent.fullName} {isDependentLocationHidden ? t('dependentMissingAlert') : t('alertSub').toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        {isUsingTestLocation && (
          <div style={{ background: "var(--azure-pale)", color: "var(--azure-dark)", padding: window.innerWidth <= 480 ? 12 : 16, borderRadius: 12, marginBottom: 20, fontSize: window.innerWidth <= 480 ? 12 : 14, display: "flex", flexDirection: window.innerWidth <= 480 ? "column" : "row", alignItems: window.innerWidth <= 480 ? "stretch" : "center", justifyContent: "space-between", gap: window.innerWidth <= 480 ? 12 : 0 }}>
            <span>⚠️ {t('usingTestLoc')}</span>
            <button className="btn-primary btn-coral" onClick={onResetTestLocation} style={{ width: window.innerWidth <= 480 ? "100%" : "auto", padding: "8px 16px", fontSize: 13 }}>
              {t('resetToActual')}
            </button>
          </div>
        )}

        {isTrackingPaused && (
          <div style={{ background: "#fef3c7", color: "#92400e", padding: window.innerWidth <= 480 ? 12 : 16, borderRadius: 12, marginBottom: 20, fontSize: window.innerWidth <= 480 ? 12 : 14, border: "2px solid #fbbf24" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 18 }}>⏸️</span>
              <strong>{t('demoMode')}</strong>
            </div>
            <p style={{ fontSize: window.innerWidth <= 480 ? 11 : 12, opacity: 0.9 }}>
              {t('trackingPausedNote')}
            </p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth <= 1024 ? "1fr" : "1fr 320px", gap: 20 }}>
          <div className="fade-up" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <div style={{ padding: window.innerWidth <= 480 ? 16 : 20, borderBottom: "1px solid rgba(74,144,164,.15)" }}>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: window.innerWidth <= 480 ? 18 : 22, fontWeight: 600 }}>{t('liveTrack')}</h2>
              <p style={{ fontSize: window.innerWidth <= 480 ? 12 : 13, color: "var(--ink-muted)", marginTop: 4 }}>{t('monPat')}</p>
            </div>
            <div id="live-map" style={{ height: window.innerWidth <= 768 ? 350 : 500 }}></div>
          </div>

          <div className="fade-up fade-up-d1">
            <div style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: window.innerWidth <= 480 ? 16 : 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", marginBottom: 16 }}>
              <h3 style={{ fontSize: window.innerWidth <= 480 ? 14 : 16, fontWeight: 600, marginBottom: 16 }}>{t('radius')}</h3>
              <input type="range" min="100" max="2000" step="50" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} style={{ width: "100%", marginBottom: 12 }} />
              <div style={{ fontSize: window.innerWidth <= 480 ? 20 : 24, fontWeight: 700, color: "var(--azure)", textAlign: "center", marginBottom: 16 }}>
                {radius >= 1000 ? `${(radius / 1000).toFixed(1)} km` : `${radius} m`}
              </div>

              <div style={{ padding: window.innerWidth <= 480 ? 12 : 16, background: isOutside ? "rgba(212,117,106,.1)" : "rgba(74,222,128,.1)", borderRadius: 12, border: `2px solid ${isOutside ? "var(--coral)" : "#4ade80"}`, textAlign: "center" }}>
                <div style={{ fontSize: window.innerWidth <= 480 ? 13 : 14, fontWeight: 600, color: isOutside ? "var(--coral)" : "#16a34a", marginBottom: 4 }}>
                  {isOutside ? t('outZone') : t('inZone')}
                </div>
                <div style={{ fontSize: window.innerWidth <= 480 ? 11 : 12, color: "var(--ink-muted)" }}>
                  {t('dist')}: {(distance * 1000).toFixed(0)}m
                </div>
              </div>
            </div>

            <div style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: window.innerWidth <= 480 ? 16 : 24, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)", marginBottom: 16 }}>
              <h3 style={{ fontSize: window.innerWidth <= 480 ? 14 : 16, fontWeight: 600, marginBottom: 12 }}>{t('quickAct')}</h3>
              <button className="btn-primary" onClick={onEditSafeZone} style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}>
                <EditIcon /> {t('editSafeZone')}
              </button>
              <button className="btn-primary btn-secondary" onClick={onSetTestLocation} style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}>
                📍 {t('setTestLoc')}
              </button>
              {isUsingTestLocation && (
                <button className="btn-primary btn-coral" onClick={onResetTestLocation} style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}>
                  ↩️ {t('resetToActual')}
                </button>
              )}
              <div style={{ borderTop: "1px solid rgba(74,144,164,.15)", paddingTop: 12, marginTop: 4, marginBottom: 12 }}>
                <button 
                  className={`btn-primary ${isTrackingPaused ? 'btn-secondary' : 'btn-coral'}`}
                  onClick={onToggleTracking} 
                  style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}
                >
                  {isTrackingPaused ? '▶️' : '⏸️'} {isTrackingPaused ? t('resumeTracking') : t('pauseTracking')}
                </button>
                <button 
                  className={`btn-primary ${isDependentLocationHidden ? 'btn-secondary' : 'btn-coral'}`}
                  onClick={onToggleDependentLocation} 
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: window.innerWidth <= 480 ? 13 : 14 }}
                >
                  {isDependentLocationHidden ? '👁️' : '🙈'} {isDependentLocationHidden ? t('showDependentLocation') : t('clearDependentLocation')}
                </button>
              </div>
            </div>

            <div style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: 16, padding: window.innerWidth <= 480 ? 16 : 20, boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
              <h3 style={{ fontSize: window.innerWidth <= 480 ? 13 : 14, fontWeight: 600, marginBottom: 12, color: "var(--azure)" }}>{t('how')}</h3>
              <ul style={{ fontSize: window.innerWidth <= 480 ? 11 : 12, lineHeight: 1.8, color: "var(--ink-light)", paddingLeft: 20 }}>
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
      // Fetch latest data from accountsDB instead of using stale session data
      if (session.role === "dependent") {
        const guardian = accountsDB.find(
          g => g.role === "guardian" && g.token === session.linkedToken
        );
        setGuardianData(ensureAccountDefaults(guardian));
      } else {
        // Fetch latest guardian data from accountsDB using the email from session
        const latestGuardian = accountsDB.find(acc => acc.email === session.email && acc.role === "guardian");
        setGuardianData(ensureAccountDefaults(latestGuardian || session));
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
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: window.innerWidth <= 480 ? 16 : 24 }}>
        <div className="mesh-bg" /><div className="texture-overlay" />
        <LangSwitch />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, textAlign: "center" }}>
          <div className="fade-up" style={{ marginBottom: window.innerWidth <= 480 ? 32 : 44 }}>
            <div style={{ width: window.innerWidth <= 480 ? 60 : 72, height: window.innerWidth <= 480 ? 60 : 72, borderRadius: window.innerWidth <= 480 ? 16 : 20, background: "linear-gradient(135deg,var(--azure),var(--azure-dark))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 6px 28px rgba(74,144,164,.3)", color: "#fff" }}>
              <ShieldIcon />
            </div>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: window.innerWidth <= 480 ? 24 : 30, fontWeight: 300, letterSpacing: "-.02em" }}>{t('app')}</h1>
            <p style={{ fontSize: window.innerWidth <= 480 ? 14 : 15, color: "var(--ink-muted)", marginTop: 6 }}>{t('tag')}</p>
          </div>
          <div className="fade-up fade-up-d1" style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)", borderRadius: window.innerWidth <= 480 ? 16 : 20, padding: window.innerWidth <= 480 ? "24px 20px" : "32px 24px", boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,.6)" }}>
            <button className="btn-primary" onClick={() => setPage("signup")} style={{ marginBottom: 12 }}>
              👤 &nbsp;{t('signUp')}
            </button>
            <button className="btn-primary btn-secondary" onClick={() => setPage("login")} style={{ marginBottom: 12 }}>
              <LogInIcon /> &nbsp;{t('logIn')}
            </button>
            <button className="btn-primary btn-danger" onClick={() => setPage("report-lost")}>
              🚨 &nbsp;{t('reportLost')}
            </button>
          </div>
          <p className="fade-up fade-up-d2" style={{ fontSize: window.innerWidth <= 480 ? 11 : 12, color: "var(--ink-muted)", marginTop: 24 }}>
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
            if (acc.role === "dependent") {
              const guardian = accountsDB.find(
                g => g.role === "guardian" && g.token === acc.linkedToken
              );
              setGuardianData(ensureAccountDefaults(guardian));
            } else {
              setGuardianData(ensureAccountDefaults(acc));
            }
            setPage("home");
          }}
          onSwitchToSignUp={() => setPage("signup")}  
          onBack={() => setPage("landing")}
        />
      )}
      {page === "report-lost" && <ReportLostDependentPage onBack={() => setPage("landing")} />}
      {page === "token" && <TokenPage guardianData={guardianData} onGoHome={() => setPage("home")} />}
      {page === "home" && <HomePage guardianData={guardianData} onLogout={handleLogout} />}
    </LanguageProvider>
  );
}