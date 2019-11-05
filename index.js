const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { pool } = require('./config')
//const Datastore = require('nedb');
//const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// muodosta pg client ja yhdistä

/*
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});
*/

//client.connect();

//laita palvelin kuuntelemaan porttia

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});
app.use(express.static('public'));
//app.use(express.json({ limit: '1mb'}));

//muodosta database
/*
const database = new Datastore('database.db');
database.loadDatabase();
*/

const db = require('./queries');

app.get('/api', db.getUsers);

app.post('/api', db.createUser);

/*
app.post('/api', (request, response) => {
    console.log('I got a request!');
    //console.log(request.body);
    console.log(request);
    //const data = request.body;
    const data = request;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    //console.log(database);
    response.json({
        status: 'success',
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon
    });
});
*/
