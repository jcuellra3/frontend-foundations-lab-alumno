import { loadDashboard, withTimeout } from './async-tools.mjs';

const fail = document.querySelector('[data-fail]');
const status = document.querySelector('[data-status]');
const output = document.querySelector('[data-output]');

function delayed(value, milliseconds, { reject = false } = {}) {
  return (signal) => new Promise((resolve, rejectPromise) => {
    const timer = setTimeout(() => reject ? rejectPromise(new Error('Fallo simulado')) : resolve(value), milliseconds);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      rejectPromise(signal.reason ?? new DOMException('Abortado', 'AbortError'));
    }, { once: true });
  });
}

document.querySelector('[data-run]').addEventListener('click', async () => {
  status.textContent = 'Cargando...';
  status.dataset.kind = '';
  output.textContent = '';
  const startedAt = performance.now();

  try {
    const result = await loadDashboard({
      metrics: () => withTimeout(delayed({ completed: 68 }, 450), 1000),
      activity: () => withTimeout(delayed(['Inicio', 'Entrega'], 700, { reject: fail.checked }), 1000),
      alerts: () => withTimeout(delayed([{ level: 'warning', count: 2 }], 300), 1000)
    });
    output.textContent = JSON.stringify({
      elapsedMs: Math.round(performance.now() - startedAt),
      data: result.data,
      errors: Object.fromEntries(Object.entries(result.errors).map(([key, error]) => [key, error.message]))
    }, null, 2);
    status.dataset.kind = Object.keys(result.errors).length ? 'error' : 'success';
    status.textContent = Object.keys(result.errors).length ? 'Carga parcial.' : 'Dashboard cargado.';
  } catch (error) {
    status.dataset.kind = 'error';
    status.textContent = error instanceof Error ? error.message : 'Error desconocido.';
  }
});
