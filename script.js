"use strict";
// WEATHER DATA INTERFACE
// interface WeatherData {
//   city: City;
//   cod: string;
//   message: number;
//   cnt: number;
//   list: DailyForecast[];
// }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// type City = {
//   id: number;
//   name: string;
//   coord: Coordinates;
//   country: string;
//   population: number;
//   timezone: number;
// };
// type Coordinates = {
//   lon: number;
//   lat: number;
// };
// type DailyForecast = {
//   dt: number;
//   sunrise: number;
//   sunset: number;
//   temp: Temperature;
//   feels_like: FeelsLike;
//   pressure: number;
//   humidity: number;
//   weather: Weather[];
//   speed: number;
//   deg: number;
//   gust: number;
//   clouds: number;
//   pop: number;
//   rain: number;
// };
// type Temperature = {
//   day: number;
//   min: number;
//   max: number;
//   night: number;
//   eve: number;
//   morn: number;
// };
// type FeelsLike = {
//   day: number;
//   night: number;
//   eve: number;
//   morn: number;
// };
// type Weather = {
//   id: number;
//   main: string;
//   description: string;
//   icon: string;
// };
/*// One Day - Weather Data reference
// { "coord": { "lon": 18.0649, "lat": 59.3326 }, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "base": "stations", "main": { "temp": 9.21, "feels_like": 8.08, "temp_min": 8.95, "temp_max": 9.58, "pressure": 1020, "humidity": 56, "sea_level": 1020, "grnd_level": 1015 }, "visibility": 10000, "wind": { "speed": 2.24, "deg": 293, "gust": 4.02 }, "clouds": { "all": 47 }, "dt": 1742293894, "sys": { "type": 2, "id": 2012100, "country": "SE", "sunrise": 1742273722, "sunset": 1742316975 }, "timezone": 3600, "id": 2673730, "name": "Stockholm", "cod": 200 }
*/
// SELECTORS
const APIKey = "31ef2747a161bbc841cc049ca29ffc97";
const container = document.querySelector(".container");
let city = "stockholm";
let weatherData;
let oneWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
let weatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
// Unix to Time of Day Function (local formatting, if needed)
const getLocalHours = (unixTime) => {
    return new Date(unixTime * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};
const getCityTime = (unixTime, timezoneOffset) => {
    // Convert the Unix timestamp (in seconds) to milliseconds (UTC)
    const utcTimestamp = unixTime * 1000;
    // Apply the city's offset (in seconds) to get the adjusted timestamp
    const adjustedTimestamp = utcTimestamp + timezoneOffset * 1000;
    // Create a date with the adjusted timestamp
    const date = new Date(adjustedTimestamp);
    // Format the date as if it were in UTC—since we've already added the offset,
    // this will display the correct city-local time regardless of the user's timezone.
    return date.toLocaleTimeString("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};
// Fetch One Day API - Bianka
const oneDayWeatherFetch = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(oneWeatherURL);
        const data = yield response.json();
        weatherData = data;
        loadWeatherData(weatherData);
        // fetchWeatherData(); //REMOVE THIS WHEN FINISHED
        updatePageStyle();
    }
    catch (error) {
        console.error("Something went wrong", error);
    }
});
// LOAD LANDING PAGE DATA - Juan/Bianka/Christina
const loadWeatherData = (weatherData) => {
    container.innerHTML += `
  <div class="landing-page-container">
    <div class="image-container">
      <img id="weather-icon" class="weather-icon" src="" alt="Weather Icon">
    </div>
    <div class="weather-info">  
      <h1 class="big-temp">${Math.round(weatherData.main.temp)}<sup class="big-temp-degrees">°C</sup></h1>
      <h2>${weatherData.name}</h2>
      <h3>${weatherData.weather[0].description}</h3>
    </div>
    <div class="sunrise-sunset">
      <div class="sunrise-container">
        <p><b>Sunrise</b></p>
        <p>${getCityTime(weatherData.sys.sunrise, weatherData.timezone)}</p>
      </div>
      <div class="sunset-container">
        <p>Sunset</p>
        <p>${getCityTime(weatherData.sys.sunset, weatherData.timezone)}</p>
      </div>
    </div>
    <button class="icon-button" type=button>
      <img src="assets/button.svg" alt="Button Icon">
    </button>
  </div>`;
};
// Style Page by Time of Day (ToD) for Landing Page
const updatePageStyle = () => {
    // Use actual current time (Date.now()) adjusted by the city's timezone
    const nowUTC = Date.now();
    const currentCityTime = new Date(nowUTC + weatherData.timezone * 1000);
    const currentHourStr = currentCityTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    const sunriseHourStr = getCityTime(weatherData.sys.sunrise, weatherData.timezone);
    const sunsetHourStr = getCityTime(weatherData.sys.sunset, weatherData.timezone);
    const currentHour = parseInt(currentHourStr.split(":")[0]);
    const sunriseHour = parseInt(sunriseHourStr.split(":")[0]);
    const sunsetHour = parseInt(sunsetHourStr.split(":")[0]);
    const isDaytime = currentHour >= sunriseHour && currentHour < sunsetHour;
    document.body.classList.remove("daytime", "nighttime");
    document.body.classList.add(isDaytime ? "daytime" : "nighttime");
    const timeImages = document.querySelectorAll(".weather-icon");
    timeImages.forEach((timeImage) => {
        timeImage.src = isDaytime ? "./assets/sunny-w.svg" : "./assets/night.svg";
        timeImage.alt = isDaytime ? "Sun Icon" : "Moon Icon";
    });
};
// Style Page by Time of Day (ToD) for Main Page
const updateMainPageStyle = () => {
    const nowUTC = Date.now();
    const currentCityTime = new Date(nowUTC + weatherData.city.timezone * 1000);
    const currentHourStr = currentCityTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    const sunriseHourStr = getCityTime(weatherData.city.sunrise, weatherData.city.timezone);
    const sunsetHourStr = getCityTime(weatherData.city.sunset, weatherData.city.timezone);
    const currentHour = parseInt(currentHourStr.split(":")[0]);
    const sunriseHour = parseInt(sunriseHourStr.split(":")[0]);
    const sunsetHour = parseInt(sunsetHourStr.split(":")[0]);
    const isDaytime = currentHour >= sunriseHour && currentHour < sunsetHour;
    document.body.classList.remove("daytime", "nighttime");
    document.body.classList.add(isDaytime ? "daytime" : "nighttime");
    const timeImage = document.querySelector(".weather-icon");
    timeImage.src = isDaytime ? "./assets/sunny-w.svg" : "./assets/night.svg";
    timeImage.alt = isDaytime ? "Sun Icon" : "Moon Icon";
};
// Toggle Pages
let isLandingPage = true; // Track which page is currently displayed
const toggleWeatherView = () => __awaiter(void 0, void 0, void 0, function* () {
    container.innerHTML = "";
    if (isLandingPage) {
        yield fetchWeatherData(); // Load Main Page
    }
    else {
        yield oneDayWeatherFetch(); // Load Landing Page
    }
    isLandingPage = !isLandingPage; // Toggle state
});
// Button Event Listener
document.addEventListener("click", (event) => {
    const button = event.target.closest(".icon-button");
    if (button) {
        toggleWeatherView();
    }
});
// FETCH WEATHER - CHRISTINA
const fetchWeatherData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(weatherForecastURL);
    const data = yield response.json();
    const dailyData = new Map();
    data.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0];
        const temp = entry.main.temp;
        if (!dailyData.has(date)) {
            dailyData.set(date, {
                entries: [],
                minTemp: temp,
                maxTemp: temp,
                noonEntry: undefined,
            });
        }
        const dayData = dailyData.get(date);
        dayData.entries.push(entry);
        dayData.minTemp = Math.min(dayData.minTemp, temp);
        dayData.maxTemp = Math.max(dayData.maxTemp, temp);
        if (entry.dt_txt.includes("12:00:00")) {
            dayData.noonEntry = entry;
        }
    });
    dailyData.forEach((dayData, date) => {
        const allTemps = dayData.entries.map((entry) => entry.main.temp);
        dayData.minTemp = Math.min(...allTemps);
        dayData.maxTemp = Math.max(...allTemps);
    });
    const filteredForecast = Array.from(dailyData.values())
        .slice(0, 5)
        .map(({ entries, minTemp, maxTemp, noonEntry }) => (Object.assign(Object.assign({}, (noonEntry !== null && noonEntry !== void 0 ? noonEntry : entries[0])), { minTemp,
        maxTemp })));
    const filteredWeatherData = Object.assign(Object.assign({}, data), { list: filteredForecast });
    weatherData = data;
    loadMainPage(filteredWeatherData);
    updateMainPageStyle();
});
// LOAD MAIN PAGE - CHRISTINA
const weatherIcons = {
    "clear sky": "./assets/sunny-g.svg",
    "few clouds": "./assets/partly-cloudy.svg",
    "scattered clouds": "./assets/overcast.svg",
    "broken clouds": "./assets/partly-cloudy.svg",
    "shower rain": "./assets/overcast.svg",
    "overcast clouds": "./assets/overcast.svg",
    rain: "./assets/overcast.svg",
    thunderstorm: "./assets/overcast.svg",
    snow: "./assets/overcast.svg",
    mist: "./assets/overcast.svg",
};
const loadMainPage = (data) => {
    const sunriseTime = getCityTime(data.city.sunrise, data.city.timezone);
    const sunsetTime = getCityTime(data.city.sunset, data.city.timezone);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const tempTableRows = data.list
        .map((dayData) => {
        const dayDate = new Date(dayData.dt * 1000);
        const dayName = days[dayDate.getDay()];
        const minTemp = Math.round(dayData.minTemp);
        const maxTemp = Math.round(dayData.maxTemp);
        let weatherIcon = "";
        const weatherDescription = dayData.weather[0].description.toLowerCase();
        weatherIcon = weatherIcons[weatherDescription] || "./assets/overcast.svg";
        return `
    <div class="main-temp-table-row">
        <div class="main-temp-table-day">${dayName}</div>
        <div><img class="main-temp-table-img" src="${weatherIcon}" alt="${dayData.weather[0].description}"></div>
        <div class="main-temp-table-temp">${minTemp} °C / ${maxTemp}°C</div>
      </div>
    `;
    })
        .join("");
    container.innerHTML = `
  <div class="main-content-container">
        <div class="main-content-hero">
          <div class="image-container">
      <img id="weather-icon" class="weather-icon" src="" alt="Weather Icon">
      </div>
          <div class="weather-info"> 
          <h1 class="big-temp">${Math.round(data.list[0].main.temp)}<sup class="big-temp-degrees">°C</sup></h1>
          <h2>${data.city.name}</h2>
          <h3>${data.list[0].weather[0].main}</h3>
          </div>
          <div class="main-sunrise-sunset">
              <p><b>Sunrise</b></p>
              <p>${sunriseTime}</p>            
              <p><b>Sunset</b></p>
              <p>${sunsetTime}</p>
        </div>
      </div>
      <button class="main-page-btn icon-button" type=button>
      <img src="assets/button.svg" alt="Button Icon">
    </button>
        <div class="main-temp-table">
            ${tempTableRows}
        </div>
    </div>
  `;
};
// HAMBURGER MENU TOGGLE - Talo
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");
menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("open");
    navbar.classList.toggle("open");
});
oneDayWeatherFetch();
// fetchWeatherData();
// Navbar click event listener for updating weather based on selected city
const navbarList = document.querySelector(".navbar ul");
if (navbarList) {
    navbarList.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        const target = event.target;
        if (target.tagName.toLowerCase() === "li") {
            city = target.innerText.trim();
            oneWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
            weatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
            container.innerHTML = "";
            navbar.classList.remove("open");
            yield oneDayWeatherFetch();
        }
    }));
}
