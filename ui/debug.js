// ============================================================================
// PokéLuthier · ui/debug.js
// Debug toolbar (provisional, ultra-discret).
// ============================================================================

import { GameState, esborrarSave, setGameState } from '../engine/state.js';
import { renderHUD } from './hud.js';
import { showView } from './views.js';
import { toast } from './toast.js';

export function inicialitzarDebug() {
  document.getElementById('dbg-or').addEventListener('click', () => {
    if (!GameState) return;
    GameState.or += 100; renderHUD(); toast('+100 ♪ (debug)', 'info');
  });
  document.getElementById('dbg-cura').addEventListener('click', () => {
    if (!GameState) return;
    GameState.team.forEach(t => { if (t.hp > 0) t.hp = t.hpMax; });
    renderHUD();
    toast('Equip curat (debug)', 'info');
    // Si estem al combat, re-render
    if (GameState.activeCombat) {
      import('./combat-render.js').then(m => m.renderCombat());
    }
  });
  document.getElementById('dbg-gym').addEventListener('click', async () => {
    if (!GameState) return;
    // Salta al següent gym disponible
    const gymLevels = [12, 23, 34, 45, 56];
    const seguent = gymLevels.find(l => l > GameState.currentLevel);
    if (!seguent) { toast('No queden gyms', 'info'); return; }
    GameState.currentLevel = seguent;
    GameState.currentNodeIdx = 0;
    const node = GameState.mapData[seguent - 1][0];
    const { iniciarCombat } = await import('../engine/combat.js');
    iniciarCombat(node);
  });
  document.getElementById('dbg-champion').addEventListener('click', async () => {
    if (!GameState) return;
    GameState.currentLevel = 61;
    GameState.currentNodeIdx = 0;
    // Dóna totes les medalles per simplicitat
    GameState.medalles = ['pols','pentagrama','cromatica','ebenista','or'];
    const node = GameState.mapData[60][0];
    const { iniciarCombat } = await import('../engine/combat.js');
    iniciarCombat(node);
  });
  document.getElementById('dbg-reset').addEventListener('click', () => {
    if (!confirm('Reiniciar tot? Es perdrà la partida.')) return;
    esborrarSave();
    setGameState(null);
    showView('landing');
    const btn = document.getElementById('btn-continuar');
    if (btn) btn.style.display = 'none';
    toast('Partida esborrada', 'info');
  });
}
