
$(document).ready(function(){
  var weatherData = {
  city: document.querySelector ("#city"),
  weather: document.querySelector ("#weather"),
  temperature: document.querySelector("#temperature"),
  temperatureValue: 0,
  units: "°C"
  
};
 
  function fetchWether(){
    var geoUrl="https://fourtonfish.com/tutorials/weather-web-app/getlocationandweather.php?owapikey=e2db5b0453a25a492e87ad8b03046a7c&units=metric";
    $.getJSON(geoUrl,function(data){
      var cityName = data.city;
      var weatherSimpleDescription = data.weather.simple;
      var weatherDescription = data.weather.description;
      var weatherTemperature = roundTemperature(data.weather.temperature);
      weatherData.temperatureValue = weatherTemperature;
        var position = {
        latitude: data.latitude,
        longitude: data.longitude
      };

      loadBackground(position.latitude, position.longitude, weatherSimpleDescription);
      weatherData.city.innerHTML = cityName;
      weatherData.weather.innerHTML =  ", " + weatherDescription;
      weatherData.temperature.innerHTML = weatherTemperature + weatherData.units;
      console.log(data);

    
    });
  }
  

  
  function roundTemperature(temperature){
			temperature = temperature.toFixed(1);
			return temperature;
		}

    function switchUnits (){
    debugger;
    if (weatherData.units == "°C") {
        weatherData.temperatureValue = roundTemperature(weatherData.temperatureValue * 9/5 + 32);
        weatherData.units = "°F";
        weatherData.temperature.innerHTML = weatherData.temperatureValue  + weatherData.units;
    
    } else {
         weatherData.temperatureValue = roundTemperature ((weatherData.temperatureValue -32) * 5/9);
        weatherData.units = "°C";  
        weatherData.temperature.innerHTML = weatherData.temperatureValue  + weatherData.units;
    }
    
    }

    function loadBackground(lat, lon, weatherTag) {
    var owmUrl="https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1452866c8cea54acd0075022ef573a07&lat=" + lat + "&lon=" + lon + "&accuracy=1&tags=" + weatherTag + "&sort=relevance&extras=url_l&format=json&jsoncallback=?";
        $.getJSON(owmUrl,function(data){
            console.log(data);
            if (data.photos.pages > 0){
            var photo = data.photos.photo[Math.floor(Math.random()*parseInt(data.photos.photo.length))];
            document.querySelector("body").style.backgroundImage = "url('" + photo.url_l + "')";
            
            }
            else{
                document.querySelector("body").style.backgroundImage = "url('http://cdn.wallpapersafari.com/17/50/jV3NHA.jpg')";
            }
        });
    }

    $("#temperature").click(switchUnits);

     fetchWether(); 
});
