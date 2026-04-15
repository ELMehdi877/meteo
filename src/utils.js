export const weatherCodes = {
  0: { label: "Ciel dégagé", icon: "☀️", class: "sunny" },
  1: { label: "Principalement dégagé", icon: "🌤️", class: "sunny" },
  2: { label: "Partiellement nuageux", icon: "⛅", class: "cloudy" },
  3: { label: "Couvert", icon: "☁️", class: "cloudy" },
  45: { label: "Brouillard", icon: "🌫️", class: "foggy" },
  48: { label: "Brouillard givrant", icon: "🌫️", class: "foggy" },
  51: { label: "Bruine légère", icon: "🌦️", class: "rainy" },
  53: { label: "Bruine modérée", icon: "🌦️", class: "rainy" },
  55: { label: "Bruine dense", icon: "🌦️", class: "rainy" },
  61: { label: "Pluie légère", icon: "🌧️", class: "rainy" },
  63: { label: "Pluie modérée", icon: "🌧️", class: "rainy" },
  65: { label: "Pluie forte", icon: "🌧️", class: "rainy" },
  71: { label: "Neige légère", icon: "❄️", class: "snowy" },
  73: { label: "Neige modérée", icon: "❄️", class: "snowy" },
  75: { label: "Neige forte", icon: "❄️", class: "snowy" },
  80: { label: "Averses de pluie légères", icon: "🌦️", class: "rainy" },
  81: { label: "Averses de pluie modérées", icon: "🌧️", class: "rainy" },
  82: { label: "Averses de pluie violentes", icon: "🌧️", class: "rainy" },
  95: { label: "Orage", icon: "⛈️", class: "stormy" },
};

export const getWeatherInfo = (code) => {
  return weatherCodes[code] || { label: "Inconnu", icon: "❓", class: "unknown" };
};
