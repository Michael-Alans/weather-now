import { useState } from 'react';
import { useWeatherStore } from '../../store/useWeatherStore';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const fetchWeather = useWeatherStore((state) => state.fetchWeather);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) fetchWeather(query);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-2xl flex flex-col sm:flex-row gap-3"
    >
      <div className="relative flex-1">
        {/* Search Icon */}
        <img 
          src="/src/assets/images/icon-search.svg" 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50"
          alt="search"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place..."
          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
      </div>

      <button 
        type="submit"
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}