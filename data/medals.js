// ============================================================================
// PokéLuthier · data/medals.js
// 5 medalles que es guanyen derrotant cada Gym Leader.
// ============================================================================

export const MEDALS = Object.freeze({
  pols: {
    id: 'pols',
    nom: 'Medalla del Pols',
    descripcio: 'Reconeixement del Mestre Compàs. Domines el temps i les figures rítmiques.',
    emoji: '♩',
    color: '#000000',
    tema: 'figures',
    gymLeader: 'mestre_compas'
  },
  pentagrama: {
    id: 'pentagrama',
    nom: 'Medalla del Pentagrama',
    descripcio: 'Reconeixement de la Professora Sol-Fa. Llegeixes les notes com qui respira.',
    emoji: '🎵',
    color: '#f8c038',
    tema: 'notes',
    gymLeader: 'professora_solfa'
  },
  cromatica: {
    id: 'cromatica',
    nom: 'Medalla Cromàtica',
    descripcio: 'Reconeixement del Doctor Alteracions. Has dominat sostinguts, bemolls i becaires.',
    emoji: '♯',
    color: '#a888ff',
    tema: 'alteracions',
    gymLeader: 'doctor_alteracions'
  },
  ebenista: {
    id: 'ebenista',
    nom: 'Medalla d\'Ebenista',
    descripcio: 'Reconeixement del Vell Luthier. Coneixes l\'ànima de cada instrument.',
    emoji: '🎻',
    color: '#a8804a',
    tema: 'instruments',
    gymLeader: 'vell_luthier'
  },
  or: {
    id: 'or',
    nom: 'Medalla d\'Or',
    descripcio: 'Reconeixement del Capità Vibrato. Has integrat tots els sabers.',
    emoji: '🏆',
    color: '#ffd838',
    tema: 'mixt',
    gymLeader: 'capita_vibrato'
  }
});

export const ORDRE_MEDALLES = ['pols','pentagrama','cromatica','ebenista','or'];
