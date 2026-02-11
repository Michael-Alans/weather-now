import { useWeatherStore } from '../../store/useWeatherStore';

function DetailCard({ label, value, unit }) {
  return (
    <div className="bg-neutral-800/50 border border-neutral-700 rounded-3xl p-6 flex items-center gap-4 hover:border-neutral-600 transition-all group">
      {/* Icon container removed, keeping the text layout exactly as per design */}
      <div className="flex flex-col">
        <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest leading-none mb-2">
          {label}
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-display font-bold text-white leading-none">
            {value}
          </span>
          <span className="text-sm text-neutral-400 font-medium lowercase">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DetailsGrid() {
  const { weatherData, unitSystem } = useWeatherStore();

  if (!weatherData) return null;

  const { current } = weatherData;
  const isMetric = unitSystem === 'metric';

  const details = [
    {
      label: 'Feels like',
      value: Math.round(current.apparent_temperature),
      unit: '°', 
    },
    {
      label: 'Humidity',
      value: current.relative_humidity_2m,
      unit: '%',
    },
    {
      label: 'Wind',
      value: Math.round(current.wind_speed_10m),
      unit: isMetric ? 'km/h' : 'mph',
    },
    {
      label: 'Precipitation',
      value: current.precipitation,
      unit: isMetric ? 'mm' : 'in',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {details.map((item, index) => (
        <DetailCard key={index} {...item} />
      ))}
    </div>
  );
}