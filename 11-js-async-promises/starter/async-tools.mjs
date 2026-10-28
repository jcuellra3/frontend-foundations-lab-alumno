export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function withTimeout(operation, timeoutMs) {
  // TODO
  return operation(new AbortController().signal);
}

export async function retry(operation, { retries = 2, delayMs = 0, shouldRetry = () => true } = {}) {
  // TODO
  return operation(1);
}

export async function loadDashboard(loaders) {
  // TODO
  const data = {};
  for (const [key, loader] of Object.entries(loaders)) {
    data[key] = await loader();
  }
  return { data, errors: {} };
}
