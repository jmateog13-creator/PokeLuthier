// ============================================================================
// PokéLuthier · ui/special-nodes-render.js
// Renders dels 4 tipus especials: Casa del Sentiu, Cofre, Cartell, Mestre Vagabund.
// ============================================================================

import { GameState, desar } from '../engine/state.js';
import { CONFIG } from '../data/config.js';
import { QUESTIONS, NOMS_TEMES } from '../data/questions.js';
import { findTrainer } from '../data/trainers.js';
import { MEDALS } from '../data/medals.js';
import { casaDelSentiu, obrirCofre } from '../engine/shop.js';
import { temaFebledetectat, registrarResposta } from '../engine/stats.js';
import { showView, setText, iconHtml } from './views.js';
import { toast } from './toast.js';
import { renderHUD } from './hud.js';

// ─── CASA DEL SENTIU (Pokémon Center) ───────────────────────────────────
export function obrirCentreReps() {
  showView('centre');
  const cont = document.getElementById('centre-content');
  cont.innerHTML = `
    <div class="centre-emoji"><img class="inst-icon-img" src="assets/mapa/node_curacio.png" alt=""></div>
    <h2>Casa del Sentiu</h2>
    <p>La curandera musical et somriu. <br>"Deixa que els teus instruments descansin..."</p>
    <button class="poke-btn poke-btn-primary" id="btn-centre-curar">DESCANSAR (gratis)</button>
    <button class="poke-btn" id="btn-centre-marxar">Marxar sense descansar</button>
  `;
  document.getElementById('btn-centre-curar').onclick = () => {
    casaDelSentiu();
    renderHUD();
    toast('Tot l\'equip recupera HP al màxim!', 'good', 2200);
    setTimeout(tornarAlMapa, 700);
  };
  document.getElementById('btn-centre-marxar').onclick = tornarAlMapa;
}

// ─── COFRE AMAGAT ───────────────────────────────────────────────────────
export function obrirCofreUI() {
  showView('cofre');
  const cont = document.getElementById('cofre-content');
  cont.innerHTML = `
    <div class="cofre-emoji"><img class="inst-icon-img" src="assets/mapa/node_cofre.png" alt=""></div>
    <h2>Cofre amagat</h2>
    <p>Una caixa de fusta amb una clau de sol esculpida...</p>
    <button class="poke-btn poke-btn-primary" id="btn-cofre-obrir">OBRIR</button>
    <button class="poke-btn" id="btn-cofre-marxar">Deixar-lo en pau</button>
  `;
  document.getElementById('btn-cofre-obrir').onclick = () => {
    const res = obrirCofre();
    cont.innerHTML = `
      <div class="cofre-emoji"><img class="inst-icon-img" src="assets/mapa/node_cofre.png" alt=""></div>
      <h2>${res.msg}</h2>
      <button class="poke-btn poke-btn-primary" id="btn-cofre-tornar">Tornar al mapa</button>
    `;
    document.getElementById('btn-cofre-tornar').onclick = tornarAlMapa;
    renderHUD();
  };
  document.getElementById('btn-cofre-marxar').onclick = tornarAlMapa;
}

// ─── CARTELL DEL GYM ────────────────────────────────────────────────────
export function obrirCartell(gymId) {
  const gym = findTrainer(gymId);
  const medalla = MEDALS[gym.medalla];
  showView('cartell');
  const cont = document.getElementById('cartell-content');
  cont.innerHTML = `
    <div class="cartell-emoji">📜</div>
    <h2>Cartell del Camí</h2>
    <div class="cartell-info">
      <div class="cartell-gym">
        <span class="cartell-gym-emoji">${iconHtml(gym)}</span>
        <div>
          <div class="cartell-gym-name">${gym.nom}</div>
          <div class="cartell-gym-medal">${medalla.nom}</div>
        </div>
      </div>
      <p class="cartell-frase">"${gym.frase}"</p>
      <p class="cartell-tip"><strong>Pista del repàs</strong>: ${gym.tema === 'mixt' ? 'Repassa tots els temes' : 'Repassa: ' + (NOMS_TEMES[gym.tema] || gym.tema)}</p>
    </div>
    <button class="poke-btn poke-btn-primary" id="btn-cartell-seguir">Continuar al Gym ›</button>
  `;
  document.getElementById('btn-cartell-seguir').onclick = tornarAlMapa;
}

