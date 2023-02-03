let dayIn = document.querySelector("#day");
let currenTime = new Date();
let hours = currenTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currenTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayInput = currenTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thuesday",
  "Friday",
  "Saturday",
];
dayIn.innerHTML = `${days[dayInput]} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#CityInput");
  let city = searchInput.value;
  let apiKey = "b13a1f89322c24461d168850e0f615cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(current);
}
let form = document.querySelector("#SearchForm");
form.addEventListener("submit", search);

let description = document.querySelector("#cloudy");
let temperatureElement = document.querySelector("#degree");

console.log(description);
function current(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector("#cloudy");
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].main;
  h1.innerHTML = response.data.name;
}
function showCurrent(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b13a1f89322c24461d168850e0f615cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(current);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrent);
}
function searchCity(city) {
  let apiKey = "b13a1f89322c24461d168850e0f615cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(current);
}
let currentButton = document.querySelector("#currentLocation");
currentButton.addEventListener("click", getCurrentPosition);
searchCity("Kyiv");
