// WEATHER DATA INTERFACE
// interface WeatherData {
//   city: City;
//   cod: string;
//   message: number;
//   cnt: number;
//   list: DailyForecast[];
// }

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
const APIKey: string = "31ef2747a161bbc841cc049ca29ffc97";

// SELECTORS
const container = document.querySelector(".container")!;
let city: string = "stockholm";
let weatherData;
// const weatherURL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&units=metric&appid=${APIKey}`;

// FETCH WEATHER
const fetchWeatherData = async (): Promise<void> => {
  const response = await fetch(weatherURL);
  const data = await response.json();
  console.log(data);
  weatherData = data;

  console.log(weatherData);

  loadWeatherData(weatherData);
  loadMainPage(weatherData);
};

// LOAD MAIN PAGE
const loadWeatherData = (data: any) => {
  container.innerHTML = `
    <div class="landing-page-container">
      <div class="image-container">
        <img src="" alt="">
      </div>
      <h1>${data.list[0].main.temp}</h1>
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

// LOAD MAIN PAGE
const loadMainPage = (data: any) => {
  const sunriseTime = new Date(data.city.sunrise * 1000).toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  const sunsetTime = new Date(data.city.sunset * 1000).toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const tempTableRows = data.list
    .map((dayData: any) => {
      const dayDate = new Date(dayData.dt * 1000);
      const dayName = days[dayDate.getDay()];
      const minTemp = dayData.main.temp_min;
      const maxTemp = dayData.main.temp_max;
      const weatherIcon = dayData.weather[0].icon;

      return `
    <div class="main-temp-table-row">
        <div class="main-temp-table-day">${dayName}</div>
        <div class="main-temp-table-img"><img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="${dayData.weather[0].description}"></div>
        <div class="main-temp-table-temp">${minTemp} / ${maxTemp}°C</div>
      </div>
    `;
    })
    .join("");

  container.innerHTML = `
  <div class="main-content-container">
        <div class="main-content-hero">
          <img>
          <h1>${data.list[0].main.temp}°C</h1>
          <h2>${data.city.name}</h2>
          <h3>${data.list[0].weather[0].main}</h3>
          <div class="main-sunrise-sunset">
            <div class="main-sunrise-container">
              <p>Sunrise</p>
              <p>${sunriseTime}</p>
            </div>
            <div class="main-sunset-container">
              <p>Sunset</p>
              <p>${sunsetTime}</p>
            </div>
        </div>
      </div>
      <button class="main-content-btn">></button>
        <div class="main-temp-table">
          <div class="main-temp-table-row">
            ${tempTableRows}
          </div>
        </div>
    </div>
  `;
};
