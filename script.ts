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

/*// One Day - Weather Data reference
// { "coord": { "lon": 18.0649, "lat": 59.3326 }, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "base": "stations", "main": { "temp": 9.21, "feels_like": 8.08, "temp_min": 8.95, "temp_max": 9.58, "pressure": 1020, "humidity": 56, "sea_level": 1020, "grnd_level": 1015 }, "visibility": 10000, "wind": { "speed": 2.24, "deg": 293, "gust": 4.02 }, "clouds": { "all": 47 }, "dt": 1742293894, "sys": { "type": 2, "id": 2012100, "country": "SE", "sunrise": 1742273722, "sunset": 1742316975 }, "timezone": 3600, "id": 2673730, "name": "Stockholm", "cod": 200 }
*/

// SELECTORS
const APIKey: string = "31ef2747a161bbc841cc049ca29ffc97";
const container = document.querySelector(".container")! as HTMLDivElement;
let city: string = "stockholm";
let weatherData: any;
const oneWeatherURL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
const weatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;

// Unix to Time of Day Function
const getLocalHours = (unixTime: number) => {
  return new Date(unixTime * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
// Style Page by Time of Day (ToD)
const updatePageStyle = () => {
  const currentHour: string = getLocalHours(weatherData.dt);
  const sunriseHour: string = getLocalHours(weatherData.sys.sunrise);
  const sunsetHour: string = getLocalHours(weatherData.sys.sunset);

  const isDaytime: boolean =
    currentHour >= sunriseHour && currentHour < sunsetHour;

  document.body.classList.remove("daytime", "nighttime");
  document.body.classList.add(isDaytime ? "daytime" : "nighttime");
};

// Fetch One Day API - Bianka
const oneDayWeatherFetch = async () => {
  try {
    const response = await fetch(oneWeatherURL);
    const data = await response.json();
    console.log(data);

    weatherData = data;
    loadWeatherData(weatherData);
    fetchWeatherData(); //REMOVE THIS WHEN FINISHED
    updatePageStyle();
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

// LOAD LANDING PAGE DATA - Juan/Bianka/Christina
const loadWeatherData = (weatherData?: any) => {
  container.innerHTML += `
  <div class="landing-page-container">
    <div class="image-container">
      <img id="weather-icon" class="weather-icon" src="./assets/sunny.svg" alt="Weather Icon">
    </div>
    <div class="weather-info">  
      <h1 class="big-temp">${Math.round(
        weatherData.main.temp
      )}<sup class="big-temp-degrees">°C</sup></h1>
      <h2>${weatherData.name}</h2>
      <h3>${weatherData.weather[0].description}</h3>
    </div>
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
    <button class="icon-button" type=button>
      <img src="assets/button.svg" alt="Button Icon">
    </button>
  </div>`;
};

// Toggle Pages
let isLandingPage = true; // Track which page is currently displayed

const toggleWeatherView = async () => {
  if (isLandingPage) {
    await fetchWeatherData(); // Load Main Page
  } else {
    await oneDayWeatherFetch(); // Load Landing Page
  }
  isLandingPage = !isLandingPage; // Toggle state
};

// Button Event Listener
document.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest(".icon-button");
  if (button) {
    toggleWeatherView();
  }
});

// FETCH WEATHER - CHRISTINA

const fetchWeatherData = async (): Promise<void> => {
  const response = await fetch(weatherForecastURL);
  const data = await response.json();

  const uniqueDays = new Map();

  data.list.forEach((entry: any) => {
    const date = entry.dt_txt.split(" ")[0];
    if (!uniqueDays.has(date) || entry.dt_txt.includes("12:00:00")) {
      uniqueDays.set(date, entry);
    }
  });

  const filteredForecast = Array.from(uniqueDays.values()).slice(0, 5);

  const filteredWeatherData = { ...data, list: filteredForecast };

  weatherData = data;
  console.log(weatherData);

  // loadWeatherData(weatherData);
  loadMainPage(filteredWeatherData);
};

// LOAD MAIN PAGE - CHRISTINA
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
      const minTemp = Math.round(dayData.main.temp_min);
      const maxTemp = Math.round(dayData.main.temp_max);
      // const weatherIcon = dayData.weather[0].icon;
      let weatherIcon: string = "";
      if (dayData.weather[0].description === "clear sky") {
        weatherIcon = "./assets/sunny.svg";
      } else if (dayData.weather[0].description === "few clouds") {
        weatherIcon = "./assets/partly-cloudy.svg";
      } else if (dayData.weather[0].description === "scattered clouds") {
        weatherIcon = "./assets/overcast.svg";
      }

      console.log("Day name:", dayName);

      return `
    <div class="main-temp-table-row">
        <div class="main-temp-table-day">${dayName}</div>
        <div><img class="main-temp-table-img" src="${weatherIcon}" alt="${dayData.weather[0].description}"></div>
        <div class="main-temp-table-temp">${minTemp} / ${maxTemp}°C</div>
      </div>
    `;
    })
    .join("");

  container.innerHTML = `
  <div class="main-content-container">
        <div class="main-content-hero">
          <div class="image-container">
      <img id="weather-icon" class="weather-icon" src="./assets/sunny.svg" alt="Weather Icon">
      </div>
          <div class="weather-info"> 
          <h1 class="big-temp">${Math.round(
            data.list[0].main.temp
          )}<sup class="big-temp-degrees">°C</sup></h1>
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

// Select the hamburger menu and navbar elements
const menuIcon = document.getElementById("menu-icon")!;
const navbar = document.querySelector(".navbar")!;

// Toggle the navbar when the menu icon is clicked
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("open");
  navbar.classList.toggle("open");
});

oneDayWeatherFetch();
// fetchWeatherData();
