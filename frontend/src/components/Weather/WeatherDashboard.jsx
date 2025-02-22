import React, { useState, useEffect } from "react";
import "./weather.css"; // Ensure you have this CSS file
import { API_KEY } from "../../utils/config"; // Ensure API key is stored securely

// Map trek addresses to valid OpenWeatherMap city names
const cityMapping = {
  "Solukhumbu, Province No. 1, Nepal": "Namche Bazaar",
  "Annapurna Region, Gandaki Province, Nepal": "Pokhara",
  "Gorkha District, Gandaki Province, Nepal": "Gorkha",
  "Rasuwa District, Bagmati Province, Nepal": "Rasuwa",
  "Mustang District, Gandaki Province, Nepal": "Jomsom",
  "Solukhumbu, Everest Region, Nepal": "Gokyo",
  "Langtang Region, Bagmati Province, Nepal": "Melamchi",
  "Taplejung District, Province No. 1, Nepal": "Taplejung",
};

const WeatherDashboard = ({ address }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Convert trek address to valid city name
  const city = cityMapping[address];

  useEffect(() => {
    if (!city) {
      setError("No valid city found");
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )},NP&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch weather data");
        }

        setWeather(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="weather-widget">
      {loading ? (
        <p>⏳ Loading weather...</p>
      ) : error ? (
        <p className="error">❌ {error}</p>
      ) : (
        <>
          <h4>🌍 Weather in {weather.name}</h4>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>🥶 Feels Like: {weather.main.feels_like}°C</p>
          <p>☁️ {weather.weather[0].description}</p>
          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
