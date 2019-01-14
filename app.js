let express = require("express");
const config = require("config");
const bodyParse = require("body-parser");
const session = require('express-session');
const socketio = require("socket.io");

var app =  express();

//body-parse
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}));

//Cau Hinh View
app.set("views",__dirname+"/apps/views");
app.set("view engine","ejs");

//Static Folder
app.use("/static",express.static(__dirname+"/publics"));
var controllers = require(__dirname + "/apps/controllers");

//Session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(controllers);

const host = config.get("server.host");
const port = config.get("server.port");
var server = app.listen(port,host,()=>{
	console.log("server is Run in ",port);
});

var io = socketio(server);
var socketControl = require('./apps/common/socketControl.js')(io);
