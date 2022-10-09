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


        /* five day forecast area */
        var daysForecaseList = document.querySelector(".days-corecase-list");
        var daysForecaseListLiEls = daysForecaseList.querySelectorAll("li");
        var day2WeatherData = res.list[8];
        var day3WeatherData = res.list[16];
        var day4WeatherData = res.list[24];
        var day5WeatherData = res.list[32];
        var daysWeartherList = [ todayWeatherData, day2WeatherData, day3WeatherData, day4WeatherData, day5WeatherData,];

        for (var i = 0; i < daysWeartherList.length; i++) {
            var daysForecaseListLiEl = daysForecaseListLiEls[i];
            var dayWeatherForecaseDay = daysForecaseListLiEl.querySelector(".forecase-day");
            var dayTempContentEl = daysForecaseListLiEl.querySelector(".temp-content");
            var dayWindContentEl = daysForecaseListLiEl.querySelector(".wind-content");
            var dayHumidityContentEl = daysForecaseListLiEl.querySelector(".humidity-content");

            dayWeatherForecaseDay.textContent = moment(daysWeatherList[i].dt_txt).format("MM/D/YYYY");
            dayTempContentEl.textContent = daysWeatherList[i].main.temp;
            dayWindContentEl.textContent = daysWeatherList[i].wind.speed;
            dayHumidityContentEl.textContent = daysForecaseList[i].main.humidity;
        }
    });
}

//search bar for search
searchBar();

//weather forecast
get5DayForecast();

//click search bar button
searchButton.addEventListener("click", function (){
    searchBar();
})
