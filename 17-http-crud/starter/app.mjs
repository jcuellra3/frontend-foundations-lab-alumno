const form = document.querySelector('[data-form]');
const fields = form.elements;
const tableBody = document.querySelector('[data-table-body]');
const formStatus = document.querySelector('[data-form-status]');
const listStatus = document.querySelector('[data-list-status]');
const cancelButton = document.querySelector('[data-cancel]');
const formTitle = document.querySelector('[data-form-title]');

let products = [];
let mutationPending = false;

function renderProducts() {
  tableBody.replaceChildren();

  for (const product of products) {
    const row = document.createElement('tr');
    row.dataset.productId = product.id;

    for (const value of [product.name, product.price, product.stock]) {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    }

    const actions = document.createElement('td');
    actions.innerHTML = '<button type="button" data-action="edit">Editar</button> <button type="button" data-action="delete">Borrar</button>';
    row.appendChild(actions);
    tableBody.appendChild(row);
  }
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  if (response.status === 204) return null;

  const data = await response.json();
  if (!response.ok) {
    const apiError = data.error || data;
    const error = new Error(apiError.message || `Error HTTP ${response.status}`);
    error.details = apiError.details;
    throw error;
  }
  return data;
}

function clearMessages() {
  formStatus.textContent = '';
  form.querySelectorAll('[data-error-for]').forEach((element) => {
    element.textContent = '';
  });
}

function setMutationPending(pending) {
  mutationPending = pending;
  form.querySelectorAll('button').forEach((button) => {
    button.disabled = pending;
  });
  tableBody.querySelectorAll('button').forEach((button) => {
    button.disabled = pending;
  });
}

async function loadProducts() {
  try {
    const data = await requestJson('/api/products');
    products = data.items;
    renderProducts();
  } catch (error) {
    listStatus.textContent = error.message;
  }
}

async function saveProduct(event) {
  event.preventDefault();
  if (mutationPending) return;

  clearMessages();
  setMutationPending(true);

  const id = fields.namedItem('id').value;
  const product = {
    name: fields.namedItem('name').value,
    category: fields.namedItem('category').value,
    price: Number(fields.namedItem('price').value),
    stock: Number(fields.namedItem('stock').value)
  };

  try {
    const savedProduct = await requestJson(id ? `/api/products/${id}` : '/api/products', {
      method: id ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    if (id) {
      products = products.map((item) => String(item.id) === id ? savedProduct : item);
    } else {
      products.push(savedProduct);
    }

    renderProducts();
    cancelEdit();
  } catch (error) {
    if (error.details) {
      form.querySelectorAll('[data-error-for]').forEach((element) => {
        element.textContent = error.details[element.dataset.errorFor] || '';
      });
    } else {
      formStatus.textContent = error.message;
    }
  } finally {
    setMutationPending(false);
  }
}

function startEdit(product) {
  for (const name of ['id', 'name', 'category', 'price', 'stock']) {
    fields.namedItem(name).value = product[name];
  }
  formTitle.textContent = `Editar ${product.name}`;
  cancelButton.hidden = false;
  clearMessages();
}

function cancelEdit() {
  form.reset();
  formTitle.textContent = 'Nuevo producto';
  cancelButton.hidden = true;
  clearMessages();
}

async function deleteProduct(id) {
  if (mutationPending || !window.confirm('¿Seguro que deseas eliminar este producto?')) return;

  setMutationPending(true);
  try {
    await requestJson(`/api/products/${id}`, { method: 'DELETE' });
    products = products.filter((product) => String(product.id) !== id);
    renderProducts();
  } catch (error) {
    listStatus.textContent = error.message;
  } finally {
    setMutationPending(false);
  }
}

form.addEventListener('submit', saveProduct);
cancelButton.addEventListener('click', cancelEdit);

tableBody.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button || mutationPending) return;

  const id = button.closest('[data-product-id]').dataset.productId;
  if (button.dataset.action === 'edit') {
    startEdit(products.find((product) => String(product.id) === id));
  } else if (button.dataset.action === 'delete') {
    deleteProduct(id);
  }
});

loadProducts();
