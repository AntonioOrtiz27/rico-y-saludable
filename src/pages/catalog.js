import { BUSINESS, CATEGORIES } from '../config/constants.js';
import { fetchCatalog } from '../services/productService.js';
import { productCard } from '../components/productCard.js';
import { renderCart, whatsappOrder } from '../components/cartDrawer.js';
import { norm, slug } from '../utils/format.js';
import * as cart from '../state/cart.js';

export async function renderCatalog(root) {
  root.innerHTML = `
  <header class="top"><img src="${import.meta.env.BASE_URL}logo.png" alt="Logo ${BUSINESS.name}" class="logo" />
    <div><h1>${BUSINESS.name}</h1><p>${BUSINESS.tagline} · ${BUSINESS.slogan}</p></div></header>
  <div class="bar"><input id="q" type="search" placeholder="Buscar producto…" aria-label="Buscar producto" />
    <nav id="cats" aria-label="Categorías"></nav></div>
  <main id="list"><p class="empty">Cargando catálogo…</p></main>
  <footer><p><strong>${BUSINESS.slogan}</strong></p>
    <p><a href="https://instagram.com/${BUSINESS.instagram}" target="_blank" rel="noopener">Instagram @${BUSINESS.instagram}</a> ·
    <a href="https://wa.me/${BUSINESS.whatsapp}" target="_blank" rel="noopener">WhatsApp ${BUSINESS.whatsappLabel}</a></p>
    <p>Retiro por domicilio · Envíos a domicilio</p><a class="adm" href="#/admin">Administrar</a></footer>
  <button id="fab" class="fab">Mi pedido <b id="cart-count">0</b></button>
  <aside id="drawer" class="drawer" hidden><div class="sheet"><div class="sh-head"><h2>Mi pedido</h2><button id="close" aria-label="Cerrar">✕</button></div>
    <div class="lines"></div><textarea id="note" placeholder="Nota (retiro, envío, gramos exactos…)"></textarea>
    <div class="sum"><span>Total estimado</span><strong class="total"></strong></div>
    <button id="send" class="btn add wide">Enviar pedido por WhatsApp</button></div></aside>`;

  const { products } = await fetchCatalog();
  const active = products.filter((p) => p.active);
  const byId = Object.fromEntries(active.map((p) => [String(p.id), p]));
  const cats = [...new Set([...CATEGORIES, ...active.map((p) => p.category)])].filter((c) => active.some((p) => p.category === c));
  const list = root.querySelector('#list'), drawer = root.querySelector('#drawer');

  root.querySelector('#cats').innerHTML = cats.map((c) => `<a href="#${slug(c)}" data-c="${slug(c)}">${c}</a>`).join('');
  const draw = (q = '') => {
    const html = cats.map((c) => {
      const ps = active.filter((p) => p.category === c && norm(p.name).includes(norm(q)));
      return ps.length ? `<section id="${slug(c)}"><h2>${c}</h2><div class="grid">${ps.map(productCard).join('')}</div></section>` : '';
    }).join('');
    list.innerHTML = (html || '<p class="empty">No encontramos ese producto. Probá con otra palabra.</p>')
      .replaceAll('__WA__', `https://wa.me/${BUSINESS.whatsapp}?text=`);
  };
  draw();
  root.querySelector('#cats').addEventListener('click', (e) => {
    const a = e.target.closest('a'); if (!a) return; e.preventDefault();
    document.getElementById(a.dataset.c)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  root.querySelector('#q').addEventListener('input', (e) => draw(e.target.value));
  list.addEventListener('click', (e) => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    const p = byId[b.dataset.add], sel = b.parentElement.querySelector('select'), opt = sel.selectedOptions[0];
    cart.add(`${p.id}|${sel.value}`, { name: p.name, label: sel.value, price: Number(opt.dataset.price) });
    b.textContent = 'Agregado ✓'; setTimeout(() => (b.textContent = 'Agregar'), 900);
  });
  const sync = () => renderCart(drawer);
  cart.subscribe(sync); sync();
  root.querySelector('#fab').onclick = () => (drawer.hidden = false);
  root.querySelector('#close').onclick = () => (drawer.hidden = true);
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) drawer.hidden = true;
    const q = e.target.closest('[data-q]'); if (q) cart.change(q.dataset.q, Number(q.dataset.d));
  });
  root.querySelector('#send').onclick = () => window.open(whatsappOrder(root.querySelector('#note').value.trim()), '_blank');
}
