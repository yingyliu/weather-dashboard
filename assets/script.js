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

