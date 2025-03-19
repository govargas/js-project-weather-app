import { WeatherData } from "./WeatherData";

// SELECTORS
const container = document.querySelector(".container")!;
const APIKey: string = "2259f103ffcc8ead06b941ec5efcf06e";
let city: string = "stockholm";
let weatherData;
const weatherURL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

// FETCH WEATHER
const fetchWeatherData = async (): Promise<void> => {
  const response = await fetch(weatherURL);
  const data = await response.json();
  console.log(data);
  weatherData = data;
  loadWeatherData(weatherData);
};

// LOAD LANDING PAGE DATA
const loadWeatherData = (data: WeatherData) => {
  container.innerHTML = `
    <div class="landing-page-container">
      <div class="image-container">
        <img src="" alt="">
      </div>
      <h1>${data.main.temp}</h1>
      <h2>City</h2>
      <h3>Weather</h3>
      <div class="sunrise-sunset">
        <div class="sunrise-container">
          <p>Sunrise</p>
          <p>Time</p>
        </div>
        <div class="sunset-container">
          <p>Sunset</p>
          <p>Time</p>
        </div>
      </div>
      <button>&#x3e;</button>
    </div>`;
};

document.addEventListener("DOMContentLoaded", fetchWeatherData);
