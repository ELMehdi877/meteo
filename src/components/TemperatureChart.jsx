import React from 'react';

const TemperatureChart = ({ hourlyData }) => {
  if (!hourlyData) return null;

  const temps = hourlyData.temperature_2m.slice(0, 24);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = max - min || 1;

  const width = 800;
  const height = 150;
  const padding = 20;

  const points = temps.map((t, i) => {
    const x = (i / (temps.length - 1)) * (width - 2 * padding) + padding;
    const y = height - ((t - min) / range) * (height - 2 * padding) - padding;
    return { x, y, temp: t };
  });

  const pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');

  return (
    <div className="chart-container glass-card animate-fade">
      <h3 className="section-title">Tendance Température (24h)</h3>
      <div className="svg-wrapper">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMin meet">
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-blue)" />
              <stop offset="100%" stopColor="var(--accent-purple)" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path d={`${pathD} V ${height} H ${points[0].x} Z`} fill="url(#areaGradient)" />
          <path d={pathD} fill="none" stroke="url(#lineGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
          {points.map((p, i) => (
            i % 4 === 0 && (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="4" fill="var(--accent-blue)" />
                <text x={p.x} y={p.y - 12} textAnchor="middle" fill="white" fontSize="12" fontWeight="600">{p.temp}°</text>
                <text x={p.x} y={height - 5} textAnchor="middle" fill="var(--text-secondary)" fontSize="10">{i}:00</text>
              </g>
            )
          ))}
        </svg>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .chart-container {
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        .svg-wrapper {
          width: 100%;
          overflow: hidden;
        }
        .svg-wrapper svg {
          width: 100%;
          height: auto;
          display: block;
        }
      `}} />
    </div>
  );
};

export default TemperatureChart;
