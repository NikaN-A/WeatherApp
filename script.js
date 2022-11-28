//part number1
let now = new Date();
let currentTime = document.querySelector("#currenttime");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let day = days[now.getDay()];

currentTime.innerHTML = `${day}, ${hours}:${min}`;

function cityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}
let form = document.querySelector("#searchform");
form.addEventListener("submit", cityName);
//part number2

function showWeather(response) {
  document.querySelector("#bigTemp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let h1 = document.querySelector("h1");
  let iconElement = document.querySelector("#icon");
  h1.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  function movetofahrenheit(event) {
    event.preventDefault();
    let temp = document.querySelector("#bigTemp");
    temp.innerHTML = Math.round(response.data.main.temp * 1.8) + 32;
  }
  let fahrenheit = document.querySelector("#°f");
  fahrenheit.addEventListener("click", movetofahrenheit);

  function movetocelcius(event) {
    event.preventDefault();
    let temp = document.querySelector("#bigTemp");
    temp.innerHTML = Math.round(response.data.main.temp);
  }
  let celcius = document.querySelector("#°c");
  celcius.addEventListener("click", movetocelcius);
}
//part number3
function showPosition(position) {
  let lat = position.coords.latitude;
  let log = position.coords.longitude;
  let apiKey = "236fa1446f45cbfd447cb59b9ec5d8a4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationB = document.querySelector("#cityButton");
currentLocationB.addEventListener("click", currentLocation);

function searchCity(city) {
  let apiKey = "236fa1446f45cbfd447cb59b9ec5d8a4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function Submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}
let searchForm = document.querySelector("#searchform");
searchForm.addEventListener("submit", Submit);
