// includes
var express = require("express");
var url = require("url");
var http = require("http");

//settings and default vars
var port = 3000;
var app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);

// from todo.js
var todos [];
var labels = {};

// Todo object
function Todo(desc, dueDate, labels, notes, priority) {
  this.id = -1;
  this.description = desc;
  this.createDate = '';
  this.dueDate = dueDate;
  this.labels = labels;
  this.notes = notes;
  this.priority = priority;
  this.completed = false;
  this.deleted = false;
  this.isEditing = false;

  this.getLabelString = function() {
    var labelString = '';
    for (var i=0; i<labels.length; i++) {
      labelString += labels[i];
    }
    return labelString;
  }
};

// TodoList object
function TodoList() {
  this.todos = [];
  this.sortByDate = function() {};
  this.sortByPriority = function() {};
};

// Label object
function Label(name) {
  this.id = -1;
  this.name = name;
  this.count = 1;
};
