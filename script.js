const apiKey = "fc07cd25b66847d50f7f928a285012ee"; // এখানে নিজের API key বসা

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const result = document.getElementById("result");

  if (city === "") {
    result.innerHTML = "Enter a city name!";
    return;
  }

  result.innerHTML = "⏳ Fetching weather...";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        result.innerHTML = "City not found ❌";
        return;
      }

      // 🔥 ICON
const condition = data.weather[0].main;

let icon = "";

if (condition === "Clouds") icon = "☁️";
else if (condition === "Rain") icon = "🌧️";
else if (condition === "Clear") icon = "☀️";
else if (condition === "Haze") icon = "🌫️";
else if (condition === "Smoke") icon = "🌫️";
else icon = "🌍"; // fallback

result.innerHTML = `
  <h2>${data.name}</h2>
  
  <div class="icon">${icon}</div>
  
  <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
  <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
  <p><strong>Condition:</strong> ${condition}</p>
`;

      changeBackground(data.weather[0].main);
    })
    .catch(() => {
      result.innerHTML = "Error fetching data!";
    });
}

// 🔥 ENTER KEY SUPPORT
document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

// 🔥 DYNAMIC BACKGROUND
function changeBackground(condition) {
  document.body.style.transition = "0.5s";

  if (condition === "Clear") {
    document.body.style.background = "orange";
  } else if (condition === "Clouds") {
    document.body.style.background = "gray";
  } else if (condition === "Rain") {
    document.body.style.background = "darkblue";
  } else {
    document.body.style.background = "#4facfe";
  }
}
