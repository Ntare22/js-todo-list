export default function checkCompleted(checkbox, item, list) {
  checkbox.addEventListener('change', () => {
    if (!item.completed) {
      item.completed = true;
      checkbox.checked = true;
      localStorage.setItem('list', JSON.stringify(list));
    } else {
      item.completed = false;
      checkbox.checked = false;
      localStorage.setItem('list', JSON.stringify(list));
    }
  });
}
