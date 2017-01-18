//includes
var express = require("express");
var url = require("url");
var http = require("http");
var bodyParser = require('body-parser');
var mysql = require('mysql');
var config = require('./config.js');
var db = require('./db.js');
var passport = require('passport');

var User = {};


exports.initpoints = function(app){
  //ENDPOINTS

  app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  app.get('/authsuccess',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
      console.log(res.req.client.parser.incoming.user)
      res.redirect('/todo.html');
    });

  app.get('/template', function(req, res) {
  	console.log('serving template todos.ejs');
    db.query('select * from todo_item', function(err, result) {
      if (err) {
        console.error(err);
      }
  		res.render('todos', {todos: result});
    });
  });

  //for debugging
  app.get("/todoss?", function (req, res) {
  	console.log("todos requested!");
    var datapayload = new data(todos, lists);
  	res.json(datapayload);
  });

  //Client requests todo lists
  app.get("/getListss?/:uid", function (req, res) {
  	var uid = req.params.uid;
    //get UserID
    db.query('select * from todo_list where owner_id = ' + uid, function(err, result) {
      if (err) {
        console.error(err);
      }
      console.log('got lists');
      res.json(result);
    });
  });

  //Client requests todo lists
  app.get("/getTodoo?ss?/:uid", function (req, res) {
  	var uid = req.params.uid;
    //get UserID
    db.query('select ti.* from todo_item as ti join todo_list as tl on ti.list_id = tl.id where tl.owner_id = ' + uid, function(err, result) {
      if (err) {
        console.error(err);
      }
      console.log('got todos');
      res.json(result);
    });
  });

  app.get("/getLabell?s", function (req, res) {
  	var uid = req.params.uid;
    //get UserID
    db.query('select * from label', function(err, result) {
      if (err) {
        console.error(err);
      }
      console.log('got labels');
      res.json(result);
    });
  });

  //Client adds Todo
  //TODO: fix date input
  app.post("/addTodos?", function (req, res) {
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
    db.query('insert into todo_item set ?', todo, function(err, result) {
      if (err) {
        console.error(err);
      }
      console.log('added todo');
      res.json(result);
    });
  });

  //Client adds List
  app.post("/addLists?", function (req, res) {
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
  app.post("/updateTodoo?", function (req, res) {
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
    db.query('update todo_item set ? where id = ' + id, todo, function(err, result) {
      if (err) {
        console.error(err);
      }
      console.log('updated todo');
      res.json(result);
    });
  });


  //Client deletes Todo
  app.post("/deleteTodoo?", function (req, res) {
    db.query('delete from todo_item where id = ' + req.body.id, function(err, result) {
      if (err) {
        console.error(err);
      }
      console.log('deleted todo');
      res.json(result);
    });
  	console.log("delete Todo!");
  });

  //analytics endpoints

  //List Todoslist from given user
  //user id

  app.post("/listListUserr?", function (req, res) {
    db.query('SELECT * FROM todo.todo_list WHERE owner_id =  ' + req.body.id, function(err, result) {
      if (err) {
        console.error(err);
      }
      console.log('List lists from user todo');
      res.json(result);
    });
  });

  //List Todolist for given Todo
  // list id
  app.post("/listTodoLists?", function (req, res) {
    db.query('SELECT * FROM todo.todo_item WHERE todo_list_id = ' + req.body.id, function(err, result) {
      if (err) {
        console.error(err);
      }
      console.log('List todos from given list');
      res.json(result);
    });
  });

  //Paginated list Todolist for given Todo
  //list id, lowLim, hiLim

  app.post("/paglistTodoListt?", function (req, res) {
    db.query('SELECT * FROM todo.todo_item WHERE todo_list_id = ' +  req.body.id +' LIMIT ' + req.body.lowLim + ', ' + req.body.hiLim, function(err, result) {
      if (err) {
        console.error(err);
      }
      console.log('List todos from given list with pagination');
      res.json(result);
    });
  });




};
