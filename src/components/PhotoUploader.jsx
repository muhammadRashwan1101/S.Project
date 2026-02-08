import { useRef } from "react";
import { useLang } from "../context/LanguageContext";
import { CameraIcon, PlusIcon } from "./UI/Icons";

export default function PhotoUploader({ currentPhoto, onPhotoChange }) {
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
