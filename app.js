// ============================================================================
// PokéLuthier · app.js (entry point)
// Inicialitza tot el joc, lliga els events globals.
// ============================================================================

import { GameState, setGameState, nouEstat, carregar, esborrarSave, desar } from './engine/state.js';
import { showView } from './ui/views.js';
import { renderHUD } from './ui/hud.js';
import { renderMapa, dibuixarLiniesMapa } from './ui/map-render.js';
import { obrirTutorial } from './ui/tutorial-render.js';
import { obrirPractica } from './ui/practice-render.js';
import { inicialitzarDebug } from './ui/debug.js';
import { ferSwitch } from './engine/combat.js';

// ─── Cicle de partida ────────────────────────────────────────────────────
function novaPartida() {
  esborrarSave();
  setGameState(nouEstat());
  GameState.team[0].slotActiu = true;
  showView('mapa');
  renderMapa();
  renderHUD();
  desar();
}

function continuarPartida() {
  const saved = carregar();
  if (!saved) { novaPartida(); return; }
  setGameState(saved);
  if (!GameState.team.some(t => t.slotActiu)) {
    const viu = GameState.team.find(t => t.hp > 0);
    if (viu) viu.slotActiu = true;
  }
  showView('mapa');
  renderMapa();
  renderHUD();
}

function tornarLanding() {
  showView('landing');
  const btn = document.getElementById('btn-continuar');
  if (btn) btn.style.display = carregar() ? 'inline-block' : 'none';
}

// ─── Modal d'equip (cintura del Luthier) ────────────────────────────────
function obrirEquip() {
  const modal = document.getElementById('equip-modal');
  const cont = document.getElementById('equip-slots');
  cont.innerHTML = '';
  // (Importem instruments de forma directa per evitar circularitat)
  import('./data/instruments.js').then(({ INSTRUMENTS }) => {
    import('./data/config.js').then(({ CONFIG }) => {
      for (let i = 0; i < CONFIG.equipMaxim; i++) {
        const slot = document.createElement('div');
        slot.className = 'equip-slot';
        const t = GameState && GameState.team[i];
        if (!t) {
          slot.classList.add('empty');
          slot.innerHTML = '<div class="equip-emoji">·</div><div class="equip-info"><div class="equip-name">Buit</div></div>';
        } else {
          const inst = INSTRUMENTS[t.instrumentId];
          if (t.hp <= 0) slot.classList.add('broken');
          if (t.slotActiu) slot.classList.add('active');
          slot.innerHTML = `
            <div class="equip-emoji">${inst.emoji}</div>
            <div class="equip-info">
              <div class="equip-name">${inst.nom} · Lv${t.nivell}</div>
              <div class="equip-hp-bar"><div class="equip-hp-fill" style="width:${(t.hp/t.hpMax)*100}%"></div></div>
              <div class="equip-hp-text">${t.hp}/${t.hpMax}</div>
            </div>`;
          const fill = slot.querySelector('.equip-hp-fill');
          const pct = (t.hp / t.hpMax) * 100;
          if (pct < 20) fill.classList.add('danger');
          else if (pct < 50) fill.classList.add('warn');

          if (GameState.activeCombat && !t.slotActiu && t.hp > 0) {
            slot.addEventListener('click', () => { tancarEquip(); ferSwitch(i); });
          }
        }
        cont.appendChild(slot);
      }
    });
  });
  modal.style.display = 'flex';
}

function tancarEquip() {
  document.getElementById('equip-modal').style.display = 'none';
}

// ─── EVENTS GLOBALS ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Landing
  document.getElementById('btn-jugar').addEventListener('click', novaPartida);
  document.getElementById('btn-tutorial').addEventListener('click', () => {
    obrirTutorial((salt) => {
      if (salt) showView('landing');
      else novaPartida();
    });
  });
  document.getElementById('btn-practica').addEventListener('click', obrirPractica);
  document.getElementById('btn-continuar').addEventListener('click', continuarPartida);
  if (carregar()) document.getElementById('btn-continuar').style.display = 'inline-block';

  // Mapa
  document.getElementById('btn-equip').addEventListener('click', obrirEquip);
  document.getElementById('btn-tancar-equip').addEventListener('click', tancarEquip);
  document.getElementById('btn-worldmap').addEventListener('click', () => {
    import('./ui/world-map-render.js').then(m => m.obrirMapaMon());
  });

  // Combat: botó "Cintura"
  document.getElementById('btn-switch').addEventListener('click', obrirEquip);

  // Final i Game Over → tornar a landing
  const btnNovaPartida = document.getElementById('btn-nova-partida');
  if (btnNovaPartida) btnNovaPartida.addEventListener('click', tornarLanding);
  const btnTornar = document.getElementById('btn-tornar-comencar');
  if (btnTornar) btnTornar.addEventListener('click', tornarLanding);

  // Debug
  inicialitzarDebug();

  // Resize → redibuixar línies si estem al mapa
  window.addEventListener('resize', () => {
    if (document.getElementById('view-mapa').classList.contains('view-active')) {
      dibuixarLiniesMapa();
    }
  });

  // Inicialització
  showView('landing');
});
