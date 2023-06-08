const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const API_KEY = '9763ec5293e2649d10972e80cffd200b8';

app.use(bodyParser.urlencoded({extended: true}));
require('dotenv').config();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/", async(req, res) => {
    let location = await req.body.city;
    // let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=763ec5293e2649d10972e80cffd200b8&units=metric`;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});

// API Key 95a8024d673400e37943f56c5cfa07a5
