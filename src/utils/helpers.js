export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getDeviceInfo() {
  return {
    browser: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timestamp: new Date().toISOString()
  };
}

export function matchImage(uploadedImage, dependentPhotos) {
  if (!uploadedImage) {
    return false;
  }
  
  // Handle both single photo (string) and multiple photos (array) for backward compatibility
  const photosToCheck = Array.isArray(dependentPhotos) ? dependentPhotos : (dependentPhotos ? [dependentPhotos] : []);
  
  if (photosToCheck.length === 0) {
    return false;
  }
  
  const extractBase64Data = (dataUrl) => {
    if (!dataUrl) return '';
    
    let base64Data = dataUrl;
    if (dataUrl.includes(',')) {
      base64Data = dataUrl.split(',')[1];
    } else if (dataUrl.includes(';base64')) {
      base64Data = dataUrl.split(';base64')[1];
    }
    
    base64Data = base64Data.replace(/\s+/g, '').replace(/[\r\n]+/g, '').trim();
    return base64Data;
  };
  
  const uploadedData = extractBase64Data(uploadedImage);
  console.log('Uploaded image data length:', uploadedData.length);
  
  // Check against all dependent photos
  for (let i = 0; i < photosToCheck.length; i++) {
    const dependentData = extractBase64Data(photosToCheck[i]);
    console.log(`Dependent photo ${i + 1} data length:`, dependentData.length);
    
    if (uploadedData === dependentData) {
      console.log(`Match found with photo ${i + 1}`);
      return true;
    }
  }
  
  console.log('No match found in any of the dependent photos');
  return false;
}

export function ensureAccountDefaults(account) {
  if (!account) return account;
  
  return {
    ...account,
    safeZoneRadius: account.safeZoneRadius || 500,
    safeZoneCenter: account.safeZoneCenter || account.location || { lat: 30.0444, lng: 31.2357 },
    location: account.location || { lat: 30.0444, lng: 31.2357 },
    lostReports: account.lostReports || []
  };
}
