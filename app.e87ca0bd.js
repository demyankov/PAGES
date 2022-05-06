// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app/create_tag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendTag = appendTag;
exports.createButton = createButton;
exports.createInput = createInput;
exports.createTag = createTag;

function createTag(tagName, className, text) {
  var tag = document.createElement(tagName);
  className ? tag.classList.add(className) : null;
  text ? tag.innerText = text : null;
  return tag;
}

function createInput(className, type, text) {
  var tag = document.createElement('input');
  className ? tag.classList.add(className) : null;
  type ? tag.setAttribute('type', type) : tag.setAttribute('type', 'text');
  text ? tag.setAttribute('placeholder', text) : null;
  return tag;
} // export function createTextArea (className, type, text){
//     let tag = document.createElement('textarea')
//     className ? tag.classList.add(className):null
//     type ? tag.setAttribute ('type', type):tag.setAttribute ('type', 'text')
//     text ? tag.setAttribute ('placeholder', text):null 
//     return tag
// }


function createButton(className, type, text) {
  var tag = document.createElement('button');
  className ? tag.classList.add(className) : null;
  type ? tag.setAttribute('type', type) : tag.setAttribute('type', 'button');
  text ? tag.innerText = text : null;
  return tag;
}

function appendTag() {
  for (var i = 1; i < arguments.length; i++) {
    arguments[0].append(arguments[i]);
  }

  ;
}
},{}],"app/additional.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcCountTasksInProgress = calcCountTasksInProgress;
exports.getDate = getDate;
exports.getTime = getTime;
exports.setCountOfCards = setCountOfCards;

var _app = require("./app.js");

//количество карточек в TODO
function calcCountTasksInToDo() {
  return _app.cards.filter(function (el) {
    return el.status == "todo" && el.active == "true";
  }).length;
} //количество карточек в INPROGRESS


function calcCountTasksInProgress() {
  return _app.cards.filter(function (el) {
    return el.status == "in_progress" && el.active == "true";
  }).length;
} //количество карточек в DONE


function calcCountTasksInDone() {
  return _app.cards.filter(function (el) {
    return el.status == "done" && el.active == "true";
  }).length;
}

function setCountOfCards() {
  document.querySelector("#count_todo").innerText = calcCountTasksInToDo();
  document.querySelector("#count_in-progress").innerText = calcCountTasksInProgress();
  document.querySelector("#count_done").innerText = calcCountTasksInDone();
} //формирование текущей даты


function getDate() {
  var dateNow = new Date();
  var dayNow;
  var monthNow;
  dateNow.getDate() < 10 ? dayNow = "0".concat(dateNow.getDate()) : dayNow = dateNow.getDate();
  dateNow.getMonth() < 9 ? monthNow = "0".concat(dateNow.getMonth() + 1) : monthNow = dateNow.getMonth() + 1;
  return "".concat(dayNow, ".").concat(monthNow, ".").concat(dateNow.getFullYear());
} //формирование текущего времени


function getTime() {
  var timeNow = new Date();
  var hoursNow;
  var minutesNow;
  timeNow.getMinutes() < 10 ? minutesNow = "0".concat(timeNow.getMinutes()) : minutesNow = timeNow.getMinutes();
  timeNow.getHours() < 9 ? hoursNow = "0".concat(timeNow.getHours()) : hoursNow = timeNow.getHours();
  return "".concat(hoursNow, ":").concat(minutesNow);
}
},{"./app.js":"app/app.js"}],"app/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayTime = displayTime;
exports.fillingCard = fillingCard;
exports.getCardData = getCardData;
exports.inProgressWrapper = void 0;
exports.renderDone = renderDone;
exports.renderInProgress = renderInProgress;
exports.renderTodo = renderTodo;
exports.todoWrapper = void 0;

var _create_tag = require("./create_tag.js");

var _additional = require("./additional.js");

var _app = require("./app.js");

//отображение текущего времени в header
function displayTime(getTime) {
  document.querySelector(".header__time").innerText = getTime();
} //обновление текущего времени в header


setInterval(function () {
  return displayTime(_additional.getTime);
}, 1000);
var users;

function getCardData(card, title, description, user) {
  //запрашиваем массив пользователей
  users = fetch("https://jsonplaceholder.typicode.com/users").then(function (response) {
    return response.json();
  }).then(function (data) {
    createListOfUsers(data); // добавляем пользователей в список формы добавления/редактирования карточки

    fillingFormCard(card, title, description, user); // заполнение редактируемой карточки данными
  }).catch(function (err) {
    return alert(err);
  });
}

var todoWrapper = document.querySelector(".board__task-wrapper"); //контейнер для карточек TODO

