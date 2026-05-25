// ============================================================================
// PokéLuthier · engine/combat.js
// Lògica del combat per torns.
// ============================================================================

import { GameState, playerActiu, desar, esborrarSave } from './state.js';
import { CONFIG } from '../data/config.js';
import { INSTRUMENTS } from '../data/instruments.js';
import { QUESTIONS } from '../data/questions.js';
import { findTrainer } from '../data/trainers.js';
import { MEDALS } from '../data/medals.js';
import { registrarResposta, temaFebledetectat } from './stats.js';
import { showView } from '../ui/views.js';
import { renderCombat, setCombatMsg, mostrarTrainerIntro, renderChooseAttack, renderQuiz, mostrarExp, anim, mostrarPantallaXP, hide, show } from '../ui/combat-render.js';
import { mostrarMedallaObtinguda } from '../ui/medal-render.js';
import { toast } from '../ui/toast.js';
import { renderHUD } from '../ui/hud.js';

let timerInterval = null;
let preguntaStartTime = 0;

export function iniciarCombat(node) {
  const trainer = findTrainer(node.trainer);
  const esGym = node.type === 'gym';
  const esAC  = node.type === 'eliteFour';
  const esChamp = node.type === 'champion';
  const tipusCombat = esChamp ? 'champion' : esAC ? 'eliteFour' : esGym ? 'gym' : 'normal';

  // Composició de l'equip enemic
  let enemyTeam;
  if (trainer.equip && trainer.equip.length > 0) {
    enemyTeam = trainer.equip.map(id => {
      const inst = INSTRUMENTS[id];
      const scaleHP = esChamp ? 1.35 : (esAC ? 1.25 : (esGym ? 1.15 : (0.75 + GameState.currentLevel / 80)));
      const hp = Math.round(inst.hpMax * scaleHP);
      return { instrumentId: id, hp, hpMax: hp };
    });
  } else {
    const poolEnemic = Object.keys(INSTRUMENTS).filter(i => i !== 'flauta');
    enemyTeam = [];
    for (let i = 0; i < (node.enemyCount || 1); i++) {
      const pickRandom = a => a[Math.floor(Math.random() * a.length)];
      const instId = pickRandom(poolEnemic);
      const inst = INSTRUMENTS[instId];
      const scaleHP = 0.7 + GameState.currentLevel / 80;
      const hp = Math.round(inst.hpMax * scaleHP);
      enemyTeam.push({ instrumentId: instId, hp, hpMax: hp });
    }
  }

  GameState.activeCombat = {
    trainerId: node.trainer,
    enemyTeam,
    currentEnemyIdx: 0,
    tipusCombat,
    state: 'intro',
    selectedAttackIdx: null,
    currentQuestion: null,
    xpPendent: {},
    orGuanyat: 0
  };

  showView('combat');
  renderCombat();

  mostrarTrainerIntro(trainer, () => {
    setCombatMsg(`${trainer.nom}: «${trainer.frase}»`, true);
    setTimeout(() => combatRondaInicial(), 1400);
  });
}

function combatRondaInicial() {
  const c = GameState.activeCombat;
  const trainer = findTrainer(c.trainerId);
  const enemy = c.enemyTeam[c.currentEnemyIdx];
  setCombatMsg(`${trainer.nom} envia ${INSTRUMENTS[enemy.instrumentId].nom}!`, true);
  c.state = 'choose-attack';
  setTimeout(() => renderChooseAttack(onAttackChosen), 1200);
}

function onAttackChosen(idx) {
  const c = GameState.activeCombat;
  c.selectedAttackIdx = idx;
  c.state = 'answering';
  plantejarPregunta();
}

function plantejarPregunta() {
  const c = GameState.activeCombat;
  const q = pickQuestion();
  c.currentQuestion = q;
  if (!GameState.questionsAnswered.includes(q.id)) GameState.questionsAnswered.push(q.id);
  preguntaStartTime = Date.now();
  renderQuiz(q, onAnswerChosen, iniciarTimer);
}

