//временная функция last update
let now = new Date();
let currentTime = document.querySelector("#date");
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
//временная функция last update закончилась тут
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
//начинается функция дней для погоды внизу проги
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
  <div class="col-2">      
    <div class="card-group">
                <div class="maincard">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                      <img src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png" alt="overcast clouds" class="emoji" id="icon" width="40px">
                       <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}° </span>
                </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//заканчиваеися функция дней для погоды внизу проги
function getForecast(coordinates) {
  let apiKey = "e6c2364656962bdcb16bc352fc42569a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

//функция покажи погоду
function showWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#city-input").innerHTML = response.data.name;
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
  //функция градусов
  function movetofahrenheit(event) {
    event.preventDefault();
    let temp = document.querySelector("#temperature");
    temp.innerHTML = Math.round(response.data.main.temp * 1.8) + 32;
  }
  let fahrenheit = document.querySelector("#°f");
  fahrenheit.addEventListener("click", movetofahrenheit);

  function movetocelcius(event) {
    event.preventDefault();
    let temp = document.querySelector("#temperature");
    temp.innerHTML = Math.round(response.data.main.temp);
  }
  let celcius = document.querySelector("#°c");
  celcius.addEventListener("click", movetocelcius);

  getForecast(response.data.coord);
}
//функция покажи погоду закончилась и функция градусов
//функция поиска и чтобы показать это в h1
function cityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}
let form = document.querySelector("#searchform");
form.addEventListener("submit", cityName);

function searchCity(city) {
  let apiKey = "236fa1446f45cbfd447cb59b9ec5d8a4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function Submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#searchform");
searchForm.addEventListener("submit", Submit);
//функция поиска и чтобы показать это в h1 закончилась

//функция геолокации для current city
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

//функция геолокации для current city закончилась
searchCity("Kyiv");
