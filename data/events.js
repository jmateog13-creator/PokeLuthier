// ============================================================================
// PokéLuthier · data/events.js
// Esdeveniments narratius a les rutes.
// ============================================================================

export const EVENTS = Object.freeze([
  {
    id:'regal',
    titol:'El Maestro generós',
    text:'Un vell maestro et reconeix i et regala unes monedes per al teu viatge.',
    opcions:[ { etiqueta:'Acceptar amb humilitat (+30 ♪)', efecte:{ tipus:'or', valor:30 } } ]
  },
  {
    id:'caixa',
    titol:'Caixa misteriosa',
    text:'Trobes una caixa polsegosa amb una clau de sol esculpida. Què hi haurà dins?',
    opcions:[
      { etiqueta:'Obrir-la (50% +60 ♪ / 50% -20 ♪)', efecte:{ tipus:'aposta' } },
      { etiqueta:'Deixar-la quieta', efecte:{ tipus:'res' } }
    ]
  },
  {
    id:'folkloric',
    titol:'Trobada folklòrica',
    text:'Uns músics ambulants ofereixen afinar i curar un dels teus instruments.',
    opcions:[ { etiqueta:'Triar instrument a curar (totalment)', efecte:{ tipus:'curarUn' } } ]
  },
  {
    id:'estudiant',
    titol:'Estudiant perdut',
    text:'Un estudiant nerviós et regala el seu instrument abans d\'abandonar el conservatori.',
    opcions:[ { etiqueta:'Acceptar instrument aleatori', efecte:{ tipus:'instrumentAleatori' } } ]
  },
  {
    id:'miniquiz',
    titol:'Repte del conservatori',
    text:'Un retrat al passadís et planteja tres endevinalles musicals. Cada encert: +15 ♪.',
    opcions:[ { etiqueta:'Acceptar el repte', efecte:{ tipus:'miniquiz' } } ]
  },
  {
    id:'pluja',
    titol:'Pluja sorprenent',
    text:'Una tempesta sobtada et fa córrer cap al refugi. Has de prendre una decisió ràpida.',
    opcions:[
      { etiqueta:'Protegir els instruments (-10 HP a un, lliures de mullar-se)', efecte:{ tipus:'danyUn', valor:10 } },
      { etiqueta:'Córrer tot mullat (-5 HP a tots)', efecte:{ tipus:'danyTots', valor:5 } }
    ]
  },
  {
    id:'taberna',
    titol:'Taberna del Cantor',
    text:'Una taberna et convida a una nit de cançons. Hi caben dues opcions.',
    opcions:[
      { etiqueta:'Tocar a la taberna (+25 ♪ i cura 50% a tot l\'equip)', efecte:{ tipus:'tabernaToc' } },
      { etiqueta:'Marxar de pressa', efecte:{ tipus:'res' } }
    ]
  }
]);
