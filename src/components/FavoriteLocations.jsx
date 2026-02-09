import { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import { PlusIcon, TrashIcon, EditIcon, NavigationIcon } from './UI/Icons';

export default function FavoriteLocations() {
  const { t } = useLang();
  const mapRef = useRef(null);
  const clickMarkerRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [safeZone, setSafeZone] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [editingLocation, setEditingLocation] = useState(null);
  const [newLocationName, setNewLocationName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 30.0444, lng: 31.2357 });
  const [clickedLocation, setClickedLocation] = useState(null);
  const [clickedAddress, setClickedAddress] = useState('');
  const markersRef = useRef([]);

  useEffect(() => {
    setLocations(JSON.parse(localStorage.getItem('dependentFavoriteLocations') || '[]'));
    const guardianData = JSON.parse(localStorage.getItem('guardianData') || '{}');
    if (guardianData.safeZoneCenter) {
      setSafeZone(guardianData.safeZoneCenter);
      setMapCenter(guardianData.safeZoneCenter);
    }
  }, []);

  useEffect(() => {
    const initMap = () => {
      if (!window.L) {
        setTimeout(initMap, 100);
        return;
      }

      const L = window.L;
      const container = document.getElementById('fav-locations-map');
      if (!container) return;

      container.innerHTML = '';
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map('fav-locations-map').setView([mapCenter.lat, mapCenter.lng], 13);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);

      if (safeZone) {
        L.circle([safeZone.lat, safeZone.lng], { color: '#4a90a4', fillColor: '#4a90a4', fillOpacity: 0.15, radius: safeZone.radius || 1000 }).addTo(map);
        L.marker([safeZone.lat, safeZone.lng], { icon: L.divIcon({ className: 'custom-marker', html: '<div style="background:#4a90a4;width:16px;height:16px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>', iconSize: [16, 16] }) }).addTo(map).bindPopup('<b>Safe Zone Center</b>');
      }

      markersRef.current.forEach(m => map.removeLayer(m));
      markersRef.current = [];

      locations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng], { icon: L.divIcon({ className: 'custom-marker', html: '<div style="background:#6b9f7f;width:18px;height:18px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(107,159,127,.5)"></div>', iconSize: [18, 18] }) }).addTo(map).bindPopup(`<b>${loc.name}</b>`);
        markersRef.current.push(marker);
      });

      const clickMarker = L.marker([clickedLocation?.lat || mapCenter.lat, clickedLocation?.lng || mapCenter.lng], { 
        draggable: true,
        icon: L.divIcon({ 
          className: 'custom-marker', 
          html: '<div style="background:#d4756a;width:20px;height:20px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(212,117,106,.6)"></div>', 
          iconSize: [20, 20] 
        }) 
      }).addTo(map);
      clickMarkerRef.current = clickMarker;

      clickMarker.on('dragend', function(e) {
        const pos = e.target.getLatLng();
        setClickedLocation({ lat: pos.lat, lng: pos.lng });
        reverseGeocode(pos.lat, pos.lng);
      });

      map.on('click', function(e) {
        const { lat, lng } = e.latlng;
        if (clickMarkerRef.current) {
          clickMarkerRef.current.setLatLng([lat, lng]);
        }
        setClickedLocation({ lat, lng });
        reverseGeocode(lat, lng);
      });
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapCenter, locations, safeZone]);

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setClickedAddress(address);
      setSearchQuery(address);
    } catch {
      const address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setClickedAddress(address);
      setSearchQuery(address);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setClickedLocation(null);
    setClickedAddress('');
    if (clickMarkerRef.current && mapRef.current) {
      mapRef.current.removeLayer(clickMarkerRef.current);
      clickMarkerRef.current = null;
    }
  };

  const saveLocations = (locs) => {
    setLocations(locs);
    localStorage.setItem('dependentFavoriteLocations', JSON.stringify(locs));
  };

  const searchLocation = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data[0]) {
        setMapCenter({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setMapCenter({ lat, lng });
        setClickedLocation({ lat, lng });
        reverseGeocode(lat, lng);
      });
    }
  };

  const saveCurrentView = () => {
    if (editingLocation) {
      updateLocation();
    } else if (newLocationName && clickedLocation) {
      saveLocations([...locations, { id: Date.now(), name: newLocationName, lat: clickedLocation.lat, lng: clickedLocation.lng }]);
      setNewLocationName('');
    }
  };

  const startDirections = (loc) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${pos.coords.latitude},${pos.coords.longitude}&destination=${loc.lat},${loc.lng}`, '_blank');
      });
    }
  };

  const deleteLocation = (id) => {
    saveLocations(locations.filter(l => l.id !== id));
    if (selectedLocation?.id === id) setSelectedLocation(null);
  };

  const startEditLocation = (loc) => {
    setMapCenter({ lat: loc.lat, lng: loc.lng });
    setClickedLocation({ lat: loc.lat, lng: loc.lng });
    setNewLocationName(loc.name);
    setEditingLocation(loc);
    reverseGeocode(loc.lat, loc.lng);
  };

  const cancelEdit = () => {
    setEditingLocation(null);
    setNewLocationName('');
    setClickedLocation(null);
    setSearchQuery('');
  };

  const updateLocation = () => {
    if (editingLocation && newLocationName && clickedLocation) {
      saveLocations(locations.map(l => 
        l.id === editingLocation.id 
          ? { ...l, name: newLocationName, lat: clickedLocation.lat, lng: clickedLocation.lng } 
          : l
      ));
      setEditingLocation(null);
      setNewLocationName('');
    }
  };

  const showLocationOnMap = (loc) => {
    setMapCenter({ lat: loc.lat, lng: loc.lng });
    setClickedLocation({ lat: loc.lat, lng: loc.lng });
    setSelectedLocation(loc);
    reverseGeocode(loc.lat, loc.lng);
  };

  const toggleExpand = (locId) => {
    setExpandedLocation(expandedLocation === locId ? null : locId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', position: 'relative' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input 
              type="text" 
              placeholder={t('searchOrCurrentLocation')} 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && searchLocation()} 
              style={{ 
                width: '100%',
                padding: '10px', 
                paddingRight: searchQuery ? '35px' : '10px',
                borderRadius: '8px', 
                border: '1px solid rgba(74,144,164,.3)', 
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--azure)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(74,144,164,.3)'}
            />
            {searchQuery && (
              <button 
                onClick={clearSearch} 
                style={{ 
                  position: 'absolute', 
                  right: '8px',
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: 'transparent', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: '18px',
                  color: 'var(--ink-muted)',
                  padding: '0 4px',
                  lineHeight: 1
                }}
              >
                ×
              </button>
            )}
          </div>
          <button className="btn-primary" onClick={searchLocation} style={{ width: 'auto', padding: '0 20px' }}>🔍</button>
          <button className="btn-primary btn-secondary" onClick={useCurrentLocation} style={{ width: 'auto', padding: '0 20px' }} title={t('useCurrentLoc')}>
            <NavigationIcon />
          </button>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder={editingLocation ? t('editLocation') : t('locationName')} 
            value={newLocationName} 
            onChange={(e) => setNewLocationName(e.target.value)} 
            style={{ 
              width: '200px', 
              padding: '10px', 
              borderRadius: '8px', 
              border: '1px solid rgba(74,144,164,.3)', 
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--azure)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(74,144,164,.3)'}
          />
          <button 
            onClick={saveCurrentView} 
            disabled={!newLocationName || !clickedLocation} 
            className="btn-primary" 
            style={{ 
              width: '44px',
              height: '44px',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: (newLocationName && clickedLocation) ? 1 : 0.5 
            }}
          >
            {editingLocation ? '✓' : <PlusIcon />}
          </button>
          {editingLocation && (
            <button 
              onClick={cancelEdit} 
              className="btn-primary btn-secondary" 
              style={{ 
                width: '44px',
                height: '44px',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div id="fav-locations-map" style={{ height: '400px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', boxShadow: '0 4px 20px rgba(0,0,0,.08)' }} />

      {safeZone && (
        <button onClick={() => startDirections(safeZone)} style={{ background: 'var(--azure)', color: 'rgb(72 72 72)', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 2px 8px rgba(74,144,164,.2)' }}>
          🧭 {t('startDirections')} (Safe Zone)
        </button>
      )}

      <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {locations.map(loc => (
          <div key={loc.id} style={{ background: selectedLocation?.id === loc.id ? 'rgba(74,144,164,.12)' : '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,.06)', transition: 'all 0.2s', border: selectedLocation?.id === loc.id ? '2px solid var(--azure)' : 'none', overflow: 'hidden' }}>
            <div onClick={() => toggleExpand(loc.id)} style={{ padding: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, color: 'var(--ink)', fontSize: '15px', fontWeight: '600' }}>📍 {loc.name}</h4>
              <span style={{ color: 'var(--azure)', fontSize: '18px' }}>{expandedLocation === loc.id ? '▲' : '▼'}</span>
            </div>
            {expandedLocation === loc.id && (
              <div style={{ padding: '0 14px 14px 14px', borderTop: '1px solid rgba(74,144,164,.1)' }}>
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                  <button onClick={() => showLocationOnMap(loc)} style={{ flex: 1, background: 'var(--azure)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 6px rgba(74,144,164,.2)' }}>
                    {t('showOnMap')}
                  </button>
                  <button onClick={() => startDirections(loc)} style={{ flex: 1, background: 'var(--sage)', color: 'rgb(72 72 72)', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 6px rgba(107,159,127,.2)' }}>
                    🧭 {t('getDirections')}
                  </button>
                  <button onClick={() => startEditLocation(loc)} style={{ background: 'var(--sage)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', boxShadow: '0 2px 6px rgba(107,159,127,.2)' }}>
                    <EditIcon />
                  </button>
                  <button onClick={() => deleteLocation(loc.id)} style={{ background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', boxShadow: '0 2px 6px rgba(212,117,106,.2)' }}>
                    <TrashIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {locations.length === 0 && <p style={{ color: 'var(--ink-light)', fontSize: '14px', textAlign: 'center', padding: '20px' }}>{t('noLocations')}</p>}
      </div>
    </div>
  );
}
