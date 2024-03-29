// Current Date

function formatDate(date) {
    let currentDate = now.getDate();
    let currentHours = now.getHours();
    if (currentHours < 10) {
        currentHours = `0${currentHours}`;
    }
    let currentMinutes = now.getMinutes();
    if (currentMinutes < 10) {
        currentMinutes = `0${currentMinutes}`;
    }
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let currentDay = days[now.getDay()];

    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Augt",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    let currentMonth = months[now.getMonth()];

    return `${currentDay}, ${currentDate} ${currentMonth} ${currentHours}:${currentMinutes}`;
}

let dateElement = document.querySelector("#date");
let now = new Date();
dateElement.innerHTML = formatDate(now);


function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");


    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML = forecastHTML +
                `
    <div class="col-2">
    <div class = "forecast-date"> ${formatDay(forecastDay.dt)} </div>  
    <img  src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png "
alt = ""
    width = "42"/>
    <div class = "forecast-temperature-index">
    <span class = "weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span> 
    <span class = "weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span> </div>
     </div>
     `;
        }
        
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    
}



// Current Weather
function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    let temperatureElement = Math.round(response.data.main.temp);
    document.querySelector("#temperature").innerHTML = `${temperatureElement}`;
    let windIndex = document.querySelector("#wind-index");
    let wind = Math.round(response.data.wind.speed);
    windIndex.innerHTML = `${wind} km/h`;
    let humidity = document.querySelector("#humidity");
    let humidityIndex = Math.round(response.data.main.humidity);
    humidity.innerHTML = `Humidity: ${humidityIndex}%`;
    let iconElement = document.querySelector("#icon");
    let iconElementAPI = response.data.weather[0].icon;
    iconElement.setAttribute("src", `images/${iconElementAPI}.png`);
    celsiusTemperature = response.data.main.temp;
    getForecast(response.data.coord);
    document.querySelector("#temperature").innerHTML = `${temperatureElement}`;
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");

}

function search(city) {
    let apiKey = "3ddfb4a3cef4a9c572f5854ea3b9972d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search(city);
}

//getForecast
function getForecast(coordinates) {
    let apiKey = "3ddfb4a3cef4a9c572f5854ea3b9972d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

}



// Unit conversion

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 35;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
}



let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
search("Kyiv");

//displayForecast();

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);