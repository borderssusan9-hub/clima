function displayClimaCondition(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
     let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#icon");


iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" 
        class="clima-app-icon"/>`;
    
timeElement.innerHTML = formatDate(date);
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    getForecast(response.data.city);

}

function formatDate(date) {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if (minutes < 10) { minutes = `0${minutes}`; }
    if (hours < 10) { hours = `0${hours}`; }    
    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "406a75450d5d3330f1t1d188ef66ofb8";
    let apiUrl = 
    `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayClimaCondition);
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-form-input");
   
   searchCity(searchInputElement.value);
    }
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
     return days [date.getDay()];
     
}
    
    function getForecast(city) {
        let apiKey = "406a75450d5d3330f1t1d188ef66ofb8";
        let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
        
        axios(apiUrl).then(displayForecast);
    }
    function displayForecast(response) {
        
        
        let forecastHtml = "";
        response.data.daily.forEach(function (day,index) { 
            if (index < 5) {
            forecastHtml = forecastHtml +

    `<div class="clima-forecast-day">
    <div class="clima-forecast-date">${formatDay(day.time)}</div>
    <img src="${day.condition.icon_url}" class="clima-forecast-icon"/>
    <div class="clima-forecast-temperatures">
        <div class="clima-forecast-temperature">
<strong>${Math.round(day.temperature.maximum)}°</strong>
        </div> 
        <div class="clima-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
    </div>
    </div>`;}
    });
    let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
        }





let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchFormSubmit);
searchCity("Paris");

