const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

var toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, id) {
    const li = document.createElement("li");
    const delBtn = document.createElement("span");
    const span = document.createElement("span");
    delBtn.innerHTML = `<i class="far fa-check-square red"></i> `;
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = id;
    toDoList.appendChild(li);
    const test = toDoList.querySelectorAll("span");
    test.forEach(make_EventListner);
}


function saveToDo(text) {

    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        toDos = parsedToDos
    }
    const newId = toDos.length + 1;
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event) {

    event.preventDefault();
    const currentValue = toDoInput.value;
    saveToDo(currentValue)
    loadToDos()
    toDoInput.value = "";
}


function loadToDos() {
    toDoList.innerHTML = ""
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text, toDo.id);
        });
    }
}

function removeToDo(event) {
    var num = event.path[2].id
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const parsedToDos = JSON.parse(loadedToDos);
    var indexnum = 1
    parsedToDos.splice(num - 1, 1);
    parsedToDos.forEach(function(todo) {
        todo.id = indexnum;
        indexnum = indexnum + 1
    })
    localStorage.setItem(TODOS_LS, JSON.stringify(parsedToDos));
    loadToDos()
}


function make_EventListner(btn_del) {
    btn_del.addEventListener("click", removeToDo);
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    var test = toDoList.querySelectorAll("span");
    test.forEach(make_EventListner);
}

init();