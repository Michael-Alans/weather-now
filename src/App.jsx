import SearchBar from './components/ui/SearchBar';
import { useWeatherStore } from './store/useWeatherStore';
import MainWeatherCard from './components/weather/MainWeatherCard';
import DetailsGrid from './components/weather/DetailsGrid';
import DailyForecast from './components/weather/DailyForecast';
import HourlyForecast from './components/weather/HourlyForecast';
import UnitSettings from './components/ui/UnitSettings';
import ErrorView from './components/ui/ErrorView';
import NoResultsView from './components/ui/NoResultsView';

// 1. IMPORT YOUR IMAGES HERE
import logo from './assets/images/logo.svg';
import iconLoading from './assets/images/icon-loading.svg';

function App() {
  const { weatherData, loading, error } = useWeatherStore();
  const isNoResults = error === 'No search result found!';

  return (
    <div className="min-h-screen bg-neutral-900 font-sans text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* 2. USE THE IMPORTED LOGO VARIABLE */}
            <img 
              src={logo} 
              alt="Weather Now Logo" 
              className="w-50 h-25" // Standard Tailwind size (48px)
            />
           
          </div>
          <UnitSettings />
        </header>

        <main className="flex flex-col items-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center max-w-2xl">
            How&apos;s the sky looking today?
          </h1>
          
          <SearchBar />

          <div className="w-full mt-12">
            {/* LOADING STATE */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                {/* 3. USE THE IMPORTED LOADING ICON VARIABLE */}
                <img src={iconLoading} className="animate-spin w-12 h-12" alt="loading" />
                <p className="text-neutral-400 font-medium">Loading local weather...</p>
              </div>
            )}

            {/* ERROR STATES */}
            {error && isNoResults && !loading && <NoResultsView />}
            {error && !isNoResults && !loading && <ErrorView />}

            {/* SUCCESS STATE */}
            {weatherData && !loading && !error && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-8 w-full">
                  <MainWeatherCard />
                  <DetailsGrid />
                  <DailyForecast />
                </div>

                <aside className="lg:col-span-4 w-full h-full">
                   <HourlyForecast />
                </aside>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;