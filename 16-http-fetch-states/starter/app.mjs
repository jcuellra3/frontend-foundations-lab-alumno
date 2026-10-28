const stateContainer = document.querySelector('[data-state]');
const loadButton = document.querySelector('[data-load]');
const scenarioSelect = document.querySelector('[data-scenario]');

async function fetchProducts(url) {
  // TODO: comprueba response.ok y valida la forma minima del JSON.
  const response = await fetch(url);
  return response.json();
}

function renderState(state) {
  // TODO: representa idle/loading/error/empty/success sin mezclar estados.
  stateContainer.textContent = JSON.stringify(state);
}

async function load() {
  // TODO: elige URL segun escenario, actualiza loading y maneja errores.
}

loadButton.addEventListener('click', load);
renderState({ status: 'idle' });
