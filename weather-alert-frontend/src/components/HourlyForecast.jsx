import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { Sun, CloudRain, Cloud, Snowflake, Zap, Loader2 } from 'lucide-react';

const HourlyForecast = ({ city }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardRef = useRef(null);

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://weather-alert-api.vercel.app/api/weather/hourly?q=${city}`);
        // Endpoint returns hourly array (e.g., [{ time: '18', temp: 19, chanceOfRain: 51, conditionKey: 'cloudy' }, ...])
        setHourlyData(res.data.hourly || res.data);
      } catch (err) {
        console.error('Failed to fetch hourly forecast:', err);
        setError('Unable to load hourly forecast');
      } finally {
        setLoading(false);
      }
    };

    if (city) fetchHourlyForecast();
  }, [city]);

  // GSAP Entrance Stagger Animation for hourly slots
  useEffect(() => {
    if (hourlyData.length > 0 && cardRef.current) {
      const items = cardRef.current.querySelectorAll('.hourly-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }, [hourlyData]);

  const renderWeatherIcon = (key) => {
    const iconProps = { className: "w-5 h-5 shrink-0" };
    switch (key) {
      case 'sunny':
        return <Sun {...iconProps} className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'rainy':
        return <CloudRain {...iconProps} className="w-5 h-5 text-blue-500 shrink-0" />;
      case 'cloudy':
        return <Cloud {...iconProps} className="w-5 h-5 text-slate-400 shrink-0" />;
      case 'snowy':
        return <Snowflake {...iconProps} className="w-5 h-5 text-sky-400 shrink-0" />;
      case 'thunder':
        return <Zap {...iconProps} className="w-5 h-5 text-yellow-400 shrink-0" />;
      default:
        return <Cloud {...iconProps} className="w-5 h-5 text-slate-400 shrink-0" />;
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading 24-hour forecast...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-red-100 text-center text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      <h3 className="text-base font-medium text-slate-700 dark:text-slate-200 mb-6">
        24-Hour Forecast
      </h3>

      {/* Horizontal Scroll Bar for 24-Hour slots */}
      <div 
        ref={cardRef}
        className="flex items-center overflow-x-auto gap-8 pb-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700"
      >
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className="hourly-item flex flex-col items-center gap-3 min-w-[3.5rem] shrink-0"
          >
            {/* Hour display */}
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              {item.time}
            </span>

            {/* Weather icon */}
            <div className="my-1">
              {renderWeatherIcon(item.conditionKey)}
            </div>

            {/* Temperature */}
            <span className="text-base font-bold text-slate-800 dark:text-slate-100">
              {item.temp}°
            </span>

            {/* Precipitation % */}
            <span className="text-xs font-medium text-blue-500 min-h-[1rem]">
              {item.chanceOfRain ? `${item.chanceOfRain}%` : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;