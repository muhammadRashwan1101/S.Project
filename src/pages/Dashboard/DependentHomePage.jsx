import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { LangSwitch } from '../../components/UI/LangSwitch';
import { getSession, clearSession } from '../../utils/sessionManager';
import { PlusIcon, TrashIcon, EditIcon } from '../../components/UI/Icons';
import PhotoUploader from '../../components/PhotoUploader';
import SideNavbar from '../../components/SideNavbar';
import LogoHeader from '../../components/LogoHeader';
import FavoriteLocations from '../../components/FavoriteLocations';

export default function DependentHomePage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [dependent, setDependent] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [importantInfo, setImportantInfo] = useState([]);
  const [memories, setMemories] = useState([]);
  const [emergencyNumbers, setEmergencyNumbers] = useState([]);

  useEffect(() => {
    const session = getSession();
    if (session && session.role === 'dependent') {
      setDependent(session);
      // Load data from localStorage with error handling
      try {
        setReminders(JSON.parse(localStorage.getItem('dependentReminders') || '[]'));
      } catch (e) {
        setReminders([]);
        localStorage.setItem('dependentReminders', '[]');
      }
      try {
        const info = localStorage.getItem('dependentImportantInfo');
        setImportantInfo(JSON.parse(info || '[]'));
      } catch (e) {
        setImportantInfo([]);
        localStorage.setItem('dependentImportantInfo', '[]');
      }
      try {
        setMemories(JSON.parse(localStorage.getItem('dependentMemories') || '[]'));
      } catch (e) {
        setMemories([]);
        localStorage.setItem('dependentMemories', '[]');
      }
      try {
        setEmergencyNumbers(JSON.parse(localStorage.getItem('dependentEmergencyNumbers') || '[]'));
      } catch (e) {
        setEmergencyNumbers([]);
        localStorage.setItem('dependentEmergencyNumbers', '[]');
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div style={{ fontFamily: "Fraunces" ,marginLeft: '250px', minHeight: '100vh', background: 'var(--ice-blue)', position: 'relative' }}>
        <div className="texture-overlay" />
        <div className="mesh-bg" />
        <div style={{ position: 'relative', zIndex: 1, padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <LangSwitch />
            <button onClick={handleLogout} style={{ background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: '600', cursor: 'pointer' }}>
              {t("logout")}
            </button>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--ink)', marginBottom: '32px' }}>
            {t('welcome')}, {dependent.fullName}
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--azure)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>📅 {t('reminders')}</h2>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <ReminderSection reminders={reminders} onSave={saveReminders} />
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--azure)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>📝 {t('importantInfo')}</h2>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <ImportantInfoSection info={importantInfo} onSave={saveImportantInfo} />
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--azure)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>💭 {t("yourMemories")}</h2>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <MemoriesSection memories={memories} onSave={saveMemories} />
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--azure)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>🚨 {t('emergencyNumbers')}</h2>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <EmergencyNumbersSection numbers={emergencyNumbers} onSave={saveEmergencyNumbers} />
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid rgba(255,255,255,.6)', gridColumn: 'span 2', minHeight: '600px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--azure)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>📍 {t('favoriteLocations')}</h2>
              <FavoriteLocations />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ReminderSection({ reminders, onSave }) {
  const { t } = useLang()
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
      case 'medicine': return '💊';
      case 'task': return '✅';
      case 'meeting': return '📅';
      default: return '📝';
    }
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
        />
        <input
          type="time"
          value={newReminder.time}
          onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
          className="input-base"
        />
        <button onClick={addReminder} style={{ background: 'var(--azure)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <PlusIcon /> {t("add")}
        </button>
      </div>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {reminders.map(reminder => (
          <div key={reminder.id} style={{ background: 'rgba(74,144,164,.08)', padding: '12px', marginBottom: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', marginBottom: '4px' }}>
                {getIcon(reminder.type)} {reminder.title}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ink-light)' }}>
                {reminder.time}
              </div>
            </div>
            <button onClick={() => removeReminder(reminder.id)} style={{ background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer' }}>
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImportantInfoSection({ info, onSave }) {
  const { t } = useLang()
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
        />
        <input
          type="text"
          placeholder={t('description')}
          value={newNote.description}
          onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
          className="input-base"
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
  const { t } = useLang()
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
        />
        <input
          type="date"
          value={newMemory.date}
          onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
          className="input-base"
        />
        <textarea
          placeholder={t('description')}
          value={newMemory.description}
          onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
          className="input-base"
          style={{ height: '60px', resize: 'vertical' }}
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
  const { t } = useLang()
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
          placeholder="Name"
          value={newNumber.name}
          onChange={(e) => setNewNumber({ ...newNumber, name: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(74,144,164,.3)', fontSize: '14px' }}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={newNumber.number}
          onChange={(e) => setNewNumber({ ...newNumber, number: e.target.value })}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(74,144,164,.3)', fontSize: '14px' }}
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
