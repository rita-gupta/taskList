//define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearDtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all the event listeners
loadEventListeners();

//load all the event listeners
function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addtask);
  taskList.addEventListener("click", removeTask);
  clearDtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

//get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    const localStorageMaBhayekoSaman = localStorage.getItem("tasks");

    tasks = JSON.parse(localStorageMaBhayekoSaman);

    // tasks = ["eat apple", "buy orange"];
  }

  tasks.forEach(function (task) {
    //create li element
    const li = document.createElement("li");
    //Add a class
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = "<i class= 'fa fa-remove' </i> ";
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
  });
}

// Add task
function addtask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("add a task");
  }

  //create li element
  const li = document.createElement("li");
  //Add a class
  li.className = "collection-item";
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";
  // add icon html
  link.innerHTML = "<i class= 'fa fa-remove' </i> ";
  //append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);

  //Store in LS
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = "";

  e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      //remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
//removw from LS
function removeTaskFromLocalStorage(taskItem) {
  const taskToBeDeleted = taskItem.textContent.trim();

  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskToBeDeleted === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear task
function clearTasks() {
  // taskList.innerHTML = "";

  ///faster way to clear
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //clear task from LS
  clearTaskFromLocalStorage();
}

 function clearTaskFromLocalStorage(){
         localStorage.clear();
 }

//filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
