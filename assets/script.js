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

//history recording
function createHistoryButtons() {
    var searchHistoryUlEl = document.querySelector(".search-history-list");
    var searchText = document.querySelector("#search-text");
    searchHistoryUlEl.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = searchHistory[i];
        searchHistoryUlEl.appendChild(liEl);
        liEl.addEventListener("click", function(e){
            var queryStr = e.currentTarget.textContent;
            searchText.value = queryStr;
            searchBar()
        });
    }
    if (searchHistory.length > 0) {
        searchHistoryUlEl.style.borderTopWidth = "1px";
        if(searchText.value) {
        var displayweatherEl = document.querySelector(".displayweather");
        displayweatherEl.style.display = "block";
    }}
}

function get5DayForecast(cityName) {
    fetch( "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey,
    {method: "GET",})
    .then(function (res) {
        return res.json();
    })
    .then (function (res) {
        console.log(res)
        /* current weather container area */
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey,
        {method: "GET",})
        .then(function (res) {
            return res.json();
        })
        .then (function (res) {
            var currentWeatherContainerh5El = document.querySelector("h5");
            var currentTempContentEl = document.querySelector(".temp-content.current-weather");
            var currentWindContentEl = document.querySelector(".wind-content.current-weather");
            var currentHumidityContentEl = document.querySelector(".humidity-content.current-weather");
            var currentIconEl = document.querySelector(".current-icon");
            
            var todayWeatherData = res;//today's weather; +0 Day
            var city = res.name;
            var today = todayWeatherData.dt * 1000;
            var temperature = todayWeatherData.main.temp;
            var wind = todayWeatherData.wind.speed;
            var humidity = todayWeatherData.main.humidity;

            currentWeatherContainerh5El.textContent = city + " " + "(" + moment(today).format("MM/D/YYYY") + ")";
            currentTempContentEl.textContent = temperature;
            currentWindContentEl.textContent = wind;
            currentHumidityContentEl.textContent = humidity;
            currentIconEl.setAttribute("src", "https://openweathermap.org/img/w/" + todayWeatherData.weather[0].icon + ".png");
        });

        /* five day forecast area */
        var daysForecaseList = document.querySelector(".days-forecase-list");
        var daysForecaseListLiEls = document.querySelectorAll("li");
        var day2WeatherData = res.list[8]; // +1 Day
        var day3WeatherData = res.list[16]; // +2 Day
        var day4WeatherData = res.list[24]; // +3 Day
        var day5WeatherData = res.list[32]; // +4 Day
        var day6WeatherData = res.list[39]; // +5 Day
        var daysWeatherList = [ day2WeatherData, day3WeatherData, day4WeatherData, day5WeatherData, day6WeatherData];

        for (var i = 0; i < daysWeatherList.length; i++) {
            var dayWeatherForecaseDay = document.querySelectorAll(".forecase-day")[i];
            var dayTempContentEl = document.querySelectorAll(".temp-content.forecase")[i];
            var dayWindContentEl = document.querySelectorAll(".wind-content.forecase")[i];
            var dayHumidityContentEl = document.querySelectorAll(".humidity-content.forecase")[i];
            var weatherIconEl = document.querySelectorAll(".icon")[i];


            dayWeatherForecaseDay.textContent = moment(new Date(daysWeatherList[i].dt * 1000)).format("MM/D/YYYY");
            console.log(daysWeatherList[i]);
            dayTempContentEl.textContent = daysWeatherList[i].main.temp;
            dayWindContentEl.textContent = daysWeatherList[i].wind.speed;
            dayHumidityContentEl.textContent = daysWeatherList[i].main.humidity;
            weatherIconEl.setAttribute("src", "https://openweathermap.org/img/w/" + daysWeatherList[i].weather[0].icon + ".png");
        }
    });
}

//history recording
createHistoryButtons();

//click search bar button
searchButton.addEventListener("click", function (){
    searchBar();
})
