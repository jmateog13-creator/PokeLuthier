// ============================================================================
// PokéLuthier · data/trainers.js
// Entrenadors comuns (genèrics) + 5 Gym Leaders + 4 Alt Comandament + 1 Campió.
// ============================================================================

// ─── ENTRENADORS COMUNS (per a combats normals a les rutes) ────────────────
export const TRAINERS_COMUNS = Object.freeze({
  aprenent_pols: {
    id:'aprenent_pols', sprite:'assets/entrenadors/aprenent_pols.png', nom:'Aprenent del Pols', tema:'figures',
    frase:'Practico el ritme cada dia!'
  },
  practicant_solfa: {
    id:'practicant_solfa', sprite:'assets/entrenadors/practicant_solfa.png', nom:'Practicant de Solfeig', tema:'notes',
    frase:'Encara em confonc amb les notes...'
  },
  estudiant_cromatic: {
    id:'estudiant_cromatic', sprite:'assets/entrenadors/estudiant_cromatic.png', nom:'Estudiant Cromàtic', tema:'alteracions',
    frase:'M\'agraden els sostinguts!'
  },
  jove_luthier: {
    id:'jove_luthier', sprite:'assets/entrenadors/jove_luthier.png', nom:'Jove Luthier', tema:'instruments',
    frase:'Avui he netejat un violí antic.'
  },
  musica_vagant: {
    id:'musica_vagant', sprite:'assets/entrenadors/musica_vagant.png', nom:'Música Vagant', tema:'mixt',
    frase:'Vaig de poble en poble cantant.'
  },
  trobador: {
    id:'trobador', sprite:'assets/entrenadors/trobador.png', nom:'Trobador', tema:'mixt',
    frase:'Una cançó per la teva ànima!'
  },
  mestressa_canto: {
    id:'mestressa_canto', sprite:'assets/entrenadors/mestressa_canto.png', nom:'Mestressa del Cant', tema:'notes',
    frase:'La meva veu mai descansa.'
  },
  director_amateur: {
    id:'director_amateur', sprite:'assets/entrenadors/director_amateur.png', nom:'Director Amateur', tema:'compassos',
    frase:'Marca\'m el compàs, jovenet!'
  }
});

// ─── GYM LEADERS (un per cada tema) ────────────────────────────────────────
export const GYM_LEADERS = Object.freeze({
  mestre_compas: {
    id:'mestre_compas', sprite:'assets/entrenadors/mestre_compas.png', nom:'Mestre Compàs', tema:'figures',
    frase:'El temps no perdona! Si perds el pols, ho perdràs tot.',
    medalla:'pols',
    equip:['timbales','bombo','bateria']
  },
  professora_solfa: {
    id:'professora_solfa', sprite:'assets/entrenadors/professora_solfa.png', nom:'Professora Sol-Fa', tema:'notes',
    frase:'Llegir el pentagrama és respirar. Demostra\'m que ho saps fer.',
    medalla:'pentagrama',
    equip:['violi','viola','flauta_travessera']
  },
  doctor_alteracions: {
    id:'doctor_alteracions', sprite:'assets/entrenadors/doctor_alteracions.png', nom:'Doctor Alteracions', tema:'alteracions',
    frase:'Un semitò pot canviar-ho tot. Veurem si domines el detall.',
    medalla:'cromatica',
    equip:['oboe','clarinet','sintetitzador']
  },
  vell_luthier: {
    id:'vell_luthier', sprite:'assets/entrenadors/vell_luthier.png', nom:'Vell Luthier', tema:'instruments',
    frase:'Cada fusta té la seva veu. Reconeix-les totes.',
    medalla:'ebenista',
    equip:['violoncel','contrabaix','piano']
  },
  capita_vibrato: {
    id:'capita_vibrato', sprite:'assets/entrenadors/capita_vibrato.png', nom:'Capità Vibrato', tema:'mixt',
    frase:'Si has arribat aquí ja saps molt. Però i tot junt?',
    medalla:'or',
    equip:['trompeta','saxofon','guitarra_electrica']
  }
});

// ─── ALT COMANDAMENT (4 membres) + CAMPIÓ ─────────────────────────────────
export const ELITE_FOUR = Object.freeze({
  ac1_improvisadora: {
    id:'ac1_improvisadora', sprite:'assets/entrenadors/ac1_improvisadora.png', nom:'La Improvisadora',
    tema:'mixt', frase:'Mai segueixo la partitura. Improvisa o mor!',
    equip:['saxofon','guitarra_electrica','acordio'],
    ordre:1
  },
  ac2_solista: {
    id:'ac2_solista', sprite:'assets/entrenadors/ac2_solista.png', nom:'El Solista',
    tema:'notes', frase:'Una sola veu, mil emocions.',
    equip:['soprano','violi','flauta_travessera'],
    ordre:2
  },
  ac3_harmonista: {
    id:'ac3_harmonista', sprite:'assets/entrenadors/ac3_harmonista.png', nom:'L\'Harmonista',
    tema:'alteracions', frase:'Els acords són l\'arquitectura del so.',
    equip:['piano','clavicembal','organ_tubs'],
    ordre:3
  },
  ac4_compositora: {
    id:'ac4_compositora', sprite:'assets/entrenadors/ac4_compositora.png', nom:'La Compositora',
    tema:'mixt', frase:'He composat aquesta peça per tu. Espero que t\'agradi...',
    equip:['violoncel','vibrafon','sintetitzador'],
    ordre:4
  }
});

export const CHAMPION = Object.freeze({
  director_orquestra: {
    id:'director_orquestra', sprite:'assets/entrenadors/director_orquestra.png', nom:'Director d\'Orquestra',
    tema:'mixt', frase:'Tots els temes. Tots els instruments. Mostra\'m que ets digne!',
    equip:['violi','trompeta','clarinet','timbales','piano']
  }
});

// Helper: cerca un trainer per ID en TOTES les categories
export function findTrainer(id) {
  return TRAINERS_COMUNS[id] || GYM_LEADERS[id] || ELITE_FOUR[id] || CHAMPION[id] || null;
}

export const POOL_TRAINERS_COMUNS = Object.keys(TRAINERS_COMUNS);
