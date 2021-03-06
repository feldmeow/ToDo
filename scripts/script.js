'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

// Валидация(проверка на пустой инпут)
function isEmpty() {
  if (headerInput.value.replace(/\s/g, '').length > 0) {
    return true;
  } else {
    return false;
  }
};

// чтение из localStorage
function readLocalStorage() {
  if (localStorage.todoData) {
    return todoData = JSON.parse(localStorage.todoData);
  }
};

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div > ';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    // Отметка о выполненной/не выполненной задаче
    const btnComplete = li.querySelector('.todo-complete');
    btnComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      render();

    });

    // удаление объекта из todoData и обновление данных
    const btnDelete = li.querySelector('.todo-remove');
    btnDelete.addEventListener('click', function (event) {
      for (let i = 0; i <= todoData.length; i++) {
        if (item === todoData[i]) {
          todoData.splice(i, 1);
        }
        render();

      }
    });

  });
  // Сохранение в localStorage + конвертация в JSON
  function toJsonLocalStorage() {
    return localStorage.todoData = JSON.stringify(todoData);
  };
  toJsonLocalStorage();
};

// добавление новой задачи в массив(чтение из инпута) 
todoControl.addEventListener('submit', function (event) {
  isEmpty();
  event.preventDefault();
  if (isEmpty()) {
    const newTodo = {
      value: headerInput.value,
      completed: false
    };
    todoData.push(newTodo)
    render();
    headerInput.value = '';
  }
});
readLocalStorage();
render();