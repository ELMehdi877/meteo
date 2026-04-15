import React from 'react';
import { getWeatherInfo } from '../utils';

const CurrentWeather = ({ data, city }) => {
  if (!data) return null;

  const current = data.current;
  const info = getWeatherInfo(current.weather_code || 0);

  return (
    <div className="current-card glass-card animate-fade">
      <div className="header">
        <h2 className="city-name">{city}</h2>
        <p className="date">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      <div className="weather-main">
        <span className="weather-icon">{info.icon}</span>
        <div className="temp-container">
          <span className="temp">{Math.round(current.temperature_2m)}°</span>
          <span className="description">{info.label}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <span className="label">Humidité</span>
          <span className="value">{data.hourly.relative_humidity_2m[0]}%</span>
        </div>
        <div className="stat-item">
          <span className="label">Vent</span>
          <span className="value">{data.hourly.wind_speed_10m[0]} km/h</span>
        </div>
        <div className="stat-item">
          <span className="label">Visibilité</span>
          <span className="value">10 km</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .current-card {
          padding: 2.5rem;
          margin-bottom: 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .current-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(56, 189, 248, 0.1), transparent);
          z-index: -1;
        }
        .city-name {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .date {
          color: var(--text-secondary);
          text-transform: capitalize;
        }
        .weather-main {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin: 2rem 0;
        }
        .weather-icon {
          font-size: 5rem;
        }
        .temp {
          font-size: 5rem;
          font-weight: 700;
          display: block;
          line-height: 1;
        }
        .description {
          font-size: 1.25rem;
          color: var(--accent-blue);
          font-weight: 500;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .stat-item .label {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        .stat-item .value {
          font-weight: 600;
          font-size: 1.125rem;
        }
      `}} />
    </div>
  );
};

export default CurrentWeather;
