const apiKey = "fc07cd25b66847d50f7f928a285012ee";

// ENTER key support
document.getElementById("cityInput").addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    getWeather();
  }
});

function getWeather() {

  const city = document.getElementById("cityInput").value.trim();

  if(city === ""){
    alert("Please enter a city name!");
    return;
  }

  // NORMAL SEARCH
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(res => res.json())
  .then(data => {

    if(data.cod !== 200){
      // fallback to Kolkata
      alert("City not found! Showing Kolkata instead.");

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => updateUI(data));

      return;
    }

    updateUI(data);

  })
  .catch(() => {
    alert("Error fetching data!");
  });

}

// UI UPDATE FUNCTION (clean code)
function updateUI(data){

  document.getElementById("city").innerText = data.name;

  document.getElementById("temp").innerText =
    data.main.temp + "°C (Feels " + data.main.feels_like + "°C)";

  document.getElementById("desc").innerText = data.weather[0].main;

  document.getElementById("extra").innerText =
    "Humidity: " + data.main.humidity + "% | Wind: " + data.wind.speed + " m/s";

  // ICON LOGIC
  const icon = document.getElementById("icon");
  const weather = data.weather[0].main.toLowerCase();

  if(weather.includes("rain")){
    icon.className = "fa-solid fa-cloud-rain weather-icon";
  }
  else if(weather.includes("cloud")){
    icon.className = "fa-solid fa-cloud weather-icon";
  }
  else if(weather.includes("clear")){
    icon.className = "fa-solid fa-sun weather-icon";
  }
  else if(weather.includes("haze") || weather.includes("smoke")){
    icon.className = "fa-solid fa-smog weather-icon";
  }
  else if(weather.includes("thunder")){
    icon.className = "fa-solid fa-bolt weather-icon";
  }
  else{
    icon.className = "fa-solid fa-cloud weather-icon";
  }
}