// includes
var express = require("express");
var url = require("url");
var http = require("http");

//settings and default vars
var port = 3000;
var app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);
var todosJSON = [];

// from todo.js
var todos = [];
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

var t1 = new Todo('test', 'test', 'test', 'test', 'test' );
todos.push(JSON.stringify(t1));
console.log(t1);
todos.push(t1)

//clients requests todos
app.get("/todos", function (req, res) {
	console.log("todos requested!");
	res.json(todos);
});

//add todo to the server
app.get("/addtodo", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	if(query["message"]!==undefined) {
		var tx = { message : query["message"],
			type: query["type"],
			deadline: query["deadline"]
		};
		todos.push(tx);
		console.log("Added " + tx.message);
		res.end("Todo added successfully");
	}
	else {
		res.end("Error: missing message parameter");
	}
});
