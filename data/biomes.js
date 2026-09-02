// ============================================================================
// PokéLuthier · data/biomes.js
// 5 biomes (un per ruta) — paletes i decoració del fons.
// ============================================================================

export const BIOMES = Object.freeze({
  inici: {
    nom: 'Conservatori',
    grass: '#95c878',
    grassDark: '#6ba052',
    flowerColors: ['#fff', '#ffd838', '#ff6488']
  },
  bosc_pols: {
    nom: 'Bosc del Pols',
    grass: '#7eb867',
    grassDark: '#558040',
    flowerColors: ['#ffffff', '#ff8888', '#ffdd55']
  },
  vall_sol: {
    nom: 'Vall del Sol',
    grass: '#c8d878',
    grassDark: '#8aa84a',
    flowerColors: ['#fff7c0', '#ffd838', '#ffa838']
  },
  pas_cromatic: {
    nom: 'Pas Cromàtic',
    grass: '#9090c0',
    grassDark: '#5a5a8a',
    flowerColors: ['#e0c8ff', '#a888ff', '#ffffff']
  },
  conservatori_antic: {
    nom: 'Conservatori Antic',
    grass: '#b8a878',
    grassDark: '#806a40',
    flowerColors: ['#fff0d0', '#d8b070', '#a8804a']
  },
  mont_vibrato: {
    nom: 'Mont Vibrato',
    grass: '#d8d8e0',
    grassDark: '#a0a0b0',
    flowerColors: ['#ffffff', '#c0d8ff', '#8090c0']
  },
  lliga: {
    nom: 'Sala de l\'Alt Comandament',
    grass: '#3a2050',
    grassDark: '#220c30',
    flowerColors: ['#ffd838', '#ff5050', '#a8e8ff']
  }
});

// Per cada nivell del mapa, retorna a quin bioma pertany
export function biomePerLevel(level) {
  if (level === 1) return 'inici';
  if (level >= 2  && level <= 11) return 'bosc_pols';
  if (level === 12) return 'inici';                  // gym 1 transition
  if (level >= 13 && level <= 22) return 'vall_sol';
  if (level === 23) return 'inici';
  if (level >= 24 && level <= 33) return 'pas_cromatic';
  if (level === 34) return 'inici';
  if (level >= 35 && level <= 44) return 'conservatori_antic';
  if (level === 45) return 'inici';
  if (level >= 46 && level <= 55) return 'mont_vibrato';
  if (level === 56) return 'inici';
  if (level >= 57 && level <= 61) return 'lliga';
  return 'inici';
}
