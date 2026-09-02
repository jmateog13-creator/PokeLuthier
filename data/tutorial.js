// ============================================================================
// PokéLuthier · data/tutorial.js
// Mini-demos interactius del tutorial.
// ============================================================================

export const TUTORIAL = Object.freeze([
  { titol:'Benvingut, Luthier!',
    text:'Sóc el Vell Luthier. T\'ensenyaré com es juga en 7 mini-experiments. Toca "Següent".',
    demo:'intro' },

  { titol:'El HP del teu instrument',
    text:'Prem ATACAR per veure baixar el HP. Prem CURAR per recuperar-lo.',
    demo:'team-hp' },

  { titol:'Tries el teu camí',
    text:'Tria un dels 3 nodes daurats. Hi haurà combats, botigues i esdeveniments.',
    demo:'mini-map' },

  { titol:'Tria atac',
    text:'En combat tries un atac. Toca el que vulguis provar:',
    demo:'attack-pick' },

  { titol:'Pregunta musical!',
    text:'Apareix una pregunta. Respon-la abans que s\'esgoti el temps:',
    demo:'quiz' },

  { titol:'Trobada salvatge',
    text:'A les rutes pots trobar instruments abandonats. Tries 1 entre 3 per reclutar-lo!',
    demo:'wild-encounter' },

  { titol:'Medalles i Lliga',
    text:'Guanya els 5 Gym Leaders → consigueix les 5 medalles → entra a la Lliga (4 mestres + el Director).',
    demo:'final' }
]);
