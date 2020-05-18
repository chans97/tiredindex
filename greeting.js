var form = document.querySelector(".form_js")
var input = form.querySelector(".input_js").value
const btn = document.querySelector("#btn")
var clean_form = document.querySelector(".clean_form")
const clean = document.querySelector("#clean")
const greeting = document.querySelector("h4")



function whatShow() {
    const name = localStorage.getItem("name")
    if (name === null) {
        form.classList.add("showing")
    } else {
        form.classList.remove("showing")
        greeting.innerHTML = `안녕하세요. ${name}님`
        clean_form.classList.add("showing")
    }
}

function saveName(event) {
    event.preventDefault()
    var form = document.querySelector(".form_js")
    var input = form.querySelector(".input_js").value
    localStorage.setItem("name", input)
    form.querySelector(".input_js").value = null
    whatShow();
}

function cleanName(event) {
    event.preventDefault()
    localStorage.removeItem("name")
    greeting.innerHTML = `안녕하세요. 이름을 입력해주세요.`
    clean_form.classList.remove("showing")
    whatShow();
}


function init() {
    whatShow();
    form.addEventListener("submit", saveName)
    clean_form.addEventListener("submit", cleanName)
}

init()