// ============================================================================
// PokéLuthier · data/curs1.js — EDICIÓ ESPECIAL TIMBRE 1r (?curs=1)
// Sense el paràmetre CURS1 = false i res no canvia (3r idèntic).
// Amb curs=1: només instruments i famílies de 1r, preguntes del banc de 1r
// (_banc1r, timbre), partida curta (2 líders + Director), textos curts i
// sense game over dur. Les criatures són les pròpies del joc.
// ============================================================================

import { INSTRUMENTS, POOL_RECLUTABLES } from './instruments.js';
import { TRAINERS_COMUNS, GYM_LEADERS, CHAMPION } from './trainers.js';
import { MEDALS, ORDRE_MEDALLES } from './medals.js';
import { EVENTS } from './events.js';
import { TUTORIAL } from './tutorial.js';

export const CURS1 = typeof location !== 'undefined' && new URLSearchParams(location.search).get('curs') === '1';

// Les omple el banc en carregar (questions.js les exporta en mode 1r).
export const POOL_C1 = [];
export const TEMES_C1 = [];
export const NOMS_C1 = {};

if (CURS1) aplicar();

function aplicar() {
  document.documentElement.classList.add('c1');

  // ─── Instruments: fora els que no són de 1r; famílies de 1r ────────────
  const FORA = ['viola_da_gamba', 'llaut', 'bandurria', 'cimbalom', 'fliscorn', 'corneta', 'bateria', 'soprano', 'contralt', 'tenor', 'baix_veu'];
  for (let i = POOL_RECLUTABLES.length - 1; i >= 0; i--) if (FORA.includes(POOL_RECLUTABLES[i])) POOL_RECLUTABLES.splice(i, 1);

  const AMB_ALTURA = ['timbales', 'xilofon', 'marimba', 'vibrafon', 'campanes_tubulars'];
  const FAM = { 'Corda pinçada': 'Corda polsada', 'Vent-fusta': 'Vent fusta', 'Vent-metall': 'Vent metall', 'Vent lliure': 'Vent especial', 'Electròfon': 'Electrònics' };
  Object.values(INSTRUMENTS).forEach(inst => {
    if (inst.familia === 'Percussió' || inst.familia === 'Idiòfon') {
      inst.familia = AMB_ALTURA.includes(inst.id) ? 'Percussió amb altura' : 'Percussió sense altura';
    } else if (FAM[inst.familia]) inst.familia = FAM[inst.familia];
  });
  INSTRUMENTS.organ_tubs.nom = 'Orgue';
  INSTRUMENTS.pandero.nom = 'Pandereta';
  INSTRUMENTS.congas.nom = 'Congues';

  // ─── Entrenadors: frases curtes de timbre ──────────────────────────────
  const FRASES = {
    aprenent_pols: 'Jo toco el bombo. Endevina la família!',
    practicant_solfa: 'Escolta bé. Quin instrument és?',
    estudiant_cromatic: 'M\'agraden els instruments de metall!',
    jove_luthier: 'Avui he netejat un violí. Juguem!',
    musica_vagant: 'Vaig de poble en poble amb el meu acordió.',
    trobador: 'La meva arpa té moltes cordes. Comencem!',
    mestressa_canto: 'Escolta cada so amb atenció.',
    director_amateur: 'Coneixes les famílies dels instruments?'
  };
  Object.values(TRAINERS_COMUNS).forEach(t => { t.frase = FRASES[t.id] || t.frase; t.tema = 'mixt'; });
  Object.assign(GYM_LEADERS.vell_luthier, { tema: 'corda', equip: ['violoncel', 'piano'], frase: 'Cada corda té la seva veu. Reconeix-les!' });
  Object.assign(GYM_LEADERS.capita_vibrato, { tema: 'vent', equip: ['trompeta', 'saxofon'], frase: 'Bufa fort! Ara toca el vent.' });
  Object.assign(CHAMPION.director_orquestra, { equip: ['violi', 'trompeta', 'timbales'], frase: 'Totes les famílies. Demostra el que saps!' });

  // ─── Medalles: només les dels 2 líders de 1r ───────────────────────────
  ORDRE_MEDALLES.splice(0, ORDRE_MEDALLES.length, 'ebenista', 'or');
  MEDALS.ebenista.nom = 'Medalla de la Corda';
  MEDALS.ebenista.descripcio = 'Coneixes els instruments de corda.';
  MEDALS.or.nom = 'Medalla del Vent';
  MEDALS.or.descripcio = 'Coneixes els instruments de vent.';

  // ─── Esdeveniments i tutorial: frases curtes, imperatiu ────────────────
  const EV = {
    regal: ['Un regal', 'Un mestre vell et dona monedes.', ['Agafa-les (+30 ♪)']],
    caixa: ['Una caixa', 'Trobes una caixa vella. Què hi ha a dins?', ['Obre-la (pots guanyar o perdre ♪)', 'Deixa-la']],
    folkloric: ['Músics del poble', 'Uns músics poden arreglar un instrument teu.', ['Tria quin vols curar']],
    estudiant: ['Un regal', 'Un estudiant et dona el seu instrument.', ['Agafa\'l']],
    miniquiz: ['Repte', 'Respon tres preguntes. Cada encert: +15 ♪.', ['Accepta el repte']],
    pluja: ['Pluja!', 'Plou molt. Què fas?', ['Tapa els instruments (un perd 10 HP)', 'Corre (tots perden 5 HP)']],
    taberna: ['La taverna', 'A la taverna es canta. Vols tocar?', ['Toca (+25 ♪ i curació)', 'Marxa']]
  };
  EVENTS.forEach(e => {
    const [titol, text, ops] = EV[e.id] || [];
    if (!titol) return;
    Object.assign(e, { titol, text });
    e.opcions.forEach((o, i) => { if (ops[i]) o.etiqueta = ops[i]; });
  });
  const TUT = [
    ['Benvingut!', 'Sóc el Vell Luthier. Mira com es juga. Prem «Següent».'],
    ['La vida de l\'instrument', 'Prem ATACAR: la vida baixa. Prem CURAR: la vida puja.'],
    ['Tria el camí', 'Tria un node daurat. Hi ha combats, botigues i sorpreses.'],
    ['Tria un atac', 'Al combat, tria un atac. Prova-ho:'],
    ['Respon la pregunta', 'Surt una pregunta. Respon abans que s\'acabi el temps:'],
    ['Instruments salvatges', 'Al camí trobes instruments. Tria\'n un i s\'uneix al teu equip.'],
    ['Medalles', 'Guanya els 2 líders. Al final, guanya el Director d\'Orquestra.']
  ];
  TUTORIAL.forEach((p, i) => { if (TUT[i]) [p.titol, p.text] = TUT[i]; });

  // ─── Pantalla ──────────────────────────────────────────────────────────
  const total = document.getElementById('hud-node')?.nextSibling;
  if (total) total.textContent = '/12';                 // = MAP_LEVELS_TOTAL de 1r (map-gen.js)
  const css = document.createElement('style');
  css.textContent = `
    .c1 .b1r-visual img { max-height: 90px; width: auto; }
    .c1 .question .b1r-visual img { max-height: 64px; }
    .c1 .option-btn img.b1r-img { max-height: 54px; width: auto; vertical-align: middle; }
    .c1 .c1-escolta { margin: 6px auto 0; display: block; }`;
  document.head.appendChild(css);

  // ─── Banc de 1r: botons bloquejats fins que hi ha preguntes ────────────
  const botons = ['btn-jugar', 'btn-tutorial', 'btn-practica', 'btn-continuar'].map(id => document.getElementById(id)).filter(Boolean);
  botons.forEach(b => { b.disabled = true; });
  window.PL_C1_SO = id => { const q = POOL_C1.find(x => x.id === id); if (q && q.so) q.so(); };

  import('../../../_banc1r/carrega.mjs').then(m => m.carregaBanc('timbre')).then(BANC => {
    let id = 1000;
    BANC.unitats('timbre').filter(u => u.id !== 'barreja').forEach(u => {
      TEMES_C1.push(u.id);
      NOMS_C1[u.id] = u.titol;
      const vistes = new Set();
      for (let i = 0; i < 80 && vistes.size < 20; i++) {
        const p = BANC.pregunta('timbre', { opcions: 4, unitats: [u.id] });
        const clau = p.enunciat + p.visualHTML + p.opcions[p.correcta].html;
        if (vistes.has(clau)) continue;
        vistes.add(clau);
        id++;
        const escolta = p.so ? `<button class="poke-btn poke-btn-small c1-escolta" onclick="PL_C1_SO(${id})">Escolta</button>` : '';
        POOL_C1.push({
          id, tema: u.id, dificultat: 1, html: true,
          q: `<span class="c1-enun">${p.enunciat}</span>${p.visualHTML}${escolta}`,
          op: p.opcions.map(o => o.html), correcta: p.correcta,
          exp: p.explica || 'Mira la resposta bona.', so: p.so
        });
      }
    });
    botons.forEach(b => { b.disabled = false; });
  }).catch(e => console.error('PokéLuthier 1r: no es pot carregar el banc', e));
}
