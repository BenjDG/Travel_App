//global variables


//input section
$('#input-button').on('click', function (event) {
    event.preventDefault();
    var inputCity = $('input').val();
    $('input').val("");
    console.log(inputCity);
    getWeatherData(inputCity);



});

//weather section
function getWeatherData(city) {
//console.log(city);

//renderWeatherData(response);

}

//render weather on page
// function renderWeatherData(response) {

// }



//exchange rate section


//resaurant section


