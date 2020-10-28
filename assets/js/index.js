//global variables
var weather = [];
var currentCity;
var currentIndex = 0;

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
            initAutocomplete(lat, lon);
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
        .then(function() {
            console.log(weather[0]);
            renderWeather(weather[0]);
            $('#hide-it').removeClass('is-hidden');
        })
        .then(function () {
            window.location = "#page2";
        });
};

function toF(k) {
    var f = (k - 273.15) * 9 / 5 + 32;
    return f.toFixed();
}

//renderWeather($weather[0]);
function renderWeather(day) {
    $('#weather').empty();
    //console.dir(day);
    $divParent = $('<div>').attr('class', 'item');
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

    // <i class="fas fa-chevron-circle-left"></i>  <i class="fas fa-chevron-circle-right"></i>

    $leftButton = $('<i>').attr('class', 'fas fa-chevron-circle-left fa-4x arrow-padding').attr('id','left-arrow-id');
    $leftButtonDiv = $('<div>').attr('class', 'left-arrow');
    $rightButton = $('<i>').attr('class', 'fas fa-chevron-circle-right fa-4x arrow-padding').attr('id','right-arrow-id');
    $rightButtonDiv = $('<div>').attr('class', 'right-arrow');
    $leftButtonDiv.append($leftButton);
    $rightButtonDiv.append($rightButton);
    $('#weather').prepend($leftButtonDiv);
    $('#weather').append($rightButtonDiv);

    $('#left-arrow-id').on('click', function (event) {
        event.preventDefault();
        console.log("left-arrow click");
        changeWeatherDayDecrement();
    });
    $('#right-arrow-id').on('click', function (event) {
        event.preventDefault();
        console.log("right-arrow click");
        changeWeatherDayIncrement();
    });


}

function changeWeatherDayIncrement() {
    if(currentIndex < 6){
        currentIndex++;
    }
    renderWeather(weather[currentIndex]);
}

function changeWeatherDayDecrement() {
    if(currentIndex > 0){
        currentIndex--;
    } 
    renderWeather(weather[currentIndex]);
}


// //left & right arrow click listeners
// $('.left-arrow').on('click', function (event) {
//     event.preventDefault();
//     console.log("left-arrow click");

// });








//map section
//var map;

function initAutocomplete(lat, lng) {

    if(lat && lng) {
    //console.log(lat);
    var newmark = { lat: lat, lng: lng };
    // The map, centered at the city that is searched for
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: newmark,
    });
    var input = document.getElementById("pac-input");
    var searchBox = new google.maps.places.SearchBox(input);
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener("places_changed", () => {
        var places = searchBox.getPlaces();
        if(places.length == 0){
            return;
        }
        markers.forEach((marker) => {
           marker.setMap(null); 
        });
        markers = [];
        const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    })
   
    // The marker is positioned at the city we searched for
    var marker = new google.maps.Marker({
        position: newmark,
        map: map,
       
    });
    // This added a Event Listener to open the info window
  
} else {
    return;
}



   
}



//resaurant section


