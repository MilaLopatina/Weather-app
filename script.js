function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuesday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class = "col-2">
  <div class = "weather-forecast-date">${formatDay(forecastDay.dt)}</div>
  <img src = "http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }.png"
  alt = ""
  width = "50" />
  <div class = "weather-forecast-temperatures">
  <span class = "weather-forecast-temperature-max"> ${Math.round(
    forecastDay.temp.max
  )} °</span>
  <span class = "weather-forecast-temperature-min"> ${Math.round(
    forecastDay.temp.min
  )} °</span>
  </div>
  </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#CityInput");
  let city = searchInput.value;
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(current);
}

let description = document.querySelector("#cloudy");
let temperatureElement = document.querySelector("#degree");

console.log(description);
function current(response) {
  let h1 = document.querySelector("h1");
  let dayElement = document.querySelector("#day");
  let searchInput = document.querySelector("#CityInput");
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#degree");
  let description = document.querySelector("#cloudy");
  let humidityElement = document.querySelector("#humidity");
  let visibilityElement = document.querySelector("#visibility");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  dayElement.innerHTML = formatDate(response.data.dt * 1000);
  cityElement.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  description.innerHTML = response.data.weather[0].main;
  h1.innerHTML = response.data.name;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  visibilityElement.innerHTML = `${response.data.visibility} km`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function showCurrent(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(current);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrent);
}
function searchCity(city) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(current);
}
let currentButton = document.querySelector("#currentLocation");
currentButton.addEventListener("click", getCurrentPosition);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let form = document.querySelector("#SearchForm");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("Kyiv");
