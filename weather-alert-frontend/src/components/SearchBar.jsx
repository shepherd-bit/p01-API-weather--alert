import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, MapPin, Sun, Moon, Loader2 } from 'lucide-react';

const SearchBar = ({ onSelectCity, darkMode, setDarkMode }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch suggestions with debouncing
  useEffect(() => {
    if (query.trim().length < 2) {
      const resetTimer = setTimeout(() => {
        setSuggestions([]);
        setIsOpen(false);
      }, 0);
      return () => clearTimeout(resetTimer);
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/weather/search?q=${query}`);
        setSuggestions(res.data);
        setIsOpen(true);
      } catch (err) {
        console.error('Failed to fetch suggestions:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (cityName) => {
    onSelectCity(cityName);
    setQuery('');
    setIsOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSelectCity(query.trim());
      setQuery('');
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      {/* Top Navbar Section */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Weather App
          </h1>
          <p className="text-sm text-slate-900 dark:text-slate-100 font-medium">
            Learn the current weather status of any major city in the world. Stay Guided!
          </p>
        </div>

        {/* Custom Pill Toggle Switch */}
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              darkMode ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'
            }`}
            aria-label="Toggle Theme"
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md transition-transform" />
          </button>
          <Moon className="w-4 h-4 text-slate-400 dark:text-slate-200" />
        </div>
      </div>

      {/* Main Search Input Box */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 relative">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 absolute left-3 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a city..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
            />
            {loading && (
              <Loader2 className="w-4 h-4 absolute right-3 text-slate-400 animate-spin" />
            )}
          </div>

          <button
            type="submit"
            className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition shadow-sm cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Autocomplete Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute left-4 right-4 top-[calc(100%+8px)] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700"
          >
            {suggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(item.name)}
                className="w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;