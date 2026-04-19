const apiKey = "fc07cd25b66847d50f7f928a285012ee";

function getWeather(){

  const city = document.getElementById("cityInput").value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(res => res.json())
  .then(data => {

    console.log(data);

    if(data.cod != 200){
      alert("City not found");
      return;
    }

    // BASIC DATA
    document.getElementById("city").innerText = data.name;

    document.getElementById("temp").innerText =
      data.main.temp + "°C (Feels " + data.main.feels_like + "°C)";

    document.getElementById("desc").innerText = data.weather[0].main;

    // 🔥 ADVICE SYSTEM
    const feels = data.main.feels_like;
    const weather = data.weather[0].main.toLowerCase();

    let advice = "";

    // temperature based
    if(feels > 35){
      advice = "🔥 Very hot! Stay hydrated.";
    }
    else if(feels > 25){
      advice = "😎 Warm weather. Stay cool.";
    }
    else if(feels > 15){
      advice = "🙂 Pleasant weather.";
    }
    else{
      advice = "🧥 Cold! Wear warm clothes.";
    }

    // weather override
    if(weather.includes("rain")){
      advice = "🌧️ Carry an umbrella!";
    }
    if(weather.includes("cloud")){
      advice = "☁️ Cloudy day.";
    }
    if(weather.includes("clear")){
      advice = "☀️ Clear sky. Enjoy!";
    }
    if(weather.includes("haze")){
      advice = "😷 Air quality low. Wear mask.";
    }

    document.getElementById("advice").innerText = advice;

    getForecast(data.name);

  });
}

function getForecast(city){

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
  .then(res => res.json())
  .then(data => {

    console.log(data);

    const forecast = document.getElementById("forecast");
    forecast.innerHTML = "";

    for(let i=0;i<40;i+=8){

      const item = data.list[i];

      forecast.innerHTML += `
        <p>${item.dt_txt} - ${item.main.temp}°C</p>
      `;
    }

  });
}