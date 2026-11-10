const products = [
  { name: 'Teclado', category: 'Perifericos', price: 89.9 },
  { name: 'Raton', category: 'Perifericos', price: 54.5 },
  { name: 'Monitor 27', category: 'Monitores', price: 289 },
  { name: 'Monitor portatil', category: 'Monitores', price: 169.99 }
];

const STORAGE_KEY = 'frontend-foundations-view-v1';

const form = document.querySelector('[data-filters]');
const results = document.querySelector('[data-results]');
const status = document.querySelector('[data-status]');
const viewControls = [...document.querySelectorAll('input[name="view"]')];

function readFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get('search') || '',
    category: params.get('category') || '',
    sort: params.get('sort') || 'name'
  };
}

function writeFiltersToUrl(filters) {
  const params = new URLSearchParams();

  if (filters.search && filters.search.trim() !== '') {
    params.set('search', filters.search.trim());
  }
  if (filters.category && filters.category !== '') {
    params.set('category', filters.category);
  }
  if (filters.sort && filters.sort !== 'name') {
    params.set('sort', filters.sort);
  }

  const query = params.toString();
  const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState(null, '', newUrl);
}

function readViewPreference() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return 'grid';
    const parsed = JSON.parse(stored);
    if (parsed === 'grid' || parsed === 'list') {
      return parsed;
    }
  } catch {
    //Si el JSON en localStorage está corrupto, usa el valor por defecto
  }
  return 'grid';
}

function writeViewPreference(view) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(view));
  } catch {
    // Protección defensiva en caso de fallo de almacenamiento
  }
}

function render() {
  const filters = {
    search: form.elements.search.value,
    category: form.elements.category.value,
    sort: form.elements.sort.value
  };

  writeFiltersToUrl(filters);

  const selectedView = viewControls.find((control) => control.checked)?.value || 'grid';
  writeViewPreference(selectedView);

  const filtered = products
    .filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(filters.search.trim().toLowerCase());
      const matchCategory = !filters.category || product.category === filters.category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (filters.sort === 'price') {
        return a.price - b.price;
      }
      return a.name.localeCompare(b.name);
    });

  results.textContent = JSON.stringify(filtered);
}

//Cargar filtros y vista guardada al arrancar
const initialFilters = readFiltersFromUrl();
form.elements.search.value = initialFilters.search;
form.elements.category.value = initialFilters.category;
form.elements.sort.value = initialFilters.sort;

const initialView = readViewPreference();
const activeRadio = viewControls.find((control) => control.value === initialView);
if (activeRadio) {
  activeRadio.checked = true;
}

form.addEventListener('input', render);
form.addEventListener('reset', () => setTimeout(render));
viewControls.forEach((control) => control.addEventListener('change', render));
render();
