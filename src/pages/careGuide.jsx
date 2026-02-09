
import { useState, useEffect } from "react";
import { useLang } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import SideNavbar from '../components/SideNavbar';
import { LangSwitch } from '../components/UI/LangSwitch';
import { TR } from "../constants/translations";
import LogoHeader from '../components/LogoHeader';
/* ═══════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════ */
const ArrowLeft = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>);
const CheckCircle = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const XCircle = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>);
const GlobeIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);
const FileTextIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>);
const SendIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);

/* ═══════════════════════════════════════════════════════════════
   CARE GUIDE PAGE - MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */
function CareGuide() {
  const { t, TR } = useLang();
  const [chronicConditions, setChronicConditions] = useState({});
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketText, setTicketText] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const tips = TR?.tips || [];
  const questions = TR?.questions || [];

  // Get current user email from localStorage
  const getCurrentUserEmail = () => {
    return localStorage.getItem('sanad-current-user-email') || null;
  };

  // Load saved chronic conditions on mount
  useEffect(() => {
    const userEmail = getCurrentUserEmail();
    if (userEmail) {
      const savedConditions = localStorage.getItem(`sanad-chronic-${userEmail}`);
      if (savedConditions) {
        setChronicConditions(JSON.parse(savedConditions));
      }
    }
  }, []);

  const handleToggleCondition = (questionIndex, value) => {
    setChronicConditions({ ...chronicConditions, [questionIndex]: value });
  };

  const handleSubmit = () => {
    const userEmail = getCurrentUserEmail();

    if (!userEmail) {
      alert('Please log in first to save your information.');
      return;
    }

    // Save chronic conditions to localStorage
    localStorage.setItem(`sanad-chronic-${userEmail}`, JSON.stringify(chronicConditions));

    // Also update the main accounts database
    const accountsDB = JSON.parse(localStorage.getItem("sanad-accounts")) || [];
    const accountIndex = accountsDB.findIndex(acc => acc.email === userEmail);

    if (accountIndex !== -1) {
      accountsDB[accountIndex].chronicConditions = chronicConditions;
      accountsDB[accountIndex].chronicConditionsUpdated = new Date().toISOString();
      localStorage.setItem("sanad-accounts", JSON.stringify(accountsDB));
    }

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
    console.log('Chronic conditions saved:', chronicConditions);
  };

  const handleSubmitTicket = () => {
    if (!ticketText.trim()) {
      alert('Please write your complaint first.');
      return;
    }

    const userEmail = getCurrentUserEmail();

    if (!userEmail) {
      alert('Please log in first to submit a ticket.');
      return;
    }

    // Get existing tickets
    const tickets = JSON.parse(localStorage.getItem('sanad-tickets')) || [];

    // Add new ticket
    const newTicket = {
      id: Date.now(),
      userEmail: userEmail,
      message: ticketText,
      timestamp: new Date().toISOString(),
      status: 'open'
    };

    tickets.push(newTicket);
    localStorage.setItem('sanad-tickets', JSON.stringify(tickets));

    // Reset and close
    setTicketText("");
    setShowTicketModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);

    console.log('Ticket submitted:', newTicket);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", padding: 24, background: '#f5f5f5' }}>
      <div className="texture-overlay" />
      <LangSwitch />

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="toast" style={{ background: 'var(--green)', color: '#fff' }}>
          ✓ {t('ticketSuccess')}
        </div>
      )}

      {/* Ticket Modal */}
      {showTicketModal && (
        <div className="modal-backdrop" onClick={() => setShowTicketModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ padding: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              {t('ticketTitle')}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 24 }}>
              {t('ticketSubtitle')}
            </p>

            <textarea
              value={ticketText}
              onChange={e => setTicketText(e.target.value)}
              placeholder={t('ticketPlaceholder')}
              style={{
                width: '100%',
                minHeight: 150,
                padding: 16,
                borderRadius: 12,
                border: '2px solid #d4e8ef',
                fontSize: 14,
                fontFamily: 'inherit',
                resize: 'vertical',
                marginBottom: 20,
                outline: 'none'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--azure)'}
              onBlur={e => e.target.style.borderColor = '#d4e8ef'}
            />

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleSubmitTicket}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <SendIcon /> {t('ticketSubmit')}
              </button>
              <button
                onClick={() => setShowTicketModal(false)}
                className="btn-primary btn-secondary"
              >
                {t('ticketCancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", paddingTop: 80 }}>
        {/* Header with Add Ticket Button */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 48, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <LogoHeader />
          </div>
          
          <button
            onClick={() => setShowTicketModal(true)}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'var(--coral)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '12px 20px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all .2s',
              boxShadow: '0 2px 8px rgba(212,117,106,.3)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#c0635a';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(212,117,106,.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--coral)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(212,117,106,.3)';
            }}
          >
            <FileTextIcon /> {t('addTicket')}
          </button>

          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontWeight: 600, marginBottom: 12, color: 'var(--ink)' }}>
            {t('pageTitle')}
          </h1>
          <p style={{ fontSize: 16, color: "var(--ink-muted)", maxWidth: 600, margin: '0 auto' }}>
            {t('pageSubtitle')}
          </p>
        </div>

        {/* Tips Section */}
        <div className="fade-up fade-up-d1" style={{ marginBottom: 48 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: 'var(--ink)' }}>
              {t('tipsTitle')}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 24 }}>
              {t('tipsSubtitle')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {tips.map((tip, idx) => (
                <div key={idx} style={{ background: '#f9fafb', borderRadius: 12, padding: 16, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-light)', border: '1px solid #e5e7eb' }}>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chronic Conditions Section */}
        <div className="fade-up fade-up-d2">
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: 'var(--ink)' }}>
              {t('chronicTitle')}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>
              {t('chronicSubtitle')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 20, alignItems: 'stretch' }}>
            {questions.map((question, qIdx) => (
              <div key={qIdx} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,.06)', display: 'flex', flexDirection: 'column', minHeight: 200 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--ink)' }}>
                  {question.q}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 20, lineHeight: 1.5, flexGrow: 1 }}>
                  {question.subtitle}
                </p>

                {/* Yes/No Toggle */}
                <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
                  <button
                    onClick={() => handleToggleCondition(qIdx, true)}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      borderRadius: 10,
                      border: chronicConditions[qIdx] === true ? '2px solid #4ed883' : '2px solid #e5e7eb',
                      background: chronicConditions[qIdx] === true ? '#3ff58469' : '#fff',
                      color: chronicConditions[qIdx] === true ? 'var(--green)' : 'var(--ink-muted)',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all .2s',
                      fontFamily: 'inherit'
                    }}
                  >
                    ✓ Yes
                  </button>
                  <button
                    onClick={() => handleToggleCondition(qIdx, false)}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      borderRadius: 10,
                      border: chronicConditions[qIdx] === false ? '2px solid var(--coral)' : '2px solid #e5e7eb',
                      background: chronicConditions[qIdx] === false ? 'rgba(212,117,106,.1)' : '#fff',
                      color: chronicConditions[qIdx] === false ? 'var(--coral)' : 'var(--ink-muted)',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all .2s',
                      fontFamily: 'inherit'
                    }}
                  >
                    ✗ No
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={handleSubmit}
            className="btn-primary"
            style={{ maxWidth: 300 }}
          >
            {t('submit')}
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="btn-primary btn-secondary"
            style={{ maxWidth: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <ArrowLeft /> {t('backToHome')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CareGuidePage() {
  const navigate = useNavigate();
  return (
    <>
      <SideNavbar activeNav="questions" navigate={navigate} />
      <div style={{ marginLeft: '250px' }}>
        <div style={{ minHeight: "100vh", position: "relative", padding: 24, background: '#f5f5f5' }}>
          <div className="texture-overlay" />
          <LangSwitch />
          <CareGuide />
        </div>
      </div>
    </>
  );
}
