// includes
var express = require("express");
var url = require("url");
var http = require("http");
var bodyParser = require('body-parser');
var mysql = require('mysql');
var config = require('./config.js');
var db = require('./db.js');
var endpoints = require('./endpoints.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');

db.connect();
//settings and default vars
var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + "/client"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
http.createServer(app).listen(config.port);
app.use(require('express-session')(
  { secret: 'keyboard cat', resave: true, saveUninitialized: true }));
passport.use(new GoogleStrategy({
    clientID: '638829096835-3m5fvrbsgmiui8bldbfcdgacnc90hm4j.apps.googleusercontent.com',
    clientSecret: '17P4_hHWeHIe5NNMG2ji-el_',
    callbackURL: "http://127.0.0.1:3000/authsuccess"
  },
  function(accessToken, refreshToken, profile, done) {
       //console.log(profile.id);
       return done(null, profile.id);
  }
));
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(passport.session());
endpoints.initpoints(app);
