const apiKey = "fc07cd25b66847d50f7f928a285012ee";

/* ================= WEATHER ================= */

function getWeather(){

  const city = document.getElementById("cityInput").value.trim();

  if(city === ""){
    alert("Enter city name");
    return;
  }

  document.getElementById("loading").style.display = "block";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(res => res.json())
  .then(data => {

    if(data.cod != 200){
      alert("City not found");
      return;
    }

    updateUI(data);
    getForecast(data.name);

  })
  .catch(err => console.log(err))
  .finally(() => {
    document.getElementById("loading").style.display = "none";
  });
}

/* ================= UI UPDATE ================= */

function updateUI(data){

  const feels = data.main.feels_like;
  const weather = data.weather[0].main.toLowerCase();

  document.getElementById("city").innerText = data.name;

  document.getElementById("temp").innerText =
    `${data.main.temp}°C (Feels ${feels}°C)`;

  document.getElementById("desc").innerText = data.weather[0].main;

  document.getElementById("extra").innerText =
    `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;

  /* ================= AI ENGINE ================= */

  const aiMessage = getAISuggestion(
    data.main.temp,
    feels,
    weather,
    data.main.humidity,
    data.wind.speed
  );

  document.getElementById("advice").innerText = aiMessage;

  /* ================= ICON ================= */

  const icon = document.getElementById("icon");

  if(weather.includes("rain")) icon.className = "fa-solid fa-cloud-rain weather-icon";
  else if(weather.includes("clear")) icon.className = "fa-solid fa-sun weather-icon";
  else if(weather.includes("cloud")) icon.className = "fa-solid fa-cloud weather-icon";
  else if(weather.includes("haze")) icon.className = "fa-solid fa-smog weather-icon";
  else icon.className = "fa-solid fa-cloud weather-icon";

  /* ================= BACKGROUND ================= */

  setBackground(weather);
}

/* ================= AI ENGINE ================= */

function getAISuggestion(temp, feels, weather, humidity, wind){

  let msg = "";

  // TEMP LOGIC
  if(feels >= 38){
    msg = "🔥 Extreme heat! Stay indoors & hydrated.";
  }
  else if(feels >= 30){
    msg = "😎 Hot weather. Avoid long outdoor exposure.";
  }
  else if(feels >= 20){
    msg = "🙂 Nice weather. Good for outdoor activities.";
  }
  else if(feels >= 10){
    msg = "🧥 Cool weather. Wear warm clothes.";
  }
  else{
    msg = "❄️ Very cold! Stay warm.";
  }

  // WEATHER OVERRIDES
  if(weather.includes("rain")){
    msg = "🌧️ Rain expected! Carry umbrella.";
  }

  if(weather.includes("haze")){
    msg = "😷 Poor air quality. Wear mask.";
  }

  if(weather.includes("cloud")){
    msg += " ☁️ Cloudy sky.";
  }

  // ADDITIONS
  if(wind > 10){
    msg += " 💨 Strong winds.";
  }

  if(humidity > 80){
    msg += " 💧 High humidity.";
  }

  return msg;
}

/* ================= FORECAST ================= */

function getForecast(city){

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
  .then(res => res.json())
  .then(data => {

    const forecast = document.getElementById("forecast");
    forecast.innerHTML = "";

    for(let i = 0; i < 40; i += 8){

      const item = data.list[i];

      forecast.innerHTML += `
        <div class="forecast-card">
          <p>${item.dt_txt.split(" ")[0]}</p>
          <p>${Math.round(item.main.temp)}°C</p>
        </div>
      `;
    }

  });
}

/* ================= BACKGROUND SYSTEM ================= */

function setBackground(weather){

  document.body.classList.remove(
    "sunny", "rainy", "cloudy", "haze", "cold"
  );

  if(weather.includes("clear")){
    document.body.classList.add("sunny");
  }
  else if(weather.includes("rain")){
    document.body.classList.add("rainy");
  }
  else if(weather.includes("cloud")){
    document.body.classList.add("cloudy");
  }
  else if(weather.includes("haze")){
    document.body.classList.add("haze");
  }
  else{
    document.body.classList.add("cold");
  }
}