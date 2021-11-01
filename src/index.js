// eslint-disable-next-line import/no-cycle
import {
  removeTask, editTask, addTask, clearFinishedTasks,
} from './functions.js';
import './style.css';
import checkCompleted from './checkCompleted.js';

const localStorageList = JSON.parse(localStorage.getItem('list'));

const container = document.createElement('div');
container.classList = 'todo-container';

const listConainer = document.createElement('ul');
listConainer.classList = 'list-container';
listConainer.id = 'list-container';

const clearBtn = document.createElement('button');
clearBtn.classList = 'clear-btn';
clearBtn.innerHTML = 'Clear all completed';
// eslint-disable-next-line no-use-before-define
clearBtn.addEventListener('click', () => clearFinishedTasks());

let indexCount;
export default function displayList(list) {
  listConainer.innerHTML = '';

  indexCount = 1;
  list.forEach((item) => {
    item.index = indexCount;
    indexCount += 1;
    const listItem = document.createElement('li');
    const listText = document.createElement('input');
    const checkBox = document.createElement('input');
    const icon = document.createElement('button');

    checkBox.type = 'checkbox';
    checkBox.classList = 'check-box';
    listText.value = item.description;
    listText.classList = 'list-text';
    listItem.id = item.index;

    icon.classList = 'delete-btn';
    icon.id = 'delete-btn';

    // eslint-disable-next-line no-use-before-define
    icon.addEventListener('click', () => removeTask(item));
    // eslint-disable-next-line no-use-before-define
    listText.addEventListener('keydown', (e) => editTask(item, list, e));

    if (item.completed) {
      checkBox.checked = 'true';
    }

    checkCompleted(checkBox, item, list);

    listItem.appendChild(checkBox);
    listItem.appendChild(listText);
    listItem.appendChild(icon);
    listConainer.appendChild(listItem);
    container.appendChild(listConainer);
  });

  localStorage.setItem('list', JSON.stringify(list));

  container.appendChild(clearBtn);
}

function WebPage(list) {
  const heading = document.createElement('h3');
  heading.innerHTML = 'Today\'s To Do';

  const todoInput = document.createElement('input');
  todoInput.placeholder = 'Add to your list...';
  todoInput.id = 'input-todo';

  const listConainer = document.createElement('ul');
  listConainer.classList = 'list-container';

  container.appendChild(heading);
  container.appendChild(todoInput);
  displayList(list);

  return container;
}

const updatedList = localStorageList === null ? localStorage.setItem('list', JSON.stringify([])) : localStorageList;
document.body.appendChild(WebPage(updatedList));
addTask();
