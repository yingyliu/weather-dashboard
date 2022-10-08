var SearchButton = document.querySelector("#btn-search");
//search history
function handleSearchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")||"[]");
    var searchText = document.querySelector("#search-text");
    //insert city
    if (searchText.value) {
        searchHistory.push(searchText.value);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));    
    }

}