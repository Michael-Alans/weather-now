import { useState } from 'react';
import { useWeatherStore } from '../../store/useWeatherStore';

// 1. IMPORT the icon so Vite bundles it correctly
import iconSearch from '../../assets/images/icon-search.svg';

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
      <div className="relative flex-1 group">
        {/* 2. Use the imported variable */}
        <img 
          src={iconSearch} 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 group-focus-within:opacity-100 transition-opacity"
          alt=""
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place..."
          className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-neutral-500"
        />
      </div>

      <button 
        type="submit"
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-blue-900/20"
      >
        Search
      </button>
    </form>
  );
}