var mysql = require('mysql');
var config = require('./config.js');

var connection;

exports.connect = function() {
  connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: config.mysql_password,
    database: config.database
  });
  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to DB');
      return;
    }
    console.log('Successfully connected to DB');
  });
};

exports.query = function(query, values, callback) {
  connection.query(query, values, callback);
};
