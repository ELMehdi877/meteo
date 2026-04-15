import React from 'react';
import { getWeatherInfo } from '../utils';

const DailyForecast = ({ data }) => {
  if (!data || !data.daily) return null;

  const days = data.daily.time.map((time, i) => ({
    date: new Date(time).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
    icon: getWeatherInfo(data.daily.weather_code[i]).icon,
    label: getWeatherInfo(data.daily.weather_code[i]).label,
    // Note: The sample API response might not have min/max in the template provided by user 
    // but usually Open-Meteo does. I'll check the sample user provided.
    // User sample has weather_code daily but no temperatures. 
    // I'll stick to what the user provided or assume I might not have it.
    // Actually I can just show the code.
  }));

  return (
    <div className="forecast-section animate-fade" style={{ animationDelay: '0.2s' }}>
      <h3 className="section-title">Prochains jours</h3>
      <div className="daily-list">
        {days.map((d, i) => (
          <div key={i} className="daily-item glass-card">
            <span className="date">{d.date}</span>
            <div className="info">
              <span className="icon">{d.icon}</span>
              <span className="label text-truncate">{d.label}</span>
            </div>
            {/* If I had max/min temp I'd put it here */}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .daily-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .daily-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.75rem;
        }
        .daily-item .date {
          width: 100px;
          font-weight: 500;
          text-transform: capitalize;
        }
        .daily-item .info {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          justify-content: center;
        }
        .daily-item .label {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        .text-truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
        }
        @media (max-width: 600px) {
          .daily-item .label { display: none; }
        }
      `}} />
    </div>
  );
};

export default DailyForecast;
