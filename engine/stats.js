// ============================================================================
// PokéLuthier · engine/stats.js
// Tracking pedagògic (M1) + Repassador adaptatiu (M2).
// ============================================================================

import { GameState } from './state.js';
import { CONFIG } from '../data/config.js';

/**
 * Registra una resposta a una pregunta.
 * @param {Object} pregunta - la pregunta original (id, tema, dificultat)
 * @param {boolean} correcta - true si l'usuari ha encertat
 * @param {number} tempsMs - mil·lisegons que ha trigat (0 si timeout)
 */
export function registrarResposta(pregunta, correcta, tempsMs = 0) {
  if (!CONFIG.trackingActiu || !GameState) return;

  const s = GameState.stats;
  if (correcta) s.encerts++;
  else { s.errors++; s.questionsFallades.push(pregunta.id); }

  if (s.perTema[pregunta.tema]) {
    if (correcta) s.perTema[pregunta.tema].ok++;
    else          s.perTema[pregunta.tema].ko++;
  }

  if (tempsMs > 0) s.tempsResposta.push(tempsMs);
}

/**
 * Retorna el tema amb més fallades (per al repassador adaptatiu M2).
 * Si cap tema ha superat el llindar, retorna null.
 */
export function temaFebledetectat() {
  if (!GameState) return null;
  const llindar = CONFIG.llindarFallesTema;
  let tema = null, maxFalls = 0;
  for (const t in GameState.stats.perTema) {
    const ko = GameState.stats.perTema[t].ko;
    if (ko >= llindar && ko > maxFalls) {
      maxFalls = ko;
      tema = t;
    }
  }
  return tema;
}

/**
 * Genera estadístiques completes per a la pantalla M3 (balanç final).
 */
export function balancFinal() {
  if (!GameState) return null;
  const s = GameState.stats;
  const total = s.encerts + s.errors;
  const pctTotal = total ? Math.round((s.encerts / total) * 100) : 0;

  const perTema = {};
  for (const t in s.perTema) {
    const tot = s.perTema[t].ok + s.perTema[t].ko;
    perTema[t] = {
      ok: s.perTema[t].ok,
      ko: s.perTema[t].ko,
      pct: tot ? Math.round((s.perTema[t].ok / tot) * 100) : 0
    };
  }

  const tempsMig = s.tempsResposta.length
    ? Math.round(s.tempsResposta.reduce((a,b)=>a+b,0) / s.tempsResposta.length / 100) / 10
    : 0;

  return {
    encerts: s.encerts,
    errors: s.errors,
    pctTotal,
    perTema,
    tempsMigSegons: tempsMig,
    combatsGuanyats: s.combatsGuanyats,
    instrumentsTrencats: s.instrumentsTrencats,
    nodesVisitats: s.nodesVisitats,
    medalles: GameState.medalles.length
  };
}
