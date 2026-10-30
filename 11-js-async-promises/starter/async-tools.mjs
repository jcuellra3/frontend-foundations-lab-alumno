export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function withTimeout(operation, timeoutMs) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort(new DOMException('Tiempo agotado', 'TimeoutError'));
  }, timeoutMs);

  try {
    return await operation(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

export async function retry(operation, { retries = 2, delayMs = 0, shouldRetry = () => true } = {}) {
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      return await operation(attempt);
    } catch (error) {
      if (error?.name === 'AbortError' || attempt > retries || !shouldRetry(error)) {
        throw error;
      }
      if (delayMs > 0) {
        await sleep(delayMs);
      }
    }
  }
}

export async function loadDashboard(loaders) {
  const data = {};
  const errors = {};
  const entries = Object.entries(loaders);

  const results = await Promise.allSettled(
    entries.map(([, loader]) => loader())
  );

  results.forEach((result, index) => {
    const key = entries[index][0];

    if (result.status === 'fulfilled') {
      data[key] = result.value;
    } else {
      errors[key] = result.reason;
    }
  });

  return { data, errors };
}