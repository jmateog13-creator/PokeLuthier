// ============================================================================
// PokéLuthier · engine/state.js
// GameState central + save/load a localStorage.
// ============================================================================

import { CONFIG } from '../data/config.js';
import { INSTRUMENTS } from '../data/instruments.js';
import { generarMapa } from './map-gen.js';

const SAVE_KEY = 'pokeluthier-save-v3';

export let GameState = null;

export function setGameState(s) { GameState = s; }

export function nouEstat() {
  return {
    or: CONFIG.orInicial,
    team: [ creaInstrumentEquip('flauta', true) ],
    brokenSlots: [],
    currentLevel: 0,
    currentNodeIdx: -1,
    mapData: generarMapa(),
    questionsAnswered: [],
    medalles: [],                       // ids de medalles guanyades
    stats: {
      encerts: 0, errors: 0,
      combatsGuanyats: 0,
      instrumentsTrencats: 0,
      nodesVisitats: 0,
      perTema: { notes:{ok:0,ko:0}, alteracions:{ok:0,ko:0}, compassos:{ok:0,ko:0}, figures:{ok:0,ko:0}, instruments:{ok:0,ko:0} },
      questionsFallades: [],            // ids de preguntes que han fallat
      tempsResposta: []                 // segons per resposta (per estadístiques M3)
    },
    activeCombat: null,
    activeLeague: null,
    practicaMode: false                 // si està en mode pràctica (M4)
  };
}

export function creaInstrumentEquip(id, actiu = false) {
  const i = INSTRUMENTS[id];
  return {
    instrumentId: id,
    hp: i.hpMax,
    hpMax: i.hpMax,
    xp: 0,
    nivell: 1,
    slotActiu: actiu
  };
}

export function playerActiu() {
  if (!GameState) return null;
  return GameState.team.find(t => t.slotActiu) || GameState.team.find(t => t.hp > 0);
}

export function desar() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(GameState)); } catch (e) {}
}

export function carregar() {
  try { const raw = localStorage.getItem(SAVE_KEY); return raw ? JSON.parse(raw) : null; }
  catch (e) { return null; }
}

export function esborrarSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} }

export function teMedalla(id) {
  return GameState && GameState.medalles.includes(id);
}

export function guanyarMedalla(id) {
  if (!GameState.medalles.includes(id)) GameState.medalles.push(id);
}
