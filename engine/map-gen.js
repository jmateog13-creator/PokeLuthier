// ============================================================================
// PokéLuthier · engine/map-gen.js
// Genera el mapa complet del joc:
// - 1 inici
// - 5 rutes (10 nivells: 9 triables × 3 nodes + 1 cartell forçat)
// - 5 Gym Leaders (un al final de cada ruta)
// - 4 membres Alt Comandament + 1 Campió
//
// Total: 151 nodes al mapa, ~61 nodes per partida.
// ============================================================================

import { CONFIG } from '../data/config.js';
import { POOL_TRAINERS_COMUNS, GYM_LEADERS, ELITE_FOUR, CHAMPION } from '../data/trainers.js';
import { EVENTS } from '../data/events.js';
import { ORDRE_MEDALLES } from '../data/medals.js';

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/**
 * Genera un node de tipus aleatori segons distribució CONFIG.
 */
function generarNodeRuta(seed) {
  const r = Math.random();
  const d = CONFIG.distribucioNodesRuta;
  let acumulat = 0;
  const tipus = (() => {
    for (const k in d) {
      acumulat += d[k];
      if (r < acumulat) return k;
    }
    return 'combat';
  })();

  if (tipus === 'combat') {
    return {
      type:'combat',
      trainer: pickRandom(POOL_TRAINERS_COMUNS),
      enemyCount: Math.random() < 0.75 ? 1 : 2,
      connects: []
    };
  }
  if (tipus === 'event') {
    return { type:'event', eventId: pickRandom(EVENTS.map(e => e.id)), connects: [] };
  }
  if (tipus === 'instSalvatge') {
    return { type:'instSalvatge', connects: [] };
  }
  if (tipus === 'centreReps')  return { type:'centreReps',  connects: [] };
  if (tipus === 'cofre')       return { type:'cofre',       connects: [] };
  if (tipus === 'mestreVagabund') return { type:'mestreVagabund', connects: [] };
  if (tipus === 'botiga')      return { type:'botiga',      connects: [] };
  return { type:'combat', trainer: pickRandom(POOL_TRAINERS_COMUNS), enemyCount: 1, connects: [] };
}

/**
 * Estructura del mapa:
 * Nivell 1: inici (1 node)
 * Nivells 2-10: ruta 1 (9 nivells triables × 3 nodes)
 * Nivell 11: cartell ruta 1 (1 node)
 * Nivell 12: gym 1 (1 node)
 * Nivells 13-21: ruta 2 ...
 * Nivell 22: cartell · Nivell 23: gym 2
 * Nivells 24-32: ruta 3 · Nivell 33: cartell · Nivell 34: gym 3
 * Nivells 35-43: ruta 4 · Nivell 44: cartell · Nivell 45: gym 4
 * Nivells 46-54: ruta 5 · Nivell 55: cartell · Nivell 56: gym 5
 * Nivells 57-60: Alt Comandament (4 nodes, lineals)
 * Nivell 61: Campió
 */
const GYM_ORDER = ['mestre_compas','professora_solfa','doctor_alteracions','vell_luthier','capita_vibrato'];
const AC_ORDER  = ['ac1_improvisadora','ac2_solista','ac3_harmonista','ac4_compositora'];

export const MAP_LEVELS_TOTAL = 61;

function nivellEsGym(lvl) {
  return lvl === 12 || lvl === 23 || lvl === 34 || lvl === 45 || lvl === 56;
}
function gymPerLevel(lvl) {
  if (lvl === 12) return 'mestre_compas';
  if (lvl === 23) return 'professora_solfa';
  if (lvl === 34) return 'doctor_alteracions';
  if (lvl === 45) return 'vell_luthier';
  if (lvl === 56) return 'capita_vibrato';
  return null;
}
function nivellEsCartell(lvl) {
  return lvl === 11 || lvl === 22 || lvl === 33 || lvl === 44 || lvl === 55;
}
function cartellPerLevel(lvl) {
  // El cartell anuncia el següent gym
  return gymPerLevel(lvl + 1);
}
function nivellEsAC(lvl) {
  return lvl >= 57 && lvl <= 60;
}
function nivellEsCampio(lvl) {
  return lvl === 61;
}

export function generarMapa() {
  const levels = [];

  for (let lvl = 1; lvl <= MAP_LEVELS_TOTAL; lvl++) {
    let nodes;

    if (lvl === 1) {
      // Inici: combat fàcil tutorial
      nodes = [{ type:'combat', trainer: pickRandom(POOL_TRAINERS_COMUNS), enemyCount: 1, connects: [] }];
    } else if (nivellEsCartell(lvl)) {
      // Cartell forçat (1 node lineal, anuncia el proper gym)
      nodes = [{ type:'cartell', gymId: cartellPerLevel(lvl), connects: [] }];
    } else if (nivellEsGym(lvl)) {
      nodes = [{ type:'gym', trainer: gymPerLevel(lvl), connects: [] }];
    } else if (nivellEsAC(lvl)) {
      const acIdx = lvl - 57;  // 0..3
      nodes = [{ type:'eliteFour', trainer: AC_ORDER[acIdx], connects: [] }];
    } else if (nivellEsCampio(lvl)) {
      nodes = [{ type:'champion', trainer: 'director_orquestra', connects: [] }];
    } else {
      // Nivell triable de ruta: 3 nodes
      nodes = [];
      for (let n = 0; n < 3; n++) nodes.push(generarNodeRuta());
    }

    levels.push(nodes);
  }

  // ─── Generar connexions (proximitat horitzontal) ─────────────────────────
  for (let lvl = 0; lvl < MAP_LEVELS_TOTAL - 1; lvl++) {
    const cur = levels[lvl];
    const next = levels[lvl + 1];

    cur.forEach((node, i) => {
      const ratio = cur.length === 1 ? 0.5 : i / (cur.length - 1);
      const targetIdx = Math.round(ratio * (next.length - 1));
      node.connects.push(targetIdx);
      if (next.length > 1 && Math.random() < 0.45) {
        const adj = (Math.random() < 0.5 && targetIdx > 0)
          ? targetIdx - 1
          : (targetIdx < next.length - 1 ? targetIdx + 1 : targetIdx - 1);
        if (adj !== targetIdx && !node.connects.includes(adj)) node.connects.push(adj);
      }
    });

    next.forEach((_, j) => {
      if (!cur.some(n => n.connects.includes(j))) {
        const ratio = next.length === 1 ? 0.5 : j / (next.length - 1);
        const fromIdx = Math.round(ratio * (cur.length - 1));
        cur[fromIdx].connects.push(j);
      }
    });

    cur.forEach(n => n.connects = [...new Set(n.connects)]);
  }

  // Step 3: Garantir 3 trobades salvatges (🪈) per ruta — això és el cor Pokémon!
  assegurarMinimSalvatges(levels, 3);

  return levels;
}

