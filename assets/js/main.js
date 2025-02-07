const addTaskBtn = document.querySelector('.btn-add-task');
const addTaskText = document.querySelector('.input-new-task');
const taskList = document.querySelector('.task-ul');

function factoryLI (){
    const addLi = document.createElement('li');
    return addLi;
}
function inputCleaner (){
    addTaskText.value ='';
    addTaskText.focus();
}

function loadSaveTasks (){
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks);
    
    for (let tasks of taskList){
        createTask(tasks);
    }
}

function removeTaskBtn (addLi){
    addLi.innerText += '';
    const removeBtn = document.createElement('button')
    removeBtn.innerText = 'Remove';
    removeBtn.setAttribute('class','remove');
    addLi.appendChild(removeBtn);

}
function saveTask (){
    const getLi =  taskList.querySelectorAll('li');
    const getTaskList = [];

    for (let taskList of getLi){
        let textTask = taskList.innerText;
        textTask = textTask.replace('Remove','').trim();
        getTaskList.push(textTask);
    }
    const taskJSON = JSON.stringify (getTaskList);
    localStorage.setItem('tasks', taskJSON)
}
function createTask (textInput){
    const li = factoryLI();
    li.innerText = textInput;
    taskList.appendChild(li)
    inputCleaner();
    removeTaskBtn(li);
    saveTask();
}
addTaskText.addEventListener ('keypress', function(e){
    if(e.keyCode ===13){
        if (!addTaskText.value) return;
            createTask(addTaskText.value);
            
    }
    
})
addTaskBtn.addEventListener('click',function (){
    if (!addTaskText.value) return;
    createTask(addTaskText.value);
    inputCleaner();
})
document.addEventListener('click', function (e)
{
    const el= e.target;
    if(el.classList.contains('remove')){
        el.parentElement.remove();
        saveTask();
    }
})
loadSaveTasks();

