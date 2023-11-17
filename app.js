const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');
const app = express();


//using middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


// route
const routes = require('./base/basic');
app.use('/', routes)



//server listening
app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
}) 
