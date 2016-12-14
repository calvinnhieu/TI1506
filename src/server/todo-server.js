// includes
var express = require("express");
var url = require("url");
var http = require("http");
var bodyParser = require('body-parser');
var mysql = require('mysql');
var config = require('./config.js');

var connection = mysql.createConnection({
	host	: 'localhost',
	port	: 3306,
	user	: 'root',
	password: config.mysql_password,
	database: config.database
});
connection.connect(function(err) {
  if (err) {
    console.error('<<<Error connecting to Db>>>');
    return;
  }
  console.log('>>>>DB Connection established');
});

//settings and default vars
var port = 3000;
var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);
var todosJSON = [];

// from todo.js
var lists = [];
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
function TodoList(listName) {
  this.id = -1;
  this.name = listName;
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

//data
function data(todos, lists) {
  this.todos = todos;
  this.lists = lists;
};

//add some test todos
todos.push(new Todo('test', 'test', '', 'test', 'test'));
todos.push(new Todo('test2', 'test2', '', 'test', 'test'));
var newList = new TodoList('Eerste')
lists.push(newList);


//ENDPOINTS
//for debugging
app.get("/todos", function (req, res) {
	console.log("todos requested!");
  var datapayload = new data(todos, lists);
	res.json(datapayload);
});

//Client requests todo and lists
app.post("/getTodos", function (req, res) {
  //get UserID
  console.log('todos gotten')
  var datapayload = new data(todos, lists);
  res.send(JSON.stringify(datapayload));
  res.end("All data")
  //return all TodoLists, Todos

});

//Client adds Todo
app.post("/addTodo", function (req, res) {
  //get a Todo object from Client
  // connection.query('INSERT INTO todos')
  console.log(req.body)
  res.end('ok')
  var Todo = req.body
  console.log(Todo)
	if(Todo["id"]!==undefined) {
    todos.push(Todo);
		console.log("Added todo" + Todo["description"]);
		res.end("Todo added successfully");
	}
	else {
		res.end("Error: missing ID parameter");
	}
});

//Client adds List
app.post("/addList", function (req, res) {
  //get a List object from Client
  console.log(req.body)
  res.end('ok')
  var List = req.body
  console.log(Todo)
	if(List["id"]!==undefined) {
    lists.push(List);
		console.log("Added list " + List["name"]);
		res.end("List added successfully");
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
