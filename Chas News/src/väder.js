function updateDateTime() {
    // Get the current date and time
    const now = new Date();
  
    // Format the date and time as strings
    const dateString = now.toLocaleDateString(); // Date without time
    const timeString = now.toLocaleTimeString(); // Time without date
  
    // Combine date and time with extra space in between
    const dateTimeString = `${timeString}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dateString}`;
  
    // Update the content and apply the "date-time" class
    const dateTimeElement = document.getElementById('datetime');
    dateTimeElement.innerHTML = dateTimeString;
    dateTimeElement.classList.add('datum');
  }
  // Call the updateDateTime function initially
updateDateTime();

// Set up an interval to update the date and time every second
setInterval(updateDateTime, 1000);

// ******************* Väder on sidebar ******************

const apiKey = "f02a383a62d8a84368b496f0af2d5e84";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Load last searched city from local storage on page load
const lastSearchedCity = localStorage.getItem('lastSearchedCity');
if (lastSearchedCity) {
  searchBox.value = lastSearchedCity;
  checkWeather(lastSearchedCity);
}

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
  } else {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      // Set weather icon based on weather condition
      if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "./src/image/clouds.png";
      } else if (data.weather[0].main == "Clear") {
          weatherIcon.src = "./src/image/clear.png";
      } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "./src/image/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
          weatherIcon.src = "./src/image/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
          weatherIcon.src = "./src/image/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";

      // Save the current search to local storage
      localStorage.setItem('lastSearchedCity', city);
  }
}
const searchButton= searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

