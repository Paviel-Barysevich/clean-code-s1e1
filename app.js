const taskInput = document.getElementById("main-new-todo");
const addButton = document.querySelector(".factory__button");
const incompleteTaskHolder = document.getElementById("todo-list");
const completedTasksHolder = document.getElementById("done-list");

function createNewTaskElement(taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");
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
}

function addTask() {
  console.log("Add Task...");

  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

function editTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".item__input");
  const label = listItem.querySelector(".item__label");
  const editBtn = listItem.querySelector(".button--edit");
  const isActive = listItem.classList.contains("is-active");

  if (isActive) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("is-active");
}

function deleteTask() {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
}

function taskCompleted() {
  console.log("Complete Task...");

  const listItem = this.parentNode;

  listItem.children[0].name = "done-checkbox";
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log("Incomplete Task...");

  const listItem = this.parentNode;

  listItem.children[0].name = "todo-checkbox";
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function ajaxRequest() {
  console.log("AJAX Request");
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  const checkBox = taskListItem.querySelector(".item__checkbox");
  const editButton = taskListItem.querySelector(".button--edit");
  const deleteButton = taskListItem.querySelector(".button--delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
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
