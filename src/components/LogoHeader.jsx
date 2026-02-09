import Logo from './Logo';
import { useLang } from '../context/LanguageContext';

export default function LogoHeader() {
  const { t } = useLang();
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Logo width={50} height={50} />
      <h1 className="appName" style={{ fontFamily: "'Fraunces',serif", fontSize: 32, fontWeight: 600, margin: 0, color: "var(--ink)" }}>
        {t('app')}
      </h1>
    </div>
  );
}
