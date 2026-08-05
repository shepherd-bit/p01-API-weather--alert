import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { Sun, CloudRain, Cloud, Snowflake, Zap, Droplets, Wind, Eye, Gauge, Thermometer, Loader2 } from 'lucide-react';

const WeatherCard = ({ city }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const iconRef = useRef(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:5000/api/weather/city?q=${city}`);
        setData(res.data.current);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    if (city) fetchWeather();
  }, [city]);

  // Dynamic GSAP Animations based on backend conditionKey
  useEffect(() => {
    if (!data || !iconRef.current) return;

    gsap.killTweensOf(iconRef.current);

    const key = data.conditionKey;

    if (key === 'sunny') {
      gsap.to(iconRef.current, {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: 'none',
      });
    } else if (key === 'rainy') {
      gsap.to(iconRef.current, {
        y: -6,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    } else if (key === 'cloudy') {
      gsap.to(iconRef.current, {
        x: 8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    } else {
      gsap.to(iconRef.current, {
        scale: 1.15,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, [data]);

  const renderWeatherIcon = (key) => {
    const iconProps = { className: "w-10 h-10 text-amber-500 shrink-0" };
    switch (key) {
      case 'sunny':
        return <Sun {...iconProps} className="w-10 h-10 text-amber-500 shrink-0" />;
      case 'rainy':
        return <CloudRain {...iconProps} className="w-10 h-10 text-blue-500 shrink-0" />;
      case 'cloudy':
        return <Cloud {...iconProps} className="w-10 h-10 text-slate-400 shrink-0" />;
      case 'snowy':
        return <Snowflake {...iconProps} className="w-10 h-10 text-sky-400 shrink-0" />;
      case 'thunder':
        return <Zap {...iconProps} className="w-10 h-10 text-yellow-400 shrink-0" />;
      default:
        return <Sun {...iconProps} />;
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-12 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading weather details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-red-100 text-center text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
      {/* Top Header: City Name */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          {data.city}
        </h2>
      </div>

      {/* Main Temperature and Weather Icon Section */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div ref={iconRef} className="inline-block">
            {renderWeatherIcon(data.conditionKey)}
          </div>
          <div>
            <div className="text-4xl font-extrabold text-slate-900 dark:text-white">
              {data.temp}°
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">
              {data.conditionText}
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 dark:text-slate-500 block">Feels like</span>
          <span className="text-xl font-semibold text-slate-700 dark:text-slate-200">
            {data.feelsLike}°
          </span>
        </div>
      </div>

      <hr className="border-slate-100 dark:border-slate-700/60" />

      {/* Grid Metrics */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex items-center gap-3">
          <Droplets className="w-5 h-5 text-sky-500" />
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-400">Humidity</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{data.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Wind className="w-5 h-5 text-teal-500" />
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-400">Wind</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{data.windKm} km/h</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-emerald-500" />
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-400">Visibility</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{data.visibilityKm} km</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Gauge className="w-5 h-5 text-amber-500" />
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-400">Pressure</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{data.pressureMb} mb</p>
          </div>
        </div>
      </div>

      {/* Footer Row: UV Index */}
      <div className="flex items-center justify-between pt-2 px-2 border-t border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">UV Index</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
            {data.uvIndex}
          </span>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            {data.uvIndex <= 2 ? 'Low' : data.uvIndex <= 5 ? 'Moderate' : 'High'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;