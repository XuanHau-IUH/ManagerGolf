import { useState, useEffect } from 'react';

// Da Nang, Vietnam — Golf capital of Vietnam
const DA_NANG_LAT = 16.0544;
const DA_NANG_LON = 108.2022;

const WMO_CODES = {
  0:  { label: 'Clear Sky',      icon: '☀️' },
  1:  { label: 'Mainly Clear',   icon: '🌤️' },
  2:  { label: 'Partly Cloudy',  icon: '⛅' },
  3:  { label: 'Overcast',       icon: '☁️' },
  45: { label: 'Foggy',          icon: '🌫️' },
  48: { label: 'Icy Fog',        icon: '🌫️' },
  51: { label: 'Light Drizzle',  icon: '🌦️' },
  53: { label: 'Drizzle',        icon: '🌧️' },
  55: { label: 'Heavy Drizzle',  icon: '🌧️' },
  61: { label: 'Light Rain',     icon: '🌦️' },
  63: { label: 'Rain',           icon: '🌧️' },
  65: { label: 'Heavy Rain',     icon: '🌧️' },
  71: { label: 'Light Snow',     icon: '🌨️' },
  80: { label: 'Showers',        icon: '🌦️' },
  95: { label: 'Thunderstorm',   icon: '⛈️' },
};

function getWeatherInfo(code) {
  return WMO_CODES[code] ?? { label: 'Unknown', icon: '🌡️' };
}

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${DA_NANG_LAT}&longitude=${DA_NANG_LON}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=Asia%2FHo_Chi_Minh&wind_speed_unit=kmh`;
        const res  = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        const cur  = data.current;
        const info = getWeatherInfo(cur.weather_code);
        setWeather({
          temp:      Math.round(cur.temperature_2m),
          humidity:  cur.relative_humidity_2m,
          windSpeed: Math.round(cur.wind_speed_10m),
          code:      cur.weather_code,
          label:     info.label,
          icon:      info.icon,
          location:  'Đà Nẵng',
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
          // Fallback mock data on error
          setWeather({ temp: 29, humidity: 72, windSpeed: 14, code: 1, label: 'Mainly Clear', icon: '🌤️', location: 'Đà Nẵng' });
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
    return () => controller.abort();
  }, []);

  return { weather, isLoading, error };
}
