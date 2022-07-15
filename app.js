//find my geolocation with button
let button = document.getElementById("get-location");
let latText = document.getElementById("latitude");
let longText = document.getElementById("longitude");

button.addEventListener("click", function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    latText.innerText = lat.toFixed(2);
    longText.innerText = long.toFixed(2);
    console.log("manual lat " + lat);
    console.log("manual long" + long);
    //alert('the geo zone is' + " latitude " + lat + " longitude " + long);
  });
});


//the funciton for my map coordonate
// Initialize and add the map automaticaly
function initMap() {
    navigator.geolocation.getCurrentPosition(function(position) {
        //requied the data about geo
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        
        //check if the data is providing
        console.log(lat);
        console.log(long);
        
        // The location curent positon on the map
        const curentPosition = { lat: lat, lng: long };
        
        // The map, centered at Uluru
        const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: curentPosition,
        });

        // The marker, positioned at Uluru
        const marker = new google.maps.Marker({
        position: curentPosition,
        map: map,
        });
        //alert('the geo zone is' + " latitude " + lat + " longitude " + long);

      });
}
window.initMap = initMap;
//End the map init

//API for wether with automatical cite detector
const input = document.querySelector("#input");
const city = document.querySelector("#city");
const cityName = document.querySelector("#cityName");
const Temp = document.querySelector("#temp");
const main = document.querySelector("#main");
const discription = document.querySelector("#description");

input.onsubmit = (e) => {
  e.preventDefault();
  weatherUpdate(city.value);
  city.value = "";
};

weatherUpdate = (city) => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cad7ec124945dcfff04e457e76760d90`);
  // in place of appid enter your open weather API Key
  // You can create it for free
  // https://home.openweathermap.org/users/sign_up

  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 404) {
      alert("Place not found");
    } else {
      var data = JSON.parse(xhr.response);
      cityName.innerHTML = data.name;
      Temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
      main.innerHTML = data.weather[0].main;
      discription.innerHTML = data.weather[0].description;
    }
  };
};
weatherUpdate("Chisinau");
//end the weather detection

