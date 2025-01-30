import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city) return;
    setError("");
    setWeather(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please enter a valid city name.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Get Weather
        </button>
      </div>

      {error && <p className="text-red-400 mt-3">{error}</p>}

      {weather && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-xl">{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="Weather Icon"
            className="mx-auto"
          />
          <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
