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
    item.querySelector('[data-action="toggle"]').setAttribute(
      'aria-label',
      `${task.completed ? 'Marcar' : 'Completar'} "${task.title}"`,
    );
    item.querySelector('[data-action="delete"]').setAttribute(
      'aria-label',
      `Eliminar "${task.title}"`,
    );
    list.append(item);
  }
}

list.addEventListener('click', (event) => {
  const actionButton = event.target.closest('button[data-action]');
  const item = actionButton?.closest('[data-task-id]');
  if (!item || !list.contains(actionButton)) return;

  const task = tasks.find((candidate) => candidate.id === item.dataset.taskId);
  if (!task) return;

  if (actionButton.dataset.action === 'toggle') {
    task.completed = !task.completed;
  } else if (actionButton.dataset.action === 'delete') {
    tasks = tasks.filter((candidate) => candidate.id !== task.id);
  } else {
    return;
  }

  render();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = form.elements.title;
  const title = titleInput.value.trim();

  if (!title) return;

  tasks.push({
    id: String(Date.now()),
    title,
    completed: false
  });

  titleInput.value = '';
  status.textContent = `Tarea "${title}" creada`;
  render();
});

render();
