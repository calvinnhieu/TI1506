var todoModule = (function () {
  'use strict';
  var todos = [];
  var labels = [];

  window.onload = function() {
    console.log('js load');
    init();
  };

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
  };

  function TodoList() {
    this.todos = [];
    this.sortByDate = function() {};
    this.sortByPriority = function() {};
  };

  function Label(name) {
    this.id = -1;
    this.name = name;
  };

  function toggleAddModule() {
    console.log('toggle add todo view');
    var addModule = document.getElementsByClassName('add-module')[0];
    if (addModule.style.display === 'none') {
      addModule.style.display = 'block';
    } else {
      addModule.style.display = 'none';
    }
  }

  function render() {
    console.log('render');
    var todosList = document.getElementsByClassName("todos-list")[0];
    while (todosList.firstChild) {
      todosList.removeChild(todosList.firstChild);
    }
    for (var i=0; i<todos.length; i++) {
      // closure
      (function(index) {
        var li = document.createElement('li');
        var desc = document.createTextNode(todos[i].description);
        var complete = document.createElement('button');
        complete.appendChild(document.createTextNode('DONE'));
        var edit = document.createElement('button');
        edit.appendChild(document.createTextNode('edit'));
        var dlt = document.createElement('button');
        dlt.appendChild(document.createTextNode('delete'));
        complete.onclick = function() {
          console.log('complete todo');
          console.log(todos[index]);
        };
        edit.onclick = function() {
          console.log('edit todo');
          console.log(todos[index]);
        };
        dlt.onclick = function() {
          console.log('dlt todo');
          console.log(todos[index]);
        };
        li.appendChild(complete);
        li.appendChild(desc);
        li.appendChild(edit);
        li.appendChild(dlt);
        todosList.appendChild(li);
      })(i);
    }
  }

  function init() {
    console.log('init');
    document.getElementsByClassName('add-module')[0].style.display = 'none';

    var filterTimeBtn = document.getElementsByClassName('filter-time-btn')[0];
    filterTimeBtn.onclick = function() {
      console.log('filter by time');
    }

    var filterPriorityBtn = document.getElementsByClassName('filter-priority-btn')[0];
    filterPriorityBtn.onclick = function() {
      console.log('filter by priority');
    };

    var addBtn = document.getElementsByClassName('add-btn')[0];
    addBtn.onclick = toggleAddModule;

    var finishAddBtn = document.getElementsByClassName('finish-add-btn')[0];
    finishAddBtn.onclick = function() {
      var desc = document.getElementsByClassName('add-desc-input')[0].value;
      var dueDate = document.getElementsByClassName('add-date-input')[0].value;
      var labels = document.getElementsByClassName('add-label-input')[0].value.split(' ');
      var notes = document.getElementsByClassName('add-notes-input')[0].value;
      var priority = document.getElementsByClassName('add-priority-input')[0].value;
      todos.push(new Todo(desc, dueDate, labels, notes, priority));
      console.log('finish add');
      console.log(todos[todos.length-1]);
      render();
    };

    render();
    // for (var i=0; i<todos.length; i++) {
    //   var completeBtn = document.getElementsByClassName('complete-btn')[0];
    //   completeBtn.onclick = function() {
    //     console.log('complete todo');
    //   };
    //   var editBtn = document.getElementsByClassName('edit-btn')[0];
    //   editBtn.onclick = function() {
    //     console.log('expand edit todo');
    //   };
    //   var deleteBtn = document.getElementsByClassName('delete-btn')[0];
    //   deleteBtn.onclick = function() {
    //     console.log('delete todo');
    //   };
    //   var finishEditBtn = document.getElementsByClassName('finish-edit-btn')[0];
    //   finishEditBtn.onclick = function() {
    //     console.log('finish edit');
    //   };
    // }
  };
})();
