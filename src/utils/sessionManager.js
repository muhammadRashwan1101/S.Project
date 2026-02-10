const SESSION_KEY = 'sanad-session';
const SESSION_ID_KEY = 'sanad-session-id';

// Generate unique session ID for this tab/window
export function generateSessionId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Save session with tab-specific session ID
function isQuotaExceeded(err) {
  if (!err) return false;
  // Different browsers throw different errors
  return err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED' || (err.code === 22) || (err.code === 1014);
}

export function saveSession(userData) {
  const sessionId = sessionStorage.getItem(SESSION_ID_KEY) || generateSessionId();

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
    window.dispatchEvent(new CustomEvent('sessionChange'));
    return sessionId;
  } catch (err) {
    if (isQuotaExceeded(err)) {
      console.warn('localStorage quota exceeded while saving session — attempting compact fallback');

      // Create a compact session object removing large or non-essential fields
      try {
        const compact = { ...userData };

        // Remove big binary/photo fields if present
        if (compact.dependent) {
          compact.dependent = { ...compact.dependent };
          if (compact.dependent.photo) delete compact.dependent.photo;
          if (Array.isArray(compact.dependent.photos)) delete compact.dependent.photos;
        }

        // Reduce lostReports to minimal metadata (no images)
        if (Array.isArray(compact.lostReports)) {
          compact.lostReports = compact.lostReports.map(r => ({ id: r.id, status: r.status, reportedAt: r.reportedAt, location: r.location }));
        }

        // Try again to store compacted data in localStorage
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(compact));
          sessionStorage.setItem(SESSION_ID_KEY, sessionId);
          return sessionId;
        } catch (err2) {
          // If still failing, fall back to sessionStorage (lifetime = tab)
          console.warn('compact localStorage save failed; falling back to sessionStorage', err2);
          try {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(compact));
            sessionStorage.setItem(SESSION_ID_KEY, sessionId);
            return sessionId;
          } catch (err3) {
            console.error('Failed to save session in sessionStorage as fallback', err3);
            throw err3;
          }
        }
      } catch (compactErr) {
        console.error('Error while compacting session data', compactErr);
        throw compactErr;
      }
    }

    // Re-throw unknown errors
    throw err;
  }
}

// Get current session and validate it's for this tab
export function getSession() {
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
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_ID_KEY);
}

// Initialize session ID for this tab if user is logged in
export function initializeSessionId() {
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (sessionData && !sessionStorage.getItem(SESSION_ID_KEY)) {
    sessionStorage.setItem(SESSION_ID_KEY, generateSessionId());
  }
}
