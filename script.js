const apiKey = "ad2b3eec820917de13a93ea8521a5e2a";

// Get DOM elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

// Function to fetch weather data
function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            cityName.textContent = data.name;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            description.textContent = `Description: ${data.weather[0].description}`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;
        })
        .catch(err => {
            cityName.textContent = "Error";
            temperature.textContent = "--°C";
            description.textContent = "--";
            humidity.textContent = "--%";
            windSpeed.textContent = "-- km/h";
            alert(err.message);
        });
}

// Event listener for button click
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }
    getWeather(city);
});

// Optional: fetch weather on pressing Enter key
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
