import { useState } from 'react';
import { useWeatherStore } from '../../store/useWeatherStore';
import { getWeatherIcon } from '../../utils/weatherIcons';
import iconDropdown from '../../assets/images/icon-dropdown.svg';

export default function HourlyForecast() {
  const { weatherData } = useWeatherStore();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);

  if (!weatherData || !weatherData.hourly) return null;

  const { hourly, daily } = weatherData;

  const dayLabels = daily.time.map((date, i) => {
    if (i === 0) return "Today";
    // Returns Monday, Tuesday, etc. to match dropdown-state.jpg
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date));
  });

  /**
   * LOGIC REPAIR:
   * 1. If Today: Start from the current hour of the day.
   * 2. If Future Day: Start from the beginning (index 0 of that day).
   * 3. Multiply index by 24 to jump to the correct day block in the hourly array.
   */
  const dayOffset = selectedDayIndex * 24;
  const hourOffset = selectedDayIndex === 0 ? new Date().getHours() : 0;
  const startIndex = dayOffset + hourOffset;
  
  // Slice exactly 8 slots as seen in the design height
  const displayHours = hourly.time.slice(startIndex, startIndex + 8);

  return (
    <div className="bg-neutral-800/50 border border-neutral-700 rounded-3xl p-6 h-full flex flex-col min-h-[640px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-neutral-300 font-bold text-lg">Hourly forecast</h3>
        
        <div className="relative">
          <button 
            onClick={() => setIsDayPickerOpen(!isDayPickerOpen)}
            className="flex items-center gap-2 bg-neutral-700/50 px-3 py-1.5 rounded-lg text-sm text-neutral-300 hover:text-white transition-colors"
          >
            {dayLabels[selectedDayIndex]}
            <img 
              src={iconDropdown} 
              alt="" 
              className={`w-3 h-3 transition-transform duration-200 ${isDayPickerOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {isDayPickerOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in duration-150">
              {dayLabels.map((label, i) => (
                <button
                  key={label}
                  onClick={() => {
                    setSelectedDayIndex(i);
                    setIsDayPickerOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    selectedDayIndex === i 
                      ? 'bg-blue-600/20 text-blue-400 font-bold' 
                      : 'text-neutral-400 hover:bg-neutral-700 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-2">
        {displayHours.map((time, i) => {
          // dataIndex now correctly points to the temperature/icon for the shifted day
          const dataIndex = startIndex + i;
          const date = new Date(time);
          
          // Formats as "3 PM" to match search-in-progress-state.jpg
          const timeLabel = date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            hour12: true 
          });

          return (
            <div 
              key={time} 
              className="flex items-center justify-between p-4 bg-neutral-900/30 rounded-2xl group hover:bg-neutral-700/40 transition-all duration-200 border border-transparent hover:border-neutral-600"
            >
              <div className="flex items-center gap-4">
                <img 
                  src={getWeatherIcon(hourly.weather_code[dataIndex])} 
                  alt="" 
                  className="w-10 h-10 object-contain" 
                />
                <span className="text-sm font-medium text-neutral-400 group-hover:text-white">
                  {timeLabel}
                </span>
              </div>
              <span className="text-lg font-display font-bold text-white">
                {Math.round(hourly.temperature_2m[dataIndex])}°
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}