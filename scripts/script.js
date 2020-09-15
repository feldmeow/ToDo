'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

const todoData = [
  {
    value: '111',
    completed: true
  },
  {
    value: '222',
    completed: false
  },
  {
    value: '333',
    completed: false
  },
  {
    value: '444',
    completed: true
  },
];

function isEmpty() {
  if (headerInput.value.replace(/\s/g, '').length > 0) {
    return true;
  } else {
    return false;
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

    const btnComplete = li.querySelector('.todo-complete');
    btnComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });
    const btnDelete = li.querySelector('.todo-remove');
    btnDelete.addEventListener('click', function (event) {
      for (let i = 0; i <= todoData.length; i++) {
        if (item === todoData[i]) {
          todoData.splice(i, 1);
        }
        render();
        console.log(todoData[i])
      }
    });

  });
};

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
  }
});

render();