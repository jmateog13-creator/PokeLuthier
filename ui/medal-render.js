// ============================================================================
// PokéLuthier · ui/medal-render.js
// Animació "Has obtingut la medalla X" estil Pokémon.
// ============================================================================

import { setText, show, hide } from './views.js';

export function mostrarMedallaObtinguda(medalla, callback) {
  // Reutilitzem el trainer-intro overlay com a contenidor genèric
  const overlay = document.createElement('div');
  overlay.className = 'medal-overlay';
  overlay.innerHTML = `
    <div class="medal-card">
      <div class="medal-label">MEDALLA OBTINGUDA</div>
      <div class="medal-big" style="background:${medalla.color}"></div>
      <div class="medal-name">${medalla.nom}</div>
      <div class="medal-desc">${medalla.descripcio}</div>
      <button class="poke-btn poke-btn-primary medal-continue">Continuar</button>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('.medal-continue').addEventListener('click', () => {
    overlay.style.transition = 'opacity 300ms';
    overlay.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(overlay);
      if (callback) callback();
    }, 300);
  });
}
