// eslint-disable-next-line import/no-cycle
import displayList from './index.js';

function editTask(item, list, e) {
  const arrayList = document.querySelector('#list-container').childNodes;
  for (let i = 0; i < arrayList.length; i += 1) {
    if (item.index.toString() === arrayList[i].id) {
      // eslint-disable-next-line no-unused-expressions
      e.keyCode === 13 ? item.description = arrayList[i].childNodes[1].value : null;
    }
  }
  localStorage.setItem('list', JSON.stringify(list));
}

function removeTask(item) {
  const currentList = JSON.parse(localStorage.getItem('list'));
  const newList = currentList.filter((todo) => todo.index !== item.index);
  localStorage.setItem('list', JSON.stringify(newList));
  displayList(newList);
}

function addTask() {
  const inputElement = document.getElementById('input-todo');
  inputElement.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const newItem = {
        description: inputElement.value,
        completed: false,
      };
      inputElement.value = '';
      const currentList = JSON.parse(localStorage.getItem('list'));
      currentList.push(newItem);
      displayList(currentList);
    }
  });
}

function clearFinishedTasks() {
  const currentList = JSON.parse(localStorage.getItem('list'));
  const newList = currentList.filter((item) => item.completed !== true);
  displayList(newList);
  localStorage.setItem('list', JSON.stringify(newList));
}

export {
  editTask, removeTask, addTask, clearFinishedTasks,
};
