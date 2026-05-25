// ============================================================================
// PokéLuthier · data/trainers.js
// Entrenadors comuns (genèrics) + 5 Gym Leaders + 4 Alt Comandament + 1 Campió.
// ============================================================================

// ─── ENTRENADORS COMUNS (per a combats normals a les rutes) ────────────────
export const TRAINERS_COMUNS = Object.freeze({
  aprenent_pols: {
    id:'aprenent_pols', nom:'Aprenent del Pols', emoji:'🧑‍🎓', tema:'figures',
    frase:'Practico el ritme cada dia!'
  },
  practicant_solfa: {
    id:'practicant_solfa', nom:'Practicant de Solfeig', emoji:'👨‍🎓', tema:'notes',
    frase:'Encara em confonc amb les notes...'
  },
  estudiant_cromatic: {
    id:'estudiant_cromatic', nom:'Estudiant Cromàtic', emoji:'👩‍🎓', tema:'alteracions',
    frase:'M\'agraden els sostinguts!'
  },
  jove_luthier: {
    id:'jove_luthier', nom:'Jove Luthier', emoji:'🧑‍🎨', tema:'instruments',
    frase:'Avui he netejat un violí antic.'
  },
  musica_vagant: {
    id:'musica_vagant', nom:'Música Vagant', emoji:'🧙', tema:'mixt',
    frase:'Vaig de poble en poble cantant.'
  },
  trobador: {
    id:'trobador', nom:'Trobador', emoji:'👨‍🎤', tema:'mixt',
    frase:'Una cançó per la teva ànima!'
  },
  mestressa_canto: {
    id:'mestressa_canto', nom:'Mestressa del Cant', emoji:'👩‍🎤', tema:'notes',
    frase:'La meva veu mai descansa.'
  },
  director_amateur: {
    id:'director_amateur', nom:'Director Amateur', emoji:'🧑‍🏫', tema:'compassos',
    frase:'Marca\'m el compàs, jovenet!'
  }
});

// ─── GYM LEADERS (un per cada tema) ────────────────────────────────────────
export const GYM_LEADERS = Object.freeze({
  mestre_compas: {
    id:'mestre_compas', nom:'Mestre Compàs', emoji:'🥁', tema:'figures',
    frase:'El temps no perdona! Si perds el pols, ho perdràs tot.',
    medalla:'pols',
    equip:['timbales','bombo','bateria']
  },
  professora_solfa: {
    id:'professora_solfa', nom:'Professora Sol-Fa', emoji:'🎼', tema:'notes',
    frase:'Llegir el pentagrama és respirar. Demostra\'m que ho saps fer.',
    medalla:'pentagrama',
    equip:['violi','viola','flauta_travessera']
  },
  doctor_alteracions: {
    id:'doctor_alteracions', nom:'Doctor Alteracions', emoji:'♯', tema:'alteracions',
    frase:'Un semitò pot canviar-ho tot. Veurem si domines el detall.',
    medalla:'cromatica',
    equip:['oboe','clarinet','sintetitzador']
  },
  vell_luthier: {
    id:'vell_luthier', nom:'Vell Luthier', emoji:'🎻', tema:'instruments',
    frase:'Cada fusta té la seva veu. Reconeix-les totes.',
    medalla:'ebenista',
    equip:['violoncel','contrabaix','piano']
  },
  capita_vibrato: {
    id:'capita_vibrato', nom:'Capità Vibrato', emoji:'⚡', tema:'mixt',
    frase:'Si has arribat aquí ja saps molt. Però i tot junt?',
    medalla:'or',
    equip:['trompeta','saxofon','guitarra_electrica']
  }
});

// ─── ALT COMANDAMENT (4 membres) + CAMPIÓ ─────────────────────────────────
export const ELITE_FOUR = Object.freeze({
  ac1_improvisadora: {
    id:'ac1_improvisadora', nom:'La Improvisadora', emoji:'🎤',
    tema:'mixt', frase:'Mai segueixo la partitura. Improvisa o mor!',
    equip:['saxofon','guitarra_electrica','acordio'],
    ordre:1
  },
  ac2_solista: {
    id:'ac2_solista', nom:'El Solista', emoji:'🎵',
    tema:'notes', frase:'Una sola veu, mil emocions.',
    equip:['soprano','violi','flauta_travessera'],
    ordre:2
  },
  ac3_harmonista: {
    id:'ac3_harmonista', nom:'L\'Harmonista', emoji:'🎹',
    tema:'alteracions', frase:'Els acords són l\'arquitectura del so.',
    equip:['piano','clavicembal','organ_tubs'],
    ordre:3
  },
  ac4_compositora: {
    id:'ac4_compositora', nom:'La Compositora', emoji:'📝',
    tema:'mixt', frase:'He composat aquesta peça per tu. Espero que t\'agradi...',
    equip:['violoncel','vibrafon','sintetitzador'],
    ordre:4
  }
});

export const CHAMPION = Object.freeze({
  director_orquestra: {
    id:'director_orquestra', nom:'Director d\'Orquestra', emoji:'🎼',
    tema:'mixt', frase:'Tots els temes. Tots els instruments. Mostra\'m que ets digne!',
    equip:['violi','trompeta','clarinet','timbales','piano']
  }
});

// Helper: cerca un trainer per ID en TOTES les categories
export function findTrainer(id) {
  return TRAINERS_COMUNS[id] || GYM_LEADERS[id] || ELITE_FOUR[id] || CHAMPION[id] || null;
}

export const POOL_TRAINERS_COMUNS = Object.keys(TRAINERS_COMUNS);
