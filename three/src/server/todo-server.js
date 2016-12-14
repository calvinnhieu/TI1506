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

//Client requests todo lists
app.post("/getLists", function (req, res) {
  //get UserID
  connection.query('select * from todo_list', function(err, result) {
    if (err) {
      console.error(err);
    }
    console.log('got lists');
    res.json(result);
  });
});

//Client requests todo lists
app.post("/getTodos", function (req, res) {
  //get UserID
  connection.query('select * from todo_item', function(err, result) {
    if (err) {
      console.error(err);
    }
    console.log('got todos');
    res.json(result);
  });
});

app.post("/getLabels", function (req, res) {
  //get UserID
  connection.query('select * from label', function(err, result) {
    if (err) {
      console.error(err);
    }
    console.log('got labels');
    res.json(result);
  });
});

//Client adds Todo
//TODO: fix date input
app.post("/addTodo", function (req, res) {
  console.log('add todo');
  console.log(req.body);
  var todo = {
    list_id: req.body.listId,
    description: req.body.description,
    // create_date: req.body.createDate,
    // due_date: req.body.dueDate,
    labels: req.body.labels,
    notes: req.body.notes,
    priority: req.body.priority,
    completed: req.body.completed
  };
  connection.query('insert into todo_item set ?', todo, function(err, result) {
    if (err) {
      console.error(err);
    }
    console.log('added todo');
    res.json(result);
  });
});

//Client adds List
app.post("/addList", function (req, res) {
  //get a List object from Client
  // console.log(req.body)
  // res.end('ok')
  // var List = req.body
  // console.log(Todo)
	// if(List["id"]!==undefined) {
  //   lists.push(List);
	// 	console.log("Added list " + List["name"]);
	// 	res.end("List added successfully");
	// }
	// else {
	// 	res.end("Error: missing ID parameter");
	// }
});


//Client updates Todo
app.post("/updateTodo", function (req, res) {
  var id = req.body.id;
  var todo = {
    list_id: req.body.data.listId,
    description: req.body.data.description,
    // create_date: req.body.data.createDate,
    // due_date: req.body.data.dueDate,
    labels: req.body.data.labels,
    notes: req.body.data.notes,
    priority: req.body.data.priority,
    completed: req.body.data.completed
  };
  connection.query('update todo_item set ? where id = ' + id, todo, function(err, result) {
    if (err) {
      console.error(err);
    }
    console.log('updated todo');
    res.json(result);
  });
});


//Client deletes Todo
app.post("/deleteTodo", function (req, res) {
  connection.query('delete from todo_item where id = ' + req.body.id, function(err, result) {
    if (err) {
      console.error(err);
    }
    console.log('deleted todo');
    res.json(result);
  });
	console.log("delete Todo!");
});
