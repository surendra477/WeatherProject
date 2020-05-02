const express = require("express");
const https = require("https");
const bodyparser = require("body-parser")

const app = express();

app.use(bodyparser.urlencoded({extended: true}));

 app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const query = req.body.cityname;
  const apikey = "kfgbsdjkghwugsdmgwej"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +  "&appid=" + apikey + "&units=" + unit;

  https.get(url, function(response){
  console.log(response.statusCode);

   response.on("data", function(data){
   const weatherdata=JSON.parse(data)
   const temp = weatherdata.main.temp
   const weather = weatherdata.weather[0].description
   const icon = weatherdata.weather[0].icon
   const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
   res.write("<p>The weather in " + query +" is " + weather + "</p>")
   res.write("<h1>The temperature in <I>" + query +"</I> is " + temp + " in degree celcius</h1>");
   res.write("<img src=" + imageURL +">");
   res.send()
   })
  })
})





app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port number 3000");
})
