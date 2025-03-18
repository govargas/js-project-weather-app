// Selectors
var container = document.querySelector(".container");
var APIKey = "2259f103ffcc8ead06b941ec5efcf06e";
var city = "stockholm";
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&units=metric&appid=").concat(APIKey);
// Data reference
var weatherData = {
    "coord": { "lon": 18.0649, "lat": 59.3326 },
    "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "base": "stations",
    "main": { "temp": 281.33,
        "feels_like": 278.02,
        "temp_min": 281.01,
        "temp_max": 281.62,
        "pressure": 1020,
        "humidity": 55,
        "sea_level": 1020,
        "grnd_level": 1015 },
    "visibility": 10000,
    "wind": { "speed": 6.17, "deg": 290 },
    "clouds": { "all": 0 },
    "dt": 1742292721,
    "sys": { "type": 1, "id": 1788, "country": "SE",
        "sunrise": 1742273722,
        "sunset": 1742316975 },
    "timezone": 3600,
    "id": 2673730,
    "name": "Stockholm",
    "cod": 200
};
// LOAD LANDING PAGE DATA
container.innerHTML = "\n  <div class=\"landing-page-container\">\n    <div class=\"image-container\">\n      <img src=\"\" alt=\"\">\n    </div>\n    <h1>".concat(weatherData.main.temp, "</h1>\n    <h2>City</h2>\n    <h3>Weather</h3>\n    <div class=\"sunrise-sunset\">\n      <div class=\"sunrise-container\">\n        <p>Sunrise</p>\n        <p>Time</p>\n      </div>\n      <div class=\"sunset-container\">\n        <p>Sunset</p>\n        <p>Time</p>\n      </div>\n    </div>\n    <button>&#x3e;</button>\n  </div>");
