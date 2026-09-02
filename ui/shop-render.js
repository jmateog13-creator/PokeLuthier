// ============================================================================
// PokéLuthier · ui/shop-render.js
// Render de la botiga + modals de selecció d'instruments.
// ============================================================================

import { GameState, desar } from '../engine/state.js';
import { CONFIG } from '../data/config.js';
import { INSTRUMENTS } from '../data/instruments.js';
import {
  comprarCuraParcial, comprarCuraTotal, comprarReparar,
  ofertarReclutament, reclutarInstrument
} from '../engine/shop.js';
import { showView, setText, iconHtml } from './views.js';
import { toast } from './toast.js';
import { renderHUD } from './hud.js';

export function obrirBotiga() {
  showView('botiga');
  renderBotiga();
  document.getElementById('btn-sortir-botiga').onclick = () => {
    desar();
    showView('mapa');
    import('./map-render.js').then(m => m.renderMapa());
  };
}

function renderBotiga() {
  setText('shop-or', GameState.or);
  const grid = document.getElementById('shop-grid');
  grid.innerHTML = '';

  const p = CONFIG.preus;
  const items = [];
  items.push({
    nom:'Cura parcial',
    desc:'Restaura 50% HP a un instrument viu.', preu:p.curaParcial,
    action:() => triarInstrumentPerCurar('parcial', p.curaParcial)
  });
  items.push({
    nom:'Cura total',
    desc:'Restaura el 100% HP a un instrument viu.', preu:p.curaTotal,
    action:() => triarInstrumentPerCurar('total', p.curaTotal)
  });
  if (GameState.team.length < CONFIG.equipMaxim) {
    items.push({
      nom:'Reclutar',
      desc:'Tria entre 3 instruments aleatoris.', preu:p.reclutar,
      action:() => mostrarReclutament()
    });
  }
  const teTrencats = GameState.team.some(t => t.hp <= 0);
  if (teTrencats) {
    items.push({
      nom:'Reparació',
      desc:'Repara un instrument trencat (cara però possible).', preu:p.reparar,
      action:() => triarInstrumentPerReparar()
    });
  }

  items.forEach(it => {
    const div = document.createElement('div');
    div.className = 'shop-item';
    div.innerHTML = `
      <div class="shop-item-info">
        <div class="shop-item-name">${it.nom}</div>
        <div class="shop-item-desc">${it.desc}</div>
        <div class="shop-item-price">${it.preu} ♪</div>
      </div>
      <button class="shop-buy-btn">COMPRAR</button>`;
    const btn = div.querySelector('button');
    if (GameState.or < it.preu) btn.disabled = true;
    btn.addEventListener('click', () => { if (GameState.or >= it.preu) it.action(); });
    grid.appendChild(div);
  });
}

function triarInstrumentPerCurar(tipus, preu) {
  const viables = GameState.team.filter(t => t.hp > 0 && t.hp < t.hpMax);
  if (viables.length === 0) { toast('No hi ha instruments per curar.', 'bad'); return; }
  mostrarModalSeleccio('Quin instrument vols curar?', viables, (t) => {
    const slotIdx = GameState.team.indexOf(t);
    const res = (tipus === 'total') ? comprarCuraTotal(slotIdx) : comprarCuraParcial(slotIdx);
    toast(res.msg, res.ok ? 'good' : 'bad');
    if (res.ok) renderBotiga();
  });
}

function triarInstrumentPerReparar() {
  const trencats = GameState.team.filter(t => t.hp <= 0);
  if (trencats.length === 0) { toast('No hi ha trencats.', 'bad'); return; }
  mostrarModalSeleccio('Quin instrument vols reparar?', trencats, (t) => {
    const slotIdx = GameState.team.indexOf(t);
    const res = comprarReparar(slotIdx);
    toast(res.msg, res.ok ? 'good' : 'bad');
    if (res.ok) renderBotiga();
  });
}

function mostrarReclutament() {
  const opcions = ofertarReclutament();
  const modal = document.createElement('div');
  modal.className = 'pick-instrument-modal';
  modal.innerHTML = `
    <div class="poke-box pick-card">
      <h3>Tria un nou instrument</h3>
      <div class="pick-options"></div>
      <button class="poke-btn poke-btn-small pick-cancel">Cancel·lar</button>
    </div>`;
  const opts = modal.querySelector('.pick-options');
  opcions.forEach(id => {
    const inst = INSTRUMENTS[id];
    const div = document.createElement('div');
    div.className = 'pick-opt';
    div.innerHTML = `
      <div class="pick-emoji">${iconHtml(inst)}</div>
      <div class="pick-name">${inst.nom}</div>
      <div class="pick-stats">HP ${inst.hpMax}<br>Atc ${inst.danys[0]}</div>`;
    div.addEventListener('click', () => {
      const res = reclutarInstrument(id);
      toast(res.msg, res.ok ? 'good' : 'bad');
      document.body.removeChild(modal);
      if (res.ok) { renderHUD(); renderBotiga(); }
    });
    opts.appendChild(div);
  });
  modal.querySelector('.pick-cancel').addEventListener('click', () => document.body.removeChild(modal));
  document.body.appendChild(modal);
}

function mostrarModalSeleccio(titol, llista, onPick) {
  const modal = document.createElement('div');
  modal.className = 'pick-instrument-modal';
  modal.innerHTML = `
    <div class="poke-box pick-card">
      <h3>${titol}</h3>
      <div class="pick-options"></div>
      <button class="poke-btn poke-btn-small pick-cancel">Cancel·lar</button>
    </div>`;
  const opts = modal.querySelector('.pick-options');
  llista.forEach(t => {
    const inst = INSTRUMENTS[t.instrumentId];
    const div = document.createElement('div');
    div.className = 'pick-opt';
    div.innerHTML = `
      <div class="pick-emoji">${iconHtml(inst)}</div>
      <div class="pick-name">${inst.nom}</div>
      <div class="pick-stats">${t.hp}/${t.hpMax}</div>`;
    div.addEventListener('click', () => { document.body.removeChild(modal); onPick(t); });
    opts.appendChild(div);
  });
  modal.querySelector('.pick-cancel').addEventListener('click', () => document.body.removeChild(modal));
  document.body.appendChild(modal);
}
