const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let locDate = {temp: "Temp", desc: "Description", location: "Location", humidity: "Humidity", feel: "Feel", speed: "Speed"};
    res.render('index', {locDate: locDate});
});

app.post('/', async (req, res) => {
    try{
        const location = await req.body.city;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        let locDate = {};
        locDate.temp = Math.floor(data.main.temp);
        locDate.desc = data.weather[0].description;
        locDate.feel = Math.floor(data.main.feels_like);
        locDate.humidity = data.main.humidity;
        locDate.speed = data.wind.speed;
        locDate.location = location;
        console.log(locDate);
        res.render('index', {locDate: locDate});
    } catch(err){
        console.log(err);
        res.status(400).json({data: 'not found'})
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});