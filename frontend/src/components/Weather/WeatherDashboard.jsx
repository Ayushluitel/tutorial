import React, { useState, useEffect } from "react";
import "./weather.css"; // Create a CSS file for styling
import { API_KEY } from "../../utils/config"; // Store your API key safely

const WeatherDashboard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="weather-widget">
      <h4>Weather in {weather.name}</h4>
      <span>{weather.weather[0].description}</span>
      <span>🌡️ {weather.main.temp}°C</span>
      <span>💨 {weather.wind.speed} m/s</span>
      <span>💧 {weather.main.humidity}% humidity</span>
    </div>
  );
};

export default WeatherDashboard;
