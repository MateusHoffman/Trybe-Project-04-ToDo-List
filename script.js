/////////////////////////////////////////////////////////////////////
// window.onload is to load something as fast as possible
window.onload = () => {
  initial();
};

/////////////////////////////////////////////////////////////////////
// Get Elements from HTML
const btnCreateTask = document.getElementById('criar-tarefa');
const inputContentTask = document.getElementById('texto-tarefa');
const olListTask = document.getElementById('lista-tarefas');
const btnSaveTasks = document.getElementById('salvar-tarefas');
const btnDeleteAll = document.getElementById('apaga-tudo');
const btnFinished = document.getElementById('remover-finalizados');
const btnMoveTaskUp = document.getElementById('mover-cima');
const btnMoveTaskDown = document.getElementById('mover-baixo');
const btnDeleteSelected = document.getElementById('remover-selecionado');

/////////////////////////////////////////////////////////////////////
// Create task
btnCreateTask.addEventListener('click', createTask);

function createTask() {
  const li = document.createElement('li');
  olListTask.appendChild(li);

  li.textContent = inputContentTask.value;
  li.classList.add('list-group-item');

  inputContentTask.value = '';

  li.addEventListener('click', checked);

  btnDeleteAll.addEventListener('click', deleteAll);
}

/////////////////////////////////////////////////////////////////////
// Select task
function checked(event) {
  // const allTasksLi = document.querySelectorAll('li');

  paintBackgroundTask();

  event.target.classList.add('tasks-gray')

}

/////////////////////////////////////////////////////////////////////
// Paint background all tasks of white
function paintBackgroundTask() {
  const allTasksLi = document.querySelectorAll('li');
  for (let index = 0; index < allTasksLi.length; index += 1) {
    allTasksLi[index].classList.remove('tasks-gray');
  }
}

/////////////////////////////////////////////////////////////////////
// Delete all tasks
function deleteAll() {
  const allTasksLi = document.querySelectorAll('li');

  allTasksLi.forEach((task) => {
    task.remove();
    localStorage.clear();
  });
}

/////////////////////////////////////////////////////////////////////
// Task Completed
olListTask.addEventListener('dblclick', completed);

function completed(event) {

  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
    event.target.style.textDecoration = 'none';

  } else {
    event.target.classList.add('completed');
    event.target.style.textDecoration = 'line-through solid black';
  }
}

/////////////////////////////////////////////////////////////////////
// Delete alredy completed tasks
btnFinished.addEventListener('click', removeFinished);

function removeFinished (event) {
  const allTasksCompleted = document.querySelectorAll('.completed');

  for (let index = 0; index < allTasksCompleted.length; index += 1) {
    allTasksCompleted[index].remove();
  }
}

/////////////////////////////////////////////////////////////////////
// Save element li completed with tag, attributes and value in local storage
btnSaveTasks.addEventListener('click', saveItemsLocalStorage);

function saveItemsLocalStorage() {
  localStorage.setItem('Tasks', JSON.stringify(olListTask.innerHTML));
}

/////////////////////////////////////////////////////////////////////
// Get element li completed with tag, attributes and value in local storage and add them inside the ol element
function getItemsLocalStorage() {
  const savedStorage = JSON.parse(localStorage.getItem('Tasks'));
  olListTask.innerHTML = savedStorage;

  const allTasksLi = document.querySelectorAll('li');

  for (let index = 0; index < allTasksLi.length; index += 1) {
    allTasksLi[index].addEventListener('click', checked);
    allTasksLi[index].addEventListener('dblclick', completed);
  }
}

/////////////////////////////////////////////////////////////////////
// The first action performed is to add items from local storage to the site
function initial() {
  if (localStorage.getItem('Tasks') === null) {
    localStorage.setItem('Tasks', JSON.stringify([]));
  } else {
    getItemsLocalStorage();
  }
}

/////////////////////////////////////////////////////////////////////
// Serves to move task selected to up of other task
btnMoveTaskUp.addEventListener('click', moveTaskForUp)

function moveTaskForUp() {
  const allTasksLi = document.querySelectorAll('li');

  for (let index = 0; index < allTasksLi.length; index += 1) {
    if (allTasksLi[index].classList.contains('tasks-gray')) {
      const beforeItem = allTasksLi[index].previousElementSibling;
      if (beforeItem !== null) {
        olListTask.insertBefore(beforeItem, allTasksLi[index].nextElementSibling);
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////
// Serves to move task selected to down of other task
btnMoveTaskDown.addEventListener('click', moveTaskForDown)

function moveTaskForDown() {
  const allTasksLi = document.querySelectorAll('li');

  for (let index = 0; index < allTasksLi.length; index += 1) {
    if (allTasksLi[index].classList.contains('tasks-gray')) {
      const afterItem = allTasksLi[index].nextElementSibling;
      if (afterItem !== null) {
        olListTask.insertBefore(afterItem, allTasksLi[index]);
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////
// Only selected task is deleted
btnDeleteSelected.addEventListener('click', deleteTaskSelected)

function deleteTaskSelected() {
  const allTasksLi = document.querySelectorAll('li');

  for (let index = 0; index < allTasksLi.length; index += 1) {
    if (allTasksLi[index].classList.contains('tasks-gray')) {
      allTasksLi[index].remove();
    }
  }
}
