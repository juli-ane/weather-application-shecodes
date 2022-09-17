/// serch engine API - done

function showTemp(response) {
  console.log(response.data);
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

  iconElement.setAttribute(`alt, response.data.weather[0].main`);
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

searchCity("Santiago");

// ---- Celsius Fah convertion

function showBigTempCel(event) {
  event.preventDefault();
  tempfar.classList.remove("unitFahrenheit");
  tempcel.classList.add("unitCelsius");
  let bigNumber = document.querySelector("#bigTemperature");
  bigNumber.innerHTML = Math.round(celsiusTemperature);
}

function showBigTempFah(event) {
  event.preventDefault();
  tempcel.classList.remove("unitCelsius");
  tempfar.classList.add("unitFahrenheit");
  let bigNumber = document.querySelector("#bigTemperature");
  bigNumber.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let celsiusTemperature = null;

let tempcel = document.querySelector("#celsius");
tempcel.addEventListener("click", showBigTempCel);

let tempfar = document.querySelector("#fahrenheit");
tempfar.addEventListener("click", showBigTempFah);

//time - done

function formatDate() {
  let now = new Date();

  now.getDay();
  now.getHours();
  now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let timeNow = document.querySelector("#currentTime");
timeNow.innerHTML = formatDate();
