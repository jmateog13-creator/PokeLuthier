// ============================================================================
// PokéLuthier · ui/toast.js
// Notificacions emergents.
// ============================================================================

let toastTimeout = null;

export function toast(msg, tipus = 'info', ms = 2200) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show ' + tipus;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), ms);
}
