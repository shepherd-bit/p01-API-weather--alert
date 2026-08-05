# Weather App

A modern, responsive full-stack weather application built with **React**, **Tailwind CSS**, and **Express.js**. Featuring live city autocomplete search, real-time weather metrics, dynamic condition animations powered by **GSAP**, a 24-hour hourly forecast, and dark mode support.

---

## Features

- **Live City Search**: Instant autocomplete suggestions powered by WeatherAPI.
- **Dynamic GSAP Animations**: Custom weather condition animations (rotation for sunny days, floating motion for cloudiness, vertical bounce for rain, and pulse effects for storms/snow).
- **Comprehensive Weather Metrics**: Current temperature, feels-like indicator, humidity, wind speed, visibility, atmospheric pressure, and UV index.
- **24-Hour Hourly Forecast**: Interactive, horizontal scrollable view detailing temperature and precipitation percentage hour-by-hour.
- **Theme Toggle**: Custom dark mode switch built directly into the top navigation bar.
- **Responsive Design**: Designed to fit seamlessly across desktop, tablet, and mobile displays.

---

## Tech Stack

### Frontend
- **React** (Vite / CRA)
- **Tailwind CSS v4** (Utility-first styling)
- **GSAP** (GreenSock Animation Platform)
- **Lucide React** (Icons)
- **Axios** (HTTP client)

### Backend
- **Node.js** & **Express.js**
- **Axios** (Server-side API calls)
- **WeatherAPI** (External weather data provider)
- **Dotenv** & **CORS**

---

## Project Structure

```text
├── backend/
│   ├── index.js          # Express server & API routes
│   ├── .env              # Environment variables (API Keys)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── SearchBar.jsx       # Header, search bar, & dark mode toggle
    │   │   ├── WeatherCard.jsx     # Current weather card & GSAP animations
    │   │   └── HourlyForecast.jsx  # 24-hour horizontal forecast slider
    │   ├── App.jsx                 # Main application state & layout wrapper
    │   └── index.css               # Tailwind & custom variant configuration
    └── package.json