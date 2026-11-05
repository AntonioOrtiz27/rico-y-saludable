import { esc, money } from '../utils/format.js';
export function productCard(p) {
  const opts = Object.entries(p.prices || {});
  const img = p.image_url
    ? `<img src="${esc(p.image_url)}" alt="${esc(p.name)}" loading="lazy" />`
    : `<span class="ph">${esc(p.name.charAt(0))}</span>`;
  const body = opts.length
    ? `<select class="pres" aria-label="Presentación">${opts.map(([l, v]) => `<option value="${esc(l)}" data-price="${v}">${esc(l)} · ${money(v)}</option>`).join('')}</select>
       <button class="btn add" data-add="${p.id}">Agregar</button>`
    : `<a class="btn ghost" target="_blank" rel="noopener" href="__WA__${encodeURIComponent('Hola! Quiero consultar el precio de: ' + p.name)}">Consultar precio</a>`;
  return `<article class="card"><div class="thumb">${img}</div><div class="info"><h3>${esc(p.name)}</h3>${body}</div></article>`;
}
