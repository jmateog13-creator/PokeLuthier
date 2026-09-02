// ============================================================================
// PokéLuthier · data/instruments.js
// Banc canònic de 50 instruments (Tema_06 del lab) amb stats balancejades
// per família Hornbostel-Sachs. Cada un té 4 atacs amb dany creixent
// (Lv1, Lv3, Lv5, Lv7).
// ============================================================================

export const INSTRUMENTS = Object.freeze({

  // ─── CORDÒFONS FROTATS (arc) ─────────────────────────────────────────────
  violi: {
    id:'violi', sprite:'assets/criatures/violi.png', nom:'Violí', familia:'Corda fregada', subfamilia:'frotats',
    hpMax:80,
    atacs:['Arc Lleuger','Pizzicato Sobtat','Sonata Devastadora','Bravura Imperial'],
    danys:[22,32,48,62]
  },
  viola: {
    id:'viola', sprite:'assets/criatures/viola.png', nom:'Viola', familia:'Corda fregada', subfamilia:'frotats',
    hpMax:85,
    atacs:['Arc Greuvol','Melodia Profunda','Aria Vital','Sostingut Tel·lúric'],
    danys:[24,34,46,60]
  },
  violoncel: {
    id:'violoncel', sprite:'assets/criatures/violoncel.png', nom:'Violoncel', familia:'Corda fregada', subfamilia:'frotats',
    hpMax:95,
    atacs:['Arc Profund','Vibrato Càlid','Bach Etern','Suite Suprema'],
    danys:[26,36,50,64]
  },
  contrabaix: {
    id:'contrabaix', sprite:'assets/criatures/contrabaix.png', nom:'Contrabaix', familia:'Corda fregada', subfamilia:'frotats',
    hpMax:110,
    atacs:['Cop d\'Arc','Plonc Greu','Pizzicato Tro','Onada Cavernosa'],
    danys:[28,38,52,66]
  },
  viola_da_gamba: {
    id:'viola_da_gamba', sprite:'assets/criatures/viola_da_gamba.png', nom:'Viola da Gamba', familia:'Corda fregada', subfamilia:'frotats',
    hpMax:85,
    atacs:['Tremolant Barroc','Diví Vibrat','Suite Antiga','Ressò Ancestral'],
    danys:[23,33,45,58]
  },

  // ─── CORDÒFONS PINÇATS ───────────────────────────────────────────────────
  guitarra: {
    id:'guitarra', sprite:'assets/criatures/guitarra.png', nom:'Guitarra', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:95,
    atacs:['Rasgueig Roent','Arpegi Daurat','Solo Elèctric','Riff Tel·lúric'],
    danys:[22,33,47,60]
  },
  guitarra_electrica: {
    id:'guitarra_electrica', sprite:'assets/criatures/guitarra_electrica.png', nom:'Guitarra Elèctrica', familia:'Electròfon', subfamilia:'amplificats',
    hpMax:100,
    atacs:['Power Chord','Distorsió Furiosa','Solo Sobrenatural','Riff Apocalíptic'],
    danys:[28,38,54,70]
  },
  arpa: {
    id:'arpa', sprite:'assets/criatures/arpa.png', nom:'Arpa', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:80,
    atacs:['Glissando Celestial','Arpegi Angèlic','Cascada Daurada','Eteri Diví'],
    danys:[25,35,48,62]
  },
  llaut: {
    id:'llaut', sprite:'assets/criatures/llaut.png', nom:'Llaüt', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:75,
    atacs:['Plec Renaixent','Vibrant Mediterrani','Pavana Subtil','Fantasia Antiga'],
    danys:[20,30,44,56]
  },
  ukelele: {
    id:'ukelele', sprite:'assets/criatures/ukelele.png', nom:'Ukelele', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:70,
    atacs:['Strum Tropical','Riu Hawaià','Onatge Solar','Aloha Devastador'],
    danys:[18,28,40,52]
  },
  bandurria: {
    id:'bandurria', sprite:'assets/criatures/bandurria.png', nom:'Bandúrria', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:75,
    atacs:['Picat Veloç','Trémol Ibèric','Jota Salvatge','Festa Castellana'],
    danys:[22,32,45,58]
  },
  banjo: {
    id:'banjo', sprite:'assets/criatures/banjo.png', nom:'Banjo', familia:'Corda pinçada', subfamilia:'pulsats',
    hpMax:80,
    atacs:['Punteig Country','Bluegrass Frenètic','Cançó del Pioner','Solo Salvatge'],
    danys:[20,30,44,58]
  },

  // ─── CORDÒFONS PERCUDITS ────────────────────────────────────────────────
  piano: {
    id:'piano', sprite:'assets/criatures/piano.png', nom:'Piano', familia:'Corda percudida', subfamilia:'percudits',
    hpMax:110,
    atacs:['Picat Cristal·lí','Acord Massiu','Sonata Apocalíptica','Fantasia Imperial'],
    danys:[25,38,55,70]
  },
  clavicembal: {
    id:'clavicembal', sprite:'assets/criatures/clavicembal.png', nom:'Clavicèmbal', familia:'Corda pinçada', subfamilia:'percudits',
    hpMax:90,
    atacs:['Plec Barroc','Cromatisme Vetust','Toccata Polsosa','Goldberg Espectral'],
    danys:[22,34,48,62]
  },
  cimbalom: {
    id:'cimbalom', sprite:'assets/criatures/cimbalom.png', nom:'Cimbalom', familia:'Corda percudida', subfamilia:'percudits',
    hpMax:100,
    atacs:['Trémol Magyar','Glissó Hongarès','Czardas Foll','Dansa Tzigana'],
    danys:[24,36,50,64]
  },

  // ─── AERÒFONS — VENT-FUSTA ─────────────────────────────────────────────
  flauta: {
    id:'flauta', sprite:'assets/criatures/flauta.png', nom:'Flauta Dolça', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:100,
    atacs:['Bufada Suau','Aire Polifònic','Crit d\'Argent','Vol del Vent'],
    danys:[18,28,42,55]
  },
  flauta_travessera: {
    id:'flauta_travessera', sprite:'assets/criatures/flauta_travessera.png', nom:'Flauta Travessera', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:95,
    atacs:['Bufada Lateral','Vibratto Argent','Trinat Diví','Aire Suprem'],
    danys:[20,30,44,57]
  },
  clarinet: {
    id:'clarinet', sprite:'assets/criatures/clarinet.png', nom:'Clarinet', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:75,
    atacs:['Canya Vibrant','Llampec Cromàtic','Klezmer Vital','Concert Imperial'],
    danys:[20,32,45,58]
  },
  oboe: {
    id:'oboe', sprite:'assets/criatures/oboe.png', nom:'Oboè', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:70,
    atacs:['Doble Canya','Crit Penetrant','Aria Pastoral','Pasiò Aguda'],
    danys:[22,34,46,60]
  },
  fagot: {
    id:'fagot', sprite:'assets/criatures/fagot.png', nom:'Fagot', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:105,
    atacs:['Bramul Cavernós','Greu Imperial','Concert Profund','Tro Subterrani'],
    danys:[22,32,44,58]
  },
  corn_angles: {
    id:'corn_angles', sprite:'assets/criatures/corn_angles.png', nom:'Corn Anglès', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:80,
    atacs:['Llament Pastoral','Cant Britànic','Solo Boscós','Aria Etèria'],
    danys:[21,31,44,57]
  },
  saxofon: {
    id:'saxofon', sprite:'assets/criatures/saxofon.png', nom:'Saxòfon', familia:'Vent-fusta', subfamilia:'madera',
    hpMax:85,
    atacs:['Glissando Llepós','Riff de Jazz','Solo Hipnòtic','Big Band Brutal'],
    danys:[20,30,45,60]
  },

  // ─── AERÒFONS — VENT-METALL ────────────────────────────────────────────
  trompeta: {
    id:'trompeta', sprite:'assets/criatures/trompeta.png', nom:'Trompeta', familia:'Vent-metall', subfamilia:'metal',
    hpMax:90,
    atacs:['Fanfàrria Sobtada','Crit de Caçador','Toc de Triomf','Marxa Imperial'],
    danys:[25,35,50,65]
  },
  trompa: {
    id:'trompa', sprite:'assets/criatures/trompa.png', nom:'Trompa', familia:'Vent-metall', subfamilia:'metal',
    hpMax:95,
    atacs:['Crida Boscana','Eco Daurat','Vall Resplendent','Senyor del Bosc'],
    danys:[24,34,48,62]
  },
  trombo: {
    id:'trombo', sprite:'assets/criatures/trombo.png', nom:'Trombó', familia:'Vent-metall', subfamilia:'metal',
    hpMax:100,
    atacs:['Glissando Brutal','Vara Sinistra','Brama Imperial','Cataclisme Sonor'],
    danys:[26,36,50,65]
  },
  tuba: {
    id:'tuba', sprite:'assets/criatures/tuba.png', nom:'Tuba', familia:'Vent-metall', subfamilia:'metal',
    hpMax:130,
    atacs:['Tronada Greu','Brama Cavernosa','Marxa de Gegant','Sismograma'],
    danys:[22,32,44,58]
  },
  fliscorn: {
    id:'fliscorn', sprite:'assets/criatures/fliscorn.png', nom:'Fliscorn', familia:'Vent-metall', subfamilia:'metal',
    hpMax:90,
    atacs:['Brisa Càlida','Cant Mat\'inal','Solo Romàntic','Toc Daurat'],
    danys:[25,35,48,62]
  },
  corneta: {
    id:'corneta', sprite:'assets/criatures/corneta.png', nom:'Corneta', familia:'Vent-metall', subfamilia:'metal',
    hpMax:80,
    atacs:['Toc Militar','Diana Resoluta','Càrrega Daurada','Senyal Imperial'],
    danys:[24,34,46,60]
  },

  // ─── AERÒFONS — VENT LLIURE ─────────────────────────────────────────────
  acordio: {
    id:'acordio', sprite:'assets/criatures/acordio.png', nom:'Acordió', familia:'Vent lliure', subfamilia:'libre',
    hpMax:105,
    atacs:['Glissó Llarg','Polca Frenètica','Tango Implacable','Bal Folk Etern'],
    danys:[20,30,43,57]
  },
  harmonica: {
    id:'harmonica', sprite:'assets/criatures/harmonica.png', nom:'Harmònica', familia:'Vent lliure', subfamilia:'libre',
    hpMax:65,
    atacs:['Bufada Blues','Lament Solitari','Crida Salvatge','Camí del Sud'],
    danys:[16,26,38,50]
  },
  organ_tubs: {
    id:'organ_tubs', sprite:'assets/criatures/organ_tubs.png', nom:'Òrgan de Tubs', familia:'Vent lliure', subfamilia:'libre',
    hpMax:140,
    atacs:['Acord Catedral','Tocata Massiva','Fugue Imperial','Bach Cosmic'],
    danys:[28,40,55,72]
  },

  // ─── MEMBRANÒFONS ────────────────────────────────────────────────────────
  timbales: {
    id:'timbales', sprite:'assets/criatures/timbales.png', nom:'Timbales', familia:'Percussió', subfamilia:'golpeados',
    hpMax:130,
    atacs:['Cop Sec','Doble Picat','Tro Orquestral','Apocalipsi Rítmica'],
    danys:[15,25,38,52]
  },
  bombo: {
    id:'bombo', sprite:'assets/criatures/bombo.png', nom:'Bombo', familia:'Percussió', subfamilia:'golpeados',
    hpMax:145,
    atacs:['Cop de Pit','Tro Profund','Cataclisme Terrenal','Tremor Còsmic'],
    danys:[18,28,40,55]
  },
  caixa: {
    id:'caixa', sprite:'assets/criatures/caixa.png', nom:'Caixa', familia:'Percussió', subfamilia:'golpeados',
    hpMax:95,
    atacs:['Redoblet Militar','Marxa Triomfant','Carrega Furiosa','Tempesta Rítmica'],
    danys:[17,27,38,52]
  },
  bateria: {
    id:'bateria', sprite:'assets/criatures/bateria.png', nom:'Bateria', familia:'Percussió', subfamilia:'golpeados',
    hpMax:120,
    atacs:['Backbeat','Doble Bombo','Solo Rock','Storm of Beats'],
    danys:[22,32,45,60]
  },
  congas: {
    id:'congas', sprite:'assets/criatures/congas.png', nom:'Congas', familia:'Percussió', subfamilia:'golpeados',
    hpMax:100,
    atacs:['Tumbao Cubà','Salsa Calenta','Rumba Devastadora','Carnaval Foll'],
    danys:[16,26,38,52]
  },
  bongos: {
    id:'bongos', sprite:'assets/criatures/bongos.png', nom:'Bongos', familia:'Percussió', subfamilia:'golpeados',
    hpMax:75,
    atacs:['Tap Cubà','Picat Latí','Repic Tropical','Solo de Bongos'],
    danys:[15,24,36,48]
  },
  pandero: {
    id:'pandero', sprite:'assets/criatures/pandero.png', nom:'Pandero', familia:'Percussió', subfamilia:'golpeados',
    hpMax:70,
    atacs:['Cascavell Folk','Trino Festiu','Repicat Ibèric','Sons de Festa'],
    danys:[14,22,34,46]
  },

  // ─── IDIÒFONS ────────────────────────────────────────────────────────────
  xilofon: {
    id:'xilofon', sprite:'assets/criatures/xilofon.png', nom:'Xilòfon', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:70,
    atacs:['Plec de Fusta','Escala Daurada','Marimba Veloç','Ondes de Bosc'],
    danys:[18,28,40,53]
  },
  marimba: {
    id:'marimba', sprite:'assets/criatures/marimba.png', nom:'Marimba', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:85,
    atacs:['Roll Mexicà','Pluja de Marimba','Selva Veloç','Vol del Quetzal'],
    danys:[20,30,43,57]
  },
  vibrafon: {
    id:'vibrafon', sprite:'assets/criatures/vibrafon.png', nom:'Vibràfon', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:90,
    atacs:['Vibrato Cromat','Néctar Jazz','Solo Hipnòtic','Sons de Cristall'],
    danys:[21,31,44,58]
  },
  campanes_tubulars: {
    id:'campanes_tubulars', sprite:'assets/criatures/campanes_tubulars.png', nom:'Campanes Tubulars', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:80,
    atacs:['Toc Lent','Repic Sagrat','Carrilló Diví','Hora Solemne'],
    danys:[22,34,48,62]
  },
  triangle: {
    id:'triangle', sprite:'assets/criatures/triangle.png', nom:'Triangle', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:50,
    atacs:['Pic Cristal·lí','Dinng Etèric','Eco Plata','Llampec d\'Argent'],
    danys:[12,20,30,42]
  },
  plats: {
    id:'plats', sprite:'assets/criatures/plats.png', nom:'Plats', familia:'Idiòfon', subfamilia:'golpeados',
    hpMax:60,
    atacs:['Crash Sobtat','Splash Soroll','Ride Permanent','Càrrega Metàl·lica'],
    danys:[16,26,38,52]
  },
  maraques: {
    id:'maraques', sprite:'assets/criatures/maraques.png', nom:'Maraques', familia:'Idiòfon', subfamilia:'sacudidos',
    hpMax:55,
    atacs:['Cascavell Latí','Sambada Calenta','Carnaval Folk','Festa Tropical'],
    danys:[14,22,32,44]
  },

  // ─── ELECTRÒFONS ────────────────────────────────────────────────────────
  theremin: {
    id:'theremin', sprite:'assets/criatures/theremin.png', nom:'Theremin', familia:'Electròfon', subfamilia:'analogicos',
    hpMax:80,
    atacs:['Onde Ètere','Glissó Sobrenatural','Aire Còsmic','Veu del Buit'],
    danys:[25,38,52,68]
  },
  sintetitzador: {
    id:'sintetitzador', sprite:'assets/criatures/sintetitzador.png', nom:'Sintetitzador', familia:'Electròfon', subfamilia:'digitales',
    hpMax:110,
    atacs:['Patch Sintètic','Modulació Furiosa','Pad Cataclísmic','Wavefront Final'],
    danys:[28,42,58,75]
  },

  // ─── VEU HUMANA ─────────────────────────────────────────────────────────
  soprano: {
    id:'soprano', sprite:'assets/criatures/soprano.png', nom:'Soprano', familia:'Veu', subfamilia:'aguda',
    hpMax:80,
    atacs:['Aria Cristal·lina','Coloratura Furiosa','Diva Imperial','Aire de la Reina'],
    danys:[22,35,50,65]
  },
  contralt: {
    id:'contralt', sprite:'assets/criatures/contralt.png', nom:'Contralt', familia:'Veu', subfamilia:'mitja-aguda',
    hpMax:85,
    atacs:['Cant Vellutat','Aria Càlida','Contralt Imperial','Veu de Bronze'],
    danys:[23,35,49,64]
  },
  tenor: {
    id:'tenor', sprite:'assets/criatures/tenor.png', nom:'Tenor', familia:'Veu', subfamilia:'mitja',
    hpMax:90,
    atacs:['Cant Lleuger','Aria Heroica','Solo Imperial','Crit Etern'],
    danys:[24,36,50,65]
  },
  baix_veu: {
    id:'baix_veu', sprite:'assets/criatures/baix_veu.png', nom:'Baix (veu)', familia:'Veu', subfamilia:'greu',
    hpMax:100,
    atacs:['Greuvol Profund','Bramul Còsmic','Aria Tel·lúrica','Veu del Tro'],
    danys:[26,38,52,68]
  }
});

// Pool reclutable: tots menys la flauta dolça (que és la starter forçada)
export const POOL_RECLUTABLES = Object.keys(INSTRUMENTS).filter(id => id !== 'flauta');

// Pool de "salvatges" per a les trobades aleatòries (mateix que reclutables)
export const POOL_SALVATGES = POOL_RECLUTABLES;
