var inputdata = document.querySelector("#input-box");
let city = document.querySelector("#city");
let temp = document.querySelector("#temp");
let date = document.querySelector("#date");
let minmax = document.querySelector("#min-max");


const weatherApi = {
    key: "e35007066df7cd28f0d3f9bbb66515de",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}

inputdata.addEventListener('keypress', (event) => {
    //console.log(`key=${event.key},code=${event.code}, keycode = ${event.keyCode}`);
    // console.log(event.keyCode);
    if (event.keyCode == 13) {
        console.log(inputdata.value);

        getReport(inputdata.value);
        document.querySelector('.weather-body').style.display = "block";
    }
})

/* function getReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => weather.json())
        .then((json) => {
            alert(JSON.stringify(json));
        })
}
*/
function getReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

function showWeatherReport(weather) {
    //console.log(weather);

    city.innerText = `${weather.name}, ${weather.sys.country}`;
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    //temp.innerText = `${Math.round(weather.main.temp)}&deg;C`;
    //console.log(weather.main.temp);
    minmax.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;
    let weatherType = document.querySelector("#weather");
    weatherType.innerText = `${weather.weather[0].main}`;
    let todayDate = new Date();
    date.innerText = getDate(todayDate);

    if (weatherType.textContent == 'Clear') {
        console.log("test");
        document.body.style.backgroundImage = "url('image/clear.jpg')";

    } else if (weatherType.textContent == 'Clouds') {
        console.log("test");
        document.body.style.backgroundImage = "url('image/cloud.jpg')";

    } else if (weatherType.textContent == 'Haze') {
        console.log("test");
        document.body.style.backgroundImage = "url('image/cloudHaze.jpg')";

    } else if (weatherType.textContent == 'Rain') {

        document.body.style.backgroundImage = "url('image/rain.jpg')";

    } else if (weatherType.textContent == 'Snow') {

        document.body.style.backgroundImage = "url('image/snow.jpg')";

    } else if (weatherType.textContent == 'Thunderstorm') {

        document.body.style.backgroundImage = "url('image/Thunderstorm.jpg')";

    }
}

function getDate(dateinp) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateinp.getFullYear();
    //console.log(year);
    let month = months[dateinp.getMonth()];
    //console.log(month);
    let date = dateinp.getDate();
    let day = days[dateinp.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}