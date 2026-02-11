// Import the specific filenames from your assets folder
import sunny from '../assets/images/icon-sunny.webp';
import partlyCloudy from '../assets/images/icon-partly-cloudy.webp';
import overcast from '../assets/images/icon-overcast.webp';
import fog from '../assets/images/icon-fog.webp';
import drizzle from '../assets/images/icon-drizzle.webp';
import rain from '../assets/images/icon-rain.webp';
import snow from '../assets/images/icon-snow.webp';
import storm from '../assets/images/icon-storm.webp';

/**
 * Maps Open-Meteo WMO codes to your local assets
 * Reference: https://open-meteo.com/en/docs
 */
export const getWeatherIcon = (code) => {
  if (code === 0) return sunny;
  if (code >= 1 && code <= 2) return partlyCloudy;
  if (code === 3) return overcast;
  if (code >= 45 && code <= 48) return fog;
  if (code >= 51 && code <= 55) return drizzle;
  if (code >= 61 && code <= 67) return rain;
  if (code >= 71 && code <= 77) return snow;
  if (code >= 80 && code <= 82) return rain;
  if (code >= 95) return storm;

  return sunny; // Default fallback
};