// ============================================================================
// PokéLuthier · data/config.js
// Configuració global: economia, XP, timers, recompenses.
// ============================================================================

export const CONFIG = Object.freeze({

  // Economia
  orInicial: 50,
  equipMaxim: 4,

  // Combat
  danyFalladaBase: 12,                // creix +1.1 per nivell de node
  timerPerDificultat: [15, 11, 7],    // segons per dificultat 1/2/3

  // XP i nivells (1 a 7)
  xpPerEncertCombat: 4,               // s'acumula i s'aplica al final del combat
  xpPerVictoria: 8,                   // bonus per derrotar un instrument enemic
  xpPerNivell: [0, 22, 55, 100, 160, 235, 330],   // index N = XP per assolir nivell N+1
  nivellMaxim: 7,
  nivellsAtacsDesbloquejats: [1, 3, 5, 7],         // a quin nivell desbloca cada atac

  // Preus de la botiga
  preus: {
    curaParcial: 20,
    curaTotal:   35,
    reclutar:    40,
    reparar:     80
  },

  // Recompenses
  recompenses: {
    orPerEncert:         10,
    orVictoriaCombat:    30,
    orVictoriaMiniBoss:  60,
    orVictoriaGym:      120,
    orVictoriaACMember: 100,
    orVictoriaCampio:   300
  },

  // Pedagogia adaptativa (M2)
  llindarFallesTema: 3,                 // si falles N preguntes del mateix tema → suggereix repàs
  preguntesAdaptades: 0.6,              // % de preguntes prioritàries al tema fluix dins el mestre vagabund

  // Distribució de tipus de nodes a les rutes (probabilitats normalitzades)
  distribucioNodesRuta: {
    combat:        0.50,
    botiga:        0.13,
    event:         0.10,
    centreReps:    0.08,
    instSalvatge:  0.10,
    cofre:         0.06,
    mestreVagabund:0.03
  },

  // Tracking pedagògic (M1)
  trackingActiu: true
});
