/*global  $, Skycons*/
(function () {
    'use strict';
    
    var App = {
        APIKEY: "ff574a402fbea296397f115a420ebcf3",
        lat: "",
        lng: "",
        
        init: function () {
            //kickstart the app
            App.getLocation();
        },
        
        getLocation: function () {
            //get the current user position
            navigator.geolocation.getCurrentPosition(App.foundPosition);
        },
        
        foundPosition: function (pos) {
            //found the current user position
            App.lat = pos.coords.latitude;
            App.lng = pos.coords.longitude;
            App.getWeather();
        },
        
        getWeather: function () {
            //get current weather for my location
            var url = "https://api.forecast.io/forecast/" + App.APIKEY + "/" + App.lat + "," + App.lng;
            
            // JSONP
            window.jQuery.ajax({
                url: url,
                dataType: "jsonp",
                success: function (data) {
                    $(".weather-summary").text(data.currently.summary);
                    var temperatuur = Math.floor(((data.currently.temperature)-32)/1.8);
                    var skycons = new Skycons();
                    skycons.add("weather-icon", data.currently.icon);
                    $(".temperature").text(temperatuur+"°C");
                    skycons.play();
                    console.log(data);

                    $(".weather-summary-1h").text(data.hourly.data[1].summary);
                    skycons.add("weather-icon-1h",data.hourly.data[1].icon);
                    var temperatuur1 = Math.floor(((data.hourly.data[1].temperature)-32)/1.8);
                    $(".temperature-1h").text(temperatuur1+"°C");

                    $(".weather-summary-2h").text(data.hourly.data[2].summary);
                    skycons.add("weather-icon-2h",data.hourly.data[2].icon);
                    var temperatuur2 = Math.floor(((data.hourly.data[2].temperature)-32)/1.8);
                    $(".temperature-2h").text(temperatuur2+"°C");

                    $(".weather-summary-3h").text(data.hourly.data[3].summary);
                    skycons.add("weather-icon-3h",data.hourly.data[3].icon);
                    var temperatuur3 = Math.floor(((data.hourly.data[3].temperature)-32)/1.8);
                    $(".temperature-3h").text(temperatuur3+"°C");

                    $(".weather-summary-4h").text(data.hourly.data[4].summary);
                    skycons.add("weather-icon-4h",data.hourly.data[4].icon);
                    var temperatuur4 = Math.floor(((data.hourly.data[4].temperature)-32)/1.8);
                    $(".temperature-4h").text(temperatuur4+"°C");

                    if (data.currently.icon == "clear-day"){
                        document.body.style.backgroundColor = "skyblue";
                    }
                    else if (data.currently.icon == "clear-night"){
                        document.body.style.backgroundColor = "midnightblue";
                    }
                    else if (data.currently.icon == "partly-cloudy-day"){
                        document.body.style.backgroundColor = "lightblue";
                    }
                    else if (data.currently.icon == "partly-cloudy-night"){
                        document.body.style.backgroundColor = "darkblue";
                    }
                    else if (data.currently.icon == "cloudy"){
                        document.body.style.backgroundColor = "grey";
                    }
                    else if (data.currently.icon == "rain"){
                        document.body.style.backgroundColor = "dodgerblue";
                    }
                    else if (data.currently.icon == "sleet"){
                        document.body.style.backgroundColor = "lightgrey";
                    }
                    else if (data.currently.icon == "snow"){
                        document.body.style.backgroundColor = "whitesmoke";
                    }
                    else if (data.currently.icon == "wind"){
                        document.body.style.backgroundColor = "lightgrey";
                    }
                    else if (data.currently.icon == "fog"){
                        document.body.style.backgroundColor = "grey";
                    }

                }
            });
        }
    };
    
    App.init();
}());