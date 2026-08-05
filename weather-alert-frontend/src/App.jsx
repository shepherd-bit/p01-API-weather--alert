import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import HourlyForecast from './components/HourlyForecast';

function App() {
  const [city, setCity] = useState('Tokyo');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-6 font-sans transition-colors duration-200">
        <div className="max-w-3xl mx-auto space-y-6">
          <SearchBar
            onSelectCity={setCity}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <WeatherCard city={city} />
          <HourlyForecast city={city} />
        </div>
      </div>
    </div>
  );
}

export default App;