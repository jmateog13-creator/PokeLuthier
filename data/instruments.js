// ============================================================================
// PokéLuthier · data/instruments.js
// Banc canònic de 50 instruments (Tema_06 del lab) amb stats balancejades
// per família Hornbostel-Sachs. Cada un té 4 atacs amb dany creixent
// (Lv1, Lv3, Lv5, Lv7).
// ============================================================================

export const INSTRUMENTS = Object.freeze({

  // ─── CORDÒFONS FROTATS (arc) ─────────────────────────────────────────────
  violi: {
    id:'violi', nom:'Violí', emoji:'🎻', familia:'Corda fregada', subfamilia:'frotats',
    hpMax:80,
    atacs:['Arc Lleuger','Pizzicato Sobtat','Sonata Devastadora','Bravura Imperial'],
    danys:[22,32,48,62]
  },
  viola: {
    id:'viola', nom:'Viola', emoji:'🎻', familia:'Corda fregada', subfamilia:'frotats',
    hpMax:85,
    atacs:['Arc Greuvol','Melodia Profunda','Aria Vital','Sostingut Tel·lúric'],
    danys:[24,34,46,60]
  },
  violoncel: {
    id:'violoncel', nom:'Violoncel', emoji:'🎻', familia:'Corda fregada', subfamilia:'frotats',
    hpMax:95,
    atacs:['Arc Profund','Vibrato Càlid','Bach Etern','Suite Suprema'],
    danys:[26,36,50,64]
  },
  contrabaix: {
    id:'contrabaix', nom:'Contrabaix', emoji:'🎻', familia:'Corda fregada', subfamilia:'frotats',
    hpMax:110,
    atacs:['Cop d\'Arc','Plonc Greu','Pizzicato Tro','Onada Cavernosa'],
    danys:[28,38,52,66]
  },
  viola_da_gamba: {
    id:'viola_da_gamba', nom:'Viola da Gamba', emoji:'🎻', familia:'Corda fregada', subfamilia:'frotats',
    hpMax:85,
    atacs:['Tremolant Barroc','Diví Vibrat','Suite Antiga','Ressò Ancestral'],
    danys:[23,33,45,58]
  },

  // ─── CORDÒFONS PINÇATS ───────────────────────────────────────────────────
  guitarra: {
    id:'guitarra', nom:'Guitarra', emoji:'🎸', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:95,
    atacs:['Rasgueig Roent','Arpegi Daurat','Solo Elèctric','Riff Tel·lúric'],
    danys:[22,33,47,60]
  },
  guitarra_electrica: {
    id:'guitarra_electrica', nom:'Guitarra Elèctrica', emoji:'🎸', familia:'Electròfon', subfamilia:'amplificats',
    hpMax:100,
    atacs:['Power Chord','Distorsió Furiosa','Solo Sobrenatural','Riff Apocalíptic'],
    danys:[28,38,54,70]
  },
  arpa: {
    id:'arpa', nom:'Arpa', emoji:'🎵', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:80,
    atacs:['Glissando Celestial','Arpegi Angèlic','Cascada Daurada','Eteri Diví'],
    danys:[25,35,48,62]
  },
  llaut: {
    id:'llaut', nom:'Llaüt', emoji:'🎸', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:75,
    atacs:['Plec Renaixent','Vibrant Mediterrani','Pavana Subtil','Fantasia Antiga'],
    danys:[20,30,44,56]
  },
  ukelele: {
    id:'ukelele', nom:'Ukelele', emoji:'🎸', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:70,
    atacs:['Strum Tropical','Riu Hawaià','Onatge Solar','Aloha Devastador'],
    danys:[18,28,40,52]
  },
  bandurria: {
    id:'bandurria', nom:'Bandúrria', emoji:'🎸', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:75,
    atacs:['Picat Veloç','Trémol Ibèric','Jota Salvatge','Festa Castellana'],
    danys:[22,32,45,58]
  },
  banjo: {
    id:'banjo', nom:'Banjo', emoji:'🪕', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:80,
    atacs:['Punteig Country','Bluegrass Frenètic','Cançó del Pioner','Solo Salvatge'],
    danys:[20,30,44,58]
  },

  // ─── CORDÒFONS PERCUDITS ────────────────────────────────────────────────
  piano: {
    id:'piano', nom:'Piano', emoji:'🎹', familia:'Corda percudida', subfamilia:'percudits',
    hpMax:110,
    atacs:['Picat Cristal·lí','Acord Massiu','Sonata Apocalíptica','Fantasia Imperial'],
    danys:[25,38,55,70]
  },
  clavicembal: {
    id:'clavicembal', nom:'Clavicèmbal', emoji:'🎹', familia:'Corda pinçada', subfamilia:'percudits',
    hpMax:90,
    atacs:['Plec Barroc','Cromatisme Vetust','Toccata Polsosa','Goldberg Espectral'],
    danys:[22,34,48,62]
  },
  cimbalom: {
    id:'cimbalom', nom:'Cimbalom', emoji:'🎹', familia:'Corda percudida', subfamilia:'percudits',
    hpMax:100,
    atacs:['Trémol Magyar','Glissó Hongarès','Czardas Foll','Dansa Tzigana'],
    danys:[24,36,50,64]
  },

  // ─── AERÒFONS — VENT-FUSTA ─────────────────────────────────────────────
  flauta: {
    id:'flauta', nom:'Flauta Dolça', emoji:'🪈', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:100,
    atacs:['Bufada Suau','Aire Polifònic','Crit d\'Argent','Vol del Vent'],
    danys:[18,28,42,55]
  },
  flauta_travessera: {
    id:'flauta_travessera', nom:'Flauta Travessera', emoji:'🪈', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:95,
    atacs:['Bufada Lateral','Vibratto Argent','Trinat Diví','Aire Suprem'],
    danys:[20,30,44,57]
  },
  clarinet: {
    id:'clarinet', nom:'Clarinet', emoji:'🪈', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:75,
    atacs:['Canya Vibrant','Llampec Cromàtic','Klezmer Vital','Concert Imperial'],
    danys:[20,32,45,58]
  },
  oboe: {
    id:'oboe', nom:'Oboè', emoji:'🪈', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:70,
    atacs:['Doble Canya','Crit Penetrant','Aria Pastoral','Pasiò Aguda'],
    danys:[22,34,46,60]
  },
  fagot: {
    id:'fagot', nom:'Fagot', emoji:'🪈', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:105,
    atacs:['Bramul Cavernós','Greu Imperial','Concert Profund','Tro Subterrani'],
    danys:[22,32,44,58]
  },
  corn_angles: {
    id:'corn_angles', nom:'Corn Anglès', emoji:'🪈', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:80,
    atacs:['Llament Pastoral','Cant Britànic','Solo Boscós','Aria Etèria'],
    danys:[21,31,44,57]
  },
  saxofon: {
    id:'saxofon', nom:'Saxòfon', emoji:'🎷', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:85,
    atacs:['Glissando Llepós','Riff de Jazz','Solo Hipnòtic','Big Band Brutal'],
    danys:[20,30,45,60]
  },

  // ─── AERÒFONS — VENT-METALL ────────────────────────────────────────────
  trompeta: {
    id:'trompeta', nom:'Trompeta', emoji:'🎺', familia:'Vent-metall', subfamilia:'metal',
    hpMax:90,
    atacs:['Fanfàrria Sobtada','Crit de Caçador','Toc de Triomf','Marxa Imperial'],
    danys:[25,35,50,65]
  },
  trompa: {
    id:'trompa', nom:'Trompa', emoji:'🎺', familia:'Vent-metall', subfamilia:'metal',
    hpMax:95,
    atacs:['Crida Boscana','Eco Daurat','Vall Resplendent','Senyor del Bosc'],
    danys:[24,34,48,62]
  },
  trombo: {
    id:'trombo', nom:'Trombó', emoji:'🎺', familia:'Vent-metall', subfamilia:'metal',
    hpMax:100,
    atacs:['Glissando Brutal','Vara Sinistra','Brama Imperial','Cataclisme Sonor'],
    danys:[26,36,50,65]
  },
  tuba: {
    id:'tuba', nom:'Tuba', emoji:'🎺', familia:'Vent-metall', subfamilia:'metal',
    hpMax:130,
    atacs:['Tronada Greu','Brama Cavernosa','Marxa de Gegant','Sismograma'],
    danys:[22,32,44,58]
  },
  fliscorn: {
    id:'fliscorn', nom:'Fliscorn', emoji:'🎺', familia:'Vent-metall', subfamilia:'metal',
    hpMax:90,
    atacs:['Brisa Càlida','Cant Mat\'inal','Solo Romàntic','Toc Daurat'],
    danys:[25,35,48,62]
  },
  corneta: {
    id:'corneta', nom:'Corneta', emoji:'🎺', familia:'Vent-metall', subfamilia:'metal',
    hpMax:80,
    atacs:['Toc Militar','Diana Resoluta','Càrrega Daurada','Senyal Imperial'],
    danys:[24,34,46,60]
  },

  // ─── AERÒFONS — VENT LLIURE ─────────────────────────────────────────────
  acordio: {
    id:'acordio', nom:'Acordió', emoji:'🪗', familia:'Vent lliure', subfamilia:'libre',
    hpMax:105,
    atacs:['Glissó Llarg','Polca Frenètica','Tango Implacable','Bal Folk Etern'],
    danys:[20,30,43,57]
  },
  harmonica: {
    id:'harmonica', nom:'Harmònica', emoji:'🎵', familia:'Vent lliure', subfamilia:'libre',
    hpMax:65,
    atacs:['Bufada Blues','Lament Solitari','Crida Salvatge','Camí del Sud'],
    danys:[16,26,38,50]
  },
  organ_tubs: {
    id:'organ_tubs', nom:'Òrgan de Tubs', emoji:'🎹', familia:'Vent lliure', subfamilia:'libre',
    hpMax:140,
    atacs:['Acord Catedral','Tocata Massiva','Fugue Imperial','Bach Cosmic'],
    danys:[28,40,55,72]
  },

  // ─── MEMBRANÒFONS ────────────────────────────────────────────────────────
  timbales: {
    id:'timbales', nom:'Timbales', emoji:'🥁', familia:'Percussió', subfamilia:'golpeados',
    hpMax:130,
    atacs:['Cop Sec','Doble Picat','Tro Orquestral','Apocalipsi Rítmica'],
    danys:[15,25,38,52]
  },
  bombo: {
    id:'bombo', nom:'Bombo', emoji:'🥁', familia:'Percussió', subfamilia:'golpeados',
    hpMax:145,
    atacs:['Cop de Pit','Tro Profund','Cataclisme Terrenal','Tremor Còsmic'],
    danys:[18,28,40,55]
  },
  caixa: {
    id:'caixa', nom:'Caixa', emoji:'🥁', familia:'Percussió', subfamilia:'golpeados',
    hpMax:95,
    atacs:['Redoblet Militar','Marxa Triomfant','Carrega Furiosa','Tempesta Rítmica'],
    danys:[17,27,38,52]
  },
  bateria: {
    id:'bateria', nom:'Bateria', emoji:'🥁', familia:'Percussió', subfamilia:'golpeados',
    hpMax:120,
    atacs:['Backbeat','Doble Bombo','Solo Rock','Storm of Beats'],
    danys:[22,32,45,60]
  },
  congas: {
    id:'congas', nom:'Congas', emoji:'🪘', familia:'Percussió', subfamilia:'golpeados',
    hpMax:100,
    atacs:['Tumbao Cubà','Salsa Calenta','Rumba Devastadora','Carnaval Foll'],
    danys:[16,26,38,52]
  },
  bongos: {
    id:'bongos', nom:'Bongos', emoji:'🪘', familia:'Percussió', subfamilia:'golpeados',
    hpMax:75,
    atacs:['Tap Cubà','Picat Latí','Repic Tropical','Solo de Bongos'],
    danys:[15,24,36,48]
  },
  pandero: {
    id:'pandero', nom:'Pandero', emoji:'🪘', familia:'Percussió', subfamilia:'golpeados',
    hpMax:70,
    atacs:['Cascavell Folk','Trino Festiu','Repicat Ibèric','Sons de Festa'],
    danys:[14,22,34,46]
  },

  // ─── IDIÒFONS ────────────────────────────────────────────────────────────
  xilofon: {
    id:'xilofon', nom:'Xilòfon', emoji:'🎹', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:70,
    atacs:['Plec de Fusta','Escala Daurada','Marimba Veloç','Ondes de Bosc'],
    danys:[18,28,40,53]
  },
  marimba: {
    id:'marimba', nom:'Marimba', emoji:'🎹', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:85,
    atacs:['Roll Mexicà','Pluja de Marimba','Selva Veloç','Vol del Quetzal'],
    danys:[20,30,43,57]
  },
  vibrafon: {
    id:'vibrafon', nom:'Vibràfon', emoji:'🎹', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:90,
    atacs:['Vibrato Cromat','Néctar Jazz','Solo Hipnòtic','Sons de Cristall'],
    danys:[21,31,44,58]
  },
  campanes_tubulars: {
    id:'campanes_tubulars', nom:'Campanes Tubulars', emoji:'🔔', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:80,
    atacs:['Toc Lent','Repic Sagrat','Carrilló Diví','Hora Solemne'],
    danys:[22,34,48,62]
  },
  triangle: {
    id:'triangle', nom:'Triangle', emoji:'🔺', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:50,
    atacs:['Pic Cristal·lí','Dinng Etèric','Eco Plata','Llampec d\'Argent'],
    danys:[12,20,30,42]
  },
  plats: {
    id:'plats', nom:'Plats', emoji:'🥁', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:60,
    atacs:['Crash Sobtat','Splash Soroll','Ride Permanent','Càrrega Metàl·lica'],
    danys:[16,26,38,52]
  },
  maraques: {
    id:'maraques', nom:'Maraques', emoji:'🪇', familia:'Idiòfon', subfamilia:'sacudidos',
    hpMax:55,
    atacs:['Cascavell Latí','Sambada Calenta','Carnaval Folk','Festa Tropical'],
    danys:[14,22,32,44]
  },

  // ─── ELECTRÒFONS ────────────────────────────────────────────────────────
  theremin: {
    id:'theremin', nom:'Theremin', emoji:'📡', familia:'Electròfon', subfamilia:'analogicos',
    hpMax:80,
    atacs:['Onde Ètere','Glissó Sobrenatural','Aire Còsmic','Veu del Buit'],
    danys:[25,38,52,68]
  },
  sintetitzador: {
    id:'sintetitzador', nom:'Sintetitzador', emoji:'🎛', familia:'Electròfon', subfamilia:'digitales',
    hpMax:110,
    atacs:['Patch Sintètic','Modulació Furiosa','Pad Cataclísmic','Wavefront Final'],
    danys:[28,42,58,75]
  },

  // ─── VEU HUMANA ─────────────────────────────────────────────────────────
  soprano: {
    id:'soprano', nom:'Soprano', emoji:'🎤', familia:'Veu', subfamilia:'aguda',
    hpMax:80,
    atacs:['Aria Cristal·lina','Coloratura Furiosa','Diva Imperial','Aire de la Reina'],
    danys:[22,35,50,65]
  },
  tenor: {
    id:'tenor', nom:'Tenor', emoji:'🎤', familia:'Veu', subfamilia:'mitja',
    hpMax:90,
    atacs:['Cant Lleuger','Aria Heroica','Solo Imperial','Crit Etern'],
    danys:[24,36,50,65]
  },
  baix_veu: {
    id:'baix_veu', nom:'Baix (veu)', emoji:'🎤', familia:'Veu', subfamilia:'greu',
    hpMax:100,
    atacs:['Greuvol Profund','Bramul Còsmic','Aria Tel·lúrica','Veu del Tro'],
    danys:[26,38,52,68]
  }
});

// Pool reclutable: tots menys la flauta dolça (que és la starter forçada)
export const POOL_RECLUTABLES = Object.keys(INSTRUMENTS).filter(id => id !== 'flauta');

// Pool de "salvatges" per a les trobades aleatòries (mateix que reclutables)
export const POOL_SALVATGES = POOL_RECLUTABLES;
