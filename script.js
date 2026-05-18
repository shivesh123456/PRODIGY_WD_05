const searchBtn = document.getElementById('searchBtn');
const geoBtn = document.getElementById('geoBtn');
const locationInput = document.getElementById('locationInput');
const weatherCard = document.getElementById('weatherCard');
const locationName = document.getElementById('locationName');
const weatherDescription = document.getElementById('weatherDescription');
const temperature = document.getElementById('temperature');
const apparentTemp = document.getElementById('apparentTemp');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const latitudeEl = document.getElementById('latitude');
const longitudeEl = document.getElementById('longitude');
const observationTime = document.getElementById('observationTime');
const weatherIcon = document.getElementById('weatherIcon');
const forecastList = document.getElementById('forecastList');
const statusMessage = document.getElementById('statusMessage');

const weatherCodes = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? '#991b1b' : '#0369a1';
}

async function getCoordinatesFromLocation(query) {
  const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Location lookup failed');
  }
  const data = await response.json();
  const result = data.results && data.results[0];
  if (!result) {
    throw new Error('Location not found');
  }
  return {
    latitude: result.latitude,
    longitude: result.longitude,
    name: `${result.name}${result.admin1 ? ', ' + result.admin1 : ''}${result.country ? ', ' + result.country : ''}`,
  };
}

async function getWeather(lat, lon) {
  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,pressure_msl&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Weather request failed');
  }
  return response.json();
}

function getWeatherDescription(code) {
  return weatherCodes[code] || 'Unknown conditions';
}

function getWeatherIcon(code) {
  if (code === 0) return '☀️';
  if ([1, 2].includes(code)) return '🌤️';
  if (code === 3) return '☁️';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51, 53, 55].includes(code)) return '🌦️';
  if ([61, 63, 65, 80, 81, 82].includes(code)) return '🌧️';
  if ([56, 57, 66, 67].includes(code)) return '🌧️❄️';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
  if ([95, 96, 99].includes(code)) return '⛈️';
  return '🌈';
}

function renderForecast(weatherData) {
  const daily = weatherData.daily;
  if (!daily || !daily.time) {
    forecastList.innerHTML = '<p>No forecast available.</p>';
    return;
  }

  forecastList.innerHTML = daily.time.slice(0, 5).map((day, index) => {
    const maxTemp = Math.round(daily.temperature_2m_max[index]);
    const minTemp = Math.round(daily.temperature_2m_min[index]);
    const description = getWeatherDescription(daily.weathercode[index]);
    const date = new Date(day).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    return `
      <article class="forecast-card">
        <span>${date}</span>
        <strong>${description}</strong>
        <p>High: ${maxTemp}°C</p>
        <p>Low: ${minTemp}°C</p>
      </article>
    `;
  }).join('');
}

async function loadWeatherByCoordinates(lat, lon, label) {
  setStatus('Fetching weather data...');
  try {
    const weatherData = await getWeather(lat, lon);
    const current = weatherData.current_weather;
    if (!current) {
      throw new Error('Weather data unavailable');
    }

    locationName.textContent = label;
    weatherIcon.textContent = getWeatherIcon(current.weathercode);
    weatherDescription.textContent = getWeatherDescription(current.weathercode);
    temperature.textContent = `${Math.round(current.temperature)}°C`;
    apparentTemp.textContent = `${Math.round(current.temperature)}°C`;
    windSpeed.textContent = `${current.windspeed} km/h`;
    const timeIndex = weatherData.hourly.time.findIndex((item) => item === current.time);
    const humidityValue = timeIndex >= 0 ? weatherData.hourly.relativehumidity_2m[timeIndex] : weatherData.hourly.relativehumidity_2m[0];
    const pressureValue = timeIndex >= 0 ? weatherData.hourly.pressure_msl[timeIndex] : weatherData.hourly.pressure_msl[0];
    humidity.textContent = `${humidityValue ?? 'N/A'}%`;
    pressure.textContent = `${pressureValue ?? 'N/A'} hPa`;
    latitudeEl.textContent = lat.toFixed(3);
    longitudeEl.textContent = lon.toFixed(3);
    observationTime.textContent = current.time;
    weatherCard.classList.remove('hidden');
    renderForecast(weatherData);
    setStatus('Weather data loaded successfully.');
  } catch (error) {
    weatherCard.classList.add('hidden');
    setStatus(error.message, true);
  }
}

searchBtn.addEventListener('click', async () => {
  const query = locationInput.value.trim();
  if (!query) {
    setStatus('Please enter a location to search.', true);
    return;
  }
  setStatus('Finding location...');
  try {
    const { latitude, longitude, name } = await getCoordinatesFromLocation(query);
    await loadWeatherByCoordinates(latitude, longitude, name);
  } catch (error) {
    weatherCard.classList.add('hidden');
    setStatus(error.message, true);
  }
});

geoBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    setStatus('Geolocation is not supported by this browser.', true);
    return;
  }

  setStatus('Requesting your location...');
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      await loadWeatherByCoordinates(latitude, longitude, 'Your current location');
    },
    (error) => {
      setStatus(`Unable to get location: ${error.message}`, true);
    },
    { enableHighAccuracy: true, timeout: 15000 }
  );
});

window.addEventListener('DOMContentLoaded', () => {
  setStatus('Ready. You can search a location or use your current location.');
});
