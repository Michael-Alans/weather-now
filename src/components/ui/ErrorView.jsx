import iconError from '../../assets/images/icon-error.svg';
import iconRetry from '../../assets/images/icon-retry.svg';
import { useWeatherStore } from '../../store/useWeatherStore';

export default function ErrorView() {
  const { fetchWeather, lastSearchedCity } = useWeatherStore();

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-in fade-in duration-500">
      {/* Large Icon from your design */}
      <img src={iconError} alt="Error" className="w-16 h-16 mb-8 opacity-80" />
      
      {/* Typography matches api-error-state.jpg */}
      <h2 className="text-white text-4xl md:text-5xl font-display font-bold mb-4">
        Something went wrong
      </h2>
      
      <p className="text-neutral-400 text-lg max-w-md mb-10 leading-relaxed">
        We couldn&apos;t connect to the server (API error). Please try again in a few moments.
      </p>

      {/* The Specific Retry Button */}
      <button 
        onClick={() => lastSearchedCity && fetchWeather(lastSearchedCity)}
        className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-white px-6 py-3 rounded-xl transition-all font-medium active:scale-95"
      >
        <img src={iconRetry} alt="" className="w-5 h-5" />
        <span>Retry</span>
      </button>
    </div>
  );
}