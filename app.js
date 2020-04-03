const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res) {
    const query = req.body.cityName;
    const apiKey = "92f1631104a759934e63ed82a911cb41";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data) { //Convert data from Hex to JS object
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<img src=" + iconUrl + ">");
            res.write("<h1>The temperature in " + query + " is " + temp + " degress Celcius</h1>");
            res.send();
        });
    });


})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,() => 
console.log("Server is running on port " + port));

