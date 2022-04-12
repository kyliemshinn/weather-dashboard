var searchInput = document.querySelector("#cardEl");
var weatherContainer=document.querySelector("#todayWeather");
var cityInput=document.querySelector("#search-input");
var forecastContainer = document.querySelector("#forecast");
var forecastTitle = document.querySelector("#forecastcard");
var forecastCard = document.querySelector("#forecastcard")
var cityForm=document.querySelector("#formSubmit");
var pastSearchButton = document.querySelector("#pastsearch");
var submitBtn = document.querySelector("#submitBtn")

var cities = [];


var apiKey = "d5666a25ec26e01680aa38163edf8579";

function formSubmit(e){
    if(!cityInput.value) {
        return;
    }
    e.preventDefault();
    
    var city = cityInput.value.trim();
    console.log("this is form submit")
    getWeather(city);
    fiveDayForecast(city);
    cityInput.value= " ";
    console.log(getWeather);
    console.log(city);
    console.log(fiveDayForecast);
    
    
    // if(cityInput.value){
        //     getWeather(city);
        //     fiveDayForecast(city);
        //     cities.unshift({city});
        //     cityInput.value = "";
        // } else{
            //     alert("Enter A City To Continue..");
            // }
            // saveSearch();
            // pastSearch(city);
}
        
submitBtn.addEventListener("click", formSubmit);
pastSearchButton.addEventListener("click", searchHistory);



function getWeather(city){
    var cityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
    
    fetch(cityURL)
    .then(function(response){
        response.json().then(function(data){
            showWeather(data, city);
        });
    });
};


function showWeather(data, city){
    //clear old content
    weatherContainer.textContent= "";  
    searchInput.textContent=city;
    
    //create date element
    var todayDate = document.createElement("p")
    todayDate.textContent= moment().format("MMM D, YYYY");
    searchInput.appendChild(todayDate);
    
    //create a span element to hold temperature data
    var temperature = document.createElement("p");
    temperature.textContent = "Temperature: " + data.current.temp + " °F";
    temperature.classList = "list-group-item"
    
    //create a span element to hold Humidity data
    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + data[i].current.humidity + " %";
    humidity.classList = "list-group-item"
    
    //create a span element to hold Wind data
    var windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind Speed: " + data[i].current.wind_speed + " MPH";
    windSpeed.classList = "list-group-item"

    
    //append to container
    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(windSpeed);
    
    var lat = data.lat;
    var lon = data.lon;
    console.log(data.lat)
    getUvIndex(lat,lon)
}



function getUvIndex(lat,lon){
    var latLonURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}`
    fetch(latLonURL)
    .then(function(response){
        response.json().then(function(data){
            showUvIndex(data)
            console.log(data)
        });
    });
}

function showUvIndex(index){
    var uvIndex = document.createElement("div");
    uvIndex.textContent = "UV Index: "
    uvIndex.classList = "list-group-item"
    
    uvIndexVal = document.createElement("p")
    uvIndexVal.textContent = index.value
    
    if(index.value <=2){
        uvIndexVal.classList = "good"
    }else if(index.value >2 && index.value<=8){
        uvIndexVal.classList = "medium"
    }
    else if(index.value >8){
        uvIndexVal.classList = "severe"
    };
    
    uvIndex.appendChild(uvIndexVal);
    
    //append index to current weather
    weatherContainer.appendChild(uvIndex);
}

function saveSearch(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

function pastSearch(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getWeather(city);
        fiveDayForecast(city);
    }
}

function fiveDayForecast(city) {
    var forecastURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    fetch(forecastURL)
    .then(function(response){
        response.json().then(function(data){
            showForecast(data);
        });
    });
};

function showForecast(weather){
    forecastContainer.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";
    
    var forecast = weather.list;
    for(var i=5; i < forecast.length; i=i+8){
        var dayForecast = forecast[i];
        
        
        
        //create date element
        var forecastDate = document.createElement("h4")
        forecastDate.textContent= moment().format("MMM Do YY");
        forecastDate.classList = "card-header text-center"
        forecastCard.appendChild(forecastDate);
        
        //create temperature span
        var forecastTemp=document.createElement("p");
        forecastTemp.classList = "card-body text-center";
        forecastTemp.textContent = daily.temp + " °F";
        
        //append to forecast card
        forecastCard.appendChild(forecastTemp);
        
        var forecastHumid=document.createElement("p");
        forecastHumid.classList = "card-body text-center";
        forecastHumid.textContent = daily.humidity + "  %";

        
        //append to forecast card
        forecastCard.appendChild(forecastHumid);
        
        //append to five day container
        // forecastContainer.appendChild(forecastEl);
    }
    
    
    
    
    
    function searchHistory(pastSearch){
        
        var pastSearchBtn = document.createElement("button");
        pastSearchBtn.textContent = pastSearch;
        pastSearchBtn.classList = "d-flex w-100 btn-light border p-2";
        pastSearchBtn.setAttribute("data-city", pastSearch)
        pastSearchBtn.setAttribute("type", "submit");
        
        pastSearchButtonEl.prepend(pastSearchBtn);
    }
    
    
    
    pastSearch();
    
}
