import { useWeatherStore } from '../../store/useWeatherStore';
import { getWeatherIcon } from '../../utils/weatherIcons';

export default function DailyForecast() {
  const { weatherData } = useWeatherStore();

  if (!weatherData) return null;

  const { daily } = weatherData;

  // Helper to format the day (e.g., "Tue")
  const formatDay = (dateStr) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(dateStr));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-xl text-white">Daily forecast</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {daily.time.map((time, index) => (
          <div 
            key={time} 
            className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-neutral-600 transition-colors"
          >
            <span className="text-neutral-400 text-sm font-medium">
              {formatDay(time)}
            </span>
            
            <img 
              src={getWeatherIcon(daily.weather_code[index])} 
              alt="Weather" 
              className="w-10 h-10 my-2"
            />
            
            <div className="flex flex-col items-center">
              <span className="text-white font-bold">
                {Math.round(daily.temperature_2m_max[index])}°
              </span>
              <span className="text-neutral-500 text-xs">
                {Math.round(daily.temperature_2m_min[index])}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}