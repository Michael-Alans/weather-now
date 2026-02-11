import { create } from "zustand";
import { weatherService } from "../api/weatherApi";

export const useWeatherStore = create((set, get) => ({
  weatherData: null,
  loading: false,
  error: null,
  unitSystem: 'metric',

  // Action: Set specific units (Used by the dropdown)
  setUnitSystem: (newUnit) => {
    // Only trigger if the unit is actually different to save API calls
    if (newUnit !== get().unitSystem) {
      set({ unitSystem: newUnit });
      
      // If we already have a city loaded, re-fetch to get correct numbers from API
      const currentCity = get().weatherData?.cityName;
      if (currentCity) {
        get().fetchWeather(currentCity);
      }
    }
  },

  fetchWeather: async (city) => {
    set({ loading: true, error: null });
    try {
      const location = await weatherService.getCoords(city);
      
      console.log("Location found:", location); 

      if (!location) {
        set({ error: 'No search result found!', loading: false });
        return;
      }

      const data = await weatherService.getForecast(
        location.latitude,
        location.longitude,
        get().unitSystem
      );

      set({ 
        weatherData: { ...data, cityName: location.name }, 
        loading: false 
      });
    } catch (err) {
      set({ error: 'Something went wrong.', loading: false });
    }
  },
}));