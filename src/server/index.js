// includes
var express = require("express");
var url = require("url");
var http = require("http");
var bodyParser = require('body-parser');
var mysql = require('mysql');
var config = require('./config.js');
var db = require('./db.js');
var endpoints = require('./endpoints.js');

db.connect();
//settings and default vars
var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + "/client"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
http.createServer(app).listen(config.port);
endpoints.initpoints(app);