// ─── MESTRE VAGABUND ─────────────────────────────────────────────────────
export function obrirMestreVagabund() {
  showView('mestre');
  const cont = document.getElementById('mestre-content');
  const febleId = temaFebledetectat();
  const temaSuggerit = febleId || null;

  cont.innerHTML = `
    <div class="mestre-emoji"><img class="inst-icon-img" src="assets/mapa/node_mestre.png" alt=""></div>
    <h2>Mestre Vagabund</h2>
    <p>"Et plantejo 3 enigmes musicals. Cada encert: +20 ♪ i una mica de XP."</p>
    ${temaSuggerit ? `<p class="mestre-tip">Vaig a centrar-me en: <strong>${NOMS_TEMES[temaSuggerit]}</strong> (he vist que t'hi has equivocat).</p>` : ''}
    <button class="poke-btn poke-btn-primary" id="btn-mestre-acceptar">ACCEPTAR</button>
    <button class="poke-btn" id="btn-mestre-marxar">Marxar</button>
  `;
  document.getElementById('btn-mestre-acceptar').onclick = () => iniciarMestreQuiz(temaSuggerit);
  document.getElementById('btn-mestre-marxar').onclick = tornarAlMapa;
}

function iniciarMestreQuiz(temaPrioritari) {
  const cont = document.getElementById('mestre-content');
  let preguntesFetes = 0, encerts = 0;

  const seguent = () => {
    if (preguntesFetes >= 3) {
      const guany = encerts * 20;
      GameState.or += guany;
      renderHUD();
      cont.innerHTML = `
        <div class="mestre-emoji"><img class="inst-icon-img" src="assets/mapa/node_mestre.png" alt=""></div>
        <h2>Has acabat el repte!</h2>
        <p>${encerts}/3 encerts · +${guany} ♪</p>
        <button class="poke-btn poke-btn-primary" id="btn-mestre-fi">Tornar al mapa</button>
      `;
      document.getElementById('btn-mestre-fi').onclick = tornarAlMapa;
      return;
    }
    preguntesFetes++;
    // Tria pregunta: amb % alta, del tema prioritari (M2)
    let pool;
    if (temaPrioritari && Math.random() < CONFIG.preguntesAdaptades) {
      pool = QUESTIONS.filter(p => p.tema === temaPrioritari && !GameState.questionsAnswered.includes(p.id));
      if (pool.length === 0) pool = QUESTIONS.filter(p => p.tema === temaPrioritari);
    } else {
      pool = QUESTIONS.filter(p => !GameState.questionsAnswered.includes(p.id));
      if (pool.length === 0) pool = QUESTIONS;
    }
    const q = pool[Math.floor(Math.random() * pool.length)];
    GameState.questionsAnswered.push(q.id);

    cont.innerHTML = `
      <div class="mestre-emoji"><img class="inst-icon-img" src="assets/mapa/node_mestre.png" alt=""></div>
      <div class="mestre-prog">Pregunta ${preguntesFetes}/3</div>
      <div class="mestre-q">${q.q}</div>
      <div class="options-grid" id="mestre-opts"></div>
    `;
    const grid = document.getElementById('mestre-opts');
    const opcionsConIdx = q.op.map((txt, i) => ({ txt, original: i }));
    for (let i = opcionsConIdx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opcionsConIdx[i], opcionsConIdx[j]] = [opcionsConIdx[j], opcionsConIdx[i]];
    }
    opcionsConIdx.forEach(o => {
      const b = document.createElement('button');
      b.className = 'option-btn';
      if (q.html) b.innerHTML = o.txt; else b.textContent = o.txt;
      b.addEventListener('click', () => {
        const correct = o.original === q.correcta;
        registrarResposta(q, correct, 0);
        if (correct) { encerts++; toast(`♯ Correcte! ${q.exp}`, 'good', 1800); }
        else toast(`♭ ${q.exp}`, 'bad', 2200);
        setTimeout(seguent, 1500);
      });
      grid.appendChild(b);
    });
  };
  seguent();
}

async function tornarAlMapa() {
  desar();
  showView('mapa');
  const { renderMapa } = await import('./map-render.js');
  renderMapa();
}
