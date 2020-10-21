//global variables


//input section
$('#input-button').on('click', function (event) {
    event.preventDefault();
    var inputCity = $('input').val();
    $('input').val("");
    console.log(inputCity);
    getCurrentWeatherData(inputCity);



});

//weather section
function getCurrentWeatherData(city) {

    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?appid=16e2a29d08bf4766fcdb6563c3920b3d&q=' + city;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (res) {
            console.log(res.coord.Lon);
            var lon = res.coord.Lon;
            var lat = res.coord.Lat;
            console.log(lon);
            console.log(lat);

        })

    //renderWeatherData(response);

}

//render weather on page
// function renderWeatherData(response) {

// }



//exchange rate section


//resaurant section


