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
var apiKey = "d5666a25ec26e01680aa38163edf8579";
var Container = $("#searchContainer");
var sideContainer = $("#sideContainer")
var searchSideBar  = $("#sideBar");
var formSubmit = $("#formSubmit");
var submitBtn = $("#submitBtn");
var searchHistory =$("#searchHistory");
var todayWeather = $("#todayWeather")
var forecast = $("#forecast")


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


function formSubmit() {

}


