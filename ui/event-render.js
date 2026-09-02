// ============================================================================
// PokéLuthier · ui/event-render.js
// Render d'esdeveniments narratius + mini-quiz.
// ============================================================================

import { GameState, desar } from '../engine/state.js';
import { EVENTS } from '../data/events.js';
import { QUESTIONS } from '../data/questions.js';
import { resoldreEfecte } from '../engine/events.js';
import { registrarResposta } from '../engine/stats.js';
import { showView, setText } from './views.js';
import { toast } from './toast.js';
import { renderHUD } from './hud.js';

export function obrirEsdeveniment(eventId) {
  const ev = EVENTS.find(e => e.id === eventId) || EVENTS[0];
  showView('esdeveniment');
  setText('event-titol', ev.titol);
  setText('event-text', ev.text);
  document.getElementById('event-result').style.display = 'none';

  const cont = document.getElementById('event-opcions');
  cont.innerHTML = '';
  ev.opcions.forEach(op => {
    const btn = document.createElement('button');
    btn.className = 'poke-btn';
    btn.textContent = op.etiqueta;
    btn.addEventListener('click', () => onTriaEsdeveniment(op.efecte));
    cont.appendChild(btn);
  });
}

function onTriaEsdeveniment(efecte) {
  document.getElementById('event-opcions').innerHTML = '';

  if (efecte.tipus === 'miniquiz') {
    iniciarMiniQuiz();
    return;
  }
  if (efecte.tipus === 'curarUn') {
    triarInstrumentACurar();
    return;
  }

  const res = resoldreEfecte(efecte);
  finalitzarEsdeveniment(res.msg);
}

function triarInstrumentACurar() {
  const viables = GameState.team.filter(t => t.hp > 0 && t.hp < t.hpMax);
  if (viables.length === 0) {
    finalitzarEsdeveniment('Tots els instruments ja són al màxim. Els músics marxen somrient.');
    return;
  }
  const modal = document.createElement('div');
  modal.className = 'pick-instrument-modal';
  modal.innerHTML = `
    <div class="poke-box pick-card">
      <h3>Quin instrument vols curar?</h3>
      <div class="pick-options"></div>
    </div>`;
  const opts = modal.querySelector('.pick-options');
  viables.forEach(t => {
    const div = document.createElement('div');
    div.className = 'pick-opt';
    div.innerHTML = `<div class="pick-emoji">${t.instrumentId}</div><div class="pick-stats">${t.hp}/${t.hpMax}</div>`;
    div.addEventListener('click', () => {
      t.hp = t.hpMax;
      document.body.removeChild(modal);
      finalitzarEsdeveniment('Instrument totalment restaurat!');
    });
    opts.appendChild(div);
  });
  document.body.appendChild(modal);
}

function finalitzarEsdeveniment(msg) {
  const result = document.getElementById('event-result');
  result.innerHTML = msg + '<br><br>';
  const btn = document.createElement('button');
  btn.className = 'poke-btn poke-btn-primary';
  btn.textContent = 'Tornar al mapa';
  btn.addEventListener('click', () => {
    desar();
    showView('mapa');
    import('./map-render.js').then(m => m.renderMapa());
  });
  result.appendChild(btn);
  result.style.display = 'block';
  renderHUD();
}

function iniciarMiniQuiz() {
  const cont = document.getElementById('event-opcions');
  let preguntesFetes = 0, guany = 0;

  const seguent = () => {
    if (preguntesFetes >= 3) {
      finalitzarEsdeveniment(`Has obtingut ${guany} ♪ en total. Bona feina!`);
      return;
    }
    preguntesFetes++;
    const disponibles = QUESTIONS.filter(p => !GameState.questionsAnswered.includes(p.id));
    const q = (disponibles.length ? disponibles : QUESTIONS)[Math.floor(Math.random() * (disponibles.length || QUESTIONS.length))];
    GameState.questionsAnswered.push(q.id);

    cont.innerHTML = `<div class="mini-quiz-progress">Pregunta ${preguntesFetes}/3</div><div class="mini-quiz-q">${q.q}</div>`;
    const opcionsConIdx = q.op.map((txt, i) => ({ txt, original: i }));
    for (let i = opcionsConIdx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opcionsConIdx[i], opcionsConIdx[j]] = [opcionsConIdx[j], opcionsConIdx[i]];
    }
    const grid = document.createElement('div');
    grid.className = 'options-grid';
    opcionsConIdx.forEach(o => {
      const b = document.createElement('button');
      b.className = 'option-btn';
      b.textContent = o.txt;
      b.addEventListener('click', () => {
        const correct = o.original === q.correcta;
        registrarResposta(q, correct, 0);
        if (correct) { guany += 15; GameState.or += 15; toast('+15 ♪', 'good', 1200); }
        else toast('Falla!', 'bad', 1200);
        renderHUD();
        setTimeout(seguent, 600);
      });
      grid.appendChild(b);
    });
    cont.appendChild(grid);
  };
  seguent();
}
