import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { getSession, clearSession } from '../../utils/sessionManager';
import { accountsDB } from '../../utils/dataStore';
import { PlusIcon, TrashIcon, EditIcon, CalendarIcon, PillIcon, CheckSquareIcon, UsersGroupIcon, AlertCircleIcon, ClockIcon, BrainIcon, PhoneIcon, MapPinIcon, GlobeIcon, SunIcon, MoonIcon } from '../../components/UI/Icons';
import PhotoUploader from '../../components/PhotoUploader';
import SideNavbar from '../../components/SideNavbar';
import LogoHeader from '../../components/LogoHeader';
import FavoriteLocations from '../../components/FavoriteLocations';

export default function DependentHomePage() {
  const { t, lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  const isSmallScreen = isMobile || isTablet;
  const [dependent, setDependent] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [importantInfo, setImportantInfo] = useState([]);
  const [memories, setMemories] = useState([]);
  const [emergencyNumbers, setEmergencyNumbers] = useState([]);
  const isRTL = lang === 'ar';

  const loadData = () => {
    const session = getSession();
    if (session && session.role === 'dependent') {
      setDependent(session);
      const userKey = session.email;
      // Load data from localStorage with error handling
      try {
        setReminders(JSON.parse(localStorage.getItem('dependentReminders_' + userKey) || '[]'));
      } catch (e) {
        setReminders([]);
        localStorage.setItem('dependentReminders_' + userKey, '[]');
      }
      try {
        const info = localStorage.getItem('dependentImportantInfo_' + userKey);
        setImportantInfo(JSON.parse(info || '[]'));
      } catch (e) {
        setImportantInfo([]);
        localStorage.setItem('dependentImportantInfo_' + userKey, '[]');
      }
      try {
        setMemories(JSON.parse(localStorage.getItem('dependentMemories_' + userKey) || '[]'));
      } catch (e) {
        setMemories([]);
        localStorage.setItem('dependentMemories_' + userKey, '[]');
      }
      try {
        setEmergencyNumbers(JSON.parse(localStorage.getItem('dependentEmergencyNumbers_' + userKey) || '[]'));
      } catch (e) {
        setEmergencyNumbers([]);
        localStorage.setItem('dependentEmergencyNumbers_' + userKey, '[]');
      }
    } else {
      setDependent(null);
    }
  };

  useEffect(() => {
    loadData();

    // Check for active reports and redirect to map view
    const session = getSession();
    if (session && session.role === 'dependent' && session.linkedToken) {
      const guardian = accountsDB.find(acc => acc.token === session.linkedToken);
      if (guardian && guardian.lostReports && guardian.lostReports.some(r => r.status === 'active')) {
        navigate('/map-view');
      }
    }

    // Initialize mock data for demo account if empty
    if (session && session.email === 'dependent@demo.com') {
      const userKey = session.email;
      const hasReminders = localStorage.getItem('dependentReminders_' + userKey);
      if (!hasReminders || JSON.parse(hasReminders).length === 0) {
        const mockReminders = [
          { id: 1, type: 'medicine', title: 'Take Blood Pressure Medication', time: '08:00' },
          { id: 2, type: 'medicine', title: 'Diabetes Medication', time: '14:00' },
          { id: 3, type: 'meeting', title: 'Doctor Appointment', time: '10:30' }
        ];
        localStorage.setItem('dependentReminders_' + userKey, JSON.stringify(mockReminders));
        setReminders(mockReminders);
      }

      const hasInfo = localStorage.getItem('dependentImportantInfo_' + userKey);
      if (!hasInfo || JSON.parse(hasInfo).length === 0) {
        const mockInfo = [
          { id: 1, title: 'Medical Allergies', description: 'Allergic to Penicillin and Aspirin' },
          { id: 2, title: 'Emergency Contact', description: 'Dr. Mohamed Ali - +20 123 456 7890' }
        ];
        localStorage.setItem('dependentImportantInfo_' + userKey, JSON.stringify(mockInfo));
        setImportantInfo(mockInfo);
      }

      const hasNumbers = localStorage.getItem('dependentEmergencyNumbers_' + userKey);
      if (!hasNumbers || JSON.parse(hasNumbers).length === 0) {
        const mockNumbers = [
          { id: 1, name: 'Ahmed (Guardian)', number: '+20 123 456 7890' },
          { id: 2, name: 'Emergency Services', number: '123' },
          { id: 3, name: 'Family Doctor', number: '+20 111 222 3333' }
        ];
        localStorage.setItem('dependentEmergencyNumbers_' + userKey, JSON.stringify(mockNumbers));
        setEmergencyNumbers(mockNumbers);
      }
    }

    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const saveReminders = (newReminders) => {
    setReminders(newReminders);
    localStorage.setItem('dependentReminders', JSON.stringify(newReminders));
  };

  const saveImportantInfo = (info) => {
    setImportantInfo(info);
    localStorage.setItem('dependentImportantInfo', JSON.stringify(info));
  };

  const saveMemories = (newMemories) => {
    setMemories(newMemories);
    localStorage.setItem('dependentMemories', JSON.stringify(newMemories));
  };

  const saveEmergencyNumbers = (numbers) => {
    setEmergencyNumbers(numbers);
    localStorage.setItem('dependentEmergencyNumbers', JSON.stringify(numbers));
  };

  if (!dependent) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    clearSession();
    navigate('/');
  };

  return (
    <>
      <SideNavbar activeNav={'homepage'} navigate={navigate} homeRoute={'/dependent-home'} />
      <div style={{ fontFamily: "Fraunces", marginLeft: isRTL ? 0 : (isSmallScreen ? 0 : '124px'), marginRight: isRTL ? (isSmallScreen ? 0 : '124px') : 0, marginBottom: isSmallScreen ? '64px' : 0, minHeight: '100vh', background: 'var(--ice-blue)', position: 'relative', padding: isSmallScreen ? '20px 16px' : '40px 40px', paddingTop: isSmallScreen ? '80px' : '100px' }}>
        <div className="texture-overlay" />
        <div className="mesh-bg" />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button 
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
                style={{ 
                  width: 44,
                  height: 44,
                  padding: 0,
                  background: "var(--card-bg)", 
                  backdropFilter: "blur(20px)", 
                  border: "1.5px solid rgba(255,255,255,.6)", 
                  borderRadius: 10, 
                  cursor: "pointer", 
                  color: "var(--azure)", 
                  transition: "all .2s", 
                  boxShadow: "var(--shadow)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <GlobeIcon />
              </button>
              <button
                onClick={toggleTheme}
                style={{
                  width: 44,
                  height: 44,
                  padding: 0,
                  border: '1.5px solid rgba(255,255,255,.6)',
                  borderRadius: 10,
                  background: 'var(--card-bg)',
                  backdropFilter: 'blur(20px)',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow)'
                }}
              >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              </button>
            </div>
            <button
              onClick={handleLogout}
              style={{
                height: 44,
                padding: '0 16px',
                border: '1.5px solid rgba(212,117,106,.6)',
                borderRadius: 10,
                background: 'var(--card-bg)',
                backdropFilter: 'blur(20px)',
                color: 'var(--coral)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow)',
                fontSize: 14,
                fontWeight: 500
              }}
            >
              {t('logout')}
            </button>
          </div>
          <h1 style={{ fontSize: isSmallScreen ? '28px' : '36px', fontWeight: '700', color: 'var(--ink)', marginBottom: isSmallScreen ? '24px' : '40px', fontFamily: "'Fraunces',serif" }}>
            {t('welcome')}, {dependent.fullName}
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(auto-fit, minmax(450px, 1fr))', gap: isSmallScreen ? '16px' : '24px' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(74,144,164,.12), rgba(74,144,164,.05))', backdropFilter: 'blur(20px)', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(74,144,164,.2)', border: '2px solid rgba(74,144,164,.3)', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--azure)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', textShadow: '0 1px 2px rgba(0,0,0,.1)' }}><CalendarIcon /> {t('reminders')}</h2>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <ReminderSection reminders={reminders} onSave={saveReminders} />
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--azure)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircleIcon /> {t('importantInfo')}</h2>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <ImportantInfoSection info={importantInfo} onSave={saveImportantInfo} />
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--azure)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><BrainIcon /> {t("yourMemories")}</h2>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <MemoriesSection memories={memories} onSave={saveMemories} />
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--azure)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><PhoneIcon /> {t('emergencyNumbers')}</h2>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <EmergencyNumbersSection numbers={emergencyNumbers} onSave={saveEmergencyNumbers} />
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', padding: isSmallScreen ? '20px' : '24px', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)', gridColumn: isSmallScreen ? '1' : 'span 2', minHeight: isSmallScreen ? '400px' : '600px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--azure)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPinIcon /> {t('favoriteLocations')}</h2>
              <FavoriteLocations />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ReminderSection({ reminders, onSave }) {
  const { t, lang } = useLang()
  const isRTL = lang === 'ar';
  const [newReminder, setNewReminder] = useState({ type: 'medicine', title: '', time: '', description: '' });

  const addReminder = () => {
    if (newReminder.title) {
      onSave([...reminders, { ...newReminder, id: Date.now() }]);
      setNewReminder({ type: 'medicine', title: '', time: '', description: '' });
    }
  };

  const removeReminder = (id) => {
    onSave(reminders.filter(r => r.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'medicine': return <PillIcon />;
      case 'task': return <CheckSquareIcon />;
      case 'meeting': return <CalendarIcon />;
      default: return <AlertCircleIcon />;
    }
  };

  const formatTime12Hour = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <select value={newReminder.type} onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value })} className="input-base">
          <option value="medicine">{t('medicine')}</option>
          <option value="task">{t('task')}</option>
          <option value="meeting">{t('meeting')}</option>
          <option value="other">{t('other')}</option>
        </select>
        <input
          type="text"
          placeholder={t('noteTitle')}
          value={newReminder.title}
          onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
          className="input-base"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        />
        <input
          type="time"
          value={newReminder.time}
          onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
          className="input-base"
          style={{ direction: isRTL ? 'rtl' : 'ltr', colorScheme: 'dark' }}
        />
        <button onClick={addReminder} style={{ background: 'var(--azure)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <PlusIcon /> {t("add")}
        </button>
      </div>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {reminders.map(reminder => (
          <div key={reminder.id} style={{ background: 'linear-gradient(135deg, rgba(74,144,164,.15), rgba(74,144,164,.08))', padding: '16px', marginBottom: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '2px solid rgba(74,144,164,.25)', boxShadow: '0 2px 8px rgba(74,144,164,.15)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--ink)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getIcon(reminder.type)} {reminder.title}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--azure)', background: 'rgba(255,255,255,.7)', padding: '4px 10px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ClockIcon /> {formatTime12Hour(reminder.time)}
              </div>
            </div>
            <button onClick={() => removeReminder(reminder.id)} style={{ background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', transition: 'all .2s' }}>
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImportantInfoSection({ info, onSave }) {
  const { t, lang } = useLang()
  const isRTL = lang === 'ar';
  const [newNote, setNewNote] = useState({ title: '', description: '' });
  const [editingNote, setEditingNote] = useState(null);
  const [expandedNotes, setExpandedNotes] = useState(new Set());

  const addNote = () => {
    if (newNote.title && newNote.description) {
      onSave([...info, { ...newNote, id: Date.now() }]);
      setNewNote({ title: '', description: '' });
    }
  };

  const updateNote = (id, updatedNote) => {
    onSave(info.map(note => note.id === id ? { ...updatedNote, id } : note));
    setEditingNote(null);
  };

  const removeNote = (id) => {
    onSave(info.filter(note => note.id !== id));
  };

  const toggleNote = (id) => {
    const newExpanded = new Set(expandedNotes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNotes(newExpanded);
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder={t('noteTitle')}
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="input-base"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        />
        <input
          type="text"
          placeholder={t('description')}
          value={newNote.description}
          onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
          className="input-base"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        />
        <button onClick={addNote} style={{ background: 'var(--azure)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <PlusIcon /> {t("addNote")}
        </button>
      </div>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {info.map(note => (
          <div key={note.id} style={{ background: 'rgba(74,144,164,.08)', padding: '12px', marginBottom: '10px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleNote(note.id)}>
              <h4 style={{ margin: 0, color: 'var(--ink)', fontSize: '15px', fontWeight: '600' }}>{note.title}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--ink-light)' }}>
                  {expandedNotes.has(note.id) ? '▼' : '▶'}
                </span>
                <button onClick={(e) => { e.stopPropagation(); removeNote(note.id); }} style={{ background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px' }}>
                  <TrashIcon />
                </button>
              </div>
            </div>
            {expandedNotes.has(note.id) && (
              <p style={{ margin: '8px 0 0 0', color: 'var(--ink-muted)', fontSize: '13px' }}>{note.description}</p>
            )}
          </div>
        ))}
        {info.length === 0 && <p style={{ color: 'var(--ink-light)', fontSize: '14px' }}>{t('noNotes')}</p>}
      </div>
      {editingNote && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setEditingNote(null)}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', maxWidth: '500px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '16px', color: 'var(--ink)' }}>Edit Note</h3>
            <input
              type="text"
              value={editingNote.title}
              onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(74,144,164,.3)', marginBottom: '10px', fontSize: '14px' }}
            />
            <textarea
              value={editingNote.description}
              onChange={(e) => setEditingNote({ ...editingNote, description: e.target.value })}
              style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: '1px solid rgba(74,144,164,.3)', marginBottom: '10px', fontSize: '14px', resize: 'vertical' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => updateNote(editingNote.id, editingNote)} style={{ flex: 1, background: 'var(--azure)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: '600', cursor: 'pointer' }}>Save</button>
              <button onClick={() => setEditingNote(null)} style={{ flex: 1, background: 'var(--ink-muted)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MemoriesSection({ memories, onSave }) {
  const { t, lang } = useLang()
  const isRTL = lang === 'ar';
  const [newMemory, setNewMemory] = useState({ title: '', description: '', date: '', media: null });

  const addMemory = () => {
    if (newMemory.title) {
      onSave([...memories, { ...newMemory, id: Date.now() }]);
      setNewMemory({ title: '', description: '', date: '', media: null });
    }
  };

  const removeMemory = (id) => {
    onSave(memories.filter(m => m.id !== id));
  };

  const handleMediaChange = (mediaData) => {
    setNewMemory({ ...newMemory, media: mediaData });
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder={t('memoryTitle')}
          value={newMemory.title}
          onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
          className="input-base"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        />
        <input
          type="date"
          value={newMemory.date}
          onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
          className="input-base"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        />
        <textarea
          placeholder={t('description')}
          value={newMemory.description}
          onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
          className="input-base"
          style={{ height: '60px', resize: 'vertical', direction: isRTL ? 'rtl' : 'ltr' }}
        />
        <PhotoUploader currentPhoto={newMemory.media} onPhotoChange={handleMediaChange} />
        <button onClick={addMemory} style={{ background: 'var(--azure)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <PlusIcon /> {t("addMemory")}
        </button>
      </div>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {memories.map(memory => (
          <div key={memory.id} style={{ background: 'rgba(74,144,164,.08)', padding: '12px', marginBottom: '10px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px 0', color: 'var(--ink)', fontSize: '15px', fontWeight: '600' }}>{memory.title}</h4>
                <p style={{ margin: '0 0 8px 0', color: 'var(--ink-light)', fontSize: '13px' }}>{memory.date}</p>
                <p style={{ margin: 0, color: 'var(--ink-muted)', fontSize: '13px' }}>{memory.description}</p>
                {memory.media && (
                  <div style={{ marginTop: '8px' }}>
                    {memory.media.startsWith('data:image/') ? (
                      <img src={memory.media} alt="Memory" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px' }} />
                    ) : memory.media.startsWith('data:video/') ? (
                      <video controls style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px' }}>
                        <source src={memory.media} />
                      </video>
                    ) : null}
                  </div>
                )}
              </div>
              <button onClick={() => removeMemory(memory.id)} style={{ background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', marginLeft: '8px' }}>
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmergencyNumbersSection({ numbers, onSave }) {
  const [newNumber, setNewNumber] = useState({ name: '', number: '' });
  const { t, lang } = useLang()
  const isRTL = lang === 'ar';
  const addNumber = () => {
    if (newNumber.name && newNumber.number) {
      onSave([...numbers, { ...newNumber, id: Date.now() }]);
      setNewNumber({ name: '', number: '' });
    }
  };

  const removeNumber = (id) => {
    onSave(numbers.filter(n => n.id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder={t('name')}
          value={newNumber.name}
          onChange={(e) => setNewNumber({ ...newNumber, name: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(74,144,164,.3)', fontSize: '14px', direction: isRTL ? 'rtl' : 'ltr' }}
        />
        <input
          type="tel"
          placeholder={t('phoneNumber')}
          value={newNumber.number}
          onChange={(e) => setNewNumber({ ...newNumber, number: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(74,144,164,.3)', fontSize: '14px', direction: isRTL ? 'rtl' : 'ltr' }}
        />
        <button onClick={addNumber} style={{ background: 'var(--azure)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <PlusIcon /> {t("add")}
        </button>
      </div>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {numbers.map(num => (
          <div key={num.id} style={{ background: 'rgba(74,144,164,.08)', padding: '12px', marginBottom: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', marginBottom: '4px' }}>
                {num.name}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ink-light)' }}>
                {num.number}
              </div>
            </div>
            <button onClick={() => removeNumber(num.id)} style={{ background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer' }}>
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
