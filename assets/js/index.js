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

            for (var i = 0; i < 7; i++) {
                $divParent = $('<div>');
                $date = $('<div>').html(dayjs.unix(res.daily[i].dt).format('MM/DD/YYYY'));
                $highTemp = $('<div>').html(toF(res.daily[i].temp.max) + "&#8457");
                $lowTemp = $('<div>').html(toF(res.daily[i].temp.min) + "&#8457");
                $description = $('<div>').html(res.daily[i].weather[0].description);
                $image = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + res.daily[i].weather[0].icon + '@2x.png');
                
                $divParent.append($date, $highTemp, $lowTemp, $description, $image);
                $('#weather').append($divParent);
            }
            
        })
}

function toF(k) {
    var f = (k - 273.15) * 9 / 5 + 32;
    return f.toFixed();
}

// function clearWeatherData() {
//     $('#weather').empty();
// }



//exchange rate section
//function tripadvisory(){
    var queryURL = "https://www.travel-advisory.info/api"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
//}

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://rapidapi.p.rapidapi.com/api/countries/US",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "travel-hacking-tool.p.rapidapi.com",
		"x-rapidapi-key": "89701e5d1amshdd9297133bad4e3p160225jsn0869b9ec377f"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});


//resaurant section


