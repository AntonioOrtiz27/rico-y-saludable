import './styles/main.css';
import { renderCatalog } from './pages/catalog.js';
import { renderAdmin } from './pages/admin.js';

function route() {
  const app = document.getElementById('app');
  const fresh = app.cloneNode(false); // nodo limpio: elimina listeners del render anterior
  app.replaceWith(fresh);
  if (location.hash.startsWith('#/admin')) renderAdmin(fresh); else renderCatalog(fresh);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', () => {
  if (location.hash.startsWith('#/')) route(); // los anclas de categoría (#slug) no recargan la página
});
route();
