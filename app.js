const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('index.ejs', {data: ''});
})

app.post('/', (req, res) => {
  const location = req.body.location ? req.body.location : "Espoo";
  const appId = "058138db6788356e4f01772051b16ce5";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + appId + "&units=metric";
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        res.render('index.ejs', {data: weatherData});
      })
    } else {
      res.render('index.ejs', {data: "0"})
    }
  })
})

app.listen(process.env.PORT || 3000);