function pickQuestion() {
  const c = GameState.activeCombat;
  const trainer = findTrainer(c.trainerId);
  const tema = trainer.tema || 'mixt';
  const lvl = GameState.currentLevel;
  const desiredDiff = lvl <= 20 ? (Math.random() < 0.7 ? 1 : 2)
                     : lvl <= 40 ? (Math.random() < 0.5 ? 2 : (Math.random() < 0.5 ? 1 : 3))
                     : (Math.random() < 0.55 ? 3 : 2);

  let pool;
  if (tema === 'mixt' || Math.random() < 0.25) pool = QUESTIONS;
  else pool = QUESTIONS.filter(p => p.tema === tema);

  let available = pool.filter(p => !GameState.questionsAnswered.includes(p.id));
  if (available.length === 0) { GameState.questionsAnswered = []; available = pool; }
  let withDiff = available.filter(p => p.dificultat === desiredDiff);
  if (withDiff.length === 0) withDiff = available;
  return withDiff[Math.floor(Math.random() * withDiff.length)];
}

function iniciarTimer(segons) {
  const fill = document.getElementById('timer-fill');
  if (!fill) return;
  fill.style.transition = 'none';
  fill.style.width = '100%';
  void fill.offsetWidth;
  fill.style.transition = `width ${segons}s linear`;
  setTimeout(() => { fill.style.width = '0%'; }, 30);

  if (timerInterval) clearTimeout(timerInterval);
  timerInterval = setTimeout(() => onAnswerChosen(-1, null), segons * 1000);
}

function onAnswerChosen(originalIdx, btnEl) {
  const c = GameState.activeCombat;
  if (c.state !== 'answering') return;
  c.state = 'showing-result';
  clearTimeout(timerInterval);

  const q = c.currentQuestion;
  const correct = originalIdx === q.correcta;
  const timeout = originalIdx === -1;
  const tempsMs = Date.now() - preguntaStartTime;

  registrarResposta(q, correct, timeout ? 0 : tempsMs);

  document.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
    const orig = Number(b.dataset.original);
    if (orig === q.correcta) b.classList.add('option-correct');
    else if (btnEl && b === btnEl && !correct) b.classList.add('option-wrong');
  });

  if (correct) mostrarExp(q.exp, false);
  else mostrarExp(q.exp + (timeout ? ' (Temps esgotat!)' : ''), true);

  // Adaptive nudge (M2) — un cop cada certa estona
  if (!correct) {
    const febleId = temaFebledetectat();
    if (febleId && Math.random() < 0.3) {
      const nomTema = { notes:'Notes musicals', alteracions:'Alteracions', compassos:'Compassos', figures:'Figures rítmiques', instruments:'Instruments' }[febleId];
      setTimeout(() => toast(`💡 Repassa: ${nomTema}`, 'info', 2200), 1800);
    }
  }

  setTimeout(() => {
    hide('quiz-zone');
    if (correct) executarAtacPlayer();
    else        executarAtacEnemic();
  }, 2400);
}

function executarAtacPlayer() {
  const c = GameState.activeCombat;
  const player = playerActiu();
  const inst = INSTRUMENTS[player.instrumentId];
  const dany = inst.danys[c.selectedAttackIdx];

  anim('player-emoji', 'attack-anim');
  setTimeout(() => anim('enemy-emoji', 'hit-anim'), 200);

  GameState.or += CONFIG.recompenses.orPerEncert;
  c.orGuanyat += CONFIG.recompenses.orPerEncert;
  c.xpPendent[player.instrumentId] = (c.xpPendent[player.instrumentId] || 0) + CONFIG.xpPerEncertCombat;

  const enemy = c.enemyTeam[c.currentEnemyIdx];
  enemy.hp = Math.max(0, enemy.hp - dany);

  setCombatMsg(`${inst.nom} usa ${inst.atacs[c.selectedAttackIdx]}!`, false);
  renderCombat();

  setTimeout(() => {
    if (enemy.hp <= 0) enemicAbatut();
    else { c.state = 'choose-attack'; renderChooseAttack(onAttackChosen); }
  }, 900);
}

