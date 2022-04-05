//capturo los elementos del DOM

let container = document.getElementById("container");
let searchForm = document.getElementById("search_submit");
let searchInput = document.getElementById("search_input");
let temperatureDegrees = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("wheatherIcon");
let temperatureDescription = document.getElementById("description");
let timeZone = document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.getElementById("min");
let max = document.getElementById("max");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); //evita que el formulario se envie sin nada
  getWeatherData(searchInput.value); //le pasa a la funcion lo que haya puesto en el input (ciudad)
});

// al cargar la pagina se tiene que cargar una ciudad

window.onload = () => {
  getWeatherData("Rosario");
};

const getWeatherData = async (city) => {
  //hago el request a la api y obtenfgo un objeto que contenga los datos
  const apiId = "1bbbe84f4de99a25b6f995cf56871497";
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}&units=metric&lang=sp`
  ); //nose si eso de los headers es necesario
  const data = await res.json(); //para que me muestre bien los datos

  //cambio el fondo de pantalla segun la hora
  displayBackgroundImage(data);

  //muestro los datos en pantalla
  displayData(data);
};

//declaro las funciones secundarias

const displayBackgroundImage = (obj) => {
  const country = ct.getCountry(obj.sys.country);
  const format = "en-US";//es configurable y no importa cual sea va a seguir andando
  const options = {
      timeZone: country.timezones[0], hour12: false
  };
  const originalDate = new Date(obj.dt * 1000);
  const countryTimeString = originalDate.toLocaleTimeString(format, options);
  const countryDateString = originalDate.toLocaleString(format, {...options, timeStyle: "short", dateStyle: "long",});

  //let dateRosario = new Date(obj.dt * 1000).toLocaleTimeString(undefined, {
  //timeZone: country.timezones[0],
  //}); //dos parametros, el primero que es lo que entiendo por local, el segundo un objeto que especifique funciones de como quiero que se despliegue la fecha

  //manipulo el DOM para incluir la hora
  date.textContent = `Dia y Hora ${countryDateString}`;

  //extraer la hora
  console.log(countryDateString);
  console.log(countryTimeString);
  const dayHour = parseInt(countryTimeString.split(":")[0]);


  console.log(dayHour);
  //tengo que

  //logica del dia y la noche

  if (dayHour > 6 && dayHour < 19) {
    container.classList.remove("night");
    container.classList.add("day");
  } else {
    container.classList.remove("day");
    container.classList.add("night");
  }
};

const displayData = (obj) => {
  temperatureDegrees.textContent = Math.floor(obj.main.temp); //le cambio los datos al campo con los que me va a traer el objeto
  timeZone.textContent = obj.name;
  const icon = obj.weather[0].icon;
  weatherIcon.innerHTML = `<img src='icons/${icon}.png'></img>`;
  temperatureDescription.textContent = obj.weather[0].description;
  min.textContent = Math.floor(obj.main.temp_min);
  max.textContent = Math.floor(obj.main.temp_max);
  console.log(obj);
};
