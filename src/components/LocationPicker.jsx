import { useEffect, useRef, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { MapPinIcon, NavigationIcon } from "./UI/Icons";

export default function LocationPicker({ initialLocation, onLocationSelected, onCancel, showSafeZone, safeZoneCenter, safeZoneRadius }) {
  const { t } = useLang();
  const [location, setLocation] = useState(initialLocation || { lat: 30.0444, lng: 31.2357 });
  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (typeof window === 'undefined' || !window.L) {
        setTimeout(initMap, 100);
        return;
      }
      
      const L = window.L;
      
      const existingMap = document.getElementById('location-picker-map');
      if (existingMap) {
        existingMap.innerHTML = '';
      }

      const map = L.map('location-picker-map').setView([location.lat, location.lng], 13);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      if (showSafeZone && safeZoneCenter) {
        L.circle([safeZoneCenter.lat, safeZoneCenter.lng], {
          color: '#4a90a4',
          fillColor: '#4a90a4',
          fillOpacity: 0.15,
          radius: safeZoneRadius || 500
        }).addTo(map);

        L.marker([safeZoneCenter.lat, safeZoneCenter.lng], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:#4a90a4;width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>',
            iconSize: [14, 14]
          })
        }).addTo(map).bindPopup('<b>Safe Zone Center</b>');
      }

      const marker = L.marker([location.lat, location.lng], { draggable: true }).addTo(map);
      markerRef.current = marker;

      marker.on('dragend', function(e) {
        const pos = e.target.getLatLng();
        setLocation({ lat: pos.lat, lng: pos.lng });
        reverseGeocode(pos.lat, pos.lng);
      });

      map.on('click', function(e) {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setLocation({ lat, lng });
        reverseGeocode(lat, lng);
      });

      reverseGeocode(location.lat, location.lng);
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      setAddress(data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    } catch {
      setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newLat = parseFloat(lat);
        const newLng = parseFloat(lon);
        
        setLocation({ lat: newLat, lng: newLng });
        
        if (mapRef.current && markerRef.current) {
          mapRef.current.setView([newLat, newLng], 15);
          markerRef.current.setLatLng([newLat, newLng]);
        }
        
        reverseGeocode(newLat, newLng);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const getCurrentLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          
          if (mapRef.current && markerRef.current) {
            mapRef.current.setView([latitude, longitude], 15);
            markerRef.current.setLatLng([latitude, longitude]);
          }
          
          reverseGeocode(latitude, longitude);
          setIsLocating(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert(t('locPermDenied'));
          setIsLocating(false);
        }
      );
    } else {
      alert(t('locPermDenied'));
      setIsLocating(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal-card" style={{ maxWidth: 700 }}>
        <div style={{ padding: 24 }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{t('chooseLocation')}</h2>
          <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: 20 }}>{t('mapInstructions')}</p>

          <div style={{ position: "relative", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                className="input-base"
                placeholder={t('searchLocation')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
                style={{ flex: 1 }}
              />
              <button 
                className="btn-primary" 
                onClick={searchLocation}
                disabled={isSearching}
                style={{ width: 'auto', padding: '0 20px' }}
              >
                🔍
              </button>
              <button 
                className="btn-primary btn-secondary" 
                onClick={getCurrentLocation}
                disabled={isLocating}
                style={{ width: 'auto', padding: '0 20px' }}
                title={t('useCurrentLoc')}
              >
                {isLocating ? '...' : <NavigationIcon />}
              </button>
            </div>
          </div>

          <div style={{ position: "relative", height: 400, marginBottom: 16, borderRadius: 12, overflow: "hidden" }}>
            <div id="location-picker-map" style={{ height: "100%", width: "100%" }}></div>
          </div>

          <div style={{ background: "var(--azure-pale)", padding: 12, borderRadius: 10, marginBottom: 16, fontSize: 13 }}>
            <div style={{ display: "flex", alignItems: "start", gap: 8 }}>
              <MapPinIcon />
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{t('curLoc')}:</div>
                <div style={{ color: "var(--ink-light)" }}>{address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-primary btn-secondary" onClick={onCancel} style={{ flex: 1 }}>
              {t('back')}
            </button>
            <button className="btn-primary" onClick={() => onLocationSelected(location, address)} style={{ flex: 1 }}>
              {t('confirmLoc')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
