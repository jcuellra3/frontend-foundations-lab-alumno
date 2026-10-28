let tasks = [
  { id: '1', title: 'Implementar loading', completed: true },
  { id: '2', title: 'Probar error 500', completed: false }
];

const form = document.querySelector('[data-form]');
const list = document.querySelector('[data-list]');
const status = document.querySelector('[data-status]');

function render() {
  list.replaceChildren();
  for (const task of tasks) {
    const item = document.createElement('li');
    item.className = 'task-item';
    item.dataset.taskId = task.id;
    item.dataset.completed = String(task.completed);
    item.innerHTML = `
      <span class="task-item__title"></span>
      <button type="button" data-action="toggle">✓</button>
      <button type="button" data-action="delete">×</button>
    `;
    item.querySelector('.task-item__title').textContent = task.title;
    list.append(item);

    // TODO: elimina listeners por item y delega en la lista.
    item.querySelector('[data-action="delete"]').addEventListener('click', () => {
      tasks = tasks.filter((candidate) => candidate.id !== task.id);
      render();
    });
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // TODO: crear tarea, limpiar formulario y anunciar resultado.
});

render();
