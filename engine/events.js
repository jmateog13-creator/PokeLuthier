// ============================================================================
// PokéLuthier · engine/events.js
// Resolució dels esdeveniments narratius.
// ============================================================================

import { GameState, creaInstrumentEquip, desar } from './state.js';
import { CONFIG } from '../data/config.js';
import { INSTRUMENTS, POOL_RECLUTABLES } from '../data/instruments.js';

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function resoldreEfecte(efecte) {
  if (efecte.tipus === 'or') {
    GameState.or += efecte.valor;
    return { ok:true, msg:`+${efecte.valor} ♪` };
  }
  if (efecte.tipus === 'aposta') {
    if (Math.random() < 0.5) { GameState.or += 60; return { ok:true, msg:'Sort! +60 ♪' }; }
    const perdua = Math.min(20, GameState.or);
    GameState.or -= perdua;
    return { ok:true, msg:`Una trampa! -${perdua} ♪` };
  }
  if (efecte.tipus === 'res') {
    return { ok:true, msg:'Decideixes deixar el destí en pau.' };
  }
  if (efecte.tipus === 'instrumentAleatori') {
    if (GameState.team.length >= CONFIG.equipMaxim) {
      return { ok:true, msg:'La cintura és plena. L\'estudiant es queda amb el seu instrument.' };
    }
    const id = pickRandom(POOL_RECLUTABLES);
    GameState.team.push(creaInstrumentEquip(id));
    return { ok:true, msg:`${INSTRUMENTS[id].nom} s'uneix a tu!` };
  }
  if (efecte.tipus === 'danyUn') {
    // Selecciona random instrument viu i li dona dany
    const vius = GameState.team.filter(t => t.hp > 0);
    if (vius.length === 0) return { ok:true, msg:'No hi ha ningú per fer dany.' };
    const t = pickRandom(vius);
    t.hp = Math.max(0, t.hp - efecte.valor);
    return { ok:true, msg:`${INSTRUMENTS[t.instrumentId].nom} ha rebut ${efecte.valor} HP de dany.` };
  }
  if (efecte.tipus === 'danyTots') {
    GameState.team.forEach(t => { if (t.hp > 0) t.hp = Math.max(0, t.hp - efecte.valor); });
    return { ok:true, msg:`Tots els instruments han rebut ${efecte.valor} HP de dany.` };
  }
  if (efecte.tipus === 'tabernaToc') {
    GameState.or += 25;
    GameState.team.forEach(t => {
      if (t.hp > 0) t.hp = Math.min(t.hpMax, t.hp + Math.round(t.hpMax * 0.5));
    });
    return { ok:true, msg:'Has tocat a la taberna! +25 ♪ i tot l\'equip recupera 50% HP.' };
  }
  return { ok:false, msg:'Efecte desconegut.' };
}
