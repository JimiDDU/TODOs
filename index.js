var addButton = document.getElementById('addbutton');
var clear = document.getElementById('b1');
var empty = document.getElementById('b2');
var save = document.getElementById('b3');
var deleteb = document.getElementById('b4');
var nameofList = document.getElementById('nameoflist');
var mylist = document.getElementById('mylist');
var error = document.getElementById("error");


function deleteAll(){
    localStorage.clear();
    emptyList();
}

deleteb.addEventListener('click', deleteAll)

window.onload = function () {
    loadList();
    nameofList.focus();
};

function addItems() {
    // alert("Add button clicked")
    if (nameofList.value === "") {
        error.textContent = "Please enter your TO-DO item!";
    }
    else{
        var itemText = nameofList.value;
        createTodoList(itemText, false);
        nameofList.value = "";
        error.textContent = "";
    }
    nameofList.focus();
};


function clearList() {
    // alert("clear List button clicked")
    var completedItems = mylist.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
};


function emptyList() {
    // alert("empty list button clicked")
    var toDoItems = mylist.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
};


function saveList() {
    var toDos = [];
    for (var i = 0; i < mylist.children.length; i++) {
        var toDo = mylist.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
    alert("your list has been saved on local storage")
};

function createTodoList(itemName, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemName);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    mylist.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
};

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
        this.style.textDecoration = "none";
        this.style.color = "black";
        // this.textContent.replace(" (completed)", "")
    } else {
        this.classList.add("completed");
        this.style.textDecoration = "line-through";
        this.style.color = "green";
        // this.textContent += " (completed)"
    }
};


addButton.addEventListener('click', addItems);
clear.addEventListener('click', clearList);
empty.addEventListener('click', emptyList);
save.addEventListener('click', saveList);


function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            createTodoList(toDo.task, toDo.completed);
        }
    }
}