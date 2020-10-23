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

            for (var i = 0; i < 7; i++) {
                
                
            }
            console.log(res.daily[0]);
            console.log(dayjs.unix(res.daily[0].dt).format('MM/DD/YYYY'));
            console.log(toF(res.daily[0].temp.max));
            console.log(toF(res.daily[0].temp.min));
            console.log(res.daily[0].weather[0].description);
            console.log(res.daily[0].weather[0].icon);
        })
}

function toF(k) {
    var f = (k - 273.15) * 9 / 5 + 32;
    return f.toFixed();
}

function renderWeatherData(response) {

}

function clearWeatherData(params) {
    
}



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


