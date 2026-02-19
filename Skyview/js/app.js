/* ================================================
   SkyView Weather App — JavaScript
   Fetches weather data and controls animations
   
   Uses: OpenWeatherMap API (free tier)
   API Key is included for demo purposes.
================================================ */

// ====== API CONFIGURATION ======
const API_KEY = "b6907d289e10d714a6e88b30761fae22"; // Demo key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// We use a free proxy-friendly approach: wttr.in (no API key needed!)
const WTTR_URL = "https://wttr.in";

// ====== DOM ELEMENTS ======
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const welcomeScreen = document.getElementById("welcome-screen");
const loadingScreen = document.getElementById("loading-screen");
const errorScreen = document.getElementById("error-screen");
const weatherDisplay = document.getElementById("weather-display");
const errorMessage = document.getElementById("error-message");

// Weather data elements
const cityNameEl = document.getElementById("cityName");
const dateTimeEl = document.getElementById("dateTime");
const weatherIconBig = document.getElementById("weatherIconBig");
const tempValueEl = document.getElementById("tempValue");
const weatherDescEl = document.getElementById("weatherDesc");
const feelsLikeEl = document.getElementById("feelsLike");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const visibilityEl = document.getElementById("visibility");
const pressureEl = document.getElementById("pressure");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");


// ====== SHOW / HIDE SCREENS ======
function showScreen(screenName) {
    // Hide all screens
    welcomeScreen.classList.add("hidden");
    loadingScreen.classList.add("hidden");
    errorScreen.classList.add("hidden");
    weatherDisplay.classList.add("hidden");

    // Show the requested screen
    switch (screenName) {
        case "welcome":
            welcomeScreen.classList.remove("hidden");
            break;
        case "loading":
            loadingScreen.classList.remove("hidden");
            break;
        case "error":
            errorScreen.classList.remove("hidden");
            break;
        case "weather":
            weatherDisplay.classList.remove("hidden");
            break;
    }
}


// ====== FETCH WEATHER DATA ======
async function fetchWeather(query) {
    showScreen("loading");

    try {
        // Use wttr.in API — free, no API key needed, CORS friendly with format=j1
        const url = `${WTTR_URL}/${encodeURIComponent(query)}?format=j1`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Check if data is valid
        if (!data.current_condition || data.current_condition.length === 0) {
            throw new Error("No weather data available for this location.");
        }

        displayWeather(data, query);
    } catch (error) {
        console.error("Error fetching weather:", error);
        errorMessage.textContent = error.message || "Could not fetch weather data. Please try again.";
        showScreen("error");
    }
}


// ====== DISPLAY WEATHER DATA ======
function displayWeather(data, query) {
    const current = data.current_condition[0];
    const area = data.nearest_area ? data.nearest_area[0] : null;
    const astronomy = data.weather && data.weather[0] ? data.weather[0].astronomy[0] : null;

    // City name
    let cityDisplay = query;
    if (area) {
        const areaName = area.areaName[0].value;
        const region = area.region[0].value;
        const country = area.country[0].value;
        cityDisplay = areaName;
        if (region && region !== areaName) {
            cityDisplay += `, ${region}`;
        }
        cityDisplay += `, ${country}`;
    }
    cityNameEl.innerHTML = `<i class="fas fa-location-dot"></i> ${cityDisplay}`;

    // Date & Time
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    dateTimeEl.textContent = now.toLocaleDateString("en-US", options) + " · " + now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    // Temperature
    const tempC = current.temp_C;
    tempValueEl.textContent = tempC;

    // Weather description
    const desc = current.weatherDesc[0].value;
    weatherDescEl.textContent = desc;

    // Feels like
    feelsLikeEl.textContent = `Feels like ${current.FeelsLikeC}°C`;

    // Weather icon
    const weatherCode = parseInt(current.weatherCode);
    const iconClass = getWeatherIcon(weatherCode, desc);
    weatherIconBig.innerHTML = `<i class="${iconClass}"></i>`;

    // Details
    humidityEl.textContent = `${current.humidity}%`;
    windEl.textContent = `${current.windspeedKmph} km/h`;
    visibilityEl.textContent = `${current.visibility} km`;
    pressureEl.textContent = `${current.pressure} hPa`;

    // Sunrise & Sunset
    if (astronomy) {
        sunriseEl.textContent = astronomy.sunrise;
        sunsetEl.textContent = astronomy.sunset;
    } else {
        sunriseEl.textContent = "—";
        sunsetEl.textContent = "—";
    }

    // Set background animation & theme
    setWeatherAnimation(weatherCode, desc);

    showScreen("weather");
}


// ====== WEATHER ICON MAPPING ======
function getWeatherIcon(code, desc) {
    const d = desc.toLowerCase();

    if (d.includes("thunder") || d.includes("lightning")) return "fas fa-bolt";
    if (d.includes("snow") || d.includes("blizzard") || d.includes("sleet")) return "fas fa-snowflake";
    if (d.includes("rain") || d.includes("drizzle") || d.includes("shower")) return "fas fa-cloud-rain";
    if (d.includes("fog") || d.includes("mist") || d.includes("haze")) return "fas fa-smog";
    if (d.includes("overcast")) return "fas fa-cloud";
    if (d.includes("cloud") || d.includes("partly")) return "fas fa-cloud-sun";
    if (d.includes("clear") || d.includes("sunny")) return "fas fa-sun";

    // Fallback by weather code ranges
    if (code >= 200 && code < 300) return "fas fa-bolt";
    if (code >= 300 && code < 400) return "fas fa-cloud-rain";
    if (code >= 500 && code < 600) return "fas fa-cloud-showers-heavy";
    if (code >= 600 && code < 700) return "fas fa-snowflake";
    if (code >= 700 && code < 800) return "fas fa-smog";
    if (code === 800) return "fas fa-sun";
    if (code > 800) return "fas fa-cloud-sun";

    return "fas fa-cloud-sun";
}


