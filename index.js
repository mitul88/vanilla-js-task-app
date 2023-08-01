let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

//  define event listener
form.addEventListener('submit', addTask)
taskList.addEventListener('click', removeTask)
clearBtn.addEventListener('click', clearTasks)
filter.addEventListener('keyup', filterTask)
document.addEventListener('DOMContentLoaded', getTasks)


//  define functions

function addTask(e){
    e.preventDefault()
    if(taskInput.value === '') {
        alert('add a task')
    } else {
        //  create li element
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(taskInput.value + " "))
        let link = document.createElement('a')
        link.setAttribute('href', '#')
        link.innerHTML = 'X'
        li.appendChild(link)
        taskList.appendChild(li)

        storeTaskInLocalStorage(taskInput.value)

        taskInput.value = ''
    }
}


function removeTask(e) {
    if(e.target.hasAttribute('href')) {
        if(confirm("Are sure ?")) {
            let elem = e.target.parentElement
            elem.remove()
            removeFromLs(elem)
        }
    }
}

function getTasks() {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks=[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(task => {
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(task + " "))
        let link = document.createElement('a')
        link.setAttribute('href', '#')
        link.innerHTML = 'X'
        li.appendChild(link)
        taskList.appendChild(li)
    })
}

function clearTasks(e) {
    // taskList.innerHTML = ""

    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    localStorage.clear()
}

function filterTask(e) {
    let text = e.target.value.toLowerCase()
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}

function storeTaskInLocalStorage(task){
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks=[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
} 

function removeFromLs(taskItem) {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks=[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    let li = taskItem
    li.removeChild(li.lastChild)

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}