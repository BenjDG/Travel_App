//global variables


//input section
$('#input-button').on('click', function (event) {
    event.preventDefault();
    var inputCity = $('input').val();
    $('input').val("");
    console.log(inputCity);
    getCurrentWeatherData(inputCity);
    Eventlocator(inputCity);
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

            for (var i = 0; i < 7; i++) {
                $divParent = $('<div>').attr('class', 'weather-box');
                $date = $('<div>').html(dayjs.unix(res.daily[i].dt).format('MM/DD/YYYY'));
                $highTemp = $('<div>').html(toF(res.daily[i].temp.max) + "&#8457");
                $lowTemp = $('<div>').html(toF(res.daily[i].temp.min) + "&#8457");
                $description = $('<div>').html(res.daily[i].weather[0].description);
                $image = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + res.daily[i].weather[0].icon + '@2x.png');
                
                $divParent.append($date, $highTemp, $lowTemp, $description, $image);
                $('#weather').append($divParent);
                
            }
            
        })
        .then(function() {
            window.location = "#page2";
        })
}

function toF(k) {
    var f = (k - 273.15) * 9 / 5 + 32;
    return f.toFixed();
}

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



//Event section


function Eventlocator (city) {
    var currentEvents= $("#currentevents");
    currentEvents.empty();
    //var url="https://app.ticketmaster.com/discovery/v2/events.json?apikey=OGZjYNA1sXrrIMpAXLvOgsHZz0jNjF4E&city="+city;
 
    $.ajax({
     type:"GET",
     url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=OGZjYNA1sXrrIMpAXLvOgsHZz0jNjF4E&city="+city,
     async:true,
     //dataType: "json",
     success: function(json)
     {
        var responseEvents = json._embedded.events;  //Array of Events
        //While Looping through events
        //Check the name to see if it already exists
        //If it doesn't exist...add to array.
        //If it does...we need to modify the event with the extra dates?

        //We will put in events that are cleaned up in here.
        var validatedEvents = [];

        for (var i = 0; i < responseEvents.length; i++) {
            //Our cleaned up event will go here.
            var validatedEvent = {
                name: "",
                url: "",
                image: "",
                dates: []
            };

            validatedEvent.name = responseEvents[i].name;
            validatedEvent.url = responseEvents[i].url;

            //Get Image we want
            var IMAGE_HEIGHT = 360;
            var IMAGE_RATIO = "16_9"
            for (var j = 0; j < responseEvents[i].images.length; j++) {
                if (responseEvents[i].images[j].ratio === IMAGE_RATIO && responseEvents[i].images[j].height === IMAGE_HEIGHT) {
                    //Set Image
                    validatedEvent.image = responseEvents[i].images[j].url;
                    //STOP LOOP EARLY IF FOUND
                    j = responseEvents[i].images.length;
                }
            }

            //Get The Date for this event
            //New Event Object to push into array
            var eventDate = {
                date: "",
                time: "",
                timeZone: ""
            }
            eventDate.date = responseEvents[i].dates.start.localDate;
            eventDate.time = responseEvents[i].dates.start.localTime;
            eventDate.timeZone = responseEvents[i].dates.timezone;
            validatedEvent.dates.push(eventDate);
            
            //Before we push the data into the array...we need to see if it already exists.

            validatedEvents.forEach(function(event) {
                if (event.name === validatedEvent.name) {
                    event.dates.push(eventDate);
                }
            });

            var eventExists = false;
            for (var k = 0; k < validatedEvents.length; k++) {
                if (validatedEvents[k].name === validatedEvent.name) {
                    eventExists = true;
                }
            }

            if (!eventExists) {
                validatedEvents.push(validatedEvent);
            }
        }
        console.log("Validated Events ", validatedEvents);

                  
                  for (var i = 0; i < validatedEvents.length; i++) {
                   // console.log(json._embedded.events[i].startDateTime);
        
                    // $("<p>").text(validatedEvents[i].name).appendTo(currentEvents)
                    var newDiv = $("<div>");
                    var newAnchor = $("<a>").attr("href", validatedEvents[i].url).attr("target", "_blank").text(validatedEvents[i].name);
                    newDiv.append(newAnchor);
                    currentEvents.append(newDiv);
                    
                   // $("<p>").text(json._embedded.events[i].startDateTime).appendTo(currentEvents)
                    $("<img>").attr("src", validatedEvents[i].image).attr("alt", `${validatedEvents[i].name} Image`).appendTo(currentEvents);
                  }      
              },
                 error: function(xhr, status, err) {
                 console.log(err);

                 //.then(function (res) {
                   //console.log(res);
               
              }

   });

}

   