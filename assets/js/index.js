//global variables


//input section
$('#input-button').on('click', function (event) {
    event.preventDefault();
    var inputCity = $('input').val();
    $('input').val("");
    console.log(inputCity);
    getCurrentWeatherData(inputCity);
    initMap();


});


//weather section
function getCurrentWeatherData(city) {

    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?appid=16e2a29d08bf4766fcdb6563c3920b3d&q=' + city;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (res) {
            //console.log(res.coord);
            var lon = res.coord.lon;
            var lat = res.coord.lat;
            getWeatherForecast(lon, lat);

        })

    //renderWeatherData(response);

}

function getWeatherForecast(lon, lat) {
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=16e2a29d08bf4766fcdb6563c3920b3d";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (res) {
            console.log(res);
            // 7-day forecast

            $('#weather').empty();
            //construct carousel
            $section = $('<section>').attr('class', 'section');
            $divContainer = $('<div>').attr('class', 'container is-clipped');
            $divCarousel = $('<div>').attr('id', 'slider');
            $('#weather').append($section);
            $section.append($divContainer)
            $divContainer.append($divCarousel);



            for (var i = 0; i < 7; i++) {
                $divParent = $('<div>').attr('class', 'item-' + (i + 1));
                $date = $('<div>').html(dayjs.unix(res.daily[i].dt).format('MM/DD/YYYY'));
                $highTemp = $('<div>').html(toF(res.daily[i].temp.max) + "&#8457");
                $lowTemp = $('<div>').html(toF(res.daily[i].temp.min) + "&#8457");
                $description = $('<div>').html(res.daily[i].weather[0].description);
                $image = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + res.daily[i].weather[0].icon + '@2x.png');

                $divParent.append($date, $highTemp, $lowTemp, $description, $image);
                $divCarousel.append($divParent);

            }

        })
        .then(function () {
            window.location = "#page2";
        })
}

function toF(k) {
    var f = (k - 273.15) * 9 / 5 + 32;
    return f.toFixed();
}

//weather carousel
bulmaCarousel.attach('#slider', {
    slidesToScroll: 2,
    slidesToShow: 1,
    infinite: true
});

// function clearWeatherData() {
//     $('#weather').empty();
// }



//map section
let map;

function initMap() {
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });




    // $('#map').empty();
    //for(var i = 0; i > 7; i++){
    //  $divParent = $("<div>");
    //  $("#map").append($divParent);
    //}
}



//resaurant section


