function getweather() {
    const apiKey = '88dcd4ea9f5473e0adcfebb6271230df'; 
    const city = document.getElementById('city').value;
    if (!city) {
        alert("Please enter a city");
        return;
    }
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        }).catch(error => {
            console.log("Error fetching current weather data:", error);
            alert("Error fetching current weather data. Please try again");
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayhourlyforecast(data.list);
        }).catch(error => {
            console.log("Error fetching hourly data:", error);
            alert("Error fetching hourly forecast data. Please try again");
        });
}

function displayWeather(data) {
    const tempWeather = document.getElementById("temp");
    const weatherInfo = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");
    const hourly = document.getElementById("hourly");
    const additionalInfo = document.getElementById("additional-info");

    tempWeather.innerHTML = "";
    weatherInfo.innerHTML = "";
    hourly.innerHTML = "";
    additionalInfo.innerHTML = "";

    if (data.cod === "404") {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperatureWeather = Math.round(data.main.temp - 273.15); 
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const windSpeed = data.wind.speed; 
        const cloudiness = data.clouds.all; 

        const tempTextWeather = `<p>${temperatureWeather}°C</p>`;
        const weatherText = `<p>${cityName}</p><p>${description}</p>`;
        tempWeather.innerHTML = tempTextWeather;
        weatherInfo.innerHTML = weatherText;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        weatherIcon.style.display = 'block';


        additionalInfo.innerHTML = `<span class="wind-speed">Wind Speed: ${windSpeed} km/h</span><span class="cloudiness">Cloudiness: ${cloudiness}%</span>`;


        if (description.toLowerCase().includes('clear')) {
            document.body.style.backgroundColor = '#87CEEB';
        } else if (description.toLowerCase().includes('cloud')) {
            document.body.style.backgroundColor = '#B0C4DE';
        } else if (description.toLowerCase().includes('rain')) {
            document.body.style.backgroundColor = '#1E3A8A';
        }
    }
}

function displayhourlyforecast(data) {
    const hourlyd = document.getElementById("hourly");
    const hour24 = data.slice(0, 8);
    hour24.forEach(e => {
        const Time = new Date(e.dt * 1000);
        const hour = Time.getHours();
        const temperature = Math.round(e.main.temp - 273.15);
        const iconCode = e.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const itemHour = `<div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
        </div>`;
        hourlyd.innerHTML += itemHour;
    });
}
