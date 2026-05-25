// ============================================================================
// PokéLuthier · data/questions.js
// 150 preguntes per a alumnes de 1r ESO de Música.
// 30 per cada un dels 5 temes (notes, alteracions, compassos, figures, instruments).
// Dificultat: 1 (fàcil, 15s) · 2 (mitjana, 11s) · 3 (difícil, 7s).
// ============================================================================

export const QUESTIONS = Object.freeze([

  // ═══════════════════════════════════════════════════════════════════════
  // NOTES MUSICALS (30 preguntes)
  // ═══════════════════════════════════════════════════════════════════════
  { id:1,  tema:'notes', dificultat:1, q:'Quantes notes té l\'escala musical occidental tradicional?', op:['7','5','8','12'], correcta:0, exp:'Do, Re, Mi, Fa, Sol, La, Si: 7 notes naturals.' },
  { id:2,  tema:'notes', dificultat:1, q:'Quina nota va entre el Do i el Mi?', op:['Re','Fa','Si','Sol'], correcta:0, exp:'L\'ordre és Do-Re-Mi-Fa-Sol-La-Si.' },
  { id:3,  tema:'notes', dificultat:1, q:'Quantes línies té un pentagrama?', op:['5','4','6','7'], correcta:0, exp:'Penta = cinc. Cinc línies i quatre espais.' },
  { id:4,  tema:'notes', dificultat:1, q:'Quina nota es col·loca a la 2a línia del pentagrama en clau de sol?', op:['Sol','Si','Re','Fa'], correcta:0, exp:'La clau de sol envolta la 2a línia, marcant la nota Sol.' },
  { id:5,  tema:'notes', dificultat:1, q:'Quantes notes té l\'escala completa amb totes les notes naturals?', op:['7','5','8','12'], correcta:0, exp:'7 notes naturals: Do Re Mi Fa Sol La Si.' },
  { id:6,  tema:'notes', dificultat:1, q:'Quina és la 5a nota de l\'escala de Do?', op:['Sol','Fa','La','Re'], correcta:0, exp:'Do-Re-Mi-Fa-Sol. La cinquena és Sol.' },
  { id:7,  tema:'notes', dificultat:2, q:'Quina és la nota més greu del pentagrama en clau de sol (1a línia)?', op:['Mi','Fa','Sol','Re'], correcta:0, exp:'Mi-Sol-Si-Re-Fa: notes de línies en clau de sol.' },
  { id:8,  tema:'notes', dificultat:2, q:'Com s\'anomena la distància entre dos sons amb el mateix nom (Do-Do)?', op:['Octava','Quinta','Tercera','Unisson'], correcta:0, exp:'Octava perquè hi caben 8 notes incloent ambdues.' },
  { id:9,  tema:'notes', dificultat:2, q:'Quina nota es col·loca a la 3a línia del pentagrama en clau de sol?', op:['Si','La','Sol','Fa'], correcta:0, exp:'De baix a dalt: Mi, Sol, Si, Re, Fa. La 3a és Si.' },
  { id:10, tema:'notes', dificultat:2, q:'Quina lletra correspon a la nota Do en notació anglosaxona?', op:['C','D','F','A'], correcta:0, exp:'A=La, B=Si, C=Do, D=Re, E=Mi, F=Fa, G=Sol.' },
  { id:11, tema:'notes', dificultat:2, q:'Què hi ha entre dues notes de l\'escala separades per un to?', op:['Una alteració','Una clau','Un compàs','Una pausa'], correcta:0, exp:'Entre dos tons hi ha una nota alterada (semitons intermedis).' },
  { id:12, tema:'notes', dificultat:2, q:'Quina nota correspon a la lletra G?', op:['Sol','La','Fa','Re'], correcta:0, exp:'A=La, B=Si, C=Do, D=Re, E=Mi, F=Fa, G=Sol.' },
  { id:13, tema:'notes', dificultat:3, q:'Si pugem un to des de Do, quina nota obtenim?', op:['Re','Re bemoll','Do sostingut','Mi'], correcta:0, exp:'Un to són dos semitons: Do→Do♯→Re.' },
  { id:14, tema:'notes', dificultat:3, q:'Quantes notes hi ha en una octava amb totes les alteracions?', op:['12','7','8','10'], correcta:0, exp:'7 naturals + 5 alterades = 12 semitons.' },
  { id:15, tema:'notes', dificultat:3, q:'On es troba el Do central en clau de sol?', op:['1a línia addicional inferior','1a línia','2n espai','3a línia'], correcta:0, exp:'Just sota el pentagrama, una línia curta addicional.' },
  { id:16, tema:'notes', dificultat:3, q:'Quina és la nota més aguda situada a un espai del pentagrama en clau de sol?', op:['Mi','Re','Fa','Sol'], correcta:0, exp:'Espais de baix a dalt: Fa-La-Do-Mi. Mi és el més agut.' },
  { id:17, tema:'notes', dificultat:1, q:'Quina nota va just després del Si?', op:['Do','Re','La','Sol'], correcta:0, exp:'L\'escala torna a començar: Si → Do (una octava amunt).' },
  { id:18, tema:'notes', dificultat:1, q:'Quina nota és la 3a en l\'escala de Do major?', op:['Mi','Fa','Re','Sol'], correcta:0, exp:'Do-Re-Mi: la tercera nota és Mi.' },
  { id:19, tema:'notes', dificultat:2, q:'Quin signe es col·loca al principi del pentagrama per indicar les notes?', op:['Clau','Compàs','Alteració','Calderó'], correcta:0, exp:'La clau (de sol, de fa, de do) determina l\'alçada de les notes.' },
  { id:20, tema:'notes', dificultat:2, q:'Quina és la nota més aguda a una línia del pentagrama en clau de sol?', op:['Fa','Re','Si','Mi'], correcta:0, exp:'Línies: Mi-Sol-Si-Re-Fa. La més aguda és Fa.' },
  { id:21, tema:'notes', dificultat:3, q:'Quantes octaves té un piano de concert estàndard?', op:['7 octaves i poc','5 octaves','9 octaves','6 octaves'], correcta:0, exp:'88 tecles = aprox. 7,25 octaves.' },
  { id:22, tema:'notes', dificultat:3, q:'En quina clau es llegeix tradicionalment el violoncel?', op:['Clau de fa','Clau de sol','Clau de do','Clau d\'un'], correcta:0, exp:'El violoncel té el registre greu, usa clau de fa principalment.' },
  { id:23, tema:'notes', dificultat:1, q:'Quina és la 7a i última nota de l\'escala?', op:['Si','La','Sol','Re'], correcta:0, exp:'Do-Re-Mi-Fa-Sol-La-Si: la setena és Si.' },
  { id:24, tema:'notes', dificultat:2, q:'Si veig la nota La a la 2a línia, quina clau podria ser?', op:['Clau de fa','Clau de sol','Clau de do','Clau secreta'], correcta:0, exp:'A la clau de fa, la 2a línia (començant baix) és La.' },
  { id:25, tema:'notes', dificultat:2, q:'Quina és la nota a la primera línia addicional INFERIOR en clau de sol?', op:['Do','Si','Re','La'], correcta:0, exp:'Just sota el pentagrama: Do central (Do4).' },
  { id:26, tema:'notes', dificultat:3, q:'Quin nom té el sistema antic de cantar amb noms de notes?', op:['Solfeig','Tablatura','Pseudo-notació','Codi binari'], correcta:0, exp:'Solfeig = lectura cantada amb noms de notes.' },
  { id:27, tema:'notes', dificultat:3, q:'Quina lletra es fa servir per Si en notació anglesa?', op:['B','S','H','I'], correcta:0, exp:'A=La, B=Si en notació anglosaxona (a Alemanya és H).' },
  { id:28, tema:'notes', dificultat:1, q:'Quina nota va davant del Fa a l\'escala?', op:['Mi','Re','Sol','La'], correcta:0, exp:'Do-Re-Mi-Fa: davant del Fa hi ha Mi.' },
  { id:29, tema:'notes', dificultat:2, q:'Quantes notes naturals té una octava?', op:['7','12','5','8'], correcta:0, exp:'7 notes naturals + 5 alterades = 12 semitons.' },
  { id:30, tema:'notes', dificultat:3, q:'Quin nom té cada un dels 5 espais entre línies addicionals?', op:['Espai','Línia interlineal','Lletra','Forat'], correcta:0, exp:'A vegades anomenats interlineals; tècnicament són espais.' },

  // ═══════════════════════════════════════════════════════════════════════
  // ALTERACIONS (30 preguntes)
  // ═══════════════════════════════════════════════════════════════════════
  { id:31, tema:'alteracions', dificultat:1, q:'Què fa un sostingut (♯)?', op:['Puja un semitò','Baixa un semitò','Anul·la alteracions','Puja una octava'], correcta:0, exp:'El sostingut afegeix mig to a la nota.' },
  { id:32, tema:'alteracions', dificultat:1, q:'Què fa un bemoll (♭)?', op:['Baixa un semitò','Puja un semitò','Allarga la nota','Fa silenci'], correcta:0, exp:'El bemoll resta mig to a la nota.' },
  { id:33, tema:'alteracions', dificultat:1, q:'Què fa un becaire (♮)?', op:['Anul·la alteracions prèvies','Puja un to','Baixa un to','Repeteix la nota'], correcta:0, exp:'El becaire restaura la nota natural.' },
  { id:34, tema:'alteracions', dificultat:1, q:'Quants semitons té un to sencer?', op:['2','1','3','4'], correcta:0, exp:'Un to = dos semitons.' },
  { id:35, tema:'alteracions', dificultat:1, q:'Quin símbol baixa la nota mig to?', op:['♭','♯','♮','§'], correcta:0, exp:'♭ = bemoll = baixa un semitò.' },
  { id:36, tema:'alteracions', dificultat:1, q:'Quin símbol puja la nota mig to?', op:['♯','♭','♮','§'], correcta:0, exp:'♯ = sostingut = puja un semitò.' },
  { id:37, tema:'alteracions', dificultat:2, q:'Quants semitons hi ha entre Mi i Fa?', op:['1','2','0','3'], correcta:0, exp:'Mi-Fa i Si-Do són les úniques distàncies de semitò natural.' },
  { id:38, tema:'alteracions', dificultat:2, q:'Quants semitons hi ha entre Si i Do?', op:['1','2','0','3'], correcta:0, exp:'Si-Do és semitò natural, com Mi-Fa.' },
  { id:39, tema:'alteracions', dificultat:2, q:'On es col·loca l\'alteració respecte la nota?', op:['Davant','Després','Sobre','Sota'], correcta:0, exp:'Sempre davant de la nota que afecta.' },
  { id:40, tema:'alteracions', dificultat:2, q:'Si Mi pugem un semitò, què tenim?', op:['Fa','Mi sostingut','Re','Fa sostingut'], correcta:0, exp:'Mi-Fa ja són un semitò; pujar Mi un semitò = Fa.' },
  { id:41, tema:'alteracions', dificultat:2, q:'Quantes alteracions diferents hi ha?', op:['3 (sostingut, bemoll, becaire)','2 (sostingut, bemoll)','5','1'], correcta:0, exp:'Tres principals: ♯ sostingut, ♭ bemoll i ♮ becaire.' },
  { id:42, tema:'alteracions', dificultat:2, q:'Si baixem un semitò des de Si, quina nota tenim?', op:['Si bemoll','Si sostingut','La','Do'], correcta:0, exp:'Baixar un semitò = afegir ♭. Si → Si♭.' },
  { id:43, tema:'alteracions', dificultat:3, q:'Quina nota és enharmònica de Do sostingut?', op:['Re bemoll','Mi bemoll','Si','Do bemoll'], correcta:0, exp:'Enharmònic = mateix so, nom diferent. Do♯ = Re♭.' },
  { id:44, tema:'alteracions', dificultat:3, q:'Què és el doble sostingut (𝄪)?', op:['Puja dos semitons','Baixa dos','Repeteix','Anul·la'], correcta:0, exp:'Equival a un to sencer cap amunt.' },
  { id:45, tema:'alteracions', dificultat:3, q:'Si Fa té sostingut a l\'armadura, a quins Fa s\'aplica?', op:['A tots els Fa de l\'obra','Només al primer','Només al següent compàs','Mai'], correcta:0, exp:'L\'armadura afecta tota l\'obra fins canviar-la.' },
  { id:46, tema:'alteracions', dificultat:3, q:'Una alteració accidental dins un compàs val...', op:['Només dins d\'aquell compàs','Tota l\'obra','Només a la nota següent','Eternament'], correcta:0, exp:'Les accidentals només duren el compàs on apareixen.' },
  { id:47, tema:'alteracions', dificultat:1, q:'Quina és la diferència en altura entre Do natural i Do sostingut?', op:['Un semitò','Un to','Una octava','Cap'], correcta:0, exp:'Sostingut = +1 semitò. Així Do→Do♯ són un semitò.' },
  { id:48, tema:'alteracions', dificultat:2, q:'Quina nota és enharmònica de Mi sostingut?', op:['Fa','Re','Mi bemoll','Sol'], correcta:0, exp:'Mi-Fa són un semitò; Mi♯ = Fa.' },
  { id:49, tema:'alteracions', dificultat:2, q:'Quina nota és enharmònica de Fa bemoll?', op:['Mi','Sol','Re','Mi bemoll'], correcta:0, exp:'Mi-Fa són un semitò; Fa♭ = Mi.' },
  { id:50, tema:'alteracions', dificultat:3, q:'Què s\'anomena l\'enarmonia?', op:['Mateix so, nom diferent','So diferent, mateix nom','Cap relació','Una pausa'], correcta:0, exp:'Enarmonia: 2 notes amb el mateix so però noms diferents.' },
  { id:51, tema:'alteracions', dificultat:2, q:'Què és l\'armadura?', op:['Conjunt d\'alteracions al principi','Marca de tempo','Final d\'obra','Repetició'], correcta:0, exp:'L\'armadura defineix les alteracions fixes de la tonalitat.' },
  { id:52, tema:'alteracions', dificultat:3, q:'Quantes alteracions té la tonalitat de Sol major?', op:['1 sostingut (Fa#)','2 sostinguts','1 bemoll','Cap'], correcta:0, exp:'Sol major té només Fa♯ a l\'armadura.' },
  { id:53, tema:'alteracions', dificultat:3, q:'Quina és l\'única tonalitat major sense alteracions?', op:['Do major','Sol major','Re major','La major'], correcta:0, exp:'Do major té totes les notes naturals.' },
  { id:54, tema:'alteracions', dificultat:1, q:'Què passa amb la durada d\'una nota amb alteració?', op:['Res, només canvia l\'alçada','Es duplica','Es divideix','Es para'], correcta:0, exp:'L\'alteració només modifica l\'alçada (puja o baixa), no la durada.' },
  { id:55, tema:'alteracions', dificultat:2, q:'Si una nota té un becaire i abans tenia sostingut, com sona?', op:['Natural','Sostinguda encara','Doble sostinguda','Bemoll'], correcta:0, exp:'El becaire cancel·la qualsevol alteració prèvia.' },
  { id:56, tema:'alteracions', dificultat:3, q:'Quantes alteracions té la tonalitat de Fa major?', op:['1 bemoll (Si♭)','2 bemolls','1 sostingut','Cap'], correcta:0, exp:'Fa major té només Si♭ a l\'armadura.' },
  { id:57, tema:'alteracions', dificultat:1, q:'On hi ha els semitons naturals en l\'escala?', op:['Mi-Fa i Si-Do','Do-Re i Mi-Fa','Sempre','Mai'], correcta:0, exp:'Mi-Fa i Si-Do són les úniques distàncies de semitò natural.' },
  { id:58, tema:'alteracions', dificultat:2, q:'Quantes alteracions hi ha en l\'escala cromàtica completa?', op:['5','7','12','3'], correcta:0, exp:'5 notes alterades + 7 naturals = 12 notes cromàtiques.' },
  { id:59, tema:'alteracions', dificultat:3, q:'Què és un doble bemoll (𝄫)?', op:['Baixa dos semitons','Puja dos','Repeteix','Cancel·la'], correcta:0, exp:'Equival a un to sencer cap avall.' },
  { id:60, tema:'alteracions', dificultat:1, q:'Quin nom té el símbol que cancel·la alteracions?', op:['Becaire','Bemoll','Sostingut','Calderó'], correcta:0, exp:'♮ = becaire, restaura la nota natural.' },

  // ═══════════════════════════════════════════════════════════════════════
  // COMPASSOS (30 preguntes)
  // ═══════════════════════════════════════════════════════════════════════
  { id:61, tema:'compassos', dificultat:1, q:'Què indica el número de DALT del compàs (ex: 4/4)?', op:['Quants temps té el compàs','Quina figura val un temps','La velocitat','El to'], correcta:0, exp:'Numerador = nombre de temps per compàs.' },
  { id:62, tema:'compassos', dificultat:1, q:'Què indica el número de BAIX del compàs (ex: 4/4)?', op:['Quina figura val un temps','Quants temps té','La velocitat','El to'], correcta:0, exp:'Denominador = figura que ocupa un temps.' },
  { id:63, tema:'compassos', dificultat:1, q:'En un compàs de 3/4, quantes negres hi caben?', op:['3','4','2','6'], correcta:0, exp:'Tres temps de negra.' },
  { id:64, tema:'compassos', dificultat:1, q:'Quin és el compàs més comú en pop i rock?', op:['4/4','3/4','6/8','2/2'], correcta:0, exp:'4/4 és tan comú que s\'anomena "compàs comú".' },
  { id:65, tema:'compassos', dificultat:1, q:'Quants temps té un compàs de 2/4?', op:['2','4','3','6'], correcta:0, exp:'El numerador 2 = 2 temps.' },
  { id:66, tema:'compassos', dificultat:1, q:'En un compàs de 4/4, quantes blanques hi caben?', op:['2','4','1','3'], correcta:0, exp:'4 temps de negra ÷ 2 (cada blanca val 2) = 2 blanques.' },
  { id:67, tema:'compassos', dificultat:2, q:'Què representa el "4" sota d\'un compàs de 4/4?', op:['Una negra','Una blanca','Una corxera','Una redona'], correcta:0, exp:'La negra és la quarta part d\'una redona.' },
  { id:68, tema:'compassos', dificultat:2, q:'Què representa el "8" sota d\'un compàs de 6/8?', op:['Una corxera','Una negra','Una semicorxera','Una blanca'], correcta:0, exp:'La corxera és la vuitena part d\'una redona.' },
  { id:69, tema:'compassos', dificultat:2, q:'Quin compàs típicament defineix un vals?', op:['3/4','4/4','6/8','2/4'], correcta:0, exp:'El vals té tres temps marcats.' },
  { id:70, tema:'compassos', dificultat:2, q:'Què és una barra de compàs?', op:['Línia vertical que separa compassos','Una nota greu','Un símbol d\'atac','Una repetició'], correcta:0, exp:'Talla el pentagrama per delimitar compassos.' },
  { id:71, tema:'compassos', dificultat:2, q:'Quants compassos pot tenir una obra?', op:['Sense límit','Sempre 16','Sempre 32','Cap'], correcta:0, exp:'No hi ha límit. Una simfonia pot tenir-ne milers.' },
  { id:72, tema:'compassos', dificultat:2, q:'Quants temps té un compàs de 2/2 (alla breve)?', op:['2 (de blanca)','4','3','6'], correcta:0, exp:'2/2: 2 temps, cada un val una blanca.' },
  { id:73, tema:'compassos', dificultat:3, q:'Quin tipus de compàs és el 6/8?', op:['Compost binari','Simple binari','Compost ternari','Simple ternari'], correcta:0, exp:'6/8 = 2 grups de 3 corxeres = compost binari.' },
  { id:74, tema:'compassos', dificultat:3, q:'En un compàs compost, cada temps es divideix en...', op:['3','2','4','5'], correcta:0, exp:'Subdivisió ternària: cada temps val 3 subunitats.' },
  { id:75, tema:'compassos', dificultat:3, q:'Què indica una doble barra final ║?', op:['Fi de l\'obra','Inici','Repetició','Silenci llarg'], correcta:0, exp:'Doble barra gruixuda = final de la peça.' },
  { id:76, tema:'compassos', dificultat:3, q:'Què és l\'anacrusi?', op:['Notes abans del primer compàs complet','El compàs final','Una pausa llarga','Un canvi de tonalitat'], correcta:0, exp:'Notes d\'introducció abans del primer temps fort.' },
  { id:77, tema:'compassos', dificultat:1, q:'Quants temps té un compàs de 5/4?', op:['5','4','3','2'], correcta:0, exp:'Numerador 5 = 5 temps de negra.' },
  { id:78, tema:'compassos', dificultat:2, q:'Què és un compàs simple?', op:['Cada temps es divideix en 2','Cada temps es divideix en 3','Té un sol temps','És lent'], correcta:0, exp:'Compàs simple = subdivisió binària (en 2).' },
  { id:79, tema:'compassos', dificultat:2, q:'Quants temps té un compàs de 9/8?', op:['3 (compost ternari)','9','6','4'], correcta:0, exp:'9/8 = 3 grups de 3 corxeres = compost ternari.' },
  { id:80, tema:'compassos', dificultat:3, q:'Què és un compàs irregular?', op:['Compàs de 5, 7, 11 temps','Compàs sense temps','Compàs molt llarg','Cap'], correcta:0, exp:'Compassos irregulars: 5/4, 7/8, 11/8 (no es divideixen en parts iguals).' },
  { id:81, tema:'compassos', dificultat:1, q:'Quin compàs típicament té una marxa militar?', op:['2/4','3/4','6/8','7/8'], correcta:0, exp:'2/4 és típic per a marxes per ser binari i ferm.' },
  { id:82, tema:'compassos', dificultat:2, q:'Què és el "compàs comú"?', op:['4/4 amb símbol C','3/4','6/8','5/4'], correcta:0, exp:'El compàs 4/4 té un símbol especial: la "C".' },
  { id:83, tema:'compassos', dificultat:3, q:'Què significa el símbol "C tallada" (ȼ)?', op:['Compàs 2/2','3/4','5/4','4/4 ràpid'], correcta:0, exp:'ȼ = alla breve = 2/2. Tempo més ràpid.' },
  { id:84, tema:'compassos', dificultat:1, q:'Quantes corxeres hi caben en un compàs de 4/4?', op:['8','4','2','16'], correcta:0, exp:'4 temps × 2 corxeres per temps = 8 corxeres.' },
  { id:85, tema:'compassos', dificultat:2, q:'En un compàs de 3/4, quantes corxeres hi caben?', op:['6','3','9','12'], correcta:0, exp:'3 temps × 2 corxeres = 6 corxeres.' },
  { id:86, tema:'compassos', dificultat:3, q:'Què és un canvi de compàs?', op:['Indica un nou compàs durant l\'obra','Velocitat','Tonalitat','Final'], correcta:0, exp:'Un canvi de compàs s\'indica amb una nova xifra (ex: 4/4 → 6/8).' },
  { id:87, tema:'compassos', dificultat:1, q:'Quants temps de negra hi ha en un compàs de 4/4?', op:['4','2','3','6'], correcta:0, exp:'Numerador 4, denominador 4 (negra): 4 temps de negra.' },
  { id:88, tema:'compassos', dificultat:2, q:'Què indica el ritme característic 1-2-3 1-2-3?', op:['Vals (compàs ternari)','Marxa','Tango','Rap'], correcta:0, exp:'Comptar 1-2-3 implica compàs ternari (3/4).' },
  { id:89, tema:'compassos', dificultat:2, q:'Què és l\'accent fort dins d\'un compàs?', op:['El primer temps','L\'últim temps','Tots iguals','Cap'], correcta:0, exp:'El primer temps de cada compàs sol ser l\'accent fort.' },
  { id:90, tema:'compassos', dificultat:3, q:'En un compàs de 6/8, quants accents forts hi ha tradicionalment?', op:['2','6','3','4'], correcta:0, exp:'6/8 = 2 grups → accent al 1r i al 4t temps.' },

  // ═══════════════════════════════════════════════════════════════════════
  // FIGURES RÍTMIQUES (30 preguntes)
  // ═══════════════════════════════════════════════════════════════════════
  { id:91,  tema:'figures', dificultat:1, q:'Quants temps val una negra en 4/4?', op:['1','2','0.5','4'], correcta:0, exp:'La negra és la unitat de temps en 4/4.' },
  { id:92,  tema:'figures', dificultat:1, q:'Quants temps val una blanca en 4/4?', op:['2','1','4','3'], correcta:0, exp:'La blanca = 2 negres.' },
  { id:93,  tema:'figures', dificultat:1, q:'Quants temps val una redona en 4/4?', op:['4','2','8','1'], correcta:0, exp:'La redona omple tot el compàs de 4/4.' },
  { id:94,  tema:'figures', dificultat:1, q:'Quants temps val una corxera en 4/4?', op:['0.5','1','2','0.25'], correcta:0, exp:'Mitja negra. Dues corxeres = una negra.' },
  { id:95,  tema:'figures', dificultat:1, q:'Quina figura té el cap negre i pal sense banderoles?', op:['Negra','Blanca','Redona','Corxera'], correcta:0, exp:'Cap negre + pal = negra (1 temps).' },
  { id:96,  tema:'figures', dificultat:1, q:'Quina figura té el cap blanc i pal?', op:['Blanca','Negra','Redona','Corxera'], correcta:0, exp:'Cap blanc + pal sense banderola = blanca (2 temps).' },
  { id:97,  tema:'figures', dificultat:2, q:'Quants temps val una blanca amb puntet en 4/4?', op:['3','2.5','2','4'], correcta:0, exp:'El puntet afegeix la meitat: 2 + 1 = 3.' },
  { id:98,  tema:'figures', dificultat:2, q:'Quants temps val una semicorxera en 4/4?', op:['0.25','0.5','0.1','1'], correcta:0, exp:'Quart de negra. Quatre semicorxeres = una negra.' },
  { id:99,  tema:'figures', dificultat:2, q:'Quina figura val la meitat d\'una negra?', op:['Corxera','Blanca','Redona','Semicorxera'], correcta:0, exp:'Negra ÷ 2 = corxera.' },
  { id:100, tema:'figures', dificultat:2, q:'Quantes corxeres hi caben en una negra?', op:['2','4','1','8'], correcta:0, exp:'Dues corxeres formen una negra.' },
  { id:101, tema:'figures', dificultat:2, q:'Quantes semicorxeres hi caben en una negra?', op:['4','2','8','1'], correcta:0, exp:'4 semicorxeres = 2 corxeres = 1 negra.' },
  { id:102, tema:'figures', dificultat:2, q:'Quantes corxeres hi ha en una blanca?', op:['4','2','8','1'], correcta:0, exp:'Blanca = 2 negres = 4 corxeres.' },
  { id:103, tema:'figures', dificultat:3, q:'Què afegeix un puntet a una figura?', op:['La meitat del seu valor','El doble','La quarta part','Res'], correcta:0, exp:'Puntet = +50% del valor original.' },
  { id:104, tema:'figures', dificultat:3, q:'Quant val una negra amb puntet?', op:['1.5 temps','2 temps','3 temps','0.75 temps'], correcta:0, exp:'1 + 0.5 = 1.5 temps.' },
  { id:105, tema:'figures', dificultat:3, q:'Què fa una lligadura entre dues notes iguals?', op:['Suma els seus valors','Les separa','Les puja un to','Les baixa'], correcta:0, exp:'La segona nota no es toca; allarga la primera.' },
  { id:106, tema:'figures', dificultat:3, q:'Què és un tresillo?', op:['3 notes al temps de 2','3 notes molt llargues','Un acord de 3 notes','Una pausa triple'], correcta:0, exp:'Grup excepcional: 3 notes ocupen el temps de 2.' },
  { id:107, tema:'figures', dificultat:1, q:'Quina figura té dues banderoles?', op:['Semicorxera','Corxera','Negra','Fusa'], correcta:0, exp:'Semicorxera: cap negre + pal + 2 banderoles.' },
  { id:108, tema:'figures', dificultat:1, q:'Quina figura té una banderola?', op:['Corxera','Semicorxera','Negra','Blanca'], correcta:0, exp:'Corxera: cap negre + pal + 1 banderola.' },
  { id:109, tema:'figures', dificultat:2, q:'Quina figura no té pal?', op:['Redona','Blanca','Negra','Corxera'], correcta:0, exp:'La redona és un cap blanc sense pal.' },
  { id:110, tema:'figures', dificultat:2, q:'Quants temps val una redona amb puntet?', op:['6','5','4','8'], correcta:0, exp:'4 + 2 = 6 temps.' },
  { id:111, tema:'figures', dificultat:3, q:'Quantes corxeres formen una redona?', op:['8','4','16','2'], correcta:0, exp:'Redona = 2 blanques = 4 negres = 8 corxeres.' },
  { id:112, tema:'figures', dificultat:3, q:'Què és una fusa?', op:['Figura amb 3 banderoles (1/8 de negra)','Una nota molt llarga','Una pausa','Un acord'], correcta:0, exp:'Fusa = cap negre + pal + 3 banderoles = 1/8 de negra.' },
  { id:113, tema:'figures', dificultat:1, q:'Quin silenci equival a una negra?', op:['Silenci de negra (𝄽)','Silenci de blanca','Silenci de redona','Silenci de corxera'], correcta:0, exp:'Cada figura té el seu silenci equivalent.' },
  { id:114, tema:'figures', dificultat:2, q:'Quants temps val un silenci de redona?', op:['4','2','1','8'], correcta:0, exp:'Equivalent a una redona: 4 temps en 4/4.' },
  { id:115, tema:'figures', dificultat:2, q:'Quants temps val un silenci de blanca?', op:['2','4','1','0.5'], correcta:0, exp:'Equivalent a una blanca: 2 temps.' },
  { id:116, tema:'figures', dificultat:3, q:'Què és una "lligadura d\'expressió" (slur)?', op:['Unió de notes diferents (legato)','Suma de durades','Repetició','Acord'], correcta:0, exp:'Lligadura d\'expressió = tocar legato (lligat). No suma durades.' },
  { id:117, tema:'figures', dificultat:1, q:'Quants temps val una negra dins un compàs de 3/4?', op:['1','3','2','0.5'], correcta:0, exp:'La negra sempre val 1 temps quan és la unitat (denominador 4).' },
  { id:118, tema:'figures', dificultat:2, q:'En un compàs de 6/8, quants temps val una corxera?', op:['1','2','0.5','3'], correcta:0, exp:'En 6/8 la corxera és la unitat de temps.' },
  { id:119, tema:'figures', dificultat:3, q:'Què és un calderó (𝄐)?', op:['Allarga la durada al gust','Repeteix la nota','Silenci','Tonalitat'], correcta:0, exp:'El calderó indica que es pot allargar la nota indefinidament.' },
  { id:120, tema:'figures', dificultat:3, q:'Què és un "ritardando" (rit.)?', op:['Reduir la velocitat gradualment','Accelerar','Repetir','Aturar'], correcta:0, exp:'Rit. = anar més lent progressivament.' },

  // ═══════════════════════════════════════════════════════════════════════
  // INSTRUMENTS MUSICALS (30 preguntes)
  // ═══════════════════════════════════════════════════════════════════════
  { id:121, tema:'instruments', dificultat:1, q:'A quina família pertany el violí?', op:['Corda fregada','Vent-fusta','Percussió','Corda pinçada'], correcta:0, exp:'L\'arc frega les cordes per produir el so.' },
  { id:122, tema:'instruments', dificultat:1, q:'Quin instrument és de vent-metall?', op:['Trompeta','Clarinet','Violí','Piano'], correcta:0, exp:'Vent-metall: el tub és metàl·lic, el llavi vibra a l\'embocadura.' },
  { id:123, tema:'instruments', dificultat:1, q:'A quina família pertany el piano?', op:['Corda percudida','Vent-fusta','Percussió pura','Corda pinçada'], correcta:0, exp:'Els martellets percudeixen les cordes.' },
  { id:124, tema:'instruments', dificultat:1, q:'Quantes cordes té un violí?', op:['4','6','3','5'], correcta:0, exp:'Sol, Re, La, Mi: 4 cordes afinades per quintes.' },
  { id:125, tema:'instruments', dificultat:1, q:'A quina família pertany la flauta?', op:['Vent-fusta','Vent-metall','Corda','Percussió'], correcta:0, exp:'Tradicionalment vent-fusta, encara que sigui de metall.' },
  { id:126, tema:'instruments', dificultat:1, q:'Quin instrument es toca amb arc?', op:['Violí','Piano','Trompeta','Guitarra'], correcta:0, exp:'Els cordòfons frotats es toquen amb arc.' },
  { id:127, tema:'instruments', dificultat:2, q:'Quin instrument NO és de corda?', op:['Trompeta','Violí','Guitarra','Arpa'], correcta:0, exp:'La trompeta és vent-metall.' },
  { id:128, tema:'instruments', dificultat:2, q:'Quin és l\'instrument més greu de la corda fregada?', op:['Contrabaix','Violoncel','Viola','Violí'], correcta:0, exp:'Contrabaix > Violoncel > Viola > Violí.' },
  { id:129, tema:'instruments', dificultat:2, q:'Quina família té la guitarra?', op:['Corda pinçada','Corda fregada','Corda percudida','Vent'], correcta:0, exp:'Es polsa amb els dits o pua.' },
  { id:130, tema:'instruments', dificultat:2, q:'Quin instrument de percussió té altura determinada?', op:['Timbal','Bombo','Plat','Pandereta'], correcta:0, exp:'El timbal s\'afina; els altres no donen notes concretes.' },
  { id:131, tema:'instruments', dificultat:2, q:'Quin instrument acompanya tradicionalment l\'òpera?', op:['Orquestra simfònica','Bateria','Sintetitzador','Acordió'], correcta:0, exp:'L\'orquestra simfònica acompanya l\'òpera.' },
  { id:132, tema:'instruments', dificultat:2, q:'Quants instruments té un quartet de corda?', op:['4 (2 violins + viola + violoncel)','3','5','6'], correcta:0, exp:'Formació clàssica: 2 violins, viola i violoncel.' },
  { id:133, tema:'instruments', dificultat:3, q:'Quin instrument fa servir una canya doble?', op:['Oboè','Clarinet','Flauta','Saxòfon'], correcta:0, exp:'Oboè i fagot: doble canya. Clarinet i saxòfon: canya simple.' },
  { id:134, tema:'instruments', dificultat:3, q:'Quants pedals té un piano de cua tradicional?', op:['3','2','4','1'], correcta:0, exp:'3 pedals: sord, sostenuto i forte (varia segons escola).' },
  { id:135, tema:'instruments', dificultat:3, q:'Quines famílies formen l\'orquestra simfònica clàssica?', op:['Corda, vent-fusta, vent-metall i percussió','Només corda','Només vent','Només percussió'], correcta:0, exp:'Les quatre famílies orquestrals canòniques.' },
  { id:136, tema:'instruments', dificultat:3, q:'A quina família pertany el saxòfon?', op:['Vent-fusta','Vent-metall','Corda','Percussió'], correcta:0, exp:'Tot i ser de metall, té canya: pertany a vent-fusta.' },
  { id:137, tema:'instruments', dificultat:1, q:'Quin instrument NO és de vent?', op:['Bateria','Trompeta','Flauta','Saxòfon'], correcta:0, exp:'La bateria és percussió.' },
  { id:138, tema:'instruments', dificultat:1, q:'A quina família pertany el tambor?', op:['Percussió (membranòfon)','Corda','Vent','Electròfon'], correcta:0, exp:'Una membrana tensada genera el so → membranòfon.' },
  { id:139, tema:'instruments', dificultat:2, q:'Quin instrument de teclat va abans del piano?', op:['Clavicèmbal','Sintetitzador','Òrgan elèctric','Acordió'], correcta:0, exp:'El clavicèmbal (s. XV-XVIII) precedeix el piano.' },
  { id:140, tema:'instruments', dificultat:2, q:'Quin instrument és típic de la música andina?', op:['Quena (flauta)','Trompeta','Piano','Acordió'], correcta:0, exp:'La quena és una flauta tradicional dels Andes.' },
  { id:141, tema:'instruments', dificultat:3, q:'Quin instrument és el més agut de l\'orquestra?', op:['Flautí (piccolo)','Flauta','Violí','Trompeta'], correcta:0, exp:'El flautí (piccolo) és la flauta més petita i aguda.' },
  { id:142, tema:'instruments', dificultat:3, q:'Quin instrument és el més greu de l\'orquestra?', op:['Tuba o contrabaix','Trompeta','Violoncel','Viola'], correcta:0, exp:'La tuba i el contrabaix tenen el registre més greu.' },
  { id:143, tema:'instruments', dificultat:1, q:'Quin instrument simbolitza l\'electrònica musical?', op:['Sintetitzador','Piano','Violí','Trompeta'], correcta:0, exp:'El sintetitzador és la base de la música electrònica.' },
  { id:144, tema:'instruments', dificultat:2, q:'A quina família pertany el xilòfon?', op:['Idiòfon','Membranòfon','Cordòfon','Aeròfon'], correcta:0, exp:'El propi cos de les plaques vibra → idiòfon.' },
  { id:145, tema:'instruments', dificultat:2, q:'Quina família té el theremin?', op:['Electròfon','Idiòfon','Membranòfon','Cordòfon'], correcta:0, exp:'El theremin genera el so per camps elèctrics: electròfon.' },
  { id:146, tema:'instruments', dificultat:3, q:'Quina és la diferència entre clarinet i oboè?', op:['Clarinet: canya simple. Oboè: canya doble','Mateixos','Materials','Mida'], correcta:0, exp:'La canya defineix la diferència principal.' },
  { id:147, tema:'instruments', dificultat:3, q:'Quants tipus de famílies hi ha segons Hornbostel-Sachs?', op:['5 (corda, vent, percussió mem., perc. idio., electr.)','3','4','7'], correcta:0, exp:'5 famílies: cordòfon, aeròfon, membranòfon, idiòfon, electròfon.' },
  { id:148, tema:'instruments', dificultat:1, q:'Quin instrument NO és de la família del violí?', op:['Guitarra','Viola','Violoncel','Contrabaix'], correcta:0, exp:'La guitarra és corda pinçada, no fregada.' },
  { id:149, tema:'instruments', dificultat:2, q:'Quina família té l\'arpa?', op:['Corda pinçada','Corda fregada','Vent','Percussió'], correcta:0, exp:'Els dits polsen les cordes → corda pinçada.' },
  { id:150, tema:'instruments', dificultat:3, q:'Quin instrument és típic de l\'orquestra de cambra barroca?', op:['Clavicèmbal','Sintetitzador','Bateria','Saxòfon'], correcta:0, exp:'El clavicèmbal és el rei dels teclats barrocs.' },

  // ─── 6 PREGUNTES EXTRA DE DIFICULTAT 3 (equilibrar distribució) ───────
  { id:151, tema:'notes', dificultat:3, q:'Quina és l\'extensió aproximada del so audible humà?', op:['20 Hz – 20.000 Hz','100 Hz – 5.000 Hz','40 Hz – 12.000 Hz','1 Hz – 50.000 Hz'], correcta:0, exp:'L\'oïda humana sana percep aproximadament de 20 Hz a 20 kHz.' },
  { id:152, tema:'alteracions', dificultat:3, q:'Quina nota és enharmònica de Sol sostingut?', op:['La bemoll','Si bemoll','Fa sostingut','Sol natural'], correcta:0, exp:'Sol♯ i La♭ sonen igual: són notes enharmòniques.' },
  { id:153, tema:'alteracions', dificultat:3, q:'Quina és la única alteració de l\'armadura de Re major?', op:['Fa# i Do#','Si♭ i Mi♭','Sol# i Re#','Cap'], correcta:0, exp:'Re major té 2 sostinguts: Fa♯ i Do♯.' },
  { id:154, tema:'compassos', dificultat:3, q:'Quants temps reals té un compàs de 12/8?', op:['4 (compost ternari)','12 corxeres soltes','6','3'], correcta:0, exp:'12/8 = 4 grups de 3 corxeres = compost ternari, 4 temps marcats.' },
  { id:155, tema:'figures', dificultat:3, q:'Quants silencis de corxera caben en un silenci de redona?', op:['8','4','2','16'], correcta:0, exp:'Redona = 4 negres = 8 corxeres = 8 silencis de corxera.' },
  { id:156, tema:'instruments', dificultat:3, q:'Quina família té la viola da gamba?', op:['Corda fregada (antiga)','Corda pinçada','Vent-fusta','Idiòfon'], correcta:0, exp:'La viola da gamba és un cordòfon frotat barroc, antecessor del violoncel.' }
]);

// Helpers d'accés
export function preguntesPerTema(tema) {
  return QUESTIONS.filter(p => p.tema === tema);
}
export function preguntesPerDificultat(d) {
  return QUESTIONS.filter(p => p.dificultat === d);
}
export const TEMES = ['notes','alteracions','compassos','figures','instruments'];
export const NOMS_TEMES = {
  notes: 'Notes musicals',
  alteracions: 'Alteracions',
  compassos: 'Compassos',
  figures: 'Figures rítmiques',
  instruments: 'Instruments musicals'
};
