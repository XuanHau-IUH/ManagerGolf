import { Wind, Droplets } from 'lucide-react';
import { useWeather } from '../../hooks/useWeather';

export default function WeatherWidget({ compact = false, scrolled = true }) {
  const { weather, isLoading } = useWeather();

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 ${compact ? '' : 'p-3 bg-white rounded-xl shadow-card'}`}>
        <div className="skeleton w-6 h-6 rounded-full" />
        <div className="skeleton w-16 h-4 rounded" />
      </div>
    );
  }

  if (!weather) return null;

  const textColor = scrolled ? 'text-slate-700' : 'text-white';
  const subColor  = scrolled ? 'text-slate-400' : 'text-white/70';

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xl leading-none">{weather.icon}</span>
        <div>
          <span className={`text-sm font-semibold ${textColor}`}>{weather.temp}°C</span>
          <span className={`text-xs ml-1 ${subColor}`}>{weather.location}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-card border border-slate-100">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{weather.location}</p>
          <p className="text-xs text-slate-500">{weather.label}</p>
        </div>
        <span className="text-4xl">{weather.icon}</span>
      </div>
      <p className="text-3xl font-display font-bold text-slate-900 mb-3">{weather.temp}°C</p>
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Wind className="w-3.5 h-3.5 text-slate-400" />
          {weather.windSpeed} km/h
        </span>
        <span className="flex items-center gap-1">
          <Droplets className="w-3.5 h-3.5 text-slate-400" />
          {weather.humidity}%
        </span>
      </div>
    </div>
  );
}
