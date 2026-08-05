# 🌤️ Weather Alert Application

A full-stack weather application built with a React frontend and an Express.js serverless backend deployed on Vercel. The app provides real-time weather updates, location search suggestions, and 24-hour hourly forecasts.

## 🚀 Live Demo & API

- **Frontend App:** [Insert your GitHub Pages or Vercel Frontend Link here]
- **Backend API:** `https://weather-alert-api.vercel.app`

---

## ✨ Features

- **Search & Auto-complete:** Search for cities worldwide with real-time location suggestions.
- **Current Weather Details:** View accurate weather conditions, temperatures, and condition keys.
- **24-Hour Hourly Forecast:** Visual breakdown of the upcoming 24-hour temperature trends and chance of rain.
- **Dark Mode Support:** Clean UI toggles designed for high readability in light or dark themes.
- **Serverless Backend:** Express API layer deployed via Vercel for high performance and secure key management.

---

## 🛠️ Tech Stack

### **Frontend**
- **React** (Vite / CRA)
- **Tailwind CSS** for UI styling
- **Axios** for API data fetching

### **Backend**
- **Node.js & Express.js**
- **Vercel Serverless Functions**
- **Weather API Integration**

---

## 📁 Project Structure

```text
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