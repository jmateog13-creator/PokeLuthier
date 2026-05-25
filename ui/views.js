// ============================================================================
// PokéLuthier · ui/views.js
// Gestió de vistes (intercanvi de la vista activa).
// ============================================================================

const VIEWS = ['landing','tutorial','practica','mapa','worldmap','combat','xp','botiga','esdeveniment','encounter','centre','cartell','cofre','mestre','victoria','gameover','balanc'];

export function showView(name) {
  VIEWS.forEach(v => {
    const el = document.getElementById('view-' + v);
    if (el) el.classList.toggle('view-active', name === v);
  });
}

export function setText(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }
export function show(id) { const el = document.getElementById(id); if (el) el.style.display = ''; }
export function hide(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }
