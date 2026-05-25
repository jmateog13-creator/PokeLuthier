// ============================================================================
// PokéLuthier · ui/world-map-render.js
// Vista overview: mostra les 6 zones com a cards i el progrés del jugador.
// ============================================================================

import { GameState } from '../engine/state.js';
import { ZONES, estatZonaPerJugador } from '../engine/map-gen.js';
import { MEDALS } from '../data/medals.js';
import { BIOMES } from '../data/biomes.js';
import { findTrainer } from '../data/trainers.js';
import { showView } from './views.js';

export function obrirMapaMon() {
  showView('worldmap');
  const cont = document.getElementById('worldmap-content');
  cont.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.className = 'worldmap-header';
  header.innerHTML = `
    <h2 class="worldmap-title">🗺 Camí del Conservatori</h2>
    <p class="worldmap-sub">Les 6 zones del teu viatge cap a Mestre Luthier</p>
    <div class="worldmap-prog">Medalles: <strong>${GameState.medalles.length}/5</strong></div>
  `;
  cont.appendChild(header);

  // 6 zones
  const grid = document.createElement('div');
  grid.className = 'worldmap-grid';
  ZONES.forEach(z => {
    const estat = estatZonaPerJugador(z.id, GameState.currentLevel, GameState.medalles);
    // Si el gym d'aquesta zona està guanyat però el currentLevel encara és dins, marquem completed
    const completedExtra = z.medalla && GameState.medalles.includes(z.medalla);
    const estatFinal = completedExtra ? 'completed' : estat;

    const card = document.createElement('div');
    card.className = 'worldmap-card worldmap-card-' + estatFinal;
    const bioma = BIOMES[z.biome];
    const gym = z.gym ? findTrainer(z.gym) : null;
    const medalla = z.medalla ? MEDALS[z.medalla] : null;
    const guanyadaIcon = (estatFinal === 'completed' && medalla) ? `<span class="worldmap-medal">${medalla.emoji}</span>` : '';

    card.innerHTML = `
      <div class="worldmap-card-bg" style="background:${bioma ? bioma.grass : '#888'}"></div>
      <div class="worldmap-card-num">${z.id}</div>
      <div class="worldmap-card-emoji">${z.emoji}</div>
      <div class="worldmap-card-name">${z.nom}</div>
      ${gym ? `<div class="worldmap-card-gym">${gym.emoji} ${gym.nom}</div>` : ''}
      ${guanyadaIcon ? `<div class="worldmap-card-status">${guanyadaIcon}</div>` : ''}
      <div class="worldmap-card-state">${stateLabel(estatFinal)}</div>
    `;

    cont.appendChild(card);
  });
  cont.appendChild(grid);

  // Botó tornar
  const actions = document.createElement('div');
  actions.className = 'worldmap-actions';
  actions.innerHTML = '<button class="poke-btn poke-btn-primary" id="btn-worldmap-tornar">Tornar a la ruta</button>';
  cont.appendChild(actions);

  document.getElementById('btn-worldmap-tornar').onclick = () => {
    import('./map-render.js').then(m => {
      showView('mapa');
      m.renderMapa();
    });
  };
}

function stateLabel(estat) {
  if (estat === 'completed') return '✅ Superada';
  if (estat === 'current')   return '📍 Estàs aquí';
  return '🔒 Bloquejada';
}
