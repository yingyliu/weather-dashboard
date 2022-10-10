var apiKey = "8f62a549ed6fb56cf6bd5a1b364a96aa"; //API key
var searchButton = document.querySelector("#btn-search");
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")||"[]");

//search history
function searchBar() {
    // get the forecast
    var searchText = document.querySelector("#search-text");
    get5DayForecast(searchText.value);

    // created a new button
    console.log(searchText)
    //insert city
    if (searchText.value) {
        searchHistory.push(searchText.value);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));  
    }

    createHistoryButtons()
    searchText.value = '';
}

function createHistoryButtons() {
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

function get5DayForecast(cityName) {
    fetch( "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey,
    {method: "GET",})
    .then(function (res) {
        return res.json();
    })
    .then (function (res) {
        console.log(res)
        /* current weather container area*/
        var currentWeatherContainer = document.querySelector (".current-weather-container");
        var currentWeatherContainerh5El = currentWeatherContainer.querySelector("h5");
        var currentTempContentEl = currentWeatherContainer.querySelector(".temp-content");
        var currentWindContentEl = currentWeatherContainer.querySelector(".wind-content");
        var currentHumidityContentEl = currentWeatherContainer.querySelector(".humidity-content");

        var todayWeatherData = res.list[0];
        var city = res.city.name;
        // var today = moment (todayWeatherData.dt_txt).format("MM/D/YYYY");
        var today = todayWeatherData.dt_txt;
        var temperature = todayWeatherData.main.temp;
        var wind = todayWeatherData.wind.speed;
        var humidity = todayWeatherData.main.humidity;

        currentWeatherContainerh5El.textContent = city + " " + "(" + today + ")";
        currentTempContentEl.textContent = temperature;
        currentWindContentEl.textContent = wind;
        currentHumidityContentEl.textContent = humidity;


        /* five day forecast area */
        var daysForecaseList = document.querySelector(".days-corecase-list");
        var daysForecaseListLiEls = document.querySelectorAll("li");
        var day2WeatherData = res.list[8];
        var day3WeatherData = res.list[16];
        var day4WeatherData = res.list[24];
        var day5WeatherData = res.list[32];
        var daysWeatherList = [ todayWeatherData, day2WeatherData, day3WeatherData, day4WeatherData, day5WeatherData,];

        for (var i = 0; i < daysWeatherList.length; i++) {
            var daysForecaseListLiEl = daysForecaseListLiEls[i];
            var dayWeatherForecaseDay = document.querySelector(".forecase-day");
            var dayTempContentEl = document.querySelector(".temp-content");
            var dayWindContentEl = document.querySelector(".wind-content");
            var dayHumidityContentEl = document.querySelector(".humidity-content");

            // dayWeatherForecaseDay.textContent = moment(daysWeatherList[i].dt_txt).format("MM/D/YYYY");
            dayWeatherForecaseDay.textContent = daysWeatherList[i].dt_txt;
            dayTempContentEl.textContent = daysWeatherList[i].main.temp;
            dayWindContentEl.textContent = daysWeatherList[i].wind.speed;
            dayHumidityContentEl.textContent = daysForecaseList[i].main.humidity;
        }
    });
}

//search bar for search
// searchBar();
createHistoryButtons();

//weather forecast
// get5DayForecast();

//click search bar button
searchButton.addEventListener("click", function (){
    searchBar();
})
