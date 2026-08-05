const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.WEATHER_API_KEY;

const BASE_URL = 'http://api.weatherapi.com/v1';

// Helper function to convert weather condition text into simple keys for GSAP icons
const getConditionKey = (text) => {
  const cond = text.toLowerCase();
  if (cond.includes('sun') || cond.includes('clear')) return 'sunny';
  if (cond.includes('rain') || cond.includes('drizzle')) return 'rainy';
  if (cond.includes('cloud') || cond.includes('overcast')) return 'cloudy';
  if (cond.includes('snow') || cond.includes('ice')) return 'snowy';
  if (cond.includes('thunder')) return 'thunder';
  return 'cloudy';
};

// Route 1: Search Autocomplete Suggestions
app.get('/api/weather/search', async (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.json([]);
  }

  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: { key: API_KEY, q: q.trim() }
    });

    const suggestions = response.data.map((item) => ({
      name: item.name,
      region: item.region,
      country: item.country,
      label: `${item.name}${item.region ? `, ${item.region}` : ''}, ${item.country}`
    }));

    res.json(suggestions);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || 'Failed to fetch suggestions.'
    });
  }
});

// Route 2: Get Detailed Weather Data by City
app.get('/api/weather/city', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'City query parameter "q" is required.' });
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: { key: API_KEY, q, days: 2 }
    });

    const data = response.data;

    const currentData = {
      city: data.location.name,
      country: data.location.country,
      temp: Math.round(data.current.temp_c),
      feelsLike: Math.round(data.current.feelslike_c),
      conditionText: data.current.condition.text,
      conditionKey: getConditionKey(data.current.condition.text),
      humidity: data.current.humidity,
      windKm: data.current.wind_kph,
      visibilityKm: data.current.vis_km,
      pressureMb: data.current.pressure_mb,
      uvIndex: data.current.uv
    };

    const currentHour = new Date(data.location.localtime).getHours();
    const todayHours = data.forecast.forecastday[0].hour;
    const tomorrowHours = data.forecast.forecastday[1]?.hour || [];
    const combinedHours = [...todayHours, ...tomorrowHours];

    const hourlyForecast = combinedHours
      .slice(currentHour, currentHour + 24)
      .map((item) => ({
        time: item.time.split(' ')[1].slice(0, 2),
        temp: Math.round(item.temp_c),
        chanceOfRain: item.chance_of_rain,
        conditionKey: getConditionKey(item.condition.text)
      }));

    res.json({ current: currentData, hourly: hourlyForecast });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || 'Failed to fetch weather data.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Route 3: Get Hourly Forecast Only
app.get('/api/weather/hourly', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'City query parameter "q" is required.' });
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: { key: API_KEY, q, days: 2 }
    });

    const data = response.data;
    const currentHour = new Date(data.location.localtime).getHours();
    const todayHours = data.forecast.forecastday[0].hour;
    const tomorrowHours = data.forecast.forecastday[1]?.hour || [];
    const combinedHours = [...todayHours, ...tomorrowHours];

    const hourlyForecast = combinedHours
      .slice(currentHour, currentHour + 24)
      .map((item) => ({
        time: item.time.split(' ')[1].slice(0, 2),
        temp: Math.round(item.temp_c),
        chanceOfRain: item.chance_of_rain,
        conditionKey: getConditionKey(item.condition.text)
      }));

    res.json({ hourly: hourlyForecast });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || 'Failed to fetch hourly forecast.'
    });
  }
});

module.exports = app;