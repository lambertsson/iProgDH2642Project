// Waiting for the API key from AccuWeather. But this gets your location using html5! (^_^)

function success(position) {
    var s = document.querySelector('#status');

    if (s.className == 'success') {  
        return;
    }

    s.innerHTML = "Found you! <br>You location is:<br>" + "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude + "<br>And this will be used for weather at your location (which uses a REST API)!";
    s.className = 'success';
}


function error(msg) {
    var s = document.querySelector('#status');
    s.innerHTML = typeof msg == 'string' ? msg : "failed";
    s.className = 'fail';
}


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    error('not supported');
}