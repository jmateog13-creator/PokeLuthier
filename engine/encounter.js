// ============================================================================
// PokéLuthier · engine/encounter.js
// Trobada salvatge — pantalla "Choose Your Starter" amb 3 opcions.
// ============================================================================

import { GameState, creaInstrumentEquip, desar } from './state.js';
import { INSTRUMENTS, POOL_SALVATGES } from '../data/instruments.js';
import { CONFIG } from '../data/config.js';
import { toast } from '../ui/toast.js';

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/**
 * Genera 3 instruments salvatges (sense repetir els que ja tens si és possible).
 */
export function generarSalvatges() {
  const exclou = new Set(GameState.team.map(t => t.instrumentId));
  const candidats = POOL_SALVATGES.filter(id => !exclou.has(id));
  const pool = (candidats.length >= 3 ? candidats : POOL_SALVATGES).slice();
  const opcions = [];
  while (opcions.length < 3 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    opcions.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return opcions;
}

/**
 * Reclutar un instrument salvatge (gratis).
 * Si l'equip està ple, l'usuari ha de triar quin reemplaçar (o cancelar).
 * @returns {string} resultat: 'ok' | 'full' | 'replaced'
 */
export function reclutarSalvatge(instrumentId, reemplaceSlot = null) {
  if (!GameState) return 'no-game';

  if (GameState.team.length < CONFIG.equipMaxim) {
    GameState.team.push(creaInstrumentEquip(instrumentId));
    desar();
    return 'ok';
  }

  // Equip ple: si l'usuari ha triat slot per reemplaçar
  if (reemplaceSlot !== null && reemplaceSlot >= 0 && reemplaceSlot < GameState.team.length) {
    const eraActiu = GameState.team[reemplaceSlot].slotActiu;
    GameState.team[reemplaceSlot] = creaInstrumentEquip(instrumentId, eraActiu);
    // Si era trencat, el treiem de brokenSlots
    GameState.brokenSlots = GameState.brokenSlots.filter(s => s !== reemplaceSlot);
    desar();
    return 'replaced';
  }

  return 'full';
}
