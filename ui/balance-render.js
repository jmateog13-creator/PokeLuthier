// ============================================================================
// PokéLuthier · ui/balance-render.js
// M3 — Pantalla balanç pedagògic final (post-Campió o Game Over).
// Mostra estadístiques per tema, temps mig, encerts/errors, etc.
// ============================================================================

import { balancFinal } from '../engine/stats.js';
import { NOMS_TEMES } from '../data/questions.js';
import { MEDALS, ORDRE_MEDALLES } from '../data/medals.js';
import { GameState, esborrarSave, setGameState } from '../engine/state.js';
import { showView, setText } from './views.js';

export function mostrarBalanc(esVictoria) {
  const dades = balancFinal();
  if (!dades) return;
  window.AulaTechBridge.sendOnce('pokeluthier', {
    completat: !!esVictoria,
    errors: dades.errors,
    precisio: dades.pctTotal / 100,
  });
  showView('balanc');

  const cont = document.getElementById('balanc-content');
  cont.innerHTML = '';

  // Capçalera
  const header = document.createElement('div');
  header.className = 'balanc-header';
  header.innerHTML = `
    <div class="balanc-emoji">${esVictoria ? '<img class="inst-icon-img" src="assets/entrenadors/director_orquestra.png" alt="">' : ''}</div>
    <h1 class="balanc-titol">${esVictoria ? 'Has esdevingut Mestre Luthier!' : 'El concert s\'ha acabat...'}</h1>
    <p class="balanc-sub">${esVictoria ? 'Has derrotat el Director d\'Orquestra' : 'Però has après molt pel camí'}</p>
  `;
  cont.appendChild(header);

  // Medalles guanyades
  const medsRow = document.createElement('div');
  medsRow.className = 'balanc-medals';
  medsRow.innerHTML = '<div class="balanc-section-title">Medalles obtingudes</div><div class="balanc-medals-row"></div>';
  const medsRowInner = medsRow.querySelector('.balanc-medals-row');
  ORDRE_MEDALLES.forEach(id => {
    const m = MEDALS[id];
    const guanyada = GameState.medalles.includes(id);
    const el = document.createElement('div');
    el.className = 'balanc-medal' + (guanyada ? ' won' : '');
    el.innerHTML = `<div class="balanc-medal-emoji" style="background:${guanyada ? m.color : '#888'}"></div><div class="balanc-medal-name">${m.nom}</div>`;
    medsRowInner.appendChild(el);
  });
  cont.appendChild(medsRow);

  // Resum global
  const resum = document.createElement('div');
  resum.className = 'balanc-resum';
  resum.innerHTML = `
    <div class="balanc-section-title">Resum global</div>
    <div class="balanc-stats-grid">
      <div class="balanc-stat"><div class="balanc-stat-num">${dades.encerts}</div><div class="balanc-stat-label">Encerts</div></div>
      <div class="balanc-stat"><div class="balanc-stat-num">${dades.errors}</div><div class="balanc-stat-label">Errors</div></div>
      <div class="balanc-stat"><div class="balanc-stat-num">${dades.pctTotal}%</div><div class="balanc-stat-label">% Total</div></div>
      <div class="balanc-stat"><div class="balanc-stat-num">${dades.tempsMigSegons}s</div><div class="balanc-stat-label">Temps mig</div></div>
      <div class="balanc-stat"><div class="balanc-stat-num">${dades.combatsGuanyats}</div><div class="balanc-stat-label">Combats guanyats</div></div>
      <div class="balanc-stat"><div class="balanc-stat-num">${dades.instrumentsTrencats}</div><div class="balanc-stat-label">Trencats</div></div>
    </div>
  `;
  cont.appendChild(resum);

  // Detall per tema (M3 — el cor pedagògic)
  const perTema = document.createElement('div');
  perTema.className = 'balanc-temes';
  perTema.innerHTML = `<div class="balanc-section-title">Per tema (què has après)</div>`;
  const llistaTemes = document.createElement('div');
  llistaTemes.className = 'balanc-temes-list';

  for (const tema in dades.perTema) {
    const t = dades.perTema[tema];
    const nivell = t.pct >= 85 ? 'Excel·lent' :
                   t.pct >= 70 ? 'Bé'         :
                   t.pct >= 50 ? 'Pots millorar' :
                                 'Repassa amb el profe';
    const row = document.createElement('div');
    row.className = 'balanc-tema-row';
    row.innerHTML = `
      <div class="balanc-tema-info">
        <div class="balanc-tema-name">${NOMS_TEMES[tema] || tema}</div>
        <div class="balanc-tema-stats">${t.ok}/${t.ok + t.ko} · ${nivell}</div>
      </div>
      <div class="balanc-tema-bar"><div class="balanc-tema-fill" style="width:${t.pct}%; background:${t.pct >= 70 ? 'var(--green-hp)' : t.pct >= 50 ? 'var(--yellow-hp)' : 'var(--red-hp)'}"></div></div>
      <div class="balanc-tema-pct">${t.pct}%</div>
    `;
    llistaTemes.appendChild(row);
  }
  perTema.appendChild(llistaTemes);
  cont.appendChild(perTema);

  // Botó tornar
  const actions = document.createElement('div');
  actions.className = 'balanc-actions';
  actions.innerHTML = '<button class="poke-btn poke-btn-primary" id="btn-balanc-tornar">Nova partida</button>';
  cont.appendChild(actions);

  document.getElementById('btn-balanc-tornar').onclick = () => {
    esborrarSave();
    setGameState(null);
    showView('landing');
    const btn = document.getElementById('btn-continuar');
    if (btn) btn.style.display = 'none';
  };
}
