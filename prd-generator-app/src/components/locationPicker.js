// locationPicker.js — Geolocation wrapper

/**
 * Request user's geolocation.
 * Returns { lat, lon } or throws an error.
 */
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission denied. Pick a region manually!'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location unavailable. Pick a region manually!'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out. Pick a region manually!'));
            break;
          default:
            reject(new Error('Unknown geolocation error. Pick a region manually!'));
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 300000, // cache for 5 min
      }
    );
  });
}
