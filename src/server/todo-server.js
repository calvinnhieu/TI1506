// includes
var express = require("express");
var url = require("url");
var http = require("http");
var bodyParser = require('body-parser')

//settings and default vars
var port = 3000;
var app = express();
app.use(bodyParser());
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

//add some test todos
todos.push(new Todo('test', 'test', '', 'test', 'test'));
todos.push(new Todo('test2', 'test2', '', 'test', 'test'));

//ENDPOINTS
//for debugging
app.get("/todos", function (req, res) {
	console.log("todos requested!");
	res.json(todos);
});

//Client requests ToDo
app.post("/getTodos", function (req, res) {
  //get UserID
  console.log('todos gotten')
  res.send(JSON.stringify(todos));
  res.end("All todos")
  //return all TodoLists, Todos

});

//Client adds Todo
app.post("/addTodo", function (req, res) {
  //get a Todo object from Client
  console.log(req.body)
  res.end('ok')
  var Todo = req.body
  console.log(Todo)
	if(Todo["id"]!==undefined) {
    todos.push(Todo);
		console.log("Added " + Todo["description"]);
		res.end("Todo added successfully");
	}
	else {
		res.end("Error: missing ID parameter");
	}
});


//Client updates Todo
app.post("/updateTodo", function (req, res) {
  //get a Todo Object from client
  //replace Todo with id Object with the recieved object
  //return 'ok'
	console.log("update Todo");
});


//Client deletes Todo
app.post("/delTodo", function (req, res) {
  //get an id from client
  //delete Todo with given id
  //return 'ok'
	console.log("delete Todo!");
});
