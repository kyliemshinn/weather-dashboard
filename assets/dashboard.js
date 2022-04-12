var searchInput = document.querySelector("#cardEl");
var weatherContainer=document.querySelector("#todayWeather");
var cityInput=document.querySelector("#search-input");
var forecastContainer = document.querySelector("#forecast");
//var forecastTitle = document.querySelector("#forecastcard");
var forecastCard = document.querySelector("#forecastcard")
var cityForm=document.querySelector("#formSubmit");
var pastSearchButton = document.querySelector("#pastsearch");
var submitBtn = document.getElementById("submitBtn")
var searchHistory = document.getElementById("searchHistory");
var cities= [];
var apiKey = "d5666a25ec26e01680aa38163edf8579";


function formSubmit(e){
    if(!cityInput.value) {
        return;
    }
    e.preventDefault();
    var city = cityInput.value.trim();
    getGeo(city);
    cityInput.value = "";


    console.log("this is form submit");

}


function getGeo(city) {
    var cityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
   
    fetch(cityURL)
    .then(function(res){
        return res.json();
    })
        .then(function(data){
            if(!data[0]) {
                alert("Location Not Found..");
            } else {
                appendHistory(city);
                getCityWeather(data[0]);
            }
    })
    .catch(function(err){
        console.error(err);
    });
}

function getCityWeather(Location) {
    var {lat, lon} = location;
    var city = location.name;
    console.log(location.name);
    console.log(city);
    var latLonURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
//fetching weather, passing through render weather
    fetch(latLonURL)
    .then(function(res){
        return res.json();
    })
        .then(function(data){
            renderWeather(city, data);
    })
    .catch(function(err){
        console.error(err);
    });
    
}

function appendHistory(city) {
    //if no search return function
   if(cities.indexOf(city) !== -1) {
       return;
   } 
   cities.push(city);
   localStorage.setItem("CitySearch", JSON.stringify(cities));
   displaySearchHistory();
} 
//initializes two functions
function renderWeather(city, data) {
renderCurrent(city, data.current, data.timezone);
renderForecast(data.daily, data.timezone);
}

function renderCurrent(city, weather, timezeone) {

var date = dayjs().tz(timezeone).format("M/D/YYYY");

var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

var temp = weather.temp;

var humidity = weather.humidity;

var wind = weather.wind_speed;

var uvi = weather.uvi;

var card = document.createElement("div");
var cardBody = document.createElement("div");
var heading = document.createElement("h3");
var iconEl = document.createElement("img");
var tempEl = document.createElement("p");
var windEl = document.createElement("p");
var humidityEl = document.createElement("p");
var uvIndex = document.createElement("p");
var uvBadge = document.createElement("button");

card.setAttribute("class", "card");
cardBody.setAttribute("class", "card-body");
card.append(cardBody);

heading.setAttribute("class", "h3 card-title");
tempEl.setAttribute("class", "card-text");
windEl.setAttribute("class", "card-text");
humidityEl.setAttribute("class", "card-text");

//put date on the top of the card from data above
heading.textContent = `${city} (${date})`;
iconEl.setAttribute("src", icon);
iconEl.setAttribute("class", "icon-img");
heading.append(iconEl);
tempEl.textContent = `Temp: ${temp} F`;
windEl.textContent = `Wind: ${wind} MPH`;
humidityEl.textContent = `Humdity: ${humidity} %`;

cardBody.append(heading, tempEl, windEl, humidityEl);
uvIndex.textContent = "UV Index: ";
uvBadge.classList.add("btn", "btn-sm");
if(uvi < 3) {
    uvBadge.classList.add("btn-success");
} else if (uvi < 7) {
    uvBadge.classList.add("btn-warning");
} else {
    uvBadge.classList.add("btn-danger");

uvBadge.textContent = uvi;
uvIndex.append(uvBadge);
cardBody.append(uvIndex);

weatherContainer.innerHTML = '';
weatherContainer.append(card);

}




}

function renderCardForecast(forecast, timezone) {
    var dateTs = forecast.dt;

    var icon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    
    var temp = forecast.temp.day;
    
    var {humidity} = forecast;
    
    var wind = forecast.wind_speed;
    
    var col = document.createElement("div");
    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var heading = document.createElement("h5");
    var iconEl = document.createElement("img");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");
    
    col.append(card);
    card.append(cardBody);
    cardBody.append(heading, iconEl, tempEl, windEl, humidityEl);
    col.setAttribute("class", "col-md");
    col.classList.add("five-day-card"); 
    card.setAttribute("class", "card bg-primary h-100 text-white");
    cardBody.setAttribute("class", "card-body p-2");
    
    heading.setAttribute("class", "card-title");
    tempEl.setAttribute("class", "card-text");
    windEl.setAttribute("class", "card-text");
    humidityEl.setAttribute("class", "card-text");
    
    //put date on the top of the card from data above
    heading.textContent = dayjs.unix(dateTs).tz(timezone).format("M/D/YYYY");
    iconEl.setAttribute("src", icon);
    tempEl.textContent = `Temp: ${temp} F`;
    windEl.textContent = `Wind: ${wind} MPH`;
    humidityEl.textContent = `Humdity: ${humidity} %`;
            
    forecastContainer.append(col);
    
}

function renderForecast(dailyForecast, timezone) {
    var startDate = dayjs().tz(timezone).add(1,"day").startOf("day").unix();
    var endDate = dayjs().tz(timezone).add(6,"day").startOf("day").unix();
    var hCol = document.createElement("div");
    var heading = document.createElement("h4");
    hCol.setAttribute("class", "col-12");
    heading.textContent = "5-Day Forecast";
    hCol.append(heading);
    forecastContainer.innerHTML = "";
    forecastContainer.append(hCol);
    for(var i = 0; i < dailyForecast.length; i++) {
        if(dailyForecast[i].dt >= startDate && dailyForecast[i].dt < endDate) {
            renderCardForecast(dailyForecast[i], timezone)
        }
    }
}

function searchHistoryInit() {
    var cityHistory = localStorage.getItem("citySearch")
    if(cityHistory) {
        cities = JSON.parse(cityHistory);
    } 
    displaySearchHistory()
 
}

function displaySearchHistory() {
 searchHistory.innerHTML = "";
 //show most recent search- count backwards
 for(var i = cities.length -1; i >= 0; i--) {
     var historyBtn = document.createElement("button");
     historyBtn.setAttribute("type", "button");
     historyBtn.setAttribute("aria-controls", "today forecast");
     historyBtn.classList.add("history-btn", "btn-history");

     historyBtn.setAttribute("data-search", cities[i]);
     historyBtn.textContent = cities[i];
     searchHistory.append(historyBtn);
 }
}

function searchHistoryBtns(e) {
    if (!e.target.matches('.btn-history')) {
        return;
      }
    
      var btn = e.target;
      var city = btn.getAttribute('data-search');

      getGeo(city);
}


searchHistoryInit();
submitBtn.addEventListener("click", formSubmit);
// pastSearchButton.addEventListener("click", searchHistory);

