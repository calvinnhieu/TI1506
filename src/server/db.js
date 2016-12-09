var mysql = require('mysql');

var connection = mysql.createConnection({
	host	: 'localhost',
	port	: 3306,
	user	: 'root',
	password: 'anoewe2',
	database: 'todo'
})

connection.connect(function(err){
  if(err){
    console.log('<<<Error connecting to Db>>>');
    return;
  }
  console.log('>>>>Connection established');
});

var user_luc = {
	email : 'Luc',
	password : 'wachtwoord'
};

var todo_list = {
	name : 'Standard List',
	owner_id : 1
};

var todo_item = {
	todo_list_id : 1,
	description : 'Groceries',
	//labels = '',
	//notes = '',
	due_date : '2017-01-12 08:00:00'
}

connection.query('INSERT INTO user SET ?', user_luc, function(err, result){
	if(err) throw err;
});

connection.query('INSERT INTO todo_list SET ?', todo_list, function(err, result){
	if(err) throw err;
});

connection.query('INSERT INTO todo_item SET ?', todo_item, function(err, result){
	if(err) throw err;
});

connection.query('SELECT * FROM user', function(err, result){
	if(err) throw err;
	console.log(result);
});
