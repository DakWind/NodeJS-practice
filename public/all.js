getData();

// form the map

const mymap = L.map('mapid').setView([44.42, 26.10], 2);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(mymap);

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const marker = L.marker([item.lat, item.lon]).addTo(mymap);

        const root = document.createElement('div');
        //const timestamp = document.createElement('div');
        const geo = document.createElement('div');
        
        //const timestampString = new Date(item.timestamp).toLocaleString();
        //timestamp.textContent = timestampString
        geo.textContent = `geo: ${item.lat}, ${item.lon}`;

        const txt = `latitude: ${item.lat}; longitude: ${item.lon}`//; time: ${timestampString}`

        marker.bindPopup(txt);

        root.append(geo);
        //root.append(timestamp, geo);
        document.body.append(root);
    }
    console.log(data);
}