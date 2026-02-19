// DOM SELECTORS
const form = document.querySelector("#weather-form");
const locationInput = document.getElementById("location-input");
const loadingSection = document.getElementById("loading");
const weatherDisplay = document.getElementById("weather-display");
const errorSection = document.getElementById("error-message");

// WEATHER DISPLAY
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");

const API_KEY = "1171e4596b33a0b563b748dbf79890ce";

// API FUNCTIONS
async function fetchWeather(location) {
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// DATA PROCESSING
function processWeatherData(data) {
    return {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon
    };
}

// UI / DOM MANIPULATION
function showLoading(){
    loadingSection.classList.remove('hidden');
}

function hideLoading(){
    loadingSection.classList.add('hidden');
}

function showError(message){
    errorSection.classList.remove('hidden');
    errorSection.textContent = message;
}

function hideError(){
    errorSection.classList.add('hidden');
}

function displayWeather(data) {
  cityName.textContent = data.city;
  temperature.textContent = `Temperature: ${data.temperature}°C`;
  description.textContent = `Condition: ${data.description}`;
  humidity.textContent = `Humidity: ${data.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.windSpeed} m/s`;

  weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  weatherDisplay.classList.remove("hidden");
}

// CONTROLLER / EVENT LISTENERS
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = locationInput.value.trim();
  if (!location) return;

  weatherDisplay.classList.add("hidden");
  hideError();
  showLoading();

  try {
    const rawData = await fetchWeather(location);
    const processedData = processWeatherData(rawData);
    displayWeather(processedData);
  } catch (error) {
    showError("Could not fetch weather data.");
  } finally {
    hideLoading();
  }
});
