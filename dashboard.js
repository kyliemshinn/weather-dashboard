var searchInput = document.querySelector("#cardEl");
var weatherContainer=document.querySelector("#todayWeather");
var cityInput=document.querySelector("#search-input");
var forecastContainer = document.querySelector("#forecast");
var forecastTitle = document.querySelector("#forecastcard");
var forecastCard = document.querySelector("#forecastcard")
var cityForm=document.querySelector("#formSubmit");
var pastSearchButton = document.querySelector("#pastsearch");
var submitBtn = document.getElementById("submitBtn")
var cities= [];
var apiKey = "d5666a25ec26e01680aa38163edf8579";


function formSubmit(e){
    if(!cityInput.value) {
        return;
    }
    e.preventDefault();
    var city = cityInput.value.trim();
    console.log("this is form submit");

}


function getGeo() {

}

function getCityWeather() {

    
}

function appendHistory() {
    
}

function renderWeather() {

}

function renderCurrent() {

}

function renderForecast() {

}

function renderCardForecast() {

}

function searchHistoryInit() {

}

function displaySearchHistory() {

}

function searchHistoryBtns() {
    
}


searchHistoryInit();
submitBtn.addEventListener("submit", formSubmit);
// pastSearchButton.addEventListener("click", searchHistory);