// ====== WEATHER ANIMATIONS ======
function setWeatherAnimation(code, desc) {
    const d = desc.toLowerCase();

    // Hide all animations first
    document.querySelectorAll(".weather-anim").forEach(el => el.classList.add("hidden"));

    // Remove all theme classes
    document.body.className = "";

    // Check if it's nighttime (rough estimate)
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 19;

    if (d.includes("thunder") || d.includes("lightning")) {
        showAnimation("thunder");
        document.body.classList.add("theme-thunder");
        generateRainDrops("thunder-rain-container", 80);
    } else if (d.includes("snow") || d.includes("blizzard") || d.includes("sleet")) {
        showAnimation("snow");
        document.body.classList.add("theme-snow");
        generateSnowflakes();
    } else if (d.includes("rain") || d.includes("drizzle") || d.includes("shower")) {
        showAnimation("rain");
        document.body.classList.add("theme-rain");
        generateRainDrops("rain-container", 100);
    } else if (d.includes("fog") || d.includes("mist") || d.includes("haze")) {
        showAnimation("mist");
        document.body.classList.add("theme-mist");
    } else if (d.includes("overcast") || d.includes("cloud")) {
        showAnimation("cloudy");
        if (isNight) {
            document.body.classList.add("theme-night");
        } else {
            document.body.classList.add("theme-cloudy");
        }
    } else if (d.includes("clear") || d.includes("sunny")) {
        if (isNight) {
            showAnimation("night");
            document.body.classList.add("theme-night");
            generateStars();
        } else {
            showAnimation("sunny");
            document.body.classList.add("theme-sunny");
        }
    } else {
        // Default
        if (isNight) {
            showAnimation("night");
            document.body.classList.add("theme-night");
            generateStars();
        } else {
            showAnimation("cloudy");
            document.body.classList.add("theme-cloudy");
        }
    }
}

function showAnimation(name) {
    const el = document.getElementById(`anim-${name}`);
    if (el) {
        el.classList.remove("hidden");
    }
}

// ====== GENERATE RAIN DROPS ======
function generateRainDrops(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ""; // Clear old drops

    for (let i = 0; i < count; i++) {
        const drop = document.createElement("div");
        drop.classList.add("raindrop");

        // Random position and timing
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 0.5 + Math.random() * 0.5;
        const height = 15 + Math.random() * 25;

        drop.style.left = left + "%";
        drop.style.height = height + "px";
        drop.style.animationDelay = delay + "s";
        drop.style.animationDuration = duration + "s";

        container.appendChild(drop);
    }
}

// ====== GENERATE SNOWFLAKES ======
function generateSnowflakes() {
    const container = document.getElementById("snow-container");
    if (!container) return;
    container.innerHTML = "";

    const flakeChars = ["❄", "❅", "❆", "•"];

    for (let i = 0; i < 60; i++) {
        const flake = document.createElement("div");
        flake.classList.add("snowflake");
        flake.textContent = flakeChars[Math.floor(Math.random() * flakeChars.length)];

        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 4 + Math.random() * 6;
        const size = 8 + Math.random() * 16;

        flake.style.left = left + "%";
        flake.style.fontSize = size + "px";
        flake.style.animationDelay = delay + "s";
        flake.style.animationDuration = duration + "s";

        container.appendChild(flake);
    }
}

// ====== GENERATE STARS ======
function generateStars() {
    const container = document.getElementById("stars-container");
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < 80; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        const left = Math.random() * 100;
        const top = Math.random() * 80;
        const delay = Math.random() * 4;
        const duration = 2 + Math.random() * 3;
        const size = 1 + Math.random() * 3;

        star.style.left = left + "%";
        star.style.top = top + "%";
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.animationDelay = delay + "s";
        star.style.animationDuration = duration + "s";

        container.appendChild(star);
    }
}


// ====== GET USER'S LOCATION ======
function getUserLocation() {
    if (!navigator.geolocation) {
        errorMessage.textContent = "Geolocation is not supported by your browser.";
        showScreen("error");
        return;
    }

    showScreen("loading");

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            // wttr.in accepts lat,lon format
            fetchWeather(`${latitude},${longitude}`);
        },
        (error) => {
            let msg = "Unable to get your location. ";
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    msg += "Please allow location access.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    msg += "Location info unavailable.";
                    break;
                case error.TIMEOUT:
                    msg += "Request timed out.";
                    break;
            }
            errorMessage.textContent = msg;
            showScreen("error");
        }
    );
}


// ====== EVENT LISTENERS ======

// Search button click
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchWeather(query);
    }
});

// Enter key press in search
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
            fetchWeather(query);
        }
    }
});

// Location button click
locationBtn.addEventListener("click", () => {
    getUserLocation();
});

// Quick tip clicks — make them functional
document.querySelectorAll(".tip").forEach(tip => {
    tip.style.cursor = "pointer";
    tip.addEventListener("click", () => {
        const strong = tip.querySelector("strong");
        if (strong) {
            const text = strong.textContent;
            if (text === "current location") {
                getUserLocation();
            } else {
                searchInput.value = text;
                fetchWeather(text);
            }
        }
    });
});


// ====== INITIALIZE ======
showScreen("welcome");
