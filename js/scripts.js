// seleção de elementos
const todoForm = document.querySelector("#form__todo");
const todoInput = document.querySelector("#todo__input");
const todoList = document.querySelector("#todo__list");
const editForm = document.querySelector("#form__edit");
const editInput = document.querySelector("#edit__input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue

//funções

const saveTodo = (Text) => {

    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = Text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("todo__finish")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("todo__edit")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("todo__remove")
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn)

    todoList.appendChild(todo)
    todoInput.value = ""
    todoInput.focus()

}

const toggleforms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (Text) => {
    const todos = document.querySelectorAll(".todo")
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")
        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = Text
        }
    })
}

//eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //salvando a lista
    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText
    }

    if (targetEl.classList.contains("todo__finish")) {
        parentEl.classList.toggle("done")
    }

    if (targetEl.classList.contains("todo__edit")) {
        toggleforms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
    if (targetEl.classList.contains("todo__remove")) {
        parentEl.remove()
    }

})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleforms();
})

editForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const editInputValue = editInput.value
    if (editInputValue) {
        updateTodo(editInputValue)
    }

    toggleforms()


})