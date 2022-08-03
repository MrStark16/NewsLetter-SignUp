//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));//static folder used to refer to local file(images,css and bootstrap etc)
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data ={
    members:[
      {
        email_address:email,
        status: "subscribed",
        merge_fields : {
          FNAME :firstName,
          LNAME : lastName
        }
      }
    ]
  };

  var jasonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/86bc11ed1f";

  const options= {
    method:"POST",
    auth: "Sachin@16:8f5c05dcdbda1602353d63bab65796dd-us14"
  }

  const request = https.request(url,options,function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    });

  });

  // request.write(jasonData);
  request.end();

});

app.post("/failure", function(req,res){
  res.redirect("/");
});






app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

// API key
// 8f5c05dcdbda1602353d63bab65796dd-us14

// List id
// 86bc11ed1f
