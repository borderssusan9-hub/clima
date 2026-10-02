function displayClimaCondition(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
     cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);}
    
  


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
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchFormSubmit);
searchCity("Paris");