var apiKey = "8f62a549ed6fb56cf6bd5a1b364a96aa"; //API key
var searchButton =document.querySelector("#btn-search");

//search history
function searchBar() {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")||"[]");
    var searchText = document.querySelector("#search-text");
    //insert city
    if (searchText.value) {
        searchHistory.push(searchText.value);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));    
    }

    var searchHistoryUlEl = document.querySelector(".search-history-list");
    searchHistoryUlEl.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = searchHistory[i];
        searchHistoryUlEl.appendChild(liEl);
    }
    if (searchHistory.length > 0) {
        searchHistoryUlEl.style.borderTopWidth = "1px";
    }
}

function get5DayForecast() {
    fetch( "https://api.openweathermap.org/data/2.5/forecast?lat=33.7849924&lon=-84.3902644&units=imperial&appid=" + apiKey,
    {method: "GET",})
    .then(function (res) {
        return res.json();
    })
    .then (function (res) {
        /* current weather container area*/
        var currentWeatherContainer = document.querySelector (".current-weather-container");
        var currentWeatherContainerh5El = currentWeatherContainer.querySelector("h5");
        var currentTempContentEl = currentWeatherContainer.querySelector(".temp-content");
        var currentWindContentEl = currentWeatherContainer.querySelector(".wind-content");
        var currentHumidityContentEl = currentWeatherContainer.querySelector(".humidity-content");

        var todayWeatherData = rest.list[0];
        var city = res.city.name;
        var today = moment (todayWeatherData.dt_txt).format("MM/D/YYYY");
        var temperature = todayWeatherData.wind.speed;
        var humidity = todayWeatherData.wind.speed;
        var humidity = todayWeatherData.main.humidity;

        currentWeatherContainerh5El.textContent = city + " " + "(" + today + ")";
        currentTempContentEl.textContent = temperature;
        currentWindContentEl.textContent = wind;
        currentHumidityContentEl.textContent = humidity;
    
    })
}