exports.todoWrapper = todoWrapper;
var inProgressWrapper = document.querySelector(".in-progress-wrapper"); //контейнер для карточек INPROGRESS

exports.inProgressWrapper = inProgressWrapper;
var doneWrapper = document.querySelector(".done-wrapper"); //контейнер для карточек DONE
//добавляем пользователей в список формы добавления/редактирования карточки

function createListOfUsers(users) {
  var selectUsers = document.querySelector(".task__edit-user");
  selectUsers.innerHTML = "";
  users.forEach(function (user) {
    var option = (0, _create_tag.createTag)("option", "user", user.name);
    option.innerText = user.name;
    (0, _create_tag.appendTag)(selectUsers, option);
  });
} //рендер формы на доске TODO


function renderTodo() {
  var cardsToDo = _app.cards.filter(function (el) {
    return el.status === "todo" && el.active === "true";
  });

  todoWrapper.innerHTML = "";
  cardsToDo.forEach(function (card) {
    var form = (0, _create_tag.createTag)("form", "task_to-do");
    form.classList.add("task");
    form.setAttribute("data-id", card.id); //присваиваем форме data-id

    var taskBtn = (0, _create_tag.createTag)("div", "task__btn");
    var btnEdit = (0, _create_tag.createButton)("task__btn-edit", "", "Edit");
    btnEdit.classList.add("btn");
    var btnDelete = (0, _create_tag.createButton)("task__btn-delete", "", "Delete");
    btnDelete.classList.add("btn");
    var taskTitle = (0, _create_tag.createTag)("p", "task__title", "Title");
    var taskDescription = (0, _create_tag.createTag)("p", "task__description", "Description");
    var taskUser = (0, _create_tag.createTag)("p", "task__user", "User");
    var taskDate = (0, _create_tag.createTag)("date", "task__date", "Date");
    var btnToProgress = (0, _create_tag.createButton)("to-progress");
    fillingCard("todo", card, taskTitle, taskDescription, taskUser, taskDate); //заполнение данных карточки

    (0, _create_tag.appendTag)(taskBtn, btnEdit, btnDelete);
    (0, _create_tag.appendTag)(form, taskBtn, taskTitle, taskDescription, taskUser, taskDate, btnToProgress);
    (0, _create_tag.appendTag)(todoWrapper, form);
  });
} //рендер формы на доске INPROGRESS


function renderInProgress() {
  var cardsToDo = _app.cards.filter(function (el) {
    return el.status === "in_progress" && el.active === "true";
  });

  inProgressWrapper.innerHTML = "";
  cardsToDo.forEach(function (card) {
    var form = (0, _create_tag.createTag)("form", "in-progress");
    form.classList.add("task");
    form.setAttribute("data-id", card.id); //присваиваем форме data-id

    var taskBtn = (0, _create_tag.createTag)("div", "task__btn");
    var btnBack = (0, _create_tag.createButton)("task__btn-back", "", "Back");
    btnBack.classList.add("btn");
    var btnComplete = (0, _create_tag.createButton)("task__btn-complete", "", "Complete");
    btnComplete.classList.add("btn");
    var taskTitle = (0, _create_tag.createTag)("p", "task__title", "Title");
    var taskDescription = (0, _create_tag.createTag)("p", "task__description", "Description");
    var taskUser = (0, _create_tag.createTag)("p", "task__user", "User");
    var taskDate = (0, _create_tag.createTag)("date", "task__date", "Date");
    fillingCard("in_progress", card, taskTitle, taskDescription, taskUser, taskDate); //заполнение данных карточки

    (0, _create_tag.appendTag)(taskBtn, btnBack, btnComplete);
    (0, _create_tag.appendTag)(form, taskBtn, taskTitle, taskDescription, taskUser, taskDate);
    (0, _create_tag.appendTag)(inProgressWrapper, form);
  });
} //рендер формы на доске DONE


function renderDone() {
  var cardsToDo = _app.cards.filter(function (el) {
    return el.status === "done" && el.active === "true";
  });

  doneWrapper.innerHTML = "";
  cardsToDo.forEach(function (card) {
    var form = (0, _create_tag.createTag)("form", "task_done");
    form.classList.add("task");
    form.setAttribute("data-id", card.id); //присваиваем форме data-id

    var taskBtn = (0, _create_tag.createTag)("div", "task__btn");
    var btnDelete = (0, _create_tag.createButton)("task__btn-delete", "", "Delete");
    btnDelete.classList.add("btn");
    var taskTitle = (0, _create_tag.createTag)("p", "task__title", "Title");
    var taskDescription = (0, _create_tag.createTag)("p", "task__description", "Description");
    var taskUser = (0, _create_tag.createTag)("p", "task__user", "User");
    var taskDate = (0, _create_tag.createTag)("date", "task__date", "Date");
    fillingCard("done", card, taskTitle, taskDescription, taskUser, taskDate); //заполнение данных карточки

    (0, _create_tag.appendTag)(taskBtn, btnDelete);
    (0, _create_tag.appendTag)(form, taskBtn, taskTitle, taskDescription, taskUser, taskDate);
    (0, _create_tag.appendTag)(doneWrapper, form);
  });
} //наполнение карточек данными


