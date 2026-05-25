// ============================================================================
// PokéLuthier · engine/shop.js
// Lògica de la botiga: cura, reclutar, reparar.
// ============================================================================

import { GameState, creaInstrumentEquip, desar } from './state.js';
import { CONFIG } from '../data/config.js';
import { INSTRUMENTS, POOL_RECLUTABLES } from '../data/instruments.js';

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function comprarCuraParcial(slotIdx) {
  if (GameState.or < CONFIG.preus.curaParcial) return { ok:false, msg:'No tens prou monedes' };
  const t = GameState.team[slotIdx];
  if (!t || t.hp <= 0 || t.hp >= t.hpMax) return { ok:false, msg:'Aquest instrument no es pot curar' };
  const guany = Math.round(t.hpMax * 0.5);
  t.hp = Math.min(t.hpMax, t.hp + guany);
  GameState.or -= CONFIG.preus.curaParcial;
  desar();
  return { ok:true, msg:`${INSTRUMENTS[t.instrumentId].nom} curat (+${guany} HP)`, guany };
}

export function comprarCuraTotal(slotIdx) {
  if (GameState.or < CONFIG.preus.curaTotal) return { ok:false, msg:'No tens prou monedes' };
  const t = GameState.team[slotIdx];
  if (!t || t.hp <= 0 || t.hp >= t.hpMax) return { ok:false, msg:'Aquest instrument no es pot curar' };
  t.hp = t.hpMax;
  GameState.or -= CONFIG.preus.curaTotal;
  desar();
  return { ok:true, msg:`${INSTRUMENTS[t.instrumentId].nom} totalment curat` };
}

export function comprarReparar(slotIdx) {
  if (GameState.or < CONFIG.preus.reparar) return { ok:false, msg:'No tens prou monedes' };
  const t = GameState.team[slotIdx];
  if (!t || t.hp > 0) return { ok:false, msg:'Aquest instrument no està trencat' };
  t.hp = t.hpMax;
  GameState.brokenSlots = GameState.brokenSlots.filter(s => s !== slotIdx);
  GameState.or -= CONFIG.preus.reparar;
  desar();
  return { ok:true, msg:`${INSTRUMENTS[t.instrumentId].nom} reparat!` };
}

export function ofertarReclutament() {
  // Retorna 3 opcions sense els que ja tens
  const exclou = new Set(GameState.team.map(t => t.instrumentId));
  const candidats = POOL_RECLUTABLES.filter(id => !exclou.has(id));
  const pool = (candidats.length >= 3 ? candidats : POOL_RECLUTABLES).slice();
  const opcions = [];
  while (opcions.length < 3 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    opcions.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return opcions;
}

export function reclutarInstrument(id) {
  if (GameState.or < CONFIG.preus.reclutar) return { ok:false, msg:'No tens prou monedes' };
  if (GameState.team.length >= CONFIG.equipMaxim) return { ok:false, msg:'Equip ple' };
  GameState.team.push(creaInstrumentEquip(id));
  GameState.or -= CONFIG.preus.reclutar;
  desar();
  return { ok:true, msg:`${INSTRUMENTS[id].nom} s'uneix a la teva cintura!` };
}

// Casa del Sentiu (Pokémon Center) — cura GRATIS tot l'equip
export function casaDelSentiu() {
  GameState.team.forEach(t => { if (t.hp > 0) t.hp = t.hpMax; });
  desar();
  return { ok:true, msg:'Tot l\'equip recuperat completament!' };
}

// Cofre amagat — recompensa aleatòria
export function obrirCofre() {
  const r = Math.random();
  if (r < 0.6) {
    const valor = pickRandom([30, 60, 100]);
    GameState.or += valor;
    desar();
    return { tipus:'or', valor, msg:`Has trobat ${valor} ♪!` };
  } else if (r < 0.85) {
    // Cura tot l'equip al 50%
    GameState.team.forEach(t => { if (t.hp > 0) t.hp = Math.min(t.hpMax, t.hp + Math.round(t.hpMax * 0.5)); });
    desar();
    return { tipus:'cura50', msg:'Una poció! Tot l\'equip recupera 50% HP.' };
  } else {
    // Trampa: -20 ♪
    const perdua = Math.min(20, GameState.or);
    GameState.or -= perdua;
    desar();
    return { tipus:'trampa', valor:perdua, msg:`Una trampa! Has perdut ${perdua} ♪.` };
  }
}
