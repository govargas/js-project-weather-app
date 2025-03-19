// Selectors
const container = document.querySelector(".container")!;
const APIKey: string = "2259f103ffcc8ead06b941ec5efcf06e";
let city: string = "stockholm";
const weatherURL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

// Data reference
let weatherData = {
  coord: { lon: 18.0649, lat: 59.3326 },
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
  base: "stations",
  main: {
    temp: 281.33,
    feels_like: 278.02,
    temp_min: 281.01,
    temp_max: 281.62,
    pressure: 1020,
    humidity: 55,
    sea_level: 1020,
    grnd_level: 1015,
  },
  visibility: 10000,
  wind: { speed: 6.17, deg: 290 },
  clouds: { all: 0 },
  dt: 1742292721,
  sys: {
    type: 1,
    id: 1788,
    country: "SE",
    sunrise: 1742273722,
    sunset: 1742316975,
  },
  timezone: 3600,
  id: 2673730,
  name: "Stockholm",
  cod: 200,
};

// LOAD LANDING PAGE DATA
container.innerHTML = `
  <div class="landing-page-container">
    <div class="image-container">
      <img src="" alt="">
    </div>
    <h1>${weatherData.main.temp}</h1>
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

// LOAD MAIN PAGE
const loadMainPage = () => {
  const date = new Date(weatherData.dt * 1000);
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
          <h1>${weatherData.main.temp}</h1>
          <h2>${weatherData.name}</h2>
          <h3>${weatherData.weather[0].main}</h3>
          <div class="main-sunrise-sunset">
            <div class="main-sunrise-container">
              <p>Sunrise</p>
              <p>${weatherData.sys.sunrise}</p>
            </div>
            <div class="main-sunset-container">
              <p>Sunset</p>
              <p>${weatherData.sys.sunset}</p>
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