function fillingCard() {
  var _arguments = Array.prototype.slice.call(arguments),
      status = _arguments[0],
      card = _arguments[1],
      taskTitle = _arguments[2],
      taskDescription = _arguments[3],
      taskUser = _arguments[4],
      taskDate = _arguments[5];

  taskTitle ? taskTitle.innerText = card.title : null;
  taskDescription ? taskDescription.innerText = card.description : null;
  taskUser ? taskUser.innerText = card.user : null;
  status === "todo" && taskDate ? taskDate.innerText = card.date : null;
  status === "in_progress" && taskDate ? taskDate.innerText = card.date_to_progress : null;
  status === "done" && taskDate ? taskDate.innerText = card.date_to_done : null;
  (0, _additional.setCountOfCards)();
} //наполнение формы изменения карточки данными


function fillingFormCard() {
  var _arguments2 = Array.prototype.slice.call(arguments),
      card = _arguments2[0],
      taskTitle = _arguments2[1],
      taskDescription = _arguments2[2],
      taskUser = _arguments2[3];

  taskTitle ? taskTitle.value = card.title : null;
  taskDescription ? taskDescription.value = card.description : null;
  taskUser ? taskUser.value = card.user : null;
}
},{"./create_tag.js":"app/create_tag.js","./additional.js":"app/additional.js","./app.js":"app/app.js"}],"app/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cards = void 0;
exports.createObject = createObject;

var _render = require("./render.js");

var _additional = require("./additional.js");

var cards; // массив объектов карточек

exports.cards = cards;
var id; // четчик уникальных id

var deletedCard; //маркер, в который записывается объект кнопки удаления карточки для дальнейшего определения по какой доске был клик и где нужно удатиль карточку

var addOrEdit; //маркер, который показывает пользователь добавляет новую карточку или редактирует существующую

var editCard; // редактируемая форма

var idEditCard; // data-id редактируемой формы

var title; // содержание заголовка в форме добавления/редактирования карточки

var description; // содержание описания задачи в форме добавления/редактирования карточки

var user; // выбранный пользователь в форме добавления/редактирования карточки
//достаем из localstorage счетчик id и массив карточек

localStorage.getItem("id") ? id = localStorage.getItem("id") : id = 0;
localStorage.getItem("cards") ? exports.cards = cards = JSON.parse(localStorage.getItem("cards")) : exports.cards = cards = []; //запись в localstorage счетчика id и массива карточек

function setLocalStorage(cardsArray, idCounter) {
  cardsArray ? localStorage.setItem("cards", JSON.stringify(cardsArray)) : null;
  idCounter ? localStorage.setItem("id", idCounter) : null;
} //объект карточки


function createObject() {
  var _arguments = Array.prototype.slice.call(arguments),
      id = _arguments[0],
      title = _arguments[1],
      description = _arguments[2],
      user = _arguments[3],
      date = _arguments[4];

  var task = {
    id: id,
    title: title,
    description: description,
    user: user,
    date: date,
    status: "todo",
    //inprogress, done
    active: "true" //false - если карточка была удалена

  };
  return task;
}

document.addEventListener("DOMContentLoaded", function () {
  (0, _render.displayTime)(_additional.getTime);
  (0, _render.renderTodo)();
  (0, _render.renderInProgress)();
  (0, _render.renderDone)();
}, false);
var cardFormWrapper = document.querySelector(".overlay"); // контейнер пустого шаблона новой/редактирования карточки

var cardForm = document.querySelector(".task__edit"); //шаблон новой/редактируемой карточки

var confirmBtn = document.querySelector(".task__edit-confirm"); //кнопка confirm в шаблоне для подтверждения добавления/изменения карточки

var addTodoBtn = document.querySelector(".board__add-todo"); //кнопка вызова шаблона для добавления карточки

var warningWrapper = document.querySelector(".overlay-warning"); //контейнер формы Warning

var confirmWarningBtn = document.querySelector(".warning__confirm"); //кнопка в форме Warning для подтверждения действий (удаления карточек)

