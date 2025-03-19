"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// SELECTORS
const container = document.querySelector(".container");
const APIKey = "2259f103ffcc8ead06b941ec5efcf06e";
let city = "stockholm";
let weatherData;
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
// FETCH WEATHER
const fetchWeatherData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(weatherURL);
    const data = yield response.json();
    console.log(data);
    weatherData = data;
    loadWeatherData(weatherData);
});
// LOAD LANDING PAGE DATA
const loadWeatherData = (data) => {
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
