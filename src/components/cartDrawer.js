import { BUSINESS } from '../config/constants.js';
import { esc, money } from '../utils/format.js';
import * as cart from '../state/cart.js';

export function renderCart(el) {
  const items = cart.getItems();
  document.querySelector('#cart-count').textContent = cart.count();
  el.querySelector('.lines').innerHTML = items.length
    ? items.map((i) => `<div class="line"><div><strong>${esc(i.name)}</strong><small>${esc(i.label)} · ${money(i.price)}</small></div>
        <div class="qty"><button data-q="${esc(i.key)}" data-d="-1" aria-label="Quitar uno">−</button><span>${i.qty}</span><button data-q="${esc(i.key)}" data-d="1" aria-label="Sumar uno">+</button></div></div>`).join('')
    : '<p class="empty">Tu pedido está vacío. Elegí productos y se suman acá.</p>';
  el.querySelector('.total').textContent = money(cart.total());
  el.querySelector('#send').disabled = !items.length;
}
export function whatsappOrder(note) {
  const lines = cart.getItems().map((i) => `• ${i.qty} x ${i.name} (${i.label}) — ${money(i.qty * i.price)}`);
  const msg = `Hola ${BUSINESS.name}! Quiero hacer este pedido:\n\n${lines.join('\n')}\n\nTotal estimado: ${money(cart.total())}${note ? `\n\nNota: ${note}` : ''}`;
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`;
}
