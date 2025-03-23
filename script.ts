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
let oneWeatherURL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
let weatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;

// Unix to Time of Day Function (local formatting, if needed)
const getLocalHours = (unixTime: number) => {
  return new Date(unixTime * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const getCityTime = (unixTime: number, timezoneOffset: number): string => {
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
const oneDayWeatherFetch = async () => {
  try {
    const response = await fetch(oneWeatherURL);
    const data = await response.json();
    console.log(data);
    weatherData = data;
    loadWeatherData(weatherData);
    // fetchWeatherData(); //REMOVE THIS WHEN FINISHED
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

  const timeImages = document.querySelectorAll(".weather-icon") as NodeListOf<HTMLImageElement>;
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

  const timeImage = document.querySelector(".weather-icon") as HTMLImageElement;
  timeImage.src = isDaytime ? "./assets/sunny-w.svg" : "./assets/night.svg";
  timeImage.alt = isDaytime ? "Sun Icon" : "Moon Icon";
};

// Toggle Pages
let isLandingPage = true; // Track which page is currently displayed
const toggleWeatherView = async () => {
  container.innerHTML = "";
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
  console.log("weather data:", weatherData);
  loadMainPage(filteredWeatherData);
  updateMainPageStyle();
};

// LOAD MAIN PAGE - CHRISTINA
const weatherIcons: Record<string, string> = {
  "clear sky": "./assets/sunny-g.svg",
  "few clouds": "./assets/partly-cloudy.svg",
  "scattered clouds": "./assets/overcast.svg",
  "broken clouds": "./assets/partly-cloudy.svg",
  "shower rain": "./assets/overcast.svg",
  "overcast clouds": "./assets/overcast.svg",
  "rain": "./assets/overcast.svg",
  "thunderstorm": "./assets/overcast.svg",
  "snow": "./assets/overcast.svg",
  "mist": "./assets/overcast.svg"
};

const loadMainPage = (data: any) => {
  const sunriseTime = getCityTime(data.city.sunrise, data.city.timezone);
  const sunsetTime = getCityTime(data.city.sunset, data.city.timezone);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const tempTableRows = data.list
    .map((dayData: any) => {
      const dayDate = new Date(dayData.dt * 1000);
      const dayName = days[dayDate.getDay()];
      const minTemp = Math.round(dayData.main.temp_min);
      const maxTemp = Math.round(dayData.main.temp_max);
      let weatherIcon: string = "";
      const weatherDescription = dayData.weather[0].description.toLowerCase();
      weatherIcon = weatherIcons[weatherDescription] || "./assets/overcast.svg";
      console.log("weather icon:", weatherIcon);
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
const menuIcon = document.getElementById("menu-icon")!;
const navbar = document.querySelector(".navbar")!;
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("open");
  navbar.classList.toggle("open");
});
oneDayWeatherFetch();
// fetchWeatherData();
// Navbar click event listener for updating weather based on selected city
const navbarList = document.querySelector(".navbar ul");
if (navbarList) {
  navbarList.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === "li") {
      city = target.innerText.trim();
      oneWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
      weatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
      container.innerHTML = "";
      navbar.classList.remove("open");
      await oneDayWeatherFetch();
    }
  });
}