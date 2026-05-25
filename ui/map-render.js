// ============================================================================
// PokéLuthier · ui/map-render.js
// Render del mapa amb biomes, nodes contextuals i SVG de connexions.
// ============================================================================

import { GameState } from '../engine/state.js';
import { BIOMES, biomePerLevel } from '../data/biomes.js';
import { findTrainer, GYM_LEADERS } from '../data/trainers.js';
import { MEDALS } from '../data/medals.js';
import { MAP_LEVELS_TOTAL, nivellEsGym, nivellEsCartell, nivellEsAC, nivellEsCampio, gymPerLevel, zonaPerLevel, getZona } from '../engine/map-gen.js';
import { renderHUD } from './hud.js';

// (els avatars dels entrenadors es prenen directament del seu objecte trainer per
// garantir que l'emoji del mapa = l'emoji del combat)

export function renderMapa() {
  renderHUD();
  const cont = document.getElementById('map-container');
  cont.querySelectorAll('.map-row').forEach(r => r.remove());

  // Determinar la zona a mostrar: si el jugador ha superat el gym actual, mostrar la següent
  const lvlActual = Math.max(1, GameState.currentLevel || 1);
  let zona = getZona(zonaPerLevel(lvlActual));
  if (zona.medalla && GameState.medalles.includes(zona.medalla) && zona.id < 6) {
    zona = getZona(zona.id + 1);
  }
  const [lvlMin, lvlMax] = zona.range;
  const dinsZona = GameState.currentLevel >= lvlMin && GameState.currentLevel <= lvlMax;

  aplicarBioma(zona.biome);
  renderZoneHeader(zona);

  for (let lvl = lvlMin; lvl <= lvlMax; lvl++) {
    const row = document.createElement('div');
    row.className = 'map-row';
    row.dataset.level = lvl;
    const nodes = GameState.mapData[lvl - 1];

    nodes.forEach((node, idx) => {
      const el = document.createElement('div');
      el.className = 'map-node ' + classeNode(node.type);
      el.dataset.level = lvl;
      el.dataset.idx = idx;
      el.innerHTML = `${iconaNode(node, lvl)}<span class="map-node-num">${lvl}</span><span class="map-node-label map-node-label-${node.type}">${etiquetaNode(node)}</span>`;

      if (dinsZona) {
        // Comportament normal dins la zona
        if (lvl < GameState.currentLevel) {
          el.classList.add('node-visitat');
        } else if (lvl === GameState.currentLevel) {
          if (idx === GameState.currentNodeIdx) el.classList.add('node-actual');
          else el.classList.add('node-bloquejat');
        } else if (lvl === GameState.currentLevel + 1 && nodeConnectatAlActual(idx)) {
          el.classList.add('node-disponible');
          el.addEventListener('click', () => entrarNode(lvl, idx));
        } else {
          el.classList.add('node-bloquejat');
        }
      } else {
        // Acabem de superar la zona anterior: el primer nivell de la nova zona és disponible
        if (lvl === lvlMin) {
          el.classList.add('node-disponible');
          el.addEventListener('click', () => entrarNode(lvl, idx));
        } else {
          el.classList.add('node-bloquejat');
        }
      }

      row.appendChild(el);
    });
    cont.appendChild(row);
  }

  requestAnimationFrame(() => requestAnimationFrame(dibuixarLiniesMapa));

  setTimeout(() => {
    const target = cont.querySelector('.node-actual') || cont.querySelector('.node-disponible');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 200);
}

function aplicarBioma(biomeIdOverride) {
  const frame = document.querySelector('.map-frame');
  if (!frame) return;
  const biomeId = biomeIdOverride || biomePerLevel(Math.max(1, GameState.currentLevel || 1));
  const b = BIOMES[biomeId];
  if (!b) return;
  frame.style.setProperty('--biome-grass', b.grass);
  frame.style.setProperty('--biome-grass-dark', b.grassDark);
  frame.style.backgroundColor = b.grass;
}

function renderZoneHeader(zona) {
  let el = document.getElementById('zone-header');
  if (!el) return;
  el.innerHTML = `
    <span class="zone-header-emoji">${zona.emoji}</span>
    <span class="zone-header-name">${zona.nom}</span>
    <span class="zone-header-meta">Zona ${zona.id}/6</span>
  `;
}

function nodeConnectatAlActual(targetIdx) {
  if (GameState.currentLevel === 0) return true;
  const actual = GameState.mapData[GameState.currentLevel - 1][GameState.currentNodeIdx];
  return actual && actual.connects && actual.connects.includes(targetIdx);
}

function classeNode(t) {
  return ({
    combat:'node-combat',
    botiga:'node-botiga',
    event:'node-event',
    centreReps:'node-centre',
    instSalvatge:'node-salvatge',
    cofre:'node-cofre',
    mestreVagabund:'node-mestre',
    cartell:'node-cartell',
    gym:'node-gym',
    eliteFour:'node-ac',
    champion:'node-champion'
  })[t] || '';
}

function iconaNode(node, lvl) {
  if (node.type === 'combat') {
    // L'emoji del trainer (mateix que apareixerà al combat)
    const t = findTrainer(node.trainer);
    return t ? t.emoji : '👤';
  }
  if (node.type === 'botiga')         return '🏪';
  if (node.type === 'event')          return '❔';
  if (node.type === 'centreReps')     return '🏥';
  if (node.type === 'instSalvatge')   return '🪈';
  if (node.type === 'cofre')          return '💎';
  if (node.type === 'mestreVagabund') return '🧙‍♂️';
  if (node.type === 'cartell')        return '📜';
  if (node.type === 'gym') {
    const t = findTrainer(node.trainer);
    return t ? t.emoji : '🏆';
  }
  if (node.type === 'eliteFour') {
    const t = findTrainer(node.trainer);
    return t ? t.emoji : '👑';
  }
  if (node.type === 'champion')       return '🎼';
  return '·';
}

function etiquetaNode(node) {
  switch (node.type) {
    case 'combat':         return 'Batalla';
    case 'botiga':         return 'Botiga';
    case 'event':          return 'Esdeveniment';
    case 'centreReps':     return 'Refugi';
    case 'instSalvatge':   return 'Salvatge';
    case 'cofre':          return 'Cofre';
    case 'mestreVagabund': return 'Mestre';
    case 'cartell':        return 'Cartell';
    case 'gym':            return 'Líder';
    case 'eliteFour':      return 'Lliga';
    case 'champion':       return 'Director';
    default:               return '';
  }
}

export function dibuixarLiniesMapa() {
  const svg = document.getElementById('map-lines');
  const cont = document.getElementById('map-container');
  if (!svg || !cont) return;
  svg.innerHTML = '';
  const w = cont.clientWidth;
  const h = cont.scrollHeight;
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  const contRect = cont.getBoundingClientRect();

  const layerBg  = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const layerTop = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  // Només iterar dins el rang de nivells visibles al DOM
  const visibleLevels = Array.from(document.querySelectorAll('.map-row')).map(r => Number(r.dataset.level));
  if (visibleLevels.length === 0) return;
  const lvlMin = Math.min(...visibleLevels);
  const lvlMax = Math.max(...visibleLevels);

  for (let lvl = lvlMin; lvl < lvlMax; lvl++) {
    const cur = GameState.mapData[lvl - 1];
    cur.forEach((node, i) => {
      const fromEl = document.querySelector(`.map-node[data-level="${lvl}"][data-idx="${i}"]`);
      if (!fromEl) return;
      const fromRect = fromEl.getBoundingClientRect();
      const fx = fromRect.left + fromRect.width / 2 - contRect.left;
      const fy = fromRect.top + fromRect.height / 2 - contRect.top;

      node.connects.forEach(j => {
        const toEl = document.querySelector(`.map-node[data-level="${lvl + 1}"][data-idx="${j}"]`);
        if (!toEl) return;
        const toRect = toEl.getBoundingClientRect();
        const tx = toRect.left + toRect.width / 2 - contRect.left;
        const ty = toRect.top + toRect.height / 2 - contRect.top;
        const available = (lvl === GameState.currentLevel && i === GameState.currentNodeIdx);

        const lineBg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineBg.setAttribute('x1', fx); lineBg.setAttribute('y1', fy);
        lineBg.setAttribute('x2', tx); lineBg.setAttribute('y2', ty);
        lineBg.setAttribute('class', 'map-line-bg' + (available ? ' available' : ''));
        layerBg.appendChild(lineBg);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fx); line.setAttribute('y1', fy);
        line.setAttribute('x2', tx); line.setAttribute('y2', ty);
        line.setAttribute('class', 'map-line' + (available ? ' available' : ''));
        layerTop.appendChild(line);
      });
    });
  }

  svg.appendChild(layerBg);
  svg.appendChild(layerTop);
}

async function entrarNode(lvl, idx) {
  GameState.currentLevel = lvl;
  GameState.currentNodeIdx = idx;
  GameState.stats.nodesVisitats++;
  const node = GameState.mapData[lvl - 1][idx];
  renderHUD();

  if (node.type === 'combat' || node.type === 'gym' || node.type === 'eliteFour' || node.type === 'champion') {
    const { iniciarCombat } = await import('../engine/combat.js');
    iniciarCombat(node);
  } else if (node.type === 'botiga') {
    const { obrirBotiga } = await import('./shop-render.js');
    obrirBotiga();
  } else if (node.type === 'event') {
    const { obrirEsdeveniment } = await import('./event-render.js');
    obrirEsdeveniment(node.eventId);
  } else if (node.type === 'centreReps') {
    const { obrirCentreReps } = await import('./special-nodes-render.js');
    obrirCentreReps();
  } else if (node.type === 'instSalvatge') {
    const { obrirEncounter } = await import('./encounter-render.js');
    obrirEncounter();
  } else if (node.type === 'cofre') {
    const { obrirCofreUI } = await import('./special-nodes-render.js');
    obrirCofreUI();
  } else if (node.type === 'mestreVagabund') {
    const { obrirMestreVagabund } = await import('./special-nodes-render.js');
    obrirMestreVagabund();
  } else if (node.type === 'cartell') {
    const { obrirCartell } = await import('./special-nodes-render.js');
    obrirCartell(node.gymId);
  }
}
