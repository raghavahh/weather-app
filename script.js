const searchBtn = document.querySelector("#search-btn");
const input = document.querySelector("#city-input");
const cityDisplay = document.querySelector("#city-name");
const tempDisplay = document.querySelector("#temperature");
const humidityDisplay = document.querySelector("#humidity");
const windDisplay = document.querySelector("#wind-speed");

searchBtn.addEventListener("click", () => {
    let city = input.value.trim();

    if (!city) {
        cityDisplay.textContent = "⚠️ Enter a city name!";
        tempDisplay.textContent = "";
        humidityDisplay.textContent = "";
        windDisplay.textContent = "";
        return;
    }

    const url = `https://wttr.in/${city}?format=j1`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.current_condition) {
                cityDisplay.textContent = "❌ City not found!";
                tempDisplay.textContent = "";
                humidityDisplay.textContent = "";
                windDisplay.textContent = "";
                return;
            }

            const current = data.current_condition[0];
            cityDisplay.textContent = city;
            tempDisplay.textContent = `🌡️ Temp: ${current.temp_C}°C (Feels like ${current.FeelsLikeC}°C)`;
            humidityDisplay.textContent = `💧 Humidity: ${current.humidity}%`;
            windDisplay.textContent = `💨 Wind Speed: ${current.windspeedKmph} km/h`;
        })
        .catch(err => {
            cityDisplay.textContent = "⚠️ Error fetching data!";
            tempDisplay.textContent = "";
            humidityDisplay.textContent = "";
            windDisplay.textContent = "";
            console.error(err);
        });
});
