var taskInput = document.getElementById("main-new-todo");
var addButton = document.querySelector(".factory__button");
var incompleteTaskHolder = document.getElementById("todo-list");
var completedTasksHolder = document.getElementById("done-list");

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");
  const id = generateId();

  listItem.className = "list__item item";

  label.innerText = taskString;
  label.className = "item__label task";
  label.htmlFor = `${id}`;

  checkBox.type = "checkbox";
  checkBox.className = "input item__checkbox";
  checkBox.name = "todo-checkbox";

  editInput.id = `${id}`;
  editInput.type = "text";
  editInput.className = "item__input task";

  editButton.innerText = "Edit";
  editButton.className = "button button--edit";
  editButton.type = "button";

  deleteButton.className = "button button--delete";
  deleteButton.type = "button";

  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "button__image";
  deleteButtonImg.alt = "delete button";

  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function () {
  console.log("Add Task...");
  if (!taskInput.value) return;

  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".item__input");
  var label = listItem.querySelector(".item__label");
  var editBtn = listItem.querySelector(".button--edit");
  var isActive = listItem.classList.contains("is-active");

  if (isActive) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("is-active");
};

var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

var taskCompleted = function () {
  console.log("Complete Task...");
  var listItem = this.parentNode;

  listItem.children[0].name = "done-checkbox";
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");
  var listItem = this.parentNode;

  listItem.children[0].name = "todo-checkbox";
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  var checkBox = taskListItem.querySelector(".item__checkbox");
  var editButton = taskListItem.querySelector(".button--edit");
  var deleteButton = taskListItem.querySelector(".button--delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

function generateId() {
  const date = new Date();
  const ms = date.getMilliseconds();
  const indexToSlice = 24;
  const id = `${date
    .toString()
    .slice(0, indexToSlice)
    .split(" ")
    .join("-")}-${ms}`;

  return id;
}