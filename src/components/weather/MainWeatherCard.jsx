import { useWeatherStore } from '../../store/useWeatherStore';
import { getWeatherIcon } from '../../utils/weatherIcons';
import bgLarge from '../../assets/images/bg-today-large.svg';

export default function MainWeatherCard() {
  const { weatherData, unitSystem } = useWeatherStore();

  if (!weatherData) return null;

  const { current, cityName } = weatherData;
  const tempUnit = unitSystem === 'metric' ? '°' : '°'; // Design uses just the symbol

  // Format date dynamically: "Tuesday, Aug 5, 2025"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div 
      className="relative w-full rounded-4xl p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[300px] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLarge})` }}
    >
      {/* Top Section: City and Date */}
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
          {cityName}
        </h2>
        <p className="text-neutral-200 font-sans text-sm md:text-base">
          {formattedDate}
        </p>
      </div>

      {/* Bottom Section: Icon and Temp */}
      <div className="relative z-10 flex justify-end items-end gap-2 md:gap-4">
        <img 
          src={getWeatherIcon(current.weather_code)} 
          alt="Current weather icon" 
          className="w-24 h-24 md:w-40 md:h-40 object-contain drop-shadow-xl"
        />
        <div className="flex flex-col items-center">
          <span className="text-7xl md:text-9xl font-display font-bold text-white leading-none">
            {Math.round(current.temperature_2m)}{tempUnit}
          </span>
        </div>
      </div>
    </div>
  );
}