const items = new Map();
let listener = () => {};
export const subscribe = (fn) => { listener = fn; };
const emit = () => listener();
export const getItems = () => [...items.entries()].map(([key, v]) => ({ key, ...v }));
export const count = () => getItems().reduce((n, i) => n + i.qty, 0);
export const total = () => getItems().reduce((n, i) => n + i.qty * i.price, 0);
export function add(key, data) {
  const cur = items.get(key);
  items.set(key, cur ? { ...cur, qty: cur.qty + 1 } : { ...data, qty: 1 });
  emit();
}
export function change(key, delta) {
  const cur = items.get(key);
  if (!cur) return;
  cur.qty + delta <= 0 ? items.delete(key) : items.set(key, { ...cur, qty: cur.qty + delta });
  emit();
}
export const clear = () => { items.clear(); emit(); };
