// ===========================
// Carga de datos
// ===========================
async function loadData() {
  const res = await fetch('inventario_caducidades.json');
  return await res.json();
}

// ===========================
// Utilidades
// ===========================
function fmt(v) {
  return Number(v || 0).toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
}

function parseDateYMD(s) {
  if (!s) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return new Date(s + 'T00:00:00');
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) {
    const p = s.split('/');
    return new Date(p[2] + '-' + p[1] + '-' + p[0] + 'T00:00:00');
  }
  const d = new Date(s);
  return isNaN(d) ? null : d;
}

function formatYMD(d) {
  if (!d) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDays(d, n) {
  const x = new Date(d.getTime());
  x.setDate(x.getDate() + Number(n));
  return x;
}

function daysDiff(a, b) {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

// ===========================
// Cálculo de fecha de caducidad
// ===========================
function computeExpiryForItem(item) {
  if (item.expiry_date) {
    const d = parseDateYMD(item.expiry_date);
    if (d) return d;
  }
  if (item.manufacture_date && item.shelf_life_days) {
    const m = parseDateYMD(item.manufacture_date);
    if (m) return addDays(m, Number(item.shelf_life_days));
  }
  return null;
}

// ===========================
// Totales y status del producto
// ===========================
function computeTotalsAndStatus(item) {
  item.total = Math.round((Number(item.precio || 0) * Number(item.cantidad || 0)) * 100) / 100;

  const exp = computeExpiryForItem(item);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!exp) {
    item.status = 'sin_fecha';
    item.expiry_calc = null;
    return;
  }

  item.expiry_calc = formatYMD(exp);
  const diff = daysDiff(today, exp);
  item.days_to_expiry = diff;

  if (diff < 0) item.status = 'caducado';
  else if (diff <= 7) item.status = 'por_vencer';
  else item.status = 'ok';
}

// ===========================
// Render de tabla
// ===========================
function createTable(data, filter = '', catFilter = 'all') {
  const wrapper = document.getElementById('tablaWrapper');
  wrapper.innerHTML = '';
  let grand = 0;
  const q = (filter || '').toLowerCase();

  for (const [cat, obj] of Object.entries(data.categorias)) {
    if (catFilter !== 'all' && catFilter !== cat) continue;

    const prods = obj.productos.filter(p => {
      if (!q) return true;
      return (p.producto || '').toLowerCase().includes(q) ||
             (p.categoria || '').toLowerCase().includes(q);
    });

    if (prods.length === 0) continue;

    // Título categoría
    const h = document.createElement('h3');
    h.textContent = cat;
    wrapper.appendChild(h);

    // Tabla
    const table = document.createElement('table');
    table.innerHTML = `<thead>
      <tr>
        <th>Producto</th><th>Precio</th><th>Cantidad</th><th>Total</th>
        <th>Fab</th><th>Cad</th><th>Vida(d)</th><th>Status</th>
      </tr>
    </thead>`;

    const tb = document.createElement('tbody');

    prods.forEach(p => {
      computeTotalsAndStatus(p);

      const tr = document.createElement('tr');
      let bg = '';
      if (p.status === 'caducado') bg = 'background:#ffd6d6';
      else if (p.status === 'por_vencer') bg = 'background:#fff3cd';
      else if (p.status === 'ok') bg = 'background:#e6ffed';
      tr.setAttribute('style', bg);

      tr.innerHTML = `
        <td>${esc(p.producto)}</td>
        <td contenteditable data-field="precio" data-cat="${cat}" data-id="${p.producto}">${p.precio}</td>
        <td contenteditable data-field="cantidad" data-cat="${cat}" data-id="${p.producto}">${p.cantidad}</td>
        <td data-field="total" data-cat="${cat}" data-id="${p.producto}">${fmt(p.total)}</td>
        <td contenteditable data-field="manufacture_date" data-cat="${cat}" data-id="${p.producto}">${p.manufacture_date || ''}</td>
        <td contenteditable data-field="expiry_date" data-cat="${cat}" data-id="${p.producto}">${p.expiry_date || p.expiry_calc || ''}</td>
        <td contenteditable data-field="shelf_life_days" data-cat="${cat}" data-id="${p.producto}">${p.shelf_life_days || ''}</td>
        <td data-field="status" data-cat="${cat}" data-id="${p.producto}">${p.status}${p.days_to_expiry !== undefined ? ` (${p.days_to_expiry}d)` : ''}</td>
      `;
      tb.appendChild(tr);
    });

    table.appendChild(tb);
    wrapper.appendChild(table);

    // Subtotal por categoría
    const subtotal = prods.reduce((s, i) => s + Number(i.total || 0), 0);
    grand += subtotal;
    const foot = document.createElement('div');
    foot.className = 'subtotal';
    foot.textContent = `Subtotal (${cat}): $ ${fmt(subtotal)}`;
    wrapper.appendChild(foot);
  }

  document.getElementById('grandTotal').textContent = fmt(grand);
  attachHandlers(data);
}

// ===========================
// Handlers para editar y exportar
// ===========================
function attachHandlers(data) {
  // Editable
  document.querySelectorAll('[contenteditable]').forEach(td => {
    td.onblur = () => {
      const field = td.dataset.field;
      const cat = td.dataset.cat;
      const id = td.dataset.id;
      let value = td.textContent.trim();

      if (['precio', 'cantidad', 'shelf_life_days'].includes(field)) {
        value = value.replace(/[^0-9\.-]/g, '');
        value = value === '' ? 0 : Number(value);
      }

      if (['manufacture_date', 'expiry_date'].includes(field)) {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
          const p = value.split('/');
          value = `${p[2]}-${p[1].padStart(2,'0')}-${p[0].padStart(2,'0')}`;
        }
      }

      const list = data.categorias[cat].productos;
      const it = list.find(x => x.producto === id);
      if (!it) return;

      it[field] = value;
      computeTotalsAndStatus(it);

      // Actualiza totales y status
      const totalTd = document.querySelector(`[data-field="total"][data-id="${id}"]`);
      if (totalTd) totalTd.textContent = fmt(it.total);

      const statusTd = document.querySelector(`[data-field="status"][data-id="${id}"]`);
      if (statusTd) statusTd.textContent = it.status + (it.days_to_expiry !== undefined ? ` (${it.days_to_expiry}d)` : '');

      // Re-render tabla
      createTable(data, document.getElementById('search').value, document.getElementById('categoryFilter').value);

      // Guardar en LocalStorage
      localStorage.setItem('inventario_caducidades', JSON.stringify(data));
    };
  });

  // Export JSON
  document.getElementById('exportJson').onclick = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventario_caducidades_actualizado.json';
    a.click();
    URL.revokeObjectURL(url);
  };
}

// ===========================
// Inicialización
// ===========================
(async () => {
  // Carga datos desde JSON o LocalStorage
  let data = JSON.parse(localStorage.getItem('inventario_caducidades') || 'null');
  if (!data) data = await loadData();
  window.__data = data;

  // Search
  document.getElementById('search').oninput = e =>
    createTable(window.__data, e.target.value, document.getElementById('categoryFilter').value);

  // Category filter
  const sel = document.getElementById('categoryFilter');
  sel.onchange = () =>
    createTable(window.__data, document.getElementById('search').value, sel.value);

  // Rellenar opciones de categorías
  Object.keys(data.categorias).forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    sel.appendChild(opt);
  });

  // Crear tabla inicial
  createTable(data);
})();
