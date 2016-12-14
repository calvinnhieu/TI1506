// module to create private namespace
var todoModule = (function () {
  'use strict';
  var currentList = null;
  var lists = {};
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
  function Todo(id, listId, desc, createDate, dueDate, labels, notes, priority, completed) {
    this.id = id;
    this.listId = listId;
    this.description = desc;
    this.createDate = '';
    this.dueDate = dueDate;
    this.labels = labels;
    this.notes = notes;
    this.priority = priority;
    this.completed = 0;
    this.isEditing = false;
  };


  function getLabelString(labels) {
    var labelString = '';
    if (!labels || labels.length === 0) {
      return labelString;
    }
    for (var i=0; i<labels.length; i++) {
      labelString += labels[i];
    }
    return labelString;
  };

  // TodoList object
  function TodoList(id, uid, listName) {
    this.id = id;
    this.uid = uid;
    this.name = listName;
    this.todos = {};
    this.sortByDate = function() {};
    this.sortByPriority = function() {};
  };

  // Label object
  function Label(id, name) {
    this.id = id;
    this.name = name;
  };

  // sets onclick/event listeners
  function init() {
    console.log('init');
    $.post('/getLists', null, parseLists, 'json');
    $.post('/getTodos', null, parseTodos, 'json');
    $.post('/getLabels', null, parseLabels, 'json');

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
    finishAddBtn.onclick = function() {
      // grab user input values
      var desc = document.getElementsByClassName('add-desc-input')[0].value;
      var dueDate = document.getElementsByClassName('add-date-input')[0].value;
      var labels = document.getElementsByClassName('add-label-input')[0].value.split(' ');
      var notes = document.getElementsByClassName('add-notes-input')[0].value;
      var priority = document.getElementsByClassName('add-priority-input')[0].value;
      addTodo(-1, currentList, desc, null, dueDate, labels, notes, priority);
    }

    var finishAddListBtn = document.getElementsByClassName('finish-add-list-btn')[0];
    finishAddListBtn.onclick = function() {
      var name = document.getElementsByClassName('list-name-input')[0].value;
      addList(name);
    };
    render();

    setInterval(function() {
      $.post('/getLists', null, parseLists, 'json');
      $.post('/getTodos', null, parseTodos, 'json');
      $.post('/getLabels', null, parseLabels, 'json');
    }, 5000);
  };

  function addList(listId, uid, name) {
    for (var id in lists) {
      if (lists.hasOwnProperty(id)) {
        if (lists[id].name === name) {
          console.error('You can not have two lists with the same name');
          return;
        }
        if (lists[id].id === listId) {
          console.error('You can not have two lists with the same id');
          return;
        }
      }
    }
    lists[listId] = new TodoList(listId, uid, name);
    toggleElementVisibility('add-list-module');
    // $.post('/addList', newList, function(response) {
    //   // Do something with the request
    //   console.log('new list to server');
    // }, 'json');
    render();
  }

  function parseLists(data) {
    console.log('got lists from server');
    data.forEach(function(list) {
      addList(list.id, list.owner_id, list.name);
    });
  }

  function parseTodos(data) {
    console.log('got todos from server');
    data.forEach(function(todo) {
      addTodo(todo.id, todo.list_id, todo.description, todo.create_date, todo.due_date, todo.labels, todo.notes, todo.priority, todo.completed, true);
    });
    console.log(lists);
    render();
  }

  function parseLabels(data) {
    console.log('got labels from server');
    data.forEach(function(label) {
      labels[label.id] = new Label(label.id, label.name);
    });
    console.log(labels);
    renderLabels();
  }

  function addTodo(id, listId, desc, created, due, labels, notes, priority, completed=false, seenByServer=false) {
    var newTodo = new Todo(id, listId, desc, created, due, labels, notes, priority, completed);

    if (!seenByServer) {
      $.post('/addTodo', newTodo, function(response) {
        newTodo.id = response.insertId;
        lists[listId].todos[response.insertId] = newTodo;
        console.log('added todo to server');
        console.log(lists);
        render();
      }, 'json');
      clearAddModule();
    } else {
      lists[listId].todos[id] = newTodo;
      render();
    }
    // saveLabels(labels);
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
  function toggleEditModule(id) {
    if (lists[currentList].todos[id].isEditing) {
      lists[currentList].todos[id].isEditing = false;
    } else {
      lists[currentList].todos[id].isEditing = true;
    }
    renderTodos();
  }

  function completeTodo(id) {
    lists[currentList].todos[id].completed = 1;
    renderTodos();
  }

  function uncompleteTodo(id) {
    lists[currentList].todos[id].completed = 0;
    renderTodos();
  }

  function deleteTodo(id) {
    // lists[currentList].todos.splice(id, 1);
    delete lists[currentList].todos[id];
    $.post('/deleteTodo', {'id': id}, function(response) {
      console.log('deleted todo');
      renderTodos();
    }, 'json');
  }

  function editTodo(id, desc, due, labels, notes, priority) {
    lists[currentList].todos[id].description = desc;
    lists[currentList].todos[id].dueDate = due;
    lists[currentList].todos[id].labels = labels;
    lists[currentList].todos[id].notes = notes;
    lists[currentList].todos[id].priority = priority;

    $.post('/updateTodo', {'id': id, 'data': lists[currentList].todos[id]}, function(response) {
      console.log('edited todo');
      renderTodos();
    }, 'json');
  }

  function isTodoOverdue(id) {
    return false;
  }

  // TODO: fix for dict
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
    for (var listId in lists) {
      if (lists.hasOwnProperty(listId)) {
        if (lists[listId].name === selected) {
          currentList = listId;
        }
      }
    }
  }

  // renders a single todo list item
  function renderTodo(id) {
    // create html elements and append to todos <ul> element
    var li = document.createElement('li');
    var todoContainer = document.createElement('div');
    todoContainer.className += " todo-item flex flex-row";
    var left = document.createElement('div');
    var right = document.createElement('div');
    var desc = document.createElement('span').appendChild(document.createTextNode(lists[currentList].todos[id].description));
    var date = document.createElement('span').appendChild(document.createTextNode(lists[currentList].todos[id].dueDate+' '));
    var priority = document.createElement('span');
    var priorityIcon = document.createElement('i');
    priorityIcon.className += 'fa fa-sort';
    priority.appendChild(priorityIcon);
    priority.appendChild(document.createTextNode(' ' + lists[currentList].todos[id].priority + ' '));
    var labels = document.createElement('span').appendChild(document.createTextNode('Labels: '+getLabelString(lists[currentList].todos[id].labels)+' '));
    var notes = document.createElement('span').appendChild(document.createTextNode('Notes: '+lists[currentList].todos[id].notes+' '));
    switch (lists[currentList].todos[id].priority) {
      case '1':
      case 1:
        priority.className += ' priority-1';
        left.appendChild(priority);
        break;
      case '2':
      case 2:
        priority.className += ' priority-2';
        left.appendChild(priority);
        break;
      case '3':
      case 3:
        priority.className += ' priority-3';
        left.appendChild(priority);
        break;
      default:
        // console.log('invalid priority');
        break;
    }
    var complete;
    if (lists[currentList].todos[id].completed) {
      complete = document.createElement('i');
      complete.className += "fa fa-check-square-o todo-item-complete";
      complete.onclick = function() {
        uncompleteTodo(id);
      }
    } else {
      if (isTodoOverdue(id)) {
        todoContainer.className += " todo-item-overdue";
      }
      complete = document.createElement('button');
      complete.appendChild(document.createTextNode('Complete'));
      complete.onclick = function() {
        completeTodo(id);
      };
    }
    complete.className += " mar-right-2";
    var editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('edit'));
    var dltBtn = document.createElement('button');
    dltBtn.appendChild(document.createTextNode('delete'));
    // set onclick listeners
    editBtn.onclick = function() {
      toggleEditModule(id);
    };
    dltBtn.onclick = function() {
      deleteTodo(id);
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
    if (lists[currentList].todos[id].isEditing) {
      renderEditModule(li, id);
    }
    var todosList = document.getElementsByClassName('todos-list')[0];
    todosList.appendChild(li);
  }

  // renders edit module of a todo
  function renderEditModule(parent, id) {
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
    descInput.value = lists[currentList].todos[id].description;
    dateInput.value = lists[currentList].todos[id].dueDate;
    labelInput.value = getLabelString(lists[currentList].todos[id].labels);
    notesInput.value = lists[currentList].todos[id].notes;
    priorityInput.value = lists[currentList].todos[id].priority;
    finishEditBtn.appendChild(document.createTextNode('Save'));
    finishEditBtn.onclick = function() {
      var desc = descInput.value;
      var due = dateInput.value;
      var labels = labelInput.value.split(' ');
      var notes = notesInput.value;
      var priority = priorityInput.value;
      editTodo(id, desc, due, labels,notes, priority);
      toggleEditModule(id);
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
    for (var id in lists[currentList].todos) {
      if (lists[currentList].todos.hasOwnProperty(id)) {
        renderTodo(id);
      }
    }
  }

  // renders list dropdown
  function renderListSelect() {
    if (Object.keys(lists).length > 0) {
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
      for (var listId in lists) {
        if (lists.hasOwnProperty(listId)) {
          var exists = false;
          for (var i=0; i<listSelect.options.length; i++) {
            if (listSelect.options[i].text === lists[listId].name) {
              exists = true;
            }
          }
          if (!exists) {
            var option;
            option = document.createElement('option');
            option.innerHTML = lists[listId].name;
            listSelect.appendChild(option);
          }
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
    if (Object.keys(lists).length > 0) {
      renderLabels();
      renderTodos();
    } else {
      document.getElementsByClassName('add-btn')[0].style.display = 'none';
      document.getElementsByClassName('todos-container')[0].style.display = 'none';
    }
  }

})();
