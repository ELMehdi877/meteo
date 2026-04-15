import React from 'react';
import { getWeatherInfo } from '../utils';

const HourlyForecast = ({ data }) => {
  if (!data) return null;

  // Next 24 hours
  const hours = data.hourly.time.slice(0, 24).map((time, i) => ({
    time: new Date(time).getHours() + ':00',
    temp: Math.round(data.hourly.temperature_2m[i]),
    icon: getWeatherInfo(data.hourly.weather_code[i]).icon,
  }));

  return (
    <div className="forecast-section animate-fade" style={{ animationDelay: '0.1s' }}>
      <h3 className="section-title">Prévisions horaires</h3>
      <div className="scroll-container">
        {hours.map((h, i) => (
          <div key={i} className="forecast-item glass-card">
            <span className="time">{h.time}</span>
            <span className="icon">{h.icon}</span>
            <span className="temp">{h.temp}°</span>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .forecast-section {
          margin-bottom: 2.5rem;
        }
        .section-title {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          margin-left: 0.5rem;
          color: var(--text-secondary);
        }
        .scroll-container {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 0.5rem;
          scrollbar-width: none; /* Firefox */
        }
        .scroll-container::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
        .forecast-item {
          min-width: 90px;
          padding: 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          transition: transform 0.3s ease;
        }
        .forecast-item:hover {
          transform: translateY(-5px);
          border-color: var(--accent-blue);
        }
        .forecast-item .time {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .forecast-item .icon {
          font-size: 1.5rem;
        }
        .forecast-item .temp {
          font-weight: 600;
          font-size: 1.125rem;
        }
      `}} />
    </div>
  );
};

export default HourlyForecast;
