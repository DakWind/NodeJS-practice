let lat;
let lon;
const button = document.getElementById("submit");

button.addEventListener('click', async event => {
//const timestamp = Date.now();
const data = { lat, lon };
const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};
const response = await fetch('/api', options);
const json = await response.json();
console.log(json);
});

// form the map

const mymap = L.map('mapid').setView([51.505, -0.09], 3);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(mymap);

// make the marker

const marker = L.marker([0, 0]).addTo(mymap);

// get location and move map

if ("geolocation" in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        lat = position.coords.latitude;
        document.getElementById('latitude').textContent = lat.toFixed(2);
        lon = position.coords.longitude;
        document.getElementById('longitude').textContent = lon.toFixed(2);
        marker.setLatLng([lat, lon]);
        mymap.flyTo([lat, lon]);
        });
} else {
  console.log('geolocation not available');
}

