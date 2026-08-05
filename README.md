# 🌤️ Weather Alert Application

![Application Preview](./preview.png)

A full-stack weather application built with a React frontend and an Express.js serverless backend deployed on Vercel. The app provides real-time weather updates, location search suggestions, and 24-hour hourly forecasts.

## 🚀 Live Demo & API

- **Live Demo App:** [https://p01-api-weather-alert-e6k6cj78n-shepherd3.vercel.app/](https://p01-api-weather-alert-e6k6cj78n-shepherd3.vercel.app/)

---

## ✨ Features

- **Search & Auto-complete:** Search for cities worldwide with real-time location suggestions.
- **Current Weather Details:** View accurate weather conditions, temperatures, and condition keys.
- **24-Hour Hourly Forecast:** Visual breakdown of upcoming temperature trends and weather conditions.
- **Dark Mode Support:** Clean UI toggles designed for high readability in light or dark themes.
- **Serverless Backend:** Express API layer deployed via Vercel for fast performance and secure API key handling.

---

## 🛠️ Tech Stack

### **Frontend**
- **React**
- **Tailwind CSS**
- **Axios**

### **Backend**
- **Node.js & Express.js**
- **Vercel Serverless Functions**
- **Weather API Integration**

---

## 📁 Project Structure

```text
├── preview.png          # UI Preview Image
├── backend/
│   ├── api/             # Vercel entry routing configuration
│   ├── index.js         # Main Express backend server & endpoints
│   ├── vercel.json      # Vercel deployment routes config
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/  # React components (CurrentWeatherCard, etc.)
    │   ├── App.jsx      # Main application state and layout
    │   └── main.jsx
    └── package.json