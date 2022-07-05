/*
    Api Documentation 
    https://openweathermap.org/current 
*/ 

const express = require("express");
const app = express();
const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

require('dotenv').config();
const api_key = process.env.API_KEY;

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    // res.write("Server is Up and Running");
})

app.post("/",function(req,res){
    console.log("Post request received");
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + api_key;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp= weatherData.main.temp;
            const weatherDescp=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>Weather at " + query + " is "+ weatherDescp + "</h1>");
            res.write("<h2>The Temp is "+ temp +" Degree C</h2>");
            res.write("<img src="+ imageUrl +">");
        })
    })

})


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});