const COORDS = "coords"
const APIKEY = `4b87c57531f0db1d73507427b3dbb26f`;
const wheather = document.getElementById(`wheather-js`)
const loc = document.getElementById(`loc-js`)
const temp = document.getElementById(`temp-js`)


function getwhether(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`).then(
        function(json) {
            return json.json()
        }
    ).then(function(json) {
        console.log(json)
        loc.innerHTML = `<i class="far fa-compass width"></i> 현재 위치 : ${json.name}`
        temp.innerHTML = `<i class="fas fa-temperature-low width"></i>  현재 기온 : ${json.main.temp} °C`
        wheather.innerHTML = `<i class="fas fa-cloud-moon width"></i> 현재 날씨 : ${json.weather[0].main}`
        console.dir(json.weather)
    });
}

function saveGeoInfor(geoInfoObj) {
    localStorage.setItem(COORDS, JSON.stringify(geoInfoObj))
}

function successToAccess(geo) {
    var latitude = geo.coords.latitude;
    var longitude = geo.coords.longitude;
    var geoInfoObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveGeoInfor(geoInfoObj)
    getwhether(latitude, longitude)

}

function failToAccess() {
    console.log("bad")
}

function askGeoInfor() {
    navigator.geolocation.getCurrentPosition(successToAccess, failToAccess)
}

function loadGeoInfor() {
    var geoInfo = localStorage.getItem(COORDS);
    if (geoInfo === null) {
        askGeoInfor()
    } else {
        const parsedgeoInfo = JSON.parse(geoInfo)
        getwhether(parsedgeoInfo.latitude, parsedgeoInfo.longitude)
    }
}

function init() {
    loadGeoInfor();

}

init()