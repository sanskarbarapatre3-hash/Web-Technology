let cityInput = document.getElementById("cityInput");
let searchButton = document.getElementById("searchButton");
let weatherResult = document.getElementById("weatherResult");

searchButton.addEventListener("click", function () {
  let city = cityInput.value.trim();

  if (city === "") {
    weatherResult.innerHTML = "<p class='error'>Please enter a city.</p>";
    return;
  }

  getWeather(city);
});

async function getWeather(city) {
  weatherResult.innerHTML = "<p>Loading weather data...</p>";

  try {
    // Step 1: Geocoding Request (City -> Coordinates)
    let geoUrl =
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
      encodeURIComponent(city) +
      "&count=1";

    let geoResponse = await fetch(geoUrl);
    let geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      weatherResult.innerHTML = "<p class='error'>City not found.</p>";
      return;
    }

    let location = geoData.results[0];
    let latitude = location.latitude;
    let longitude = location.longitude;

    // Step 2: Weather Request using Coordinates
    let weatherUrl =
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m";

    let weatherResponse = await fetch(weatherUrl);
    let weatherData = await weatherResponse.json();

    let current = weatherData.current;
    let temperature = current.temperature_2m;
    let humidity = current.relative_humidity_2m;
    let windSpeed = current.wind_speed_10m;
    let weatherCode = current.weather_code;

    // Step 3: DOM Rendering
    weatherResult.innerHTML = `
      <div class="result-box">
        <h2>${location.name}, ${location.country}</h2>
        <p><strong>Latitude / Longitude:</strong> ${latitude}, ${longitude}</p>
        <p><strong>Temperature:</strong> ${temperature} °C</p>
        <p><strong>Humidity:</strong> ${humidity} %</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
        <p><strong>Weather Code:</strong> ${weatherCode}</p>
      </div>
    `;
  } catch (error) {
    weatherResult.innerHTML = "<p class='error'>Unable to fetch weather data. Check your network connection.</p>";
    console.error("Network or API Error:", error);
  }
}