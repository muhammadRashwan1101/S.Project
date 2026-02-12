import { useLang } from '../context/LanguageContext';

const Logo = ({ width = 80, height = 80, style = {} }) => {
  const { lang } = useLang();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <img
        className="logo" 
        src="/assets/logo.png" 
        alt="Sanad Logo" 
        style={{ 
          width, 
          height, 
          objectFit: 'contain',
          borderRadius: 50,
          boxShadow: "0 0 5px 1px #86868685",
          ...style 
        }} 
      />
    </div>
  );
};

export default Logo;
