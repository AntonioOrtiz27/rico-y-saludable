import { CATEGORIES, PRESENTATIONS } from '../config/constants.js';
import { supabase } from '../services/supabase.js';
import { getSession, login, logout } from '../services/authService.js';
import { fetchCatalog, updateProduct, createProduct, deleteProduct, seedDatabase } from '../services/productService.js';
import { esc } from '../utils/format.js';

const shell = (inner) => `<div class="admin"><header class="a-head"><h1>Panel de administración</h1><a href="#/">← Ver tienda</a></header>${inner}</div>`;

export async function renderAdmin(root) {
  if (!supabase) return (root.innerHTML = shell('<p class="notice">Falta conectar Supabase. Cargá <code>VITE_SUPABASE_URL</code> y <code>VITE_SUPABASE_ANON_KEY</code> (ver README).</p>'));
  if (!(await getSession())) return loginView(root);
  const { products, source } = await fetchCatalog();
  const cats = (c) => [...new Set([...CATEGORIES, c])].map((x) => `<option ${x === c ? 'selected' : ''}>${esc(x)}</option>`).join('');
  const row = (p) => `<form class="arow" data-id="${p.id}"><input name="name" value="${esc(p.name)}" aria-label="Nombre" />
    <select name="category" aria-label="Categoría">${cats(p.category)}</select>
    <div class="prices">${PRESENTATIONS.map((l) => `<label>${l}<input name="p_${l}" inputmode="numeric" value="${p.prices?.[l] ?? ''}" placeholder="—" /></label>`).join('')}</div>
    <input name="image_url" value="${esc(p.image_url || '')}" placeholder="URL de imagen (opcional)" />
    <label class="chk"><input type="checkbox" name="active" ${p.active ? 'checked' : ''} /> Visible</label>
    <div class="acts"><button class="btn add" type="submit">Guardar</button><button class="btn ghost" type="button" data-del>Eliminar</button></div></form>`;
  root.innerHTML = shell(`<div class="tools"><button id="new" class="btn add">+ Agregar producto</button>
    ${source === 'seed' ? '<button id="seed" class="btn ghost">Cargar catálogo inicial a la base</button>' : ''}
    <button id="out" class="btn ghost">Cerrar sesión</button></div><p id="msg" class="notice" hidden></p>
    ${source === 'seed' ? '<p class="notice">La base está vacía: la tienda muestra el catálogo inicial. Cargalo para poder editarlo.</p>' : products.map(row).join('')}`);
  const msg = (t) => { const m = root.querySelector('#msg'); m.textContent = t; m.hidden = false; setTimeout(() => (m.hidden = true), 2500); };
  root.querySelector('#out').onclick = async () => { await logout(); renderAdmin(root); };
  root.querySelector('#seed')?.addEventListener('click', async () => { const { error } = await seedDatabase(); error ? msg(error.message) : renderAdmin(root); });
  root.querySelector('#new').onclick = async () => {
    const { error } = await createProduct({ name: 'Nuevo producto', category: CATEGORIES[0], prices: {}, active: false, sort: 999 });
    error ? msg(error.message) : renderAdmin(root);
  };
  root.addEventListener('submit', async (e) => {
    e.preventDefault(); const f = e.target, d = new FormData(f), prices = {};
    PRESENTATIONS.forEach((l) => { const v = parseInt(String(d.get(`p_${l}`)).replace(/\D/g, ''), 10); if (v > 0) prices[l] = v; });
    const { error } = await updateProduct(f.dataset.id, { name: d.get('name').trim(), category: d.get('category'), prices, image_url: d.get('image_url').trim() || null, active: d.has('active') });
    msg(error ? error.message : 'Guardado ✓');
  });
  root.addEventListener('click', async (e) => {
    if (!e.target.matches('[data-del]') || !confirm('¿Eliminar este producto?')) return;
    const { error } = await deleteProduct(e.target.closest('form').dataset.id);
    error ? msg(error.message) : renderAdmin(root);
  });
}
function loginView(root) {
  root.innerHTML = shell(`<form id="login" class="login"><h2>Ingresá para editar precios</h2>
    <input name="email" type="email" placeholder="Email" required /><input name="password" type="password" placeholder="Contraseña" required />
    <button class="btn add wide">Ingresar</button><p id="err" class="notice" hidden></p></form>`);
  root.querySelector('#login').onsubmit = async (e) => {
    e.preventDefault(); const d = new FormData(e.target);
    const { error } = await login(d.get('email'), d.get('password'));
    if (error) { const p = root.querySelector('#err'); p.textContent = 'Email o contraseña incorrectos.'; p.hidden = false; } else renderAdmin(root);
  };
}
