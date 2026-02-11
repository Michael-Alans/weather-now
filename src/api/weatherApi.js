const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export const weatherService = {
  /**
   * 1. Geocoding: Converts city name to Lat/Lon
   */
  getCoords: async (city) => {
    const res = await fetch(`${GEO_URL}?name=${city}&count=1&language=en&format=json`);
    const data = await res.json();
    
    // Return the first result or null if not found (matches no-results design)
    return data.results ? data.results[0] : null;
  },

  /**
   * 2. Weather Forecast: Gets metrics based on coords and unit system
   */
  getForecast: async (lat, lon, unitSystem = 'metric') => {
    const isImperial = unitSystem === 'imperial';
    
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      // Updated current string to include everything needed for the dashboard
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      timezone: 'auto',
      
      // THIS PART IS KEY: Direct mapping to Open-Meteo unit parameters
      temperature_unit: isImperial ? 'fahrenheit' : 'celsius',
      wind_speed_unit: isImperial ? 'mph' : 'kmh',
      precipitation_unit: isImperial ? 'inch' : 'mm'
    });

    const res = await fetch(`${WEATHER_URL}?${params.toString()}`);
    
    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }
    
    return await res.json();
  }
};