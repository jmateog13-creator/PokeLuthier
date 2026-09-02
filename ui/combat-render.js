// ============================================================================
// PokéLuthier · ui/combat-render.js
// Renderització del combat (sprites, HP, atacs, preguntes, animacions).
// ============================================================================

import { GameState, playerActiu } from '../engine/state.js';
import { CONFIG } from '../data/config.js';
import { INSTRUMENTS } from '../data/instruments.js';
import { findTrainer } from '../data/trainers.js';
import { setText, setIcon, showView, iconHtml } from './views.js';

export function show(id) { const el = document.getElementById(id); if (el) el.style.display = ''; }
export function hide(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }

export function setCombatMsg(text, withArrow = true) {
  const el = document.getElementById('combat-msg');
  if (!el) return;
  el.textContent = text;
  el.classList.toggle('has-arrow', !!withArrow);
}

export function anim(elementId, className) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.classList.add(className);
  setTimeout(() => el.classList.remove(className), 700);
}

export function renderCombat() {
  const c = GameState.activeCombat;
  if (!c) return;
  const trainer = findTrainer(c.trainerId);

  setIcon('trainer-emoji', trainer);
  setText('trainer-name',  trainer.nom);

  const enemy = c.enemyTeam[c.currentEnemyIdx];
  const enInst = INSTRUMENTS[enemy.instrumentId];
  setText('enemy-name',  enInst.nom);
  setIcon('enemy-emoji', enInst);
  setText('enemy-lvl',   Math.max(1, Math.round(GameState.currentLevel * 0.35) + 1));
  updateHpFill('enemy-hp-fill', enemy.hp, enemy.hpMax);

  const player = playerActiu();
  if (player) {
    const plInst = INSTRUMENTS[player.instrumentId];
    setText('player-name',  plInst.nom);
    setText('player-lvl',   player.nivell);
    setIcon('player-emoji', plInst);
    setText('player-hp-text', `${player.hp}/${player.hpMax}`);
    updateHpFill('player-hp-fill', player.hp, player.hpMax);
    const xpPct = pctXPNivell(player);
    const xpFill = document.getElementById('player-xp-fill');
    if (xpFill) xpFill.style.width = xpPct + '%';
  }
}

function pctXPNivell(p) {
  if (p.nivell >= CONFIG.nivellMaxim) return 100;
  const xpAct = p.xp;
  const xpAnt = CONFIG.xpPerNivell[p.nivell - 1] || 0;
  const xpProx = CONFIG.xpPerNivell[p.nivell] || (xpAnt + 1);
  return Math.min(100, Math.max(0, ((xpAct - xpAnt) / (xpProx - xpAnt)) * 100));
}

function updateHpFill(id, hp, hpMax) {
  const fill = document.getElementById(id);
  if (!fill) return;
  const pct = Math.max(0, (hp / hpMax) * 100);
  fill.style.width = pct + '%';
  fill.classList.remove('warn','danger');
  if (pct < 20) fill.classList.add('danger');
  else if (pct < 50) fill.classList.add('warn');
}

export function mostrarTrainerIntro(trainer, callback) {
  const overlay = document.getElementById('trainer-intro');
  if (!overlay) { callback(); return; }
  setIcon('ti-emoji', trainer);
  setText('ti-name',  trainer.nom);
  setText('ti-frase', `«${trainer.frase}»`);
  overlay.style.display = 'flex';
  overlay.style.opacity = '1';
  setTimeout(() => {
    overlay.style.transition = 'opacity 300ms';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      overlay.style.transition = '';
      if (callback) callback();
    }, 300);
  }, 2200);
}

export function renderChooseAttack(onAttackChosen) {
  hide('quiz-zone'); hide('exp-zone');
  show('attack-zone'); show('action-row');

  const player = playerActiu();
  const inst = INSTRUMENTS[player.instrumentId];
  setCombatMsg(`Què farà ${inst.nom}?`, false);

  const grid = document.getElementById('attacks-grid');
  grid.innerHTML = '';

  // Família abreujada per al chip
  const famAbrev = familyShort(inst.familia);
  // data-fam per coloració del chip via CSS
  const famSlug = (inst.subfamilia || '').toLowerCase();

  inst.atacs.forEach((nom, idx) => {
    const llindarsNivell = CONFIG.nivellsAtacsDesbloquejats; // [1,3,5,7]
    const desbloquejat = player.nivell >= (llindarsNivell[idx] || 1);
    const btn = document.createElement('button');
    btn.className = 'attack-btn';
    btn.dataset.fam = famSlug;

    if (!desbloquejat) {
      btn.classList.add('att-locked');
      btn.disabled = true;
      btn.innerHTML = `
        <div class="att-name">???</div>
        <div class="att-foot">
          <span class="att-family">Lv ${llindarsNivell[idx]}</span>
          <span class="att-dany"><span class="dany-label">Poder</span> ??</span>
        </div>`;
    } else {
      btn.innerHTML = `
        <div class="att-name">${nom}</div>
        <div class="att-foot">
          <span class="att-family">${famAbrev}</span>
          <span class="att-dany"><span class="dany-label">Poder</span> ${inst.danys[idx]}</span>
        </div>`;
      btn.addEventListener('click', () => onAttackChosen(idx));
    }
    grid.appendChild(btn);
  });
}

// Abreugia la família per a què càpiga al chip
function familyShort(familia) {
  const m = {
    'Corda fregada':    'CORDA',
    'Corda pinçada':    'CORDA',
    'Corda percudida':  'CORDA',
    'Vent-fusta':       'FUSTA',
    'Vent-metall':      'METALL',
    'Vent lliure':      'VENT',
    'Percussió':        'PERC',
    'Idiòfon':          'IDIO',
    'Electròfon':       'ELEC',
    'Veu':              'VEU'
  };
  return m[familia] || familia.toUpperCase().slice(0, 6);
}

export function renderQuiz(q, onAnswerChosen, iniciarTimer) {
  hide('attack-zone'); hide('action-row'); hide('exp-zone');
  show('quiz-zone');
  setCombatMsg('Pregunta!', false);
  setText('question-text', q.q);

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  const opcionsConIdx = q.op.map((txt, i) => ({ txt, original: i }));
  shuffle(opcionsConIdx);
  opcionsConIdx.forEach(o => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = o.txt;
    btn.dataset.original = o.original;
    btn.addEventListener('click', () => onAnswerChosen(o.original, btn));
    grid.appendChild(btn);
  });

  iniciarTimer(CONFIG.timerPerDificultat[q.dificultat - 1]);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function mostrarExp(text, esFail) {
  setText('exp-icon', esFail ? '♭' : '♯');
  setText('exp-text', text);
  document.getElementById('exp-zone').classList.toggle('exp-fail', esFail);
  show('exp-zone');
}

// ─── Pantalla XP post-combat ──────────────────────────────────────────────
export function mostrarPantallaXP(onContinue) {
  const c = GameState.activeCombat;
  if (!c) { onContinue(); return; }
  showView('xp');

  const cont = document.getElementById('xp-rewards');
  cont.innerHTML = '';

  const orRow = document.createElement('div');
  orRow.className = 'xp-reward-row';
  orRow.innerHTML = `
    <div class="xp-reward-emoji">♪</div>
    <div class="xp-reward-info">
      <div class="xp-reward-name">Monedes obtingudes</div>
      <div class="xp-reward-detail">+${c.orGuanyat} ♪</div>
    </div>`;
  cont.appendChild(orRow);

  Object.keys(c.xpPendent).forEach(instId => {
    const member = GameState.team.find(t => t.instrumentId === instId);
    if (!member) return;
    const inst = INSTRUMENTS[instId];
    const xpGuany = c.xpPendent[instId];

    const row = document.createElement('div');
    row.className = 'xp-reward-row';
    row.innerHTML = `
      <div class="xp-reward-emoji">${iconHtml(inst)}</div>
      <div class="xp-reward-info">
        <div class="xp-reward-name">${inst.nom}</div>
        <div class="xp-reward-detail">+${xpGuany} XP <span class="xp-row-msg"></span></div>
        <div class="xp-reward-bar-row"><div class="xp-bar"><div class="xp-fill"></div></div></div>
      </div>`;
    cont.appendChild(row);

    const xpFill = row.querySelector('.xp-fill');
    const msgEl  = row.querySelector('.xp-row-msg');

    const xpAnt = member.xp;
    const nivellAnt = member.nivell;
    member.xp += xpGuany;
    const pujades = [];
    while (member.nivell < CONFIG.nivellMaxim && member.xp >= CONFIG.xpPerNivell[member.nivell]) {
      member.nivell++;
      pujades.push(member.nivell);
    }

    const pctAnt = (() => {
      const tmp = { ...member, xp: xpAnt, nivell: nivellAnt };
      return pctXPNivell(tmp);
    })();
    const pctFinal = pctXPNivell(member);
    xpFill.style.width = pctAnt + '%';
    setTimeout(() => { xpFill.style.width = pctFinal + '%'; }, 200);

    if (pujades.length > 0) {
      msgEl.textContent = ` · Puja a Lv ${member.nivell}!`;
      msgEl.style.color = 'var(--red)';
      pujades.forEach(nv => {
        if ([3, 5, 7].includes(nv)) {
          const idxAtac = nv === 3 ? 1 : nv === 5 ? 2 : 3;
          setTimeout(() => {
            import('./toast.js').then(m => m.toast(`${inst.nom} ha après ${inst.atacs[idxAtac]}!`, 'good', 3500));
          }, 600);
        }
      });
    }
  });

  document.getElementById('btn-xp-continuar').onclick = onContinue;
}
