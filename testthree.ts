const API_KEY = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function fetchWeather(city) {
    try {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

function displayWeather(data) {
    console.log(`Weather in ${data.name}, ${data.sys.country}`);
    console.log(`Temperature: ${data.main.temp}°C`);
    console.log(`Humidity: ${data.main.humidity}%`);
    console.log(`Condition: ${data.weather[0].description}`);
}

// Example usage
fetchWeather('New York');
