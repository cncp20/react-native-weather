const weatherURL = "http://www.sojson.com/open/api/weather/json.shtml?city=";

export function getWeather(city, successCallback) {
    fetch(weatherURL + city).then((res) => {
        return res.json();
    }).then(data => {
        successCallback(data);
    });
}