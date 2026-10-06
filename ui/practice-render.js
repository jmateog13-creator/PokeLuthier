// ============================================================================
// PokéLuthier · ui/practice-render.js
// M4 — Mode Pràctica: 10 preguntes seguides d'un tema/dificultat triada,
// sense combat, sense conseqüències. Per a abans d'un examen.
// ============================================================================

import { QUESTIONS, NOMS_TEMES, TEMES } from '../data/questions.js';
import { showView, setText } from './views.js';
import { toast } from './toast.js';
import { CURS1 } from '../data/curs1.js';

let estatPractica = null;

export function obrirPractica() {
  showView('practica');
  estatPractica = { tema: null, dificultat: null };
  renderTriaPractica();
}

function renderTriaPractica() {
  const cont = document.getElementById('practica-content');
  cont.innerHTML = `
    <div class="practica-titol">Mode Pràctica</div>
    <p class="practica-sub">Tria un tema i una dificultat. Faràs 10 preguntes sense conseqüències.</p>

    <div class="practica-section">
      <div class="practica-label">Tema:</div>
      <div class="practica-options" id="practica-tema-options"></div>
    </div>

    <div class="practica-section">
      <div class="practica-label">Dificultat:</div>
      <div class="practica-options" id="practica-dif-options"></div>
    </div>

    <button class="poke-btn poke-btn-primary" id="btn-practica-comencar" disabled>Començar</button>
    <button class="poke-btn" id="btn-practica-sortir">Tornar al menú</button>
  `;

  const temaCont = document.getElementById('practica-tema-options');
  ['mixt', ...TEMES].forEach(t => {
    const b = document.createElement('button');
    b.className = 'poke-btn poke-btn-small practica-chip';
    b.textContent = t === 'mixt' ? 'Tots barrejat' : (NOMS_TEMES[t] || t);
    b.onclick = () => {
      estatPractica.tema = t;
      temaCont.querySelectorAll('button').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
      checkComencar();
    };
    temaCont.appendChild(b);
  });

  const difCont = document.getElementById('practica-dif-options');
  [{n:'Fàcil',v:1},{n:'Mitjana',v:2},{n:'Difícil',v:3},{n:'Totes',v:0}].forEach(d => {
    const b = document.createElement('button');
    b.className = 'poke-btn poke-btn-small practica-chip';
    b.textContent = d.n;
    b.onclick = () => {
      estatPractica.dificultat = d.v;
      difCont.querySelectorAll('button').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
      checkComencar();
    };
    difCont.appendChild(b);
  });

  if (CURS1) {   // 1r: sense nivells de dificultat
    estatPractica.dificultat = 0;
    difCont.parentElement.style.display = 'none';
  }

  document.getElementById('btn-practica-comencar').onclick = iniciarSessio;
  document.getElementById('btn-practica-sortir').onclick = () => showView('landing');
}

function checkComencar() {
  document.getElementById('btn-practica-comencar').disabled =
    !(estatPractica.tema !== null && estatPractica.dificultat !== null);
}

function iniciarSessio() {
  // Tria un conjunt de 10 preguntes
  let pool = (estatPractica.tema === 'mixt')
    ? QUESTIONS.slice()
    : QUESTIONS.filter(p => p.tema === estatPractica.tema);
  if (estatPractica.dificultat > 0) {
    pool = pool.filter(p => p.dificultat === estatPractica.dificultat);
  }
  if (pool.length === 0) {
    toast('No hi ha prou preguntes amb aquests filtres', 'bad', 2200);
    return;
  }
  // Barreja
  pool = pool.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  pool = pool.slice(0, Math.min(10, pool.length));

  estatPractica.preguntes = pool;
  estatPractica.idx = 0;
  estatPractica.encerts = 0;
  estatPractica.errors = 0;
  estatPractica.respostes = [];           // [{q, correcta, idxTriat}]
  renderPreguntaActual();
}

function renderPreguntaActual() {
  const cont = document.getElementById('practica-content');
  if (estatPractica.idx >= estatPractica.preguntes.length) {
    renderResum();
    return;
  }
  const q = estatPractica.preguntes[estatPractica.idx];
  cont.innerHTML = `
    <div class="practica-prog">Pregunta ${estatPractica.idx + 1} de ${estatPractica.preguntes.length}</div>
    <div class="practica-q">${q.q}</div>
    <div class="options-grid" id="practica-opts"></div>
    <div class="practica-exp" id="practica-exp" style="display:none;"></div>
    <button class="poke-btn poke-btn-primary practica-next-btn" id="btn-practica-next" style="display:none;">Següent ›</button>
  `;
  const grid = document.getElementById('practica-opts');
  const opcionsConIdx = q.op.map((txt, i) => ({ txt, original: i }));
  for (let i = opcionsConIdx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opcionsConIdx[i], opcionsConIdx[j]] = [opcionsConIdx[j], opcionsConIdx[i]];
  }
  opcionsConIdx.forEach(o => {
    const b = document.createElement('button');
    b.className = 'option-btn';
    if (q.html) b.innerHTML = o.txt; else b.textContent = o.txt;
    b.dataset.original = o.original;
    b.onclick = () => onResposta(o.original, b, q);
    grid.appendChild(b);
  });
}

function onResposta(idxTriat, btnEl, q) {
  const correct = idxTriat === q.correcta;
  if (correct) estatPractica.encerts++;
  else estatPractica.errors++;
  estatPractica.respostes.push({ qId: q.id, correct, idxTriat });

  document.querySelectorAll('#practica-opts .option-btn').forEach(b => {
    b.disabled = true;
  });
  btnEl.classList.add(correct ? 'option-correct' : 'option-wrong');
  if (!correct) {
    document.querySelectorAll('#practica-opts .option-btn').forEach(b => {
      if (Number(b.dataset.original) === q.correcta) b.classList.add('option-correct');
    });
  }

  const expEl = document.getElementById('practica-exp');
  expEl.innerHTML = `<span class="exp-icon">${correct ? '♯' : '♭'}</span> ${q.exp}`;
  expEl.style.display = 'block';
  expEl.classList.toggle('exp-fail', !correct);

  const next = document.getElementById('btn-practica-next');
  next.style.display = 'inline-block';
  next.onclick = () => {
    estatPractica.idx++;
    renderPreguntaActual();
  };
}

function renderResum() {
  const cont = document.getElementById('practica-content');
  const total = estatPractica.encerts + estatPractica.errors;
  const pct = total ? Math.round((estatPractica.encerts / total) * 100) : 0;
  cont.innerHTML = `
    <div class="practica-resum">
      <div class="practica-resum-emoji">${pct >= 80 ? '✦✦✦' : pct >= 50 ? '✦✦' : '✦'}</div>
      <h2>Sessió acabada!</h2>
      <div class="practica-resum-stats">
        <div><strong>${estatPractica.encerts}</strong> encerts</div>
        <div><strong>${estatPractica.errors}</strong> errors</div>
        <div><strong>${pct}%</strong> de domini</div>
      </div>
      <p>${pct >= 80 ? 'Excel·lent! Domines aquest tema.' : pct >= 50 ? 'Pots millorar — torna a practicar.' : 'Repassa el tema amb el professor.'}</p>
      <button class="poke-btn poke-btn-primary" id="btn-practica-reset">Una altra ronda</button>
      <button class="poke-btn" id="btn-practica-tornar">Tornar al menú</button>
    </div>
  `;
  document.getElementById('btn-practica-reset').onclick = obrirPractica;
  document.getElementById('btn-practica-tornar').onclick = () => showView('landing');
}
