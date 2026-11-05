export const money = (n) => `$ ${Number(n).toLocaleString('es-AR')}`;
export const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const norm = (s = '') => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '-');
