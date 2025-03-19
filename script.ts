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
};

// // LOAD LANDING PAGE DATA

const loadWeatherData = (data: any) => {
  container.innerHTML = `
// Selectors
const container = document.querySelector(".container") as HTMLDivElement
const APIKey: string = "2259f103ffcc8ead06b941ec5efcf06e"
let city: string = "stockholm"
const weatherURL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  console.log(weatherURL)

  let weatherData: any

  // Data reference
  // { "coord": { "lon": 18.0649, "lat": 59.3326 }, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "base": "stations", "main": { "temp": 9.21, "feels_like": 8.08, "temp_min": 8.95, "temp_max": 9.58, "pressure": 1020, "humidity": 56, "sea_level": 1020, "grnd_level": 1015 }, "visibility": 10000, "wind": { "speed": 2.24, "deg": 293, "gust": 4.02 }, "clouds": { "all": 47 }, "dt": 1742293894, "sys": { "type": 2, "id": 2012100, "country": "SE", "sunrise": 1742273722, "sunset": 1742316975 }, "timezone": 3600, "id": 2673730, "name": "Stockholm", "cod": 200 }

  // Unix to Time of Day Function
  const getLocalHours = (unixTime: number) => new Date(unixTime * 1000).getHours()

  // Style Page by Time of Day (ToD)
  const updatePageStyle = () => {
    const currentHour: number = getLocalHours(weatherData.dt)
    const sunriseHour: number = getLocalHours(weatherData.sys.sunrise)
    const sunsetHour: number = getLocalHours(weatherData.sys.sunset)
    // Unix to Time of Day Function
    const getLocalHours = (unixTime: number) => {
      return new Date(unixTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    }
    // Style Page by Time of Day (ToD)
    const updatePageStyle = () => {
      const currentHour: string = getLocalHours(weatherData.dt)
      const sunriseHour: string = getLocalHours(weatherData.sys.sunrise)
      const sunsetHour: string = getLocalHours(weatherData.sys.sunset)

      const isDaytime: boolean = currentHour >= sunriseHour && currentHour < sunsetHour

      document.body.classList.add(isDaytime ? "daytime" : "nighttime")

      console.log(`Current Hour: ${currentHour}, Sunrise Hour: ${sunriseHour}, Sunset Hour: ${sunsetHour}`)
    }

    // Fetch API
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(weatherURL);
        const data = await response.json();
        console.log(data);

        weatherData = data;
        loadWeatherData(weatherData);
        updatePageStyle(weatherData)
        weatherData = data;
        loadWeatherData(weatherData);
        updatePageStyle()

      } catch (error) {
        console.error("Something went wrong", error)
      }
    };

    // LOAD LANDING PAGE DATA
    const loadWeatherData = () => {
      container.innerHTML += `
  <div class="landing-page-container">
    <div class="image-container">
      <img id="weather-icon" class="weather-icon" src="./assets/sunny.svg" alt="Weather Icon">
    </div>
    <div class=weather-info>
      <h1>${data.list[0].main.temp}</h1>
      <h2>City</h2>
      <h3>Weather</h3>
    </div>
    <h1>${weatherData.main.temp}° C</h1>
    <h2>${weatherData.name}</h2>
    <h3>${weatherData.weather[0].description}</h3>
    <div class="sunrise-sunset">
      <div class="sunrise-container">
        <p><b>Sunrise</b></p>
        <p>${getLocalHours(weatherData.sys?.sunrise)}</p>
      </div>
      <div class="sunset-container">
        <p>Sunset</p>
        <p>${getLocalHours(weatherData.sys?.sunset)}</p>
      </div>
    </div>
    <button class="icon-button">
      <img src="assets/button.svg" alt="Button Icon">
    </button>
  </div>`
    };

    document.addEventListener("DOMContentLoaded", fetchWeatherData);

    // LOAD MAIN PAGE
    const loadMainPage = (data: any) => {
      const date = new Date(data.dt * 1000);
      const day = date.getDay();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      container.innerHTML = `
  <div class="main-content-container">
        <div class="main-content-hero">
          <img>
          <h1>${data.main.temp}</h1>
          <h2>${data.name}</h2>
          <h3>${data.weather[0].main}</h3>
          <div class="main-sunrise-sunset">
            <div class="main-sunrise-container">
              <p>Sunrise</p>
              <p>${data.sys.sunrise}</p>
            </div>
            <div class="main-sunset-container">
              <p>Sunset</p>
              <p>${data.sys.sunset}</p>
            </div>
        </div>
      </div>
      <button class="main-content-btn">></button>
        <div class="main-temp-table">
          <div class="main-temp-table-row">
            <div class="main-temp-table-day">${days[day]}</div>
            <div class="main-temp-table-img"><img></div>
            <div class="main-temp-table-temp">26/12</div>
          </div>
        </div>
    </div>
  `;
    };

    // HAMBURGER MENU TOGGLE

    // Select the hamburger menu and navbar elements
    const menuIcon = document.getElementById("menu-icon")!;
    const navbar = document.querySelector(".navbar")!;

    // Toggle the navbar when the menu icon is clicked
    menuIcon.addEventListener("click", () => {
      menuIcon.classList.toggle("open");
      navbar.classList.toggle("open");
    });

  }

  fetchWeatherData()