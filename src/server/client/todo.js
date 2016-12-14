// module to create private namespace
var todoModule = (function () {
  'use strict';
  var currentList = null;
  var lists = [];
  // array of all todos
  // var todos = []
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
    this.listid
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


  function getLabelString(labels) {
    var labelString = '';
    for (var i=0; i<labels.length; i++) {
      labelString += labels[i];
    }
    return labelString;
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

  // sets onclick/event listeners
  function init() {
    console.log('init');
    var emptydata = ''
    $.post('/getTodos', emptydata, initServer, 'json');

    document.getElementsByClassName('add-module')[0].style.display = 'none';
    document.getElementsByClassName('add-list-module')[0].style.display = 'none';

    var filterTimeBtn = document.getElementsByClassName('filter-time-btn')[0];
    filterTimeBtn.onclick = function() {
      console.log('filter by time');
    }

    var filterPriorityBtn = document.getElementsByClassName('filter-priority-btn')[0];
    filterPriorityBtn.onclick = function() {
      console.log('filter by priority');
    };

    var addBtn = document.getElementsByClassName('add-btn')[0];
    addBtn.onclick = function() {
      toggleElementVisibility('add-module');
    };

    var addListBtn = document.getElementsByClassName('add-list-btn')[0];
    addListBtn.onclick = function() {
      toggleElementVisibility('add-list-module');
    };

    var finishAddBtn = document.getElementsByClassName('finish-add-btn')[0];
    finishAddBtn.onclick = addTodoFromInput;

    var finishAddListBtn = document.getElementsByClassName('finish-add-list-btn')[0];
    finishAddListBtn.onclick = function() {
      var name = document.getElementsByClassName('list-name-input')[0].value;
      addList(name);
    };
    render();
  };

  function addList(name) {
    for (var i = 0; i < lists.length; i++) {
      if (lists[i].name === name) {
        console.error('You can not have two lists with the same name');
        return;
      }
    }
    var newList = new TodoList(name)
    lists.push(newList);
    toggleElementVisibility('add-list-module');
    $.post('/addList', newList, function(response) {
    // Do something with the request
    console.log('new list to server')
}, 'json');
    render();
  }

  function initServer(todosserver){
    console.log("Loading lists and todos from server");
    console.log('Default object');
    console.log(todosserver);
    TodoList.todos = todosserver.todos;
    lists = todosserver.lists;
    console.log('todos array');
    console.log(TodoList.todos)
    saveLabels(labels);
    render();

  };

  function addTodoFromInput() {
    // grab user input values
    var desc = document.getElementsByClassName('add-desc-input')[0].value;
    var dueDate = document.getElementsByClassName('add-date-input')[0].value;
    var labels = document.getElementsByClassName('add-label-input')[0].value.split(' ');
    var notes = document.getElementsByClassName('add-notes-input')[0].value;
    var priority = document.getElementsByClassName('add-priority-input')[0].value;
    // create new Todo, add to todos array
    var newTodo = new Todo(desc, dueDate, labels, notes, priority)

    lists[currentList].todos.push(newTodo);
    $.post('/addTodo', JSON.stringify(newTodo), function(response) {
      // Do something with the request
      console.log('new todo to server')
    });
    saveLabels(labels);
    clearAddModule();
    console.log(lists[currentList].todos[lists[currentList].todos.length-1]);
    // console.log(todos[todos.length-1]);
    render();
  }

  function toggleElementVisibility(elClass) {
    var el = document.getElementsByClassName(elClass)[0];
    // set element's CSS
    if (el.style.display === 'none') {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  }

  function removeChildren(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
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
    if (lists[currentList].todos[index].isEditing) {
      lists[currentList].todos[index].isEditing = false;
    } else {
      lists[currentList].todos[index].isEditing = true;
    }
    renderTodos();
  }

  function completeTodo(index) {
    lists[currentList].todos[index].completed = true;
    renderTodos();
  }

  function uncompleteTodo(index) {
    lists[currentList].todos[index].completed = false;
    renderTodos();
  }

  function deleteTodo(index) {
    lists[currentList].todos.splice(index, 1);
    renderTodos();
  }

  function isTodoOverdue(index) {
    return false;
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

  function setCurrentList() {
    var listSelect = document.getElementsByClassName('list-select')[0].children[0];
    var selected = listSelect.options[listSelect.selectedIndex].text;
    for (var i = 0; i < lists.length; i++) {
      if (lists[i].name === selected) {
        currentList = i;
      }
    }
  }

  // renders a single todo list item
  function renderTodo(index) {
    // create html elements and append to todos <ul> element
    var li = document.createElement('li');
    var todoContainer = document.createElement('div');
    todoContainer.className += " todo-item flex flex-row";
    var left = document.createElement('div');
    var right = document.createElement('div');
    var desc = document.createElement('span').appendChild(document.createTextNode(lists[currentList].todos[index].description));
    var date = document.createElement('span').appendChild(document.createTextNode(lists[currentList].todos[index].dueDate+' '));
    var priority = document.createElement('span');
    var priorityIcon = document.createElement('i');
    priorityIcon.className += 'fa fa-sort';
    priority.appendChild(priorityIcon);
    priority.appendChild(document.createTextNode(' ' + lists[currentList].todos[index].priority + ' '));
    var labels = document.createElement('span').appendChild(document.createTextNode('Labels: '+getLabelString(lists[currentList].todos[index].labels)+' '));
    var notes = document.createElement('span').appendChild(document.createTextNode('Notes: '+lists[currentList].todos[index].notes+' '));
    switch (lists[currentList].todos[index].priority) {
      case '1':
        priority.className += ' priority-1';
        left.appendChild(priority);
        break;
      case '2':
        priority.className += ' priority-2';
        left.appendChild(priority);
        break;
      case '3':
        priority.className += ' priority-3';
        left.appendChild(priority);
        break;
      default:
        // console.log('invalid priority');
        break;
    }
    var complete;
    if (lists[currentList].todos[index].completed) {
      complete = document.createElement('i');
      complete.className += "fa fa-check-square-o todo-item-complete";
      complete.onclick = function() {
        uncompleteTodo(index);
      }
    } else {
      if (isTodoOverdue(index)) {
        todoContainer.className += " todo-item-overdue";
      }
      complete = document.createElement('button');
      complete.appendChild(document.createTextNode('Complete'));
      complete.onclick = function() {
        completeTodo(index);
      };
    }
    complete.className += " mar-right-2";
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
    left.appendChild(complete);
    left.appendChild(desc);
    todoContainer.appendChild(left);
    right.appendChild(date);
    right.appendChild(editBtn);
    right.appendChild(dltBtn);
    todoContainer.appendChild(right);
    li.appendChild(todoContainer);
    // li.appendChild(labels);
    // li.appendChild(notes);
    if (lists[currentList].todos[index].isEditing) {
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
    descInput.value = lists[currentList].todos[index].description;
    dateInput.value = lists[currentList].todos[index].dueDate;
    labelInput.value = getLabelString(lists[currentList].todos[index].labels);
    notesInput.value = lists[currentList].todos[index].notes;
    priorityInput.value = lists[currentList].todos[index].priority;
    finishEditBtn.appendChild(document.createTextNode('Save'));
    finishEditBtn.onclick = function() {
      lists[currentList].todos[index].description = descInput.value;
      lists[currentList].todos[index].dueDate = dateInput.value;
      lists[currentList].todos[index].labels = labelInput.value.split(' ');
      lists[currentList].todos[index].notes = notesInput.value;
      lists[currentList].todos[index].priority = priorityInput.value;
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
    // make contols visible
    document.getElementsByClassName('add-btn')[0].style.display = 'block';
    document.getElementsByClassName('todos-container')[0].style.display = 'block';
    // set todo list name
    // var listSelect = document.getElementsByClassName('list-select')[0].children[0];
    // var selectedListName = listSelect.options[listSelect.selectedIndex].text;
    document.getElementsByClassName('list-label')[0].innerHTML = lists[currentList].name;
    var todosList = document.getElementsByClassName('todos-list')[0];
    // remove all todos from view
    removeChildren(todosList);
    // repopulate todos view
    for (var i=0; i<lists[currentList].todos.length; i++) {
      renderTodo(i);
    }
  }

  // renders list dropdown
  function renderListSelect() {
    if (lists.length > 0) {
      var container = document.getElementsByClassName('list-select')[0];
      var listSelect;
      if (container.children.length === 0) {
        listSelect = document.createElement('select');
        listSelect.onchange = function() {
          setCurrentList();
          render();
        };
        container.appendChild(listSelect);
      }
      listSelect = container.children[0];
      for (var i=0; i<lists.length; i++) {
        var exists = false;
        for (var j=0; j<listSelect.options.length; j++) {
          if (listSelect.options[j].text === lists[i].name) {
            exists = true;
          }
        }
        if (!exists) {
          var option;
          option = document.createElement('option');
          option.innerHTML = lists[i].name;
          listSelect.appendChild(option);
        }
      }
      setCurrentList();
    }
  }

  // renders a Label
  function renderLabel(label, parent) {
    // console.log(labels[label].name);
    var li = document.createElement('li');
    li.className += ' light-text';
    var span = document.createElement('span').appendChild(document.createTextNode(labels[label].name));
    li.appendChild(span);
    parent.appendChild(li);
  }

  // renders list of labels
  function renderLabels() {
    var labelsList = document.getElementsByClassName('labels')[0];
    // clear labels list
    removeChildren(labelsList);
    // repopulate labels list
    var currentLabels = Object.keys(labels);
    for (var i=0; i<currentLabels.length; i++) {
      console.log(currentLabels[i]);
      renderLabel(currentLabels[i], labelsList);
    }
  }

  function render() {
    renderListSelect();
    if (lists.length > 0) {
      renderLabels();
      renderTodos();
    } else {
      document.getElementsByClassName('add-btn')[0].style.display = 'none';
      document.getElementsByClassName('todos-container')[0].style.display = 'none';
    }
  }

})();
