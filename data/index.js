// ============================================================================
// PokéLuthier · data/index.js
// Re-exporta tot el contingut de data/ per imports més curts.
// ============================================================================

export { CONFIG } from './config.js';
export { BIOMES, biomePerLevel } from './biomes.js';
export { MEDALS, ORDRE_MEDALLES } from './medals.js';
export { TUTORIAL } from './tutorial.js';
export { INSTRUMENTS, POOL_RECLUTABLES, POOL_SALVATGES } from './instruments.js';
export {
  QUESTIONS, preguntesPerTema, preguntesPerDificultat, TEMES, NOMS_TEMES
} from './questions.js';
export {
  TRAINERS_COMUNS, GYM_LEADERS, ELITE_FOUR, CHAMPION,
  POOL_TRAINERS_COMUNS, findTrainer
} from './trainers.js';
export { EVENTS } from './events.js';
