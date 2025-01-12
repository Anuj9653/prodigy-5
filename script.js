// Your OpenWeatherMap API key
const apiKey = "4ad41ee13a7cc3fca4c511df8b4a1ace";  // API key

// Function to fetch weather data
async function fetchWeather() {
    const city = document.getElementById('city').value.trim();  // Enter city name
    const errorMessage = document.getElementById('error-message');
    const weatherContainer = document.getElementById('weather-container');
    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const weather = document.getElementById('weather');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');

    // Clear any previous error messages
    errorMessage.style.display = 'none';
    weatherContainer.style.display = 'none';

    // Validate the input
    if (city === "") {
        errorMessage.textContent = 'Please enter a city name.';
        errorMessage.style.display = 'block';
        return;
    }

    //  API URL with the city name and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Using the Weather API

    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(apiUrl);
        
        // Check if the response is OK (status 200)
        if (!response.ok) {
            throw new Error('City not found or invalid city name');
        }

        // Parse the JSON response
        const data = await response.json();

        // Debugging: Log the data (you can remove this later)
        console.log(data);

        // Update the UI with weather data
        location.textContent = `Weather in ${data.name}, ${data.sys.country}`;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        weather.textContent = `Condition: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        // Show the weather container with the data
        weatherContainer.style.display = 'block';
    } catch (error) {
        // If there's an error (e.g., city not found)
        errorMessage.textContent = 'Error: ' + error.message;
        errorMessage.style.display = 'block';
    }
}
