const form = document.querySelector('[data-form]');
const list = document.querySelector('[data-list]');
const status = document.querySelector('[data-status]');
let products = [];

//Se limpian los errores previos de los campos.
function clearErrors() {
  for (const element of form.elements) {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
      const errorId = element.getAttribute('aria-describedby');
      const errorElement = errorId ? document.getElementById(errorId) : null;
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
  }
}

//Se muestran errores y devuelve el primer control que falla.
function showValidationErrors() {
  let firstInvalid = null;
  for (const element of form.elements) {
    if (element.willValidate && !element.checkValidity()) {
      element.setAttribute('aria-invalid', 'true');
      const errorId = element.getAttribute('aria-describedby');
      const errorElement = errorId ? document.getElementById(errorId) : null;
      if (errorElement) {
        errorElement.textContent = element.validationMessage;
      }
      if (!firstInvalid) {
        firstInvalid = element;
      }
    }
  }
  return firstInvalid;
}

//Se convierten los datos del form a números y booleanos.
function toProductDraft(formData) {
  const data = Object.fromEntries(formData);
  return {
    ...data,
    price: Number(data.price),
    stock: Number(data.stock),
    featured: formData.has('featured')
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();
  if (!form.checkValidity()) {
    const firstInvalid = showValidationErrors();
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  const formData = new FormData(form);
  const product = toProductDraft(formData);
  products.push(product);

  //Se pinta el producto en la lista.
  const li = document.createElement('li');
  li.textContent = `${product.name} (${product.category}) - ${product.price.toFixed(2)} € - Stock: ${product.stock} ${product.featured ? '(destacado)' : ''}`;
  list.appendChild(li);

  //Se actualiza el estado accesible.
  status.textContent = 'Producto añadido con éxito.';

  //Se resetea el form y devuelve foco al primer campo.
  form.reset();
  form.elements.name.focus();
});