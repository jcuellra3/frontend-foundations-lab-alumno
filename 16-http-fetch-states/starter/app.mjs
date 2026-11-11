const stateContainer = document.querySelector('[data-state]');
const loadButton = document.querySelector('[data-load]');
const scenarioSelect = document.querySelector('[data-scenario]');

let lastScenario = '';

//fetchProducts comprobando response.ok y validando el JSON/items
async function fetchProducts(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${response.status}`);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('La respuesta no contiene JSON válido');
  }

  const items = Array.isArray(data) ? data : data?.items;
  if (!Array.isArray(items)) throw new Error('La respuesta no contiene una lista de productos válida');
  return items;
}

function renderState(state) {
  stateContainer.innerHTML = '';

  if (state.status === 'idle') stateContainer.textContent = 'Listo';
  if (state.status === 'loading') stateContainer.textContent = 'Cargando...';
  if (state.status === 'empty') stateContainer.textContent = 'Sin resultados';

  if (state.status === 'success') {
    stateContainer.textContent = state.data.map(p => p.name).join(', ');
  }

  if (state.status === 'error') {
    stateContainer.textContent = state.message;
    const retryButton = document.createElement('button');
    retryButton.type = 'button';
    retryButton.textContent = 'Reintentar';
    retryButton.addEventListener('click', () => load(true));
    stateContainer.append(' ', retryButton);
  }
}

//Carga, bloqueo de controles y reintento con el último escenario
async function load(isRetry = false) {
  if (!isRetry) lastScenario = scenarioSelect?.value || '';

  const urls = {
    empty: '/api/products?search=resultado-imposible',
    error: '/api/products?status=500',
    slow: '/api/products?delay=1500'
  };
  const url = urls[lastScenario] || '/api/products';

  loadButton.disabled = true;
  scenarioSelect.disabled = true;
  renderState({ status: 'loading' });

  try {
    const items = await fetchProducts(url);
    renderState({ status: items.length === 0 ? 'empty' : 'success', data: items });
  } catch (err) {
    renderState({ status: 'error', message: err.message });
  } finally {
    loadButton.disabled = false;
    scenarioSelect.disabled = false;
  }
}

loadButton.addEventListener('click', () => load(false));
renderState({ status: 'idle' });