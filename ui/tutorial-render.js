// ============================================================================
// PokéLuthier · ui/tutorial-render.js
// Tutorial interactiu amb mini-demos per a cada concepte clau.
// ============================================================================

import { TUTORIAL } from '../data/tutorial.js';
import { showView, setText } from './views.js';
import { toast } from './toast.js';
import { CURS1 } from '../data/curs1.js';

let tutIdx = 0;
let tutPasFet = false;

export function obrirTutorial(onFinalizar) {
  tutIdx = 0;
  showView('tutorial');
  renderTutorial();

  document.getElementById('btn-tut-anterior').onclick = () => {
    if (tutIdx > 0) { tutIdx--; renderTutorial(); }
  };
  document.getElementById('btn-tut-seguent').onclick = () => {
    if (tutIdx < TUTORIAL.length - 1) { tutIdx++; renderTutorial(); }
    else { if (onFinalizar) onFinalizar(); }
  };
  document.getElementById('btn-tut-sortir').onclick = () => {
    if (onFinalizar) onFinalizar(true);
  };
}

function renderTutorial() {
  const total = TUTORIAL.length;
  const pas = TUTORIAL[tutIdx];
  setText('tut-progress', `Pas ${tutIdx + 1} de ${total}`);
  setText('tut-titol', pas.titol);
  setText('tut-text', pas.text);

  const dots = document.getElementById('tut-dots');
  dots.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('span');
    d.className = 'tut-dot' + (i === tutIdx ? ' active' : '');
    dots.appendChild(d);
  }

  document.getElementById('btn-tut-anterior').style.visibility = tutIdx === 0 ? 'hidden' : 'visible';
  const btnNext = document.getElementById('btn-tut-seguent');
  btnNext.textContent = tutIdx === total - 1 ? '▶ JUGAR' : 'Següent ›';

  tutPasFet = false;
  renderDemo(pas);
}

function tutPasCompletat() {
  tutPasFet = true;
  const demo = document.getElementById('tut-demo');
  const hint = demo.querySelector('.demo-hint');
  if (hint) hint.remove();
  if (!demo.querySelector('.demo-done')) {
    const d = document.createElement('div');
    d.className = 'demo-done';
    d.textContent = '✓ Fet! Premsa Següent ›';
    demo.appendChild(d);
  }
}

function renderDemo(pas) {
  const cont = document.getElementById('tut-demo');
  cont.innerHTML = '';

  switch (pas.demo) {
    case 'intro':
      cont.innerHTML = `<div class="demo-intro-row">
        <img class="inst-icon-img" src="assets/instruments_landing/flauta.png" alt="">
        <img class="inst-icon-img" src="assets/instruments_landing/violi.png" alt="">
        <img class="inst-icon-img" src="assets/instruments_landing/trompeta.png" alt="">
        <img class="inst-icon-img" src="assets/instruments_landing/saxofon.png" alt="">
        <img class="inst-icon-img" src="assets/instruments_landing/tambor.png" alt="">
        <img class="inst-icon-img" src="assets/instruments_landing/piano.png" alt="">
        <img class="inst-icon-img" src="assets/instruments_landing/guitarra_electrica.png" alt="">
        <img class="inst-icon-img" src="assets/instruments_landing/acordio.png" alt="">
      </div>`;
      tutPasCompletat();
      break;

    case 'team-hp':
      renderTeamHpDemo(cont);
      break;

    case 'mini-map':
      renderMiniMapDemo(cont);
      break;

    case 'attack-pick':
      renderAttackPickDemo(cont);
      break;

    case 'quiz':
      renderQuizDemo(cont);
      break;

    case 'wild-encounter':
      renderWildEncounterDemo(cont);
      break;

    case 'final':
      cont.innerHTML = `<div class="demo-final"><img class="inst-icon-img" src="assets/entrenadors/director_orquestra.png" alt=""></div><div style="font-family:var(--font-pixel);font-size:0.7rem;color:var(--red);">EL DIRECTOR D'ORQUESTRA</div>`;
      tutPasCompletat();
      break;

    default:
      tutPasCompletat();
  }
}

function renderTeamHpDemo(cont) {
  cont.innerHTML = `
    <div class="demo-team-card">
      <div class="demo-team-emoji"><img class="inst-icon-img" src="assets/criatures/flauta.png" alt=""></div>
      <div class="demo-team-info">
        <div class="demo-team-name">Flauta Dolça · Lv1</div>
        <div class="demo-hp-bar"><div class="demo-hp-fill" id="demo-hp"></div></div>
      </div>
    </div>
    <div class="demo-buttons-row">
      <button class="poke-btn poke-btn-small" id="demo-hit">ATACAR</button>
      <button class="poke-btn poke-btn-small" id="demo-heal">CURAR</button>
    </div>
    <p class="demo-hint">Prova els dos botons!</p>`;
  let demoHp = 100;
  let provatsHit = false, provatsHeal = false;
  const hpFill = cont.querySelector('#demo-hp');
  const update = () => {
    hpFill.style.width = demoHp + '%';
    hpFill.style.background = demoHp < 20 ? 'var(--red-hp)' : demoHp < 50 ? 'var(--yellow-hp)' : 'var(--green-hp)';
  };
  cont.querySelector('#demo-hit').onclick = () => {
    demoHp = Math.max(0, demoHp - 25); update();
    provatsHit = true;
    if (provatsHit && provatsHeal) tutPasCompletat();
  };
  cont.querySelector('#demo-heal').onclick = () => {
    demoHp = 100; update();
    provatsHeal = true;
    if (provatsHit && provatsHeal) tutPasCompletat();
  };
}

function renderMiniMapDemo(cont) {
  cont.innerHTML = `
    <div class="demo-mini-map">
      <div class="demo-mini-row">
        <div class="demo-mini-node available" data-tipus="combat" style="font-size:0.5rem">Batalla</div>
        <div class="demo-mini-node available" data-tipus="botiga" style="font-size:0.5rem">Botiga</div>
        <div class="demo-mini-node available" data-tipus="event" style="font-size:0.5rem">Esdev.</div>
      </div>
      <div style="font-family:var(--font-vt);font-size:0.95rem;color:var(--ink);">Estàs aquí</div>
    </div>
    <p class="demo-hint">Toca un dels 3 nodes!</p>`;
  cont.querySelectorAll('.demo-mini-node').forEach(n => {
    n.onclick = () => {
      cont.querySelectorAll('.demo-mini-node').forEach(x => x.classList.remove('available'));
      n.style.outline = '3px solid #ffd838';
      const lbl = { combat:'Entrenador! Comença el combat...', botiga:'Has anat a la botiga!', event:'Apareix un esdeveniment!' };
      toast(lbl[n.dataset.tipus], 'good', 1500);
      tutPasCompletat();
    };
  });
}

function renderAttackPickDemo(cont) {
  cont.innerHTML = `
    <div class="demo-attacks">
      <button class="demo-attack-btn"><span>Bufada Suau</span><span class="att-dany">18 dany</span></button>
      <button class="demo-attack-btn"><span>Aire Polifònic</span><span class="att-dany">Lv3</span></button>
    </div>
    <p class="demo-hint">Toca un atac per provar!</p>`;
  cont.querySelectorAll('.demo-attack-btn').forEach((b, i) => {
    b.onclick = () => {
      cont.querySelectorAll('.demo-attack-btn').forEach(x => x.style.opacity = '0.5');
      b.style.opacity = '1';
      b.style.background = '#fff8d8';
      toast(i === 0 ? 'Bona elecció!' : 'Aquest atac es desbloqueja al Lv3', 'info', 1500);
      tutPasCompletat();
    };
  });
}

function renderQuizDemo(cont) {
  const q = CURS1
    ? { q: 'De quina família és el violí?', op: ['Corda', 'Vent', 'Percussió', 'Electrònics'], correcta: 0, ok: 'Correcte! El violí és de corda.', ko: 'El violí és de corda.' }
    : { q: 'Quantes notes té l\'escala musical?', op: ['7', '5', '8', '12'], correcta: 0 };
  cont.innerHTML = `
    <div class="demo-quiz">
      <div class="demo-q-text">${q.q}</div>
      <div class="demo-q-options"></div>
    </div>
    <p class="demo-hint">Tria la resposta correcta</p>`;
  const opGrid = cont.querySelector('.demo-q-options');
  q.op.forEach((txt, i) => {
    const b = document.createElement('button');
    b.className = 'demo-q-opt';
    b.textContent = txt;
    b.onclick = () => {
      cont.querySelectorAll('.demo-q-opt').forEach((x, j) => {
        x.disabled = true;
        if (j === q.correcta) x.classList.add('correct');
        else if (j === i) x.classList.add('wrong');
      });
      if (i === q.correcta) toast(q.ok || '♯ Correcte! Do-Re-Mi-Fa-Sol-La-Si.', 'good', 2000);
      else toast(q.ko || '♭ Era 7! Do-Re-Mi-Fa-Sol-La-Si.', 'bad', 2200);
      tutPasCompletat();
    };
    opGrid.appendChild(b);
  });
}

function renderWildEncounterDemo(cont) {
  cont.innerHTML = `
    <div class="demo-wild">
      <div class="demo-wild-title">Has trobat instruments salvatges!</div>
      <div class="demo-wild-options">
        <div class="demo-wild-opt" data-inst="violi"><div><img class="inst-icon-img" src="assets/criatures/violi.png" alt=""></div><div>Violí</div></div>
        <div class="demo-wild-opt" data-inst="trompeta"><div><img class="inst-icon-img" src="assets/criatures/trompeta.png" alt=""></div><div>Trompeta</div></div>
        <div class="demo-wild-opt" data-inst="piano"><div><img class="inst-icon-img" src="assets/criatures/piano.png" alt=""></div><div>Piano</div></div>
      </div>
    </div>
    <p class="demo-hint">Tria un instrument per capturar!</p>`;
  cont.querySelectorAll('.demo-wild-opt').forEach(opt => {
    opt.onclick = () => {
      cont.querySelectorAll('.demo-wild-opt').forEach(x => x.style.opacity = '0.4');
      opt.style.opacity = '1';
      opt.style.outline = '3px solid var(--gold)';
      toast(`Has capturat un instrument salvatge!`, 'good', 1500);
      tutPasCompletat();
    };
  });
}