/**
 * Recorre les 5 rutes i, si una té menys de N trobades salvatges,
 * converteix alguns combats normals en trobades salvatges fins arribar al mínim.
 * Així cada ruta té sempre opcions per capturar instruments.
 */
function assegurarMinimSalvatges(levels, minim) {
  ZONES.slice(0, 5).forEach(zona => {
    const [lvlMin, lvlMax] = zona.range;

    // Recollir nodes triables (només files amb >1 node, excloent inici/cartell/gym)
    const candidates = [];
    for (let lvl = lvlMin; lvl <= lvlMax; lvl++) {
      const nodes = levels[lvl - 1];
      if (nodes.length > 1) {
        nodes.forEach(n => candidates.push(n));
      }
    }

    // Comptar trobades existents
    let salvatges = candidates.filter(n => n.type === 'instSalvatge').length;

    // Convertir combats en salvatges fins arribar al mínim
    while (salvatges < minim) {
      const combats = candidates.filter(n => n.type === 'combat');
      if (combats.length === 0) break;     // no queden combats per convertir
      const escollit = combats[Math.floor(Math.random() * combats.length)];
      escollit.type = 'instSalvatge';
      delete escollit.trainer;
      delete escollit.enemyCount;
      salvatges++;
    }
  });
}

// ─── HELPERS DE ZONES (rutes + lliga) ────────────────────────────────────
// Estructura: 6 zones en total
//   Zona 1 = Inici + Ruta 1 + Cartell + Gym 1   (nivells 1-12)
//   Zona 2 = Ruta 2 + Cartell + Gym 2           (nivells 13-23)
//   Zona 3 = Ruta 3 + Cartell + Gym 3           (nivells 24-34)
//   Zona 4 = Ruta 4 + Cartell + Gym 4           (nivells 35-45)
//   Zona 5 = Ruta 5 + Cartell + Gym 5           (nivells 46-56)
//   Zona 6 = Alt Comandament + Campió           (nivells 57-61)

export const ZONES = Object.freeze([
  { id:1, nom:'Conservatori i Bosc del Pols', emoji:'🥁',  biome:'bosc_pols',         range:[1,12],  gym:'mestre_compas',     medalla:'pols' },
  { id:2, nom:'Vall del Sol',                emoji:'🌻',  biome:'vall_sol',          range:[13,23], gym:'professora_solfa',  medalla:'pentagrama' },
  { id:3, nom:'Pas Cromàtic',                emoji:'⛰️',  biome:'pas_cromatic',      range:[24,34], gym:'doctor_alteracions',medalla:'cromatica' },
  { id:4, nom:'Conservatori Antic',          emoji:'🏛️',  biome:'conservatori_antic',range:[35,45], gym:'vell_luthier',      medalla:'ebenista' },
  { id:5, nom:'Mont Vibrato',                emoji:'🗻',  biome:'mont_vibrato',      range:[46,56], gym:'capita_vibrato',    medalla:'or' },
  { id:6, nom:'Sala de l\'Alt Comandament', emoji:'👑',  biome:'lliga',             range:[57,61], gym:null,                 medalla:null }
]);

/**
 * Retorna l'id de la zona on es troba el nivell donat (1-6).
 */
export function zonaPerLevel(lvl) {
  for (const z of ZONES) {
    if (lvl >= z.range[0] && lvl <= z.range[1]) return z.id;
  }
  return 1;
}

/**
 * Retorna l'objecte zona (nom, emoji, range...) per id.
 */
export function getZona(id) {
  return ZONES.find(z => z.id === id) || ZONES[0];
}

/**
 * Estat d'una zona per al jugador actual:
 * 'completed' si ja s'ha superat el seu gym
 * 'current'   si el jugador hi és ara
 * 'locked'    si encara no ha arribat
 */
export function estatZonaPerJugador(zonaId, currentLevel, medalles) {
  const z = getZona(zonaId);
  if (!z) return 'locked';
  if (currentLevel > z.range[1]) return 'completed';
  if (currentLevel >= z.range[0]) return 'current';
  return 'locked';
}

// Exposem helpers per a altres mòduls
export { nivellEsGym, nivellEsCartell, nivellEsAC, nivellEsCampio, gymPerLevel, cartellPerLevel };
