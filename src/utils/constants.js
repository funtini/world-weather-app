// Api
export const OPEN_WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
export const DEFAULT_LOCATION_COORDINATES = {
    lat: 38.7259284,
    lon: -9.137382
};


// Local storage
export const WEATHER_FAVORITE_LIST_KEY = 'weather_favorite_locations';

// Viewport breakpoints
export const VIEWPORT_BREAKPOINTS = {
    small: 768,
    medium: 1025
}

// SidePanel Key
export const SIDE_PANEL_KEYS = {
    favoriteLocations: 'deprecated-favorite-locations'
};

// Geo Location
export const GEO_LOCATION_OPTIONS = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
};

// Notifications
export const NOTIFICATION_TIMEOUT = 2000;
export const NOTIFICATION_TYPES = {
    success: 'success',
    error: 'error',
    default: 'default'
};

// Texts
export const WEATHER_COPY_TEXT = {
    emptyList: 'No locations added yet',
    tempSymbol: 'º',
    celsius: 'ºC',
    myLocations: 'My Locations',
    forecast: '7 Days Forecast',
    feelsLike: 'Real feel'
}