import { useState, useRef, useEffect } from 'react';
import { useWeatherStore } from '../../store/useWeatherStore';
import iconUnits from '../../assets/images/icon-units.svg';
import iconDropdown from '../../assets/images/icon-dropdown.svg';
import iconCheckmark from '../../assets/images/icon-checkmark.svg';

export default function UnitSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { unitSystem, setUnitSystem } = useWeatherStore();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Groups based on dropdown-state.jpg
  const groups = [
    {
      title: "Temperature",
      options: [
        { label: 'Celsius (°C)', value: 'metric' },
        { label: 'Fahrenheit (°F)', value: 'imperial' },
      ]
    },
    {
      title: "Wind Speed",
      options: [
        { label: 'km/h', value: 'metric' },
        { label: 'mph', value: 'imperial' },
      ]
    },
    {
      title: "Precipitation",
      options: [
        { label: 'Millimeters (mm)', value: 'metric' },
        { label: 'Inches (in)', value: 'imperial' },
      ]
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 bg-neutral-800 border px-4 py-2 rounded-xl transition-all duration-200
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-neutral-700 hover:border-neutral-600'}`}
      >
        <img src={iconUnits} alt="" className="w-5 h-5 opacity-70" />
        <span className="text-sm font-medium text-white">Units</span>
        <img src={iconDropdown} alt="" className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1E1E2E] border border-neutral-700 rounded-2xl shadow-2xl z-50 overflow-hidden py-2">
          {groups.map((group, gIndex) => (
            <div key={group.title} className={gIndex !== 0 ? "border-t border-neutral-800 mt-1 pt-1" : ""}>
              <p className="px-4 py-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                {group.title}
              </p>
              {group.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => {
                    setUnitSystem(option.value);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-neutral-800 transition-colors"
                >
                  <span className={`text-sm ${unitSystem === option.value ? 'text-white font-medium' : 'text-neutral-400'}`}>
                    {option.label}
                  </span>
                  {unitSystem === option.value && (
                    <img src={iconCheckmark} alt="selected" className="w-3.5 h-3.5" />
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}