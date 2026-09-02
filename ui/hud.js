// ============================================================================
// PokéLuthier · ui/hud.js
// HUD del mapa: caixa TEAM (instrument actiu) + Nº node + BAG + medalles.
// ============================================================================

import { GameState, playerActiu } from '../engine/state.js';
import { INSTRUMENTS } from '../data/instruments.js';
import { MEDALS, ORDRE_MEDALLES } from '../data/medals.js';
import { setText, setIcon } from './views.js';

export function renderHUD() {
  if (!GameState) return;
  setText('hud-node', GameState.currentLevel);
  setText('hud-or',   GameState.or);

  // Caixa TEAM
  const t = playerActiu();
  if (t) {
    const inst = INSTRUMENTS[t.instrumentId];
    setIcon('hud-team-emoji', inst);
    setText('hud-team-name',  inst.nom);
    setText('hud-team-lvl',   t.nivell);
    const fill = document.getElementById('hud-team-hp');
    if (fill) {
      const pct = (t.hp / t.hpMax) * 100;
      fill.style.width = pct + '%';
      fill.classList.remove('warn','danger');
      if (pct < 20) fill.classList.add('danger');
      else if (pct < 50) fill.classList.add('warn');
    }
  }

  // Medalles
  renderMedalles();
}

function renderMedalles() {
  const cont = document.getElementById('hud-medals');
  if (!cont) return;
  cont.innerHTML = '';
  ORDRE_MEDALLES.forEach(id => {
    const guanyada = GameState.medalles.includes(id);
    const m = MEDALS[id];
    const el = document.createElement('div');
    el.className = 'medal-slot' + (guanyada ? ' won' : '');
    el.title = m.nom + (guanyada ? '' : ' (no guanyada)');
    el.innerHTML = `<span class="medal-icon" style="background:${guanyada ? m.color : '#888'}"></span>`;
    cont.appendChild(el);
  });
}
