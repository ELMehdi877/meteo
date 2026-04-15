import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import TemperatureChart from './components/TemperatureChart';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Paris');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon, cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&current=temperature_2m,weather_code&timezone=auto`
      );
      if (!response.ok) throw new Error('Erreur lors de la récupération de la météo');
      const data = await response.json();
      setWeatherData(data);
      if (cityName) setCity(cityName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=fr&format=json`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('Ville non trouvée');
      }
      const { latitude, longitude, name } = geoData.results[0];
      await fetchWeather(latitude, longitude, name);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude, "Ma Position");
        },
        () => {
          setError("Impossible de détecter votre position. Utilisation de Paris par défaut.");
          handleSearch('Paris');
        }
      );
    } else {
      handleSearch('Paris');
    }
  };

  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  return (
    <main className="app-container">
      <header className="app-header animate-fade">
        <h1 className="app-title">Météo<span>Connect</span></h1>
        <p className="app-subtitle">Votre météo en un clin d'œil</p>
      </header>

      <SearchBox onSearch={handleSearch} onGetCurrentLocation={handleGetCurrentLocation} />

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Chargement des prévisions...</p>
        </div>
      )}

      {error && (
        <div className="error-message glass-card animate-fade">
          <p>⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && weatherData && (
        <>
          <CurrentWeather data={weatherData} city={city} />
          <TemperatureChart hourlyData={weatherData.hourly} />
          <HourlyForecast data={weatherData} />
          <DailyForecast data={weatherData} />
        </>
      )}

      <footer className="app-footer animate-fade">
        <p>Propulsé par Open-Meteo API</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .app-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        .app-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .app-title {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 0.5rem;
        }
        .app-title span {
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .app-subtitle {
          color: var(--text-secondary);
          font-size: 1.125rem;
        }
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 4rem 0;
        }
        .loader {
          width: 48px;
          height: 48px;
          border: 5px solid var(--card-bg);
          border-bottom-color: var(--accent-blue);
          border-radius: 50%;
          display: inline-block;
          animation: rotation 1s linear infinite;
        }
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .error-message {
          padding: 1.5rem;
          text-align: center;
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.2);
        }
        .app-footer {
          margin-top: 4rem;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.875rem;
          padding-bottom: 2rem;
        }
      `}} />
    </main>
  );
}

export default App;
