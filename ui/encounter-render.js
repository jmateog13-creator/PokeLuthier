// ============================================================================
// PokéLuthier · ui/encounter-render.js
// Pantalla "Choose Your Starter" per a trobades salvatges.
// ============================================================================

import { GameState, desar } from '../engine/state.js';
import { CONFIG } from '../data/config.js';
import { INSTRUMENTS } from '../data/instruments.js';
import { generarSalvatges, reclutarSalvatge } from '../engine/encounter.js';
import { showView, setText } from './views.js';
import { toast } from './toast.js';
import { renderHUD } from './hud.js';

export function obrirEncounter() {
  showView('encounter');
  const opcions = generarSalvatges();
  const cont = document.getElementById('encounter-options');
  cont.innerHTML = '';

  opcions.forEach(id => {
    const inst = INSTRUMENTS[id];
    const card = document.createElement('div');
    card.className = 'encounter-card';
    card.innerHTML = `
      <div class="encounter-emoji">${inst.emoji}</div>
      <div class="encounter-name">${inst.nom}</div>
      <div class="encounter-family">${inst.familia}</div>
      <div class="encounter-stats">HP ${inst.hpMax} · Atc ${inst.danys[0]}</div>
      <button class="poke-btn poke-btn-primary encounter-capture">CAPTURAR</button>
    `;
    card.querySelector('.encounter-capture').addEventListener('click', () => onCapturar(id));
    cont.appendChild(card);
  });

  document.getElementById('btn-encounter-marxar').onclick = () => {
    desar();
    tornarAlMapa();
  };
}

function onCapturar(id) {
  if (GameState.team.length < CONFIG.equipMaxim) {
    reclutarSalvatge(id);
    toast(`${INSTRUMENTS[id].nom} s'uneix a la teva cintura!`, 'good', 2500);
    tornarAlMapa();
  } else {
    // Equip ple: cal triar quin reemplaçar
    mostrarReemplaceModal(id);
  }
}

function mostrarReemplaceModal(idNou) {
  const modal = document.createElement('div');
  modal.className = 'pick-instrument-modal';
  modal.innerHTML = `
    <div class="poke-box pick-card">
      <h3>Equip ple! Quin reemplaces?</h3>
      <div class="pick-options"></div>
      <button class="poke-btn poke-btn-small pick-cancel">Cancel·lar</button>
    </div>`;
  const opts = modal.querySelector('.pick-options');
  GameState.team.forEach((t, idx) => {
    const inst = INSTRUMENTS[t.instrumentId];
    const div = document.createElement('div');
    div.className = 'pick-opt';
    div.innerHTML = `
      <div class="pick-emoji">${inst.emoji}</div>
      <div class="pick-name">${inst.nom}</div>
      <div class="pick-stats">HP ${t.hp}/${t.hpMax}<br>Lv ${t.nivell}</div>`;
    div.addEventListener('click', () => {
      reclutarSalvatge(idNou, idx);
      toast(`${INSTRUMENTS[idNou].nom} reemplaça ${inst.nom}!`, 'good', 2500);
      document.body.removeChild(modal);
      tornarAlMapa();
    });
    opts.appendChild(div);
  });
  modal.querySelector('.pick-cancel').addEventListener('click', () => document.body.removeChild(modal));
  document.body.appendChild(modal);
}

async function tornarAlMapa() {
  renderHUD();
  showView('mapa');
  const { renderMapa } = await import('./map-render.js');
  renderMapa();
}
