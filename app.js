const city = document.querySelector("#input-city");
const form = document.querySelector("#form");
const weatherType = document.querySelector("#weather-type");
const cityH1 = document.querySelector("#city-h1");
const degreesH2 = document.querySelector("#degrees-h2");
const imgCont = document.querySelector(".img");
const mainSection = document.querySelector(".main-section");
const hello = document.querySelector("#hello");
const icon = document.querySelector("#icon");

window.addEventListener("load", function () {
  cityH1.textContent = "";
  weatherType.textContent = "";
  degreesH2.textContent = "";
  mainSection.classList.add("start-height");
  hello.classList.add("hello-position");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=b2d87d0a8f37039eca8818b105641941`;
  fetch(api, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      const clouds = "clouds";
      const clearSky = "clear sky";
      const showerRain = "shower rain";
      const rain = "rain";
      const thunderstorm = "thunderstorm";
      const snow = "snow";
      const mist = "mist";

      mainSection.classList.remove("start-height");
      hello.classList.add("hello-none");
      const { name } = data;
      const { temp } = data.main;
      const { description } = data.weather[0];
      let degreesToCelius = (temp - 273.15).toFixed(1);

      cityH1.textContent = name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const capDescription =
        description[0].toUpperCase() + description.slice(1);
      weatherType.textContent = capDescription;
      degreesH2.textContent = `${degreesToCelius} °C`;

      if (description.includes(clearSky)) {
        icon.className = "";
        icon.classList.add("fas", "fa-sun", "icon-sizing", "sun");
      } else if (description.includes(clouds)) {
        icon.className = "";
        icon.classList.add("fas", "fa-cloud", "icon-sizing", "white");
      } else if (description.includes(showerRain)) {
        icon.className = "";
        icon.classList.add(
          "fas",
          "fa-cloud-showers-heavy",
          "icon-sizing",
          "white"
        );
      } else if (description.includes(rain)) {
        icon.className = "";
        icon.classList.add(
          "fas",
          "fa-cloud-showers-heavy",
          "icon-sizing",
          "white"
        );
      } else if (description.includes(thunderstorm)) {
        icon.className = "";
        icon.classList.add("fad", "fa-thunderstorm", "icon-sizing", "white");
      } else if (description.includes(snow)) {
        icon.className = "";
        icon.classList.add("fas", "fa-snowflake", "icon-sizing", "white");
      } else if (description.includes(mist)) {
        icon.className = "";
        icon.classList.add("fas", "fa-smog", "icon-sizing", "white");
      }
    })
    .catch((err) => {
      icon.className = "";
      cityH1.textContent = "";
      weatherType.textContent = "";
      degreesH2.textContent = "";
      mainSection.classList.add("start-height");
      hello.classList.remove("hello-none");
      hello.textContent = "You must either enter a city or spell it correctly";
    });
});

function capitalizeFirstLetter() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