var deleteDoneBtn = document.querySelector(".board__delete-all"); //кнопка удаления всех карточек

var cancelTodoBtn = document.querySelector(".task__edit-cancel"); //кнопка cancel для закрытия шаблона добавления/изменения карточки
//прослушка на кнопку добавления новой карточки

addTodoBtn.addEventListener("click", function () {
  addOrEdit = "add"; //устанавливаем флаг в состояние add

  (0, _render.getCardData)(); //получаем список пользователей и добавляем в шаблон новой карточки

  cardFormWrapper.classList.toggle("overlay-active"); //добавляем класс для отображения формы редактировния карточки
}); //прослушка на кнопку Confirm в форме добавления/редактирования карточки для добавления изменений в массив

confirmBtn.addEventListener("click", function () {
  console.log(idEditCard, editCard);
  addOrEdit === "add" ? addNewCard() : null; //вызоваем функцию добавления в массив объекта новой карточки

  addOrEdit === "edit" ? editingCard() : null; //вызоваем функцию редактирования объекта карточки

  (0, _render.renderTodo)();
}); //Функция добавления в массив объекта новой карточки

function addNewCard() {
  getCardFormData(cardForm);

  if (title && description) {
    id++; //инкрементируем счетчик

    var date = (0, _additional.getDate)();
    var card = createObject(id, title, description, user, date);
    cards.push(card);
    setLocalStorage(cards, id);
    closeEditForm();
  }
} // функция определения заголовка, описания и исполнителя В ФОРМЕ добавляемой/редактируемой задачи (карточки)


function getCardFormData() {
  console.log();
  title = cardForm.querySelector(".task__edit-title").value;
  description = cardForm.querySelector(".task__edit-description").value;
  user = cardForm.querySelector(".task__edit-user").value;
} // прослушка на контейнер TODO


_render.todoWrapper.addEventListener("click", function (event) {
  var el = event.target; //прослушка на кнопку редактирования карточки

  if (el.className.includes("task__btn-edit")) {
    inListenerEditCard(el);
  } //прослушка на кнопку удаления карточки из доски ToDo


  if (el.className.includes("task__btn-delete")) {
    warningWrapper.classList.toggle("warning-active"); //открываем окно с предупреждением

    document.querySelector(".warning__text-description").innerText = "Do you want to delete the current task?";
    deletedCard = el; //маркер, с помощью которго определяется какая карточка удаляется
  } //прослушка на кнопку перемещения карточки из TODO в IN-PROGRESS


  if (el.className.includes("to-progress")) {
    var countTasksInProgress = (0, _additional.calcCountTasksInProgress)(); // находим количество карточек In_progress

    if (countTasksInProgress < 6) {
      inListenerToProgress(el);
      setLocalStorage(cards);
      (0, _render.renderTodo)();
      (0, _render.renderInProgress)();
    } else {
      warningWrapper.classList.toggle("warning-active"); //открываем окно с предупреждением

      document.querySelector(".warning__confirm").hidden = true; //скрываем кнопку Confirm в форме Warning

      document.querySelector(".warning__text-description").innerText = "There are many tasks in progress. Complete the task and try again";
    }
  }
});

function inListenerEditCard(el) {
  addOrEdit = "edit";
  editCard = el.closest(".task_to-do");
  idEditCard = editCard.getAttribute("data-id"); // data-id редактируемой формы

  var titleTag = cardForm.querySelector(".task__edit-title");
  var descriptionTag = cardForm.querySelector(".task__edit-description");
  var userTag = cardForm.querySelector(".task__edit-user");
  cards.forEach(function (card) {
    if (card.id == idEditCard) {
      (0, _render.getCardData)(card, titleTag, descriptionTag, userTag); //получаем список пользователей, заполняем форму данными редактируемой карточки

      cardFormWrapper.classList.toggle("overlay-active"); //добавляем класс для отображения формы редактировния карточки
    }
  });
} //'удаляем' карточку из массива (устанавливаем флаг active=false)


function inListenerDeleteCard(el, parentClass) {
  var deletedCardId = el.closest(parentClass).getAttribute("data-id");
  cards.forEach(function (card) {
    if (card.id == deletedCardId) {
      card.active = "false";
      card.date_deleted = (0, _additional.getDate)();
    }
  });
} //прослушка на кнопку перемещения карточки из IN-PROGRESS в TODO и в Done


