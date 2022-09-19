//time - done
//*
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
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
/// forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = '<div class="row justify-content-center">';

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-md-2">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title day-forecast">${formatDay(
                  forecastDay.dt
                )}</h6>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt=""" class="forecast-icon">
                <p class="card-text degrees">${Math.round(
                  forecastDay.temp.min
                )}° <strong>${Math.round(forecastDay.temp.max)}°</strong></p>
              </div>
            </div>
          </div>
`;
    }
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

/// serch engine API - done

function showTemp(response) {
  let timeNow = document.querySelector("#currentTime");
  timeNow.innerHTML = formatDate(response.data.dt * 1000);

  document.querySelector("#displayCity").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let cityTemperature = Math.round(response.data.main.temp);
  let sky = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let bigTemperature = document.querySelector("#bigTemperature");
  bigTemperature.innerHTML = `${cityTemperature}`;

  let skyWeather = document.querySelector("#sky");
  skyWeather.innerHTML = `${sky}`;

  let humidityNow = document.querySelector("#humidity");
  humidityNow.innerHTML = `Humidity: ${humidity}%`;

  let windNow = document.querySelector("#wind");
  windNow.innerHTML = `Wind: ${wind} km/h`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].main`);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemp);
}
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}
function locationTemperature(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let locationApiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let locationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${locationApiKey}`;

  axios.get(locationURL).then(showTemp);
}
function showCurrentTemperature(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", showCurrentTemperature);

searchCity("Buenos Aires");
