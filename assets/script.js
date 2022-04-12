//Acceptance Criteria

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history



//global variables
// var rootUrl = "https://api.openweathermap.org";
//var date = $("#currentdate");
var Container = $("#searchContainer");
var sideContainer = $("#sideContainer");
var searchSideBar  = $("#sideBar");
var searchForm = $("#searchForm");
var cityInput = $("#search-input")
var submitBtn = $("#submitBtn");
var cardEl = $("#cardEl")
var searchHistory =$("#searchHistory");
var todayWeather = $("#todayWeather")
var forecast = $("#forecast")
var forecastCard = $("#forecastcard")

var apiKey = "d5666a25ec26e01680aa38163edf8579";
//function search for a city and populate the  weather
//show current weather
//show future weather- 5 day forecast
    //append to page under the search tab

//current weather conditons function
    //present city name-larger than rest
    //show todays date
    //weather icon representing the current weather(ex. cloud emoji for cloudy days)
    // the temperature 
    //the humidity
    //the wind speed
    //UV index

//uv index color change
    //change color- blue- for low index, yellow- for moderate index, red- for high index(set properties in CSS)

//five day forecast
    //show date
    //show weather icon
    //show temperature
    //show humidity

//click search history and will populate the information again

submitBtn.on("click", function(event) {
    event.preventDefault();
    if (!cityInput.val()) {
        alert("Please Enter A City To Continue");
        return;
    }  
        console.log("clicked button")
        getWeather(cityInput.val());

            function clearResults() {
                cityInput.html("");
            }
            grabCoordinates();
    
});


// fetchweather:
//     (renderitems is called out)
//     city/location is defined by declaring properties of lat/lon
//     fetch api using city/data from weather geolocation endpoint
function getWeather(cityLocation) {
    var {lat, lon} = cityLocation;
    var city = cityLocation.name; 
    var latLonURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}`

    $.ajax({
        url: latLonURL,
        method: "GET"
    })
        .then(function(data) {
            renderItems(data, city);
        })
    }
    
    // fetchcoordinates:
    //     (fetchweather and appendtohistory is called out)
    //     fetches api
    //     within, various functions are called to complete and render weather information
function grabCoordinates(searchCity) {
    var cityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apikey}`
    $.ajax({
        url: cityUrl,
        method: "GET"
    })
    .then(function(data) {
        if(!data[0]) {
            alert("No Location Found...")
        } else {
            //appendHistory(searchCity);
            getWeather(data[0]);
        }
    })
}

//  appendtohistory:
//     (rendersearchhistory is called out)
//         pushes searches into [] 
//         sets the [] and any of its contents to localstorage
function appendHistory() {
    
    renderSearchHistory();
}

// rendersearchhistory:
//     displays the search list
//     iterates thru the array to render the search history buttons
function renderSearchHistory() {

}

// renderitems:
//     (rendercurrentweather and renderforecast are called out)
//     passing thru in parameters to be used and redefined in functions called out -- in their parameters
function renderItems () {
    

    renderCurrentWeather();
    renderForecast();
}
// rendercurrentwether:

//     declare and define date thru js date library
//     display the current weather data fetched from api
//     create variables to store data from fetch req
//     create card and display data
function renderCurrentWeather() {
    for (var i = 0; i < data.length; i++) {
        
        var tempCardBodyEl = $("<div>");
        //needs current date with moment.js
        var tempNameEl = $("<h3>");
        var tempTempEl = $("<p>");
        var tempHumidityEl = $("<p>");
        var tempWindSpeedEl = $("<p>");
        var tempUvIndexEl = $("<p>")

        tempNameEl.text(data.name);

        tempTempEl.text("Temperature: " + data.current.temp);
        tempHumidityEl.text("Humidity: " + data.current.humidity);
        tempWindSpeedEl.text("Wind Speed: " + data.current.wind_speed);
        tempUvIndexEl.text("UV Index: " + data.current.uvi);
        tempCardEl.attr("class", "card mb-3");
        tempcardBodyEl.addClass("class", "card-body")

        cardEl.append(tempNameEl);
        cardEl.append(tempHumidityEl);
        cardEl.append(tempWindSpeedEl);
        cardEl.append(tempUvIndexEl);
        // resultsSectionEl.append(tempRowEl);
        
    }
}

// renderforecast:
//     (renderforecastcard called out)
//     displays 5 day forecast
//     need to establish timestamps for start and end of 5 day forecast using js date library
//     create a div and header as placeholder for the card
//     iterate thru daily forecast data
function renderForecast(cityLocation) {
 
        forecastCard.empty();
        var {lat, lon} = cityLocation;
        var forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}`;
        $.ajax({
            url: forecastURL,
            method: "GET"
        })
        .then(function(fiveForecast) {
            for (var i = 0; i != fiveForecast.current.length; i+=8 ) {
                var cityCard = {
                    date: moment().format("MMM D, YYYY"),
                    icon: fiveForecast.daily.weather.icon,
                    temp: fiveForecast.daily.temp.max,
                    humidity: fiveForecast.daily.humidity
                }
                //var dateStr = cityCard.date;
                //var trimmedDate = dateStr.substring(0, 10); 
                let weatherIcon = "https:///openweathermap.org/img/w/" + cityCard.icon + ".png";
                renderForecastCard(cityCard.date, cityCard.icon, cityCard.temp, cityCard.humidity);
            }
        })
        
        function renderForecastCard (date, icon, temp, humidity) {
        
            var fiveDayCardEl = $("<div>").attr("class", "card-body");
            let cardDate = $("<h4>");
            let cardIcon = $("<img>");
            let cardTemp = $("<p>");
            let cardHumidity = $("<p>");
        
            forecastCard.append(fiveDayCardEl);
            cardDate.text(cityCard.date);
            //cardIcon.attr("src", icon);
            cardTemp.text("Temp: ", cityCard.date, "°F");
            cardHumidity.text("Humidity: ", cityCard.humidity, "%");
            
            forecastCard.append(fiveDayCardEl);
            fiveDayCardEl.append(cardDate);
            fiveDayCardEl.append(cardTemp);
            fiveDayCardEl.append(cardIcon);
            fiveDayCardEl.append(cardHumidity);
        }
}

// renderforecastcard:
//     displays a forecast card given an object from api daily forecast
//     create variables for api data

renderForecast();
// inithistory:
//     (rendersearchhistory is called out)
//     get search history from local storage
function initHistory() {

    renderSearchHistory();
}
// handlesearchhistoryclick"
//     (fetchcoords are called out)
//     event handler for the buttons created for search history
//     take button text to match value -- using "data attributes"

