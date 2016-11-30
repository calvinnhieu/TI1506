// module to create private namespace
var todoModule = (function () {
  'use strict';
  // array of all todos
  var todos = [];
  // map of all labels
  var labels = {};
  // called when html, scripts, and assets have loaded
  window.onload = function() {
    console.log('js load');
    init();
  };

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

  // sets onclick/event listeners
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
    finishAddBtn.onclick = addTodoFromInput;
  };

  function addTodoFromInput() {
    // grab user input values
    var desc = document.getElementsByClassName('add-desc-input')[0].value;
    var dueDate = document.getElementsByClassName('add-date-input')[0].value;
    var labels = document.getElementsByClassName('add-label-input')[0].value.split(' ');
    var notes = document.getElementsByClassName('add-notes-input')[0].value;
    var priority = document.getElementsByClassName('add-priority-input')[0].value;
    // create new Todo, add to todos array
    todos.push(new Todo(desc, dueDate, labels, notes, priority));
    saveLabels(labels);
    clearAddModule();
    console.log(todos[todos.length-1]);
    render();
  }

  // hides/shows add todo module
  function toggleAddModule() {
    var addModule = document.getElementsByClassName('add-module')[0];
    // set element's CSS
    if (addModule.style.display === 'none') {
      addModule.style.display = 'block';
    } else {
      addModule.style.display = 'none';
    }
  }

  // reset add module inputs
  function clearAddModule() {
    document.getElementsByClassName('add-desc-input')[0].value = '';
    document.getElementsByClassName('add-date-input')[0].value = '';
    document.getElementsByClassName('add-label-input')[0].value = '';
    document.getElementsByClassName('add-notes-input')[0].value = '';
    document.getElementsByClassName('add-priority-input')[0].value = '';
  }

  // hides/shows todo edit module
  function toggleEditModule(index) {
    if (todos[index].isEditing) {
      todos[index].isEditing = false;
    } else {
      todos[index].isEditing = true;
    }
    renderTodos();
  }

  function completeTodo(index) {
    todos[index].completed = true;
    renderTodos();
  }

  function deleteTodo(index) {
    todos[index].deleted = true;
    renderTodos();
  }

  // consolidates new labels
  function saveLabels(newLabels) {
    for (var i=0;i<newLabels.length;i++) {
      if (labels.hasOwnProperty(newLabels[i])) {
        labels[newLabels[i]].count++;
      } else {
        labels[newLabels[i]] = new Label(newLabels[i]);
      }
    }
  }

  // renders a single todo list item
  function renderTodo(index) {
    // create html elements and append to todos <ul> element
    var li = document.createElement('li');
    var desc = document.createElement('span').appendChild(document.createTextNode(todos[index].description));
    var date = document.createElement('span').appendChild(document.createTextNode('Due: '+todos[index].dueDate+' '));
    var labels = document.createElement('span').appendChild(document.createTextNode('Labels: '+todos[index].getLabelString()+' '));
    var notes = document.createElement('span').appendChild(document.createTextNode('Notes: '+todos[index].notes+' '));
    var priority = document.createElement('span').appendChild(document.createTextNode('Priority: '+todos[index].priority+' '));
    var complete;
    if (todos[index].completed) {
      complete = document.createElement('span');
    } else {
      complete = document.createElement('button');
      complete.onclick = function() {
        completeTodo(index);
      };
    }
    complete.appendChild(document.createTextNode('DONE'));
    var editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('edit'));
    var dltBtn = document.createElement('button');
    dltBtn.appendChild(document.createTextNode('delete'));
    // set onclick listeners
    editBtn.onclick = function() {
      toggleEditModule(index);
    };
    dltBtn.onclick = function() {
      deleteTodo(index);
    };
    // append to html
    li.appendChild(complete);
    li.appendChild(desc);
    // li.appendChild(date);
    // li.appendChild(labels);
    // li.appendChild(notes);
    // li.appendChild(priority);
    li.appendChild(editBtn);
    li.appendChild(dltBtn);
    if (todos[index].isEditing) {
      renderEditModule(li, index);
    }
    var todosList = document.getElementsByClassName('todos-list')[0];
    todosList.appendChild(li);
  }

  // renders edit module of a todo
  function renderEditModule(parent, index) {
    var editModule = document.createElement('div');
    var descInput = document.createElement('input');
    var dateInput = document.createElement('input');
    var labelInput = document.createElement('input');
    var notesInput = document.createElement('input');
    var priorityInput = document.createElement('input');
    var finishEditBtn = document.createElement('button');
    descInput.placeholder = 'Description';
    dateInput.placeholder = 'Due date';
    labelInput.placeholder = 'Labels';
    notesInput.placeholder = 'Notes';
    priorityInput.placeholder = 'Priority (1-3)';
    descInput.value = todos[index].description;
    dateInput.value = todos[index].dueDate;
    labelInput.value = todos[index].getLabelString();
    notesInput.value = todos[index].notes;
    priorityInput.value = todos[index].priority;
    finishEditBtn.appendChild(document.createTextNode('Save'));
    finishEditBtn.onclick = function() {
      todos[index].description = descInput.value;
      todos[index].dueDate = dateInput.value;
      todos[index].labels = labelInput.value.split(' ');
      todos[index].notes = notesInput.value;
      todos[index].priority = priorityInput.value;
      toggleEditModule(index);
    };
    editModule.appendChild(descInput);
    editModule.appendChild(dateInput);
    editModule.appendChild(labelInput);
    editModule.appendChild(notesInput);
    editModule.appendChild(priorityInput);
    editModule.appendChild(finishEditBtn);
    parent.appendChild(editModule);
  }

  // re-renders list of todos
  function renderTodos() {
    var todosList = document.getElementsByClassName('todos-list')[0];
    // remove all todos from view
    while (todosList.firstChild) {
      todosList.removeChild(todosList.firstChild);
    }
    // repopulate todos view
    for (var i=0; i<todos.length; i++) {
      if (!todos[i].deleted) {
        renderTodo(i);
      }
    }
  }

  // renders a Label
  function renderLabel(label, parent) {
    // console.log(labels[label].name);
    var li = document.createElement('li');
    var span = document.createElement('span').appendChild(document.createTextNode(labels[label].name));
    li.appendChild(span);
    parent.appendChild(li);
  }

  // renders list of labels
  function renderLabels() {
    var labelsList = document.getElementsByClassName('labels')[0];
    // clear labels list
    while (labelsList.firstChild) {
      labelsList.removeChild(labelsList.firstChild);
    }
    // repopulate labels list
    var currentLabels = Object.keys(labels);
    for (var i=0; i<currentLabels.length; i++) {
      console.log(currentLabels[i]);
      renderLabel(currentLabels[i], labelsList);
    }
  }

  function render() {
    renderLabels();
    renderTodos();
  }


})();