_render.inProgressWrapper.addEventListener("click", function (e) {
  var el = e.target; //  из IN-PROGRESS в TODO

  el.className.includes("task__btn-back") ? inListenerToTodo(el) : null; // из IN-PROGRESS в Done

  el.className.includes("task__btn-complete") ? inListenerToDone(el) : null;
  setLocalStorage(cards); //записываем в localStorage измененный массив карточек

  (0, _render.renderTodo)();
  (0, _render.renderInProgress)();
  (0, _render.renderDone)();
}); //'перемещаем' карточку из todo в in_progress (устанавливаем флаг status = in_progress)


function inListenerToProgress(el) {
  var toProgressCardId = el.closest(".task_to-do").getAttribute("data-id");
  cards.forEach(function (card) {
    if (card.id == toProgressCardId) {
      card.status = "in_progress";
      card.date_to_progress = (0, _additional.getDate)();
    }
  });
} //'перемещаем' карточку из In-progress в Todo в  (устанавливаем флаг status = todo)


function inListenerToTodo(el) {
  var toTodoCardId = el.closest(".in-progress").getAttribute("data-id");
  cards.forEach(function (card) {
    if (card.id == toTodoCardId) {
      card.status = "todo";
      card.date_to_todo = (0, _additional.getDate)();
    }
  });
} //'перемещаем' карточку из todo в Done (устанавливаем флаг status = done)


function inListenerToDone(el) {
  var toDoneCardId = el.closest(".in-progress").getAttribute("data-id");
  cards.forEach(function (card) {
    if (card.id == toDoneCardId) {
      card.status = "done";
      card.date_to_done = (0, _additional.getDate)();
    }
  });
} //Функция редактирования карточки


function editingCard() {
  getCardFormData(editCard); //получаем данные из редактируемой карточки

  var date = (0, _additional.getDate)();
  console.log(title, description);

  if (title && description) {
    cards.forEach(function (card) {
      if (card.id == idEditCard) {
        card.title = title;
        card.description = description;
        card.user = user;
        card.date_edit = date;
        setLocalStorage(cards); //загружаем в localStorage измененный массив

        closeEditForm(); //закрываем форму
      }
    });
  }
} //Закрытие формы для добавления новой карточки или редактирования старой при нажатии кнопки Cancel


cancelTodoBtn.addEventListener("click", function () {
  closeEditForm();
}); //закрытие формы добавления/изменения карточек

function closeEditForm() {
  cardFormWrapper.classList.toggle("overlay-active");
  var form = document.querySelector(".task__edit");
  form.querySelector(".task__edit-title").value = "";
  form.querySelector(".task__edit-description").value = "";
}

var doneWrapper = document.querySelector(".done-wrapper"); //прослушка на кнопку удаления карточки из доски DONe

doneWrapper.addEventListener("click", function (event) {
  var el = event.target;
  deletedCard = el;

  if (el.className.includes("task__btn-delete")) {
    warningWrapper.classList.toggle("warning-active"); //открываем окно с предупреждением

    document.querySelector(".warning__text-description").innerText = "Do you want to delete the current task?";
  }
}); //функция вызова прослушки на кнопку confirm с указанием, где происходит удаление карточек

confirmWarningBtn.addEventListener("click", function () {
  warningWrapper.classList.toggle("warning-active"); //закрываем окно с предупреждением
  //если происходит удаление карточек на доске Done

  if (deletedCard.closest(".task_done")) {
    inListenerDeleteCard(deletedCard, ".task_done");
    setLocalStorage(cards);
    (0, _render.renderDone)();
  } //если происходит удаление карточек на доске Todo


  if (deletedCard.closest(".task_to-do")) {
    inListenerDeleteCard(deletedCard, ".task_to-do");
    setLocalStorage(cards);
    (0, _render.renderTodo)();
  } //если происходит удаление всех карточек


  if (deletedCard.className.includes("board__delete-all")) {
    exports.cards = cards = [];
    setLocalStorage(cards);
    (0, _render.renderTodo)();
    (0, _render.renderInProgress)();
    (0, _render.renderDone)();
    (0, _additional.setCountOfCards)();
  }
}); //прослушка на кнопку удаления всех выполненных карточек (вызов формы warning)

deleteDoneBtn.addEventListener("click", function (e) {
  warningWrapper.classList.toggle("warning-active");
  document.querySelector(".warning__text-description").innerText = "Do you want to delete all tasks?";
  deletedCard = e.target;
}); //закрытие формы warning при нажатии кнопки Cancel

var cancelWarningBtn = document.querySelector(".warning__cancel");
cancelWarningBtn.addEventListener("click", function () {
  warningWrapper.classList.toggle("warning-active");
  document.querySelector(".warning__confirm").hidden = false;
});
},{"./render.js":"app/render.js","./additional.js":"app/additional.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61491" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app/app.js"], null)
//# sourceMappingURL=/app.e87ca0bd.js.map