//global variables
var weather = [];
var currentCity;

//input section
$('#input-button').on('click', function (event) {
    event.preventDefault();
    var inputCity = $('input').val();
    $('input').val("");
    //console.log(inputCity);
    getCurrentWeatherData(inputCity);

    currentCity = inputCity;
});


//weather section
function getCurrentWeatherData(city) {

    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?appid=16e2a29d08bf4766fcdb6563c3920b3d&q=' + city;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(res) {
            //console.log(res.coord);
            var lon = res.coord.lon;
            var lat = res.coord.lat;
            getWeatherForecast(lon, lat);
            initMap(lat, lon);
        })

    //renderWeatherData(response);

}

function getWeatherForecast(lon, lat) {
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=16e2a29d08bf4766fcdb6563c3920b3d";
    weather = [];
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (res) {
            console.log(res);
            // 7-day forecast
            $('#weather').empty();
            $('#city-name').empty();
            $('#city-name').html(currentCity);
            for (var i = 0; i < 7; i++) {
               
                dayObject = {
                    city: currentCity,
                    date: dayjs.unix(res.daily[i].dt).format('MM/DD/YYYY'),
                    high: toF(res.daily[i].temp.max),
                    low: toF(res.daily[i].temp.min),
                    desc: res.daily[i].weather[0].description,
                    image: 'http://openweathermap.org/img/wn/' + res.daily[i].weather[0].icon + '@2x.png'
                }
                //console.log(dayObject);
                weather.push(dayObject);
            }
        })
        .then(function () {
            window.location = "#page2";
        })
        .then(function() {
            console.log(weather[0]);
            renderWeather(weather[0]);
        });
        
       // console.log(weather);
        //console.log(weather[0]);

        //renderWeather(weather[0]);
};

function toF(k) {
    var f = (k - 273.15) * 9 / 5 + 32;
    return f.toFixed();
}

//renderWeather($weather[0]);
function renderWeather(day) {

    console.dir(day);
    $divParent = $('<div>').attr('class', 'item-' + 'number');
    //console.log($divParent);
    $date = $('<div>').html(day.date);
    $highTemp = $('<div>').html("High: " + (day.high) + "&#8457");
    $lowTemp = $('<div>').html("Low: " + (day.low) + "&#8457");
    $description = $('<div>').html(day.desc);
    $image = $('<img>').attr('src', day.image);
    $divParent.append($date, $highTemp, $lowTemp, $image, $description);
    // $highTemp, $lowTemp, $description, $image
    // //make cards
    $cardDiv = $('<div>').attr('class', 'card');
    $cardContent = $('<div>').attr('class', 'card-content');
    $cardContent.append($divParent);
    $cardDiv.append($cardContent);
    $('#weather').append($cardDiv);

}


// function clearWeatherData() {
//     $('#weather').empty();
// }








//map section
//var map;

function initMap(lat, lng) {

    if(lat && lng) {
    //console.log(lat);
    var uluru = { lat: lat, lng: lng };
    // The map, centered at Uluru
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: uluru,
    });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
} else {
    return;
}



    // $('#map').empty();
    //for(var i = 0; i > 7; i++){
    //  $divParent = $("<div>");
    //  $("#map").append($divParent);
    //}
}



//resaurant section


