const DEMO_VERSION = "1";
export const DEMO_ACCOUNTS = [
  { 
    email: "guardian@demo.com", 
    password: "demo1234", 
    role: "guardian", 
    fullName: "Ahmed Hassan", 
    nationalId: "30101011234", 
    phone: "+20 123 456 7890", 
    address: "15 Tahrir St, Cairo", 
    dependent: { 
      fullName: "Sara Hassan", 
      nationalId: "85050512345", 
      email: "dependent@demo.com", 
      phone: "+20 987 654 3210", 
      address: "15 Tahrir St, Cairo" 
    }, 
    location: { lat: 30.0444, lng: 31.2357 }, 
    safeZoneCenter: { lat: 30.0444, lng: 31.2357 }, 
    safeZoneRadius: 500, 
    token: "DEMO-TKNA-ABCD" 
  },
  { 
    email: "dependent@demo.com", 
    password: "demo1234", 
    role: "dependent", 
    fullName: "Sara Hassan", 
    nationalId: "85050512345", 
    phone: "+20 987 654 3210", 
    linkedToken: "DEMO-TKNA-ABCD" 
  }
];

export let accountsDB = [];
export let lostReportsDB = [];

export function initializeAccounts() {
  const storedVersion = localStorage.getItem("sanad-demo-version");
  let storedAccounts = localStorage.getItem("sanad-accounts");

  // If not in localStorage, try sessionStorage fallback (used when quota forced session save)
  if (!storedAccounts) {
    storedAccounts = sessionStorage.getItem("sanad-accounts");
  }

  if (!storedAccounts || storedVersion !== DEMO_VERSION) {
    // Only seed demo if nothing persisted anywhere
    if (!storedAccounts) {
      localStorage.setItem("sanad-accounts", JSON.stringify(DEMO_ACCOUNTS));
      localStorage.setItem("sanad-demo-version", DEMO_VERSION);
      accountsDB = [...DEMO_ACCOUNTS];
    } else {
      accountsDB = JSON.parse(storedAccounts);
    }
  } else {
    accountsDB = JSON.parse(storedAccounts);
    // Normalize older single-photo fields to unified `photos` arrays
    accountsDB = accountsDB.map(acc => {
      const out = { ...acc };
      // Top-level account photo -> photos array
      if (!Array.isArray(out.photos) && out.photo) {
        out.photos = [out.photo];
      }
      // Dependent nested object: normalize photo -> photos
      if (out.dependent) {
        if (!Array.isArray(out.dependent.photos) && out.dependent.photo) {
          out.dependent = { ...out.dependent, photos: [out.dependent.photo] };
        }
        // Ensure dependent.photos exists as an array (empty if none)
        if (!Array.isArray(out.dependent.photos)) out.dependent.photos = [];
      }
      return out;
    });
  }

  // Load lost reports from localStorage, fallback to sessionStorage
  const lostReportsFromStorage = localStorage.getItem('sanad-lost-reports');
  if (lostReportsFromStorage) {
    lostReportsDB = JSON.parse(lostReportsFromStorage);
  } else {
    const lostReportsFromSession = sessionStorage.getItem('sanad-lost-reports');
    lostReportsDB = lostReportsFromSession ? JSON.parse(lostReportsFromSession) : [];
  }
  return accountsDB;
}

export function saveAccountsDB() {
  try {
    localStorage.setItem('sanad-accounts', JSON.stringify(accountsDB));
  } catch (err) {
    console.warn('Quota exceeded when writing sanad-accounts to localStorage, saving full accounts to sessionStorage to preserve photos', err);
    try {
      sessionStorage.setItem('sanad-accounts', JSON.stringify(accountsDB));
      console.warn('Saved full accounts to sessionStorage (session-lifetime)');
      return;
    } catch (errSession) {
      console.warn('Failed saving full accounts to sessionStorage, attempting compact localStorage save', errSession);
      try {
        // Create a compact version removing large fields (photos, imageData, lostReports with images)
        const compact = accountsDB.map(acc => {
          const { photo, photos, imageData, ...rest } = acc || {};
          const compactAccount = { ...rest };
          // Remove dependent photos (if any) to reduce size
          if (acc.dependent) {
            const { photo: dphoto, photos: dphotos, ...depRest } = acc.dependent;
            compactAccount.dependent = { ...depRest };
          }
          if (acc.lostReports && Array.isArray(acc.lostReports)) {
            compactAccount.lostReports = acc.lostReports.map(({ image, ...report }) => report);
          }
          return compactAccount;
        });
        localStorage.setItem('sanad-accounts', JSON.stringify(compact));
        console.warn('Saved compacted accounts to localStorage');
      } catch (err2) {
        console.error('Failed saving compacted accounts to localStorage and sessionStorage; data will remain in-memory for this session', err2);
      }
    }
  }
}

export function saveLostReportsDB() {
  try {
    localStorage.setItem('sanad-lost-reports', JSON.stringify(lostReportsDB));
  } catch (err) {
    console.warn('Quota exceeded when writing sanad-lost-reports to localStorage, attempting to save in sessionStorage instead', err);
    try {
      // Use sessionStorage as fallback to keep full report data including images
      sessionStorage.setItem('sanad-lost-reports', JSON.stringify(lostReportsDB));
      console.warn('Saved lost reports to sessionStorage (will persist during session)');
    } catch (err2) {
      console.error('Failed saving lost reports to sessionStorage as well', err2);
      // Keep data in memory (lostReportsDB) but warn user
      console.warn('Unable to persist lost reports - data will be available during this session only');
    }
  }
}
