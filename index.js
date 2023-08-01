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


//  defien functions

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
        taskInput.value = ''
    }
}


function removeTask(e) {
    if(e.target.hasAttribute('href')) {
        if(confirm("Are sure ?")) {
            let elem = e.target.parentElement
            elem.remove()
        }
    }
}

function clearTasks(e) {
    // taskList.innerHTML = ""

    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
}

function filterTask(e) {
    let text = e.target.value.toLowerCase()
    console.log(text)
}