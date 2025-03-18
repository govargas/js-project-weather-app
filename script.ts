// Selectors
const container = document.querySelector(".container")!;
const APIKey: string = "2259f103ffcc8ead06b941ec5efcf06e";
let city: string = "stockholm";
let weatherData;
const weatherURL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

const fetchWeatherData = async (): Promise<any> => {
  const response = await fetch(weatherURL);
  const data = await response.json();
  console.log(data);
  weatherData = data;
  loadWeatherData(weatherData);
};

fetchWeatherData();

// LOAD LANDING PAGE DATA
const loadWeatherData = (data: any) => {
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

// {"coord":{"lon":18.0649,"lat":59.3326},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":9.21,"feels_like":8.08,"temp_min":8.95,"temp_max":9.58,"pressure":1020,"humidity":56,"sea_level":1020,"grnd_level":1015},"visibility":10000,"wind":{"speed":2.24,"deg":293,"gust":4.02},"clouds":{"all":47},"dt":1742293894,"sys":{"type":2,"id":2012100,"country":"SE","sunrise":1742273722,"sunset":1742316975},"timezone":3600,"id":2673730,"name":"Stockholm","cod":200}

// document.addEventListener("DOMContentLoaded", fetchWeatherData);
