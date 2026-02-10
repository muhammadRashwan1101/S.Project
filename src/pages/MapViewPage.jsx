import { useNavigate } from 'react-router-dom';
import { getSession } from '../utils/sessionManager';
import { accountsDB } from '../utils/dataStore';
import MapView from './Dashboard/MapView';

export default function MapViewPage() {
  const navigate = useNavigate();
  const session = getSession();

  if (!session) {
    navigate('/');
    return null;
  }

  let guardianData;
  if (session.role === 'dependent') {
    guardianData = accountsDB.find(acc => acc.token === session.linkedToken);
  } else {
    guardianData = session;
  }

  if (!guardianData) {
    navigate('/');
    return null;
  }

  const dependentLocation = guardianData.location || { lat: 30.0444, lng: 31.2357 };
  const safeZoneCenter = guardianData.safeZoneCenter || dependentLocation;

  const onBack = () => {
    if (session.role === 'dependent') {
      navigate('/dependent-home');
    } else {
      navigate('/home');
    }
  };

  return (
    <MapView
      guardianData={guardianData}
      dependentLocation={dependentLocation}
      safeZoneCenter={safeZoneCenter}
      onBack={onBack}
      onEditSafeZone={() => {}}
      onSetTestLocation={() => {}}
      onResetTestLocation={() => {}}
      isUsingTestLocation={false}
      isTrackingPaused={false}
      onToggleTracking={() => {}}
      isDependentLocationHidden={false}
      onToggleDependentLocation={() => {}}
    />
  );
}
