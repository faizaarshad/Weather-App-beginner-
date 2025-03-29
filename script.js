const apiKey = "a5f7d5b1732242468f1154854252803"; // replace api key here

document.getElementById("searchButton").addEventListener("click", () => {
  const location = document.getElementById("locationInput").value;
  if (location) {
    fetchWeather(location);
  } else {
    alert("Please enter a location!");
  }
});

function fetchWeather(location) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Location not found!");
      }
      return response.json();
    })
    .then(data => {
      const temperature = data.current.temp_c; // Temperature in Celsius
      const condition = data.current.condition.text;
      const humidity = data.current.humidity;
      const windSpeed = data.current.wind_kph;

      document.getElementById("weatherInfo").innerHTML = `
        <strong>${data.location.name}, ${data.location.country}</strong> <br>
        Temperature: ${temperature}°C <br>
        Condition: ${condition} <br>
        Humidity: ${humidity}% <br>
        Wind Speed: ${windSpeed} km/h
      `;
    })
    .catch(error => {
      document.getElementById("weatherInfo").textContent = "Error: " + error.message;
    });
}