function executarAtacEnemic() {
  const c = GameState.activeCombat;
  const enemy = c.enemyTeam[c.currentEnemyIdx];
  const enInst = INSTRUMENTS[enemy.instrumentId];
  const dany = Math.round(CONFIG.danyFalladaBase + GameState.currentLevel * 0.55);

  anim('enemy-emoji', 'attack-anim');
  setTimeout(() => anim('player-emoji', 'hit-anim'), 200);

  const player = playerActiu();
  player.hp = Math.max(0, player.hp - dany);
  setCombatMsg(`${enInst.nom} contrataca!`, false);
  renderCombat();

  setTimeout(() => {
    if (player.hp <= 0) instrumentTrencat();
    else { c.state = 'choose-attack'; renderChooseAttack(onAttackChosen); }
  }, 900);
}

function enemicAbatut() {
  const c = GameState.activeCombat;
  anim('enemy-emoji', 'broken-anim');

  const player = playerActiu();
  c.xpPendent[player.instrumentId] = (c.xpPendent[player.instrumentId] || 0) + CONFIG.xpPerVictoria;

  setTimeout(() => {
    document.getElementById('enemy-emoji').classList.remove('broken-anim');
    c.currentEnemyIdx++;
    if (c.currentEnemyIdx >= c.enemyTeam.length) {
      victoriaCombat();
    } else {
      const next = INSTRUMENTS[c.enemyTeam[c.currentEnemyIdx].instrumentId];
      setCombatMsg(`${findTrainer(c.trainerId).nom} envia ${next.nom}!`, true);
      renderCombat();
      c.state = 'choose-attack';
      setTimeout(() => renderChooseAttack(onAttackChosen), 1400);
    }
  }, 900);
}

function instrumentTrencat() {
  const c = GameState.activeCombat;
  const player = playerActiu();
  const inst = INSTRUMENTS[player.instrumentId];
  anim('player-emoji', 'broken-anim');

  GameState.stats.instrumentsTrencats++;
  setCombatMsg(`${inst.nom} s'ha trencat de manera irreversible...`, true);

  const slotIdx = GameState.team.indexOf(player);
  if (!GameState.brokenSlots.includes(slotIdx)) GameState.brokenSlots.push(slotIdx);
  player.slotActiu = false;
  player.hp = 0;

  setTimeout(() => {
    document.getElementById('player-emoji').classList.remove('broken-anim');
    const seguent = GameState.team.find(t => t.hp > 0);
    if (!seguent) {
      gameOver();
    } else {
      seguent.slotActiu = true;
      setCombatMsg(`${INSTRUMENTS[seguent.instrumentId].nom} entra a l'escenari!`, true);
      renderCombat();
      c.state = 'choose-attack';
      setTimeout(() => renderChooseAttack(onAttackChosen), 1400);
    }
  }, 900);
}

function victoriaCombat() {
  const c = GameState.activeCombat;
  GameState.stats.combatsGuanyats++;

  let bonus;
  if (c.tipusCombat === 'champion')   bonus = CONFIG.recompenses.orVictoriaCampio;
  else if (c.tipusCombat === 'eliteFour') bonus = CONFIG.recompenses.orVictoriaACMember;
  else if (c.tipusCombat === 'gym')   bonus = CONFIG.recompenses.orVictoriaGym;
  else bonus = CONFIG.recompenses.orVictoriaCombat;
  GameState.or += bonus;
  c.orGuanyat += bonus;

  setCombatMsg(`Has derrotat ${findTrainer(c.trainerId).nom}!`, true);

  setTimeout(() => {
    // Si és Gym → guanyar medalla
    if (c.tipusCombat === 'gym') {
      const gymInfo = findTrainer(c.trainerId);
      const medalla = MEDALS[gymInfo.medalla];
      if (!GameState.medalles.includes(medalla.id)) GameState.medalles.push(medalla.id);
      aplicarXPFinal();
      GameState.activeCombat = null;
      mostrarMedallaObtinguda(medalla, () => {
        desar();
        renderHUD();
        showView('mapa');
        import('../ui/map-render.js').then(m => m.renderMapa());
      });
      return;
    }

    // Si és Champion → victoria final
    if (c.tipusCombat === 'champion') {
      aplicarXPFinal();
      GameState.activeCombat = null;
      esborrarSave();
      import('../ui/balance-render.js').then(m => m.mostrarBalanc(true));
      return;
    }

    // Si és AC (Alt Comandament) → continuar a següent AC o Champion
    if (c.tipusCombat === 'eliteFour') {
      aplicarXPFinal();
      // Curar HP al 50% (com Pokémon real)
      GameState.team.forEach(t => {
        if (t.hp > 0) t.hp = Math.min(t.hpMax, t.hp + Math.round(t.hpMax * 0.5));
      });
      toast('Equip recuperat 50% per al següent combat', 'good', 2000);
      GameState.activeCombat = null;
      // Avança al següent node (AC2/3/4 o Champion)
      avancarAcAutomatic();
      return;
    }

    // Combat normal → pantalla XP normal
    mostrarPantallaXP(() => {
      GameState.activeCombat = null;
      desar();
      showView('mapa');
      import('../ui/map-render.js').then(m => m.renderMapa());
    });
  }, 1800);
}

function avancarAcAutomatic() {
  // Avancem 1 nivell i obrim el següent combat automàticament
  GameState.currentLevel++;
  GameState.currentNodeIdx = 0;
  const node = GameState.mapData[GameState.currentLevel - 1][0];
  setTimeout(() => iniciarCombat(node), 600);
}

function aplicarXPFinal() {
  const c = GameState.activeCombat;
  if (!c) return;
  Object.keys(c.xpPendent).forEach(instId => {
    const m = GameState.team.find(t => t.instrumentId === instId);
    if (!m) return;
    m.xp += c.xpPendent[instId];
    while (m.nivell < CONFIG.nivellMaxim && m.xp >= CONFIG.xpPerNivell[m.nivell]) m.nivell++;
  });
}

function gameOver() {
  // Si el game over passa a la Lliga, deixem el progrés intacte amb medalles
  const eraLliga = GameState.activeCombat && (GameState.activeCombat.tipusCombat === 'eliteFour' || GameState.activeCombat.tipusCombat === 'champion');
  if (eraLliga && GameState.medalles.length >= 5) {
    // Permetre rejugar la Lliga: retorn al gym 5 amb equip TOTALMENT RESTAURAT
    // (com a regalia per haver arribat a la Lliga — perdre-ho tot seria injust)
    GameState.currentLevel = 56;
    GameState.currentNodeIdx = 0;
    GameState.activeCombat = null;
    // Restaurar tots els instruments, fins i tot els trencats
    GameState.team.forEach(t => { t.hp = t.hpMax; });
    GameState.brokenSlots = [];
    // Activa el primer instrument viu
    GameState.team.forEach(t => t.slotActiu = false);
    if (GameState.team[0]) GameState.team[0].slotActiu = true;
    desar();
    toast('Has perdut la Lliga. El Luthier reparà tots els instruments. Torna-ho a intentar!', 'info', 4000);
    showView('mapa');
    import('../ui/map-render.js').then(m => m.renderMapa());
    return;
  }
  esborrarSave();
  setTimeout(() => {
    import('../ui/balance-render.js').then(m => m.mostrarBalanc(false));
  }, 1200);
}

export function ferSwitch(slotIdx) {
  const c = GameState.activeCombat;
  if (!c) return;
  const target = GameState.team[slotIdx];
  if (!target || target.slotActiu || target.hp <= 0) return;
  GameState.team.forEach(t => t.slotActiu = false);
  target.slotActiu = true;
  renderCombat();
  toast(`Has cridat ${INSTRUMENTS[target.instrumentId].nom}!`, 'info', 1500);
  if (c.state === 'choose-attack' || c.state === 'awaiting-switch') {
    c.state = 'choose-attack';
    setTimeout(() => renderChooseAttack(onAttackChosen), 700);
  }
}

export { aplicarXPFinal };
