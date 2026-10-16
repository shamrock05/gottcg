/* IRON COLLECTION — données et logique de jeu avec synchronisation Supabase */

// CONFIGURATION SUPABASE (Clé et URL configurées)
const SUPABASE_URL = 'https://fyyuqdgksecdecrdquix.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5eXVxZGdrc2VjZGVjcmRxdWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxNjg3MDYsImV4cCI6MjEwNzc0NDcwNn0.gGpIKGz_GjBGg3wmx5kCT8449dDQGgUo-O1dipHbuM4';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const CONFIG = { cooldownMs: 5 * 60 * 1000, boosterSlots: 3, storageKey: 'iron-collection-state-v3' };

const CARD_DB = [
  ["Aerys Targaryen", "Secrète", "Targaryen", "🐉", "Le Roi Fou, dernier dragon avant la rébellion.", "images/1-8-aerys.png", "Robert's Rebellion", 0.5],
  ["Tywin Lannister", "Secrète", "Lannister", "🦁", "Le lion de Castral Roc, stratège impitoyable.", "images/2-8-tywin.png", "Robert's Rebellion", 0.5],
  ["Gregor Clegane", "Secrète", "Clegane", "⚔️", "La Montagne, colosse de la maison Clegane.", "images/3-8-gregor.png", "Robert's Rebellion", 0.5],
  ["Arthur Dayne", "Secrète", "Dayne", "🗡️", "L’Épée du Matin, le plus noble des chevaliers.", "images/4-8-arthur.png", "Robert's Rebellion", 0.5],
  ["Jaime Lannister", "Secrète", "Lannister", "🦁", "Le jeune Régicide, chevalier de la Garde Royale.", "images/5-8-kingslayer.png", "Robert's Rebellion", 0.5],
  ["Ned Stark", "Secrète", "Stark", "🐺", "Le jeune loup du Nord, lié par l’honneur.", "images/6-8-ned.png", "Robert's Rebellion", 0.5],
  ["Robert Baratheon", "Secrète", "Baratheon", "🦌", "Le cerf couronné, forgé par la rébellion.", "images/7-8-robert.png", "Robert's Rebellion", 0.5],
  ["Rhaegar Targaryen", "Secrète", "Targaryen", "🐉", "Le prince dragon, héritier de la dynastie.", "images/8-8-rhaegar.png", "Robert's Rebellion", 0.5],
  ["Daenerys Targaryen", "Légendaire", "Targaryen", "🐉", "La Mère des Dragons, née de la tempête.", "images/1-81-daenerys.png", "ASOIAF", 1.5],
  ["Aerys II Targaryen", "Commune", "Targaryen", "🐉", "Aerys II Targaryen · Targaryen. Une figure des archives de Westeros.", "images/2-81-aerys.png", "ASOIAF", 80.0],
  ["Rhaegar Targaryen", "Commune", "Targaryen", "🐉", "Le prince dragon dans une autre chronique.", "images/3-81-rhaegar.png", "ASOIAF", 80.0],
  ["Jon Snow", "Légendaire", "Stark", "🐺", "Le bâtard du Nord qui ne plie jamais le genou.", "images/4-81-jon.png", "ASOIAF", 1.5],
  ["Lyanna Stark", "Commune", "Stark", "🐺", "Une louve du Nord au destin légendaire.", "images/5-81-lyanna.png", "ASOIAF", 80.0],
  ["Khal Drogo", "Épique", "Dothraki", "🏇", "Sang de mon sang, seigneur du grand khalasar.", "images/6-81-drogo.png", "ASOIAF", 5.0],
  ["Ned Stark", "Épique", "Stark", "🐺", "Le seigneur de Winterfell, gardien de l’honneur.", "images/7-81-ned.png", "ASOIAF", 5.0],
  ["Sansa Stark", "Rare", "Stark", "🐺", "Une reine forgée par l’hiver.", "images/8-81-sansa.png", "ASOIAF", 13.5],
  ["Arya Stark", "Rare", "Stark", "🐺", "Personne. Mais toujours quelqu’un.", "images/9-81-arya.png", "ASOIAF", 13.5],
  ["Bran Stark", "Épique", "Stark", "🐺", "Le passé, le présent et ce qui vient.", "images/10-81-bran.png", "ASOIAF", 5.0],
  ["Robb Stark", "Épique", "Stark", "🐺", "Robb Stark · Stark. Une figure des archives de Westeros.", "images/11-81-robb.png", "ASOIAF", 5.0],
  ["Catelyn Stark", "Commune", "Stark", "🐺", "Catelyn Stark · Stark. Une figure des archives de Westeros.", "images/12-81-catelyn.png", "ASOIAF", 80.0],
  ["Benjen Stark", "Commune", "Stark", "🐺", "Benjen Stark · Stark. Une figure des archives de Westeros.", "images/13-81-benjen.png", "ASOIAF", 80.0],
  ["Rickon Stark", "Commune", "Stark", "🐺", "Rickon Stark · Stark. Une figure des archives de Westeros.", "images/14-81-rickon.png", "ASOIAF", 80.0],
  ["Jojen Reed", "Commune", "Reed", "⚔️", "Jojen Reed · Reed. Une figure des archives de Westeros.", "images/15-81-jojen.png", "ASOIAF", 80.0],
  ["Meera Reed", "Commune", "Reed", "⚔️", "Meera Reed · Reed. Une figure des archives de Westeros.", "images/16-81-meera.png", "ASOIAF", 80.0],
  ["Hodor", "Épique", "Stark", "🐺", "Hodor · Stark. Une figure des archives de Westeros.", "images/17-81-hodor.png", "ASOIAF", 5.0],
  ["Osha", "Commune", "Peuple libre", "🪓", "Osha · Peuple libre. Une figure des archives de Westeros.", "images/18-81-osha.png", "ASOIAF", 80.0],
  ["Talisa Maegyr", "Commune", "Maegyr", "⚔️", "Talisa Maegyr · Maegyr. Une figure des archives de Westeros.", "images/19-81-talisa.png", "ASOIAF", 80.0],
  ["Tywin Lannister", "Légendaire", "Lannister", "🦁", "Tywin Lannister · Lannister. Une figure des archives de Westeros.", "images/20-81-tywin.png", "ASOIAF", 1.5],
  ["Cersei Lannister", "Légendaire", "Lannister", "🦁", "Cersei Lannister · Lannister. Une figure des archives de Westeros.", "images/21-81-cersei.png", "ASOIAF", 1.5],
  ["Jaime Lannister", "Légendaire", "Lannister", "🦁", "Jaime Lannister · Lannister. Une figure des archives de Westeros.", "images/22-81-jaime.png", "ASOIAF", 1.5],
  ["Tyrion Lannister", "Légendaire", "Lannister", "🦁", "Tyrion Lannister · Lannister. Une figure des archives de Westeros.", "images/23-81-tyrion.png", "ASOIAF", 1.5],
  ["Kevan Lannister", "Commune", "Lannister", "🦁", "Kevan Lannister · Lannister. Une figure des archives de Westeros.", "images/24-81-kevan.png", "ASOIAF", 80.0],
  ["Lancel Lannister", "Commune", "Lannister", "🦁", "Lancel Lannister · Lannister. Une figure des archives de Westeros.", "images/25-81-lancel.png", "ASOIAF", 80.0],
  ["Ilyn Payne", "Commune", "Payne", "⚔️", "Ilyn Payne · Payne. Une figure des archives de Westeros.", "images/26-81-ilyn.png", "ASOIAF", 80.0],
  ["Robert Baratheon", "Rare", "Baratheon", "🦌", "Robert Baratheon · Baratheon. Une figure des archives de Westeros.", "images/27-81-robert.png", "ASOIAF", 13.5],
  ["Stannis Baratheon", "Légendaire", "Baratheon", "🦌", "Stannis Baratheon · Baratheon. Une figure des archives de Westeros.", "images/28-81-stannis.png", "ASOIAF", 1.5],
  ["Renly Baratheon", "Rare", "Baratheon", "🦌", "Renly Baratheon · Baratheon. Une figure des archives de Westeros.", "images/29-81-renly.png", "ASOIAF", 13.5],
  ["Joffrey Baratheon", "Épique", "Baratheon", "🦌", "Joffrey Baratheon · Baratheon. Une figure des archives de Westeros.", "images/30-81-joffrey.png", "ASOIAF", 5.0],
  ["Myrcella Baratheon", "Commune", "Baratheon", "🦌", "Myrcella Baratheon · Baratheon. Une figure des archives de Westeros.", "images/31-81-myrcella.png", "ASOIAF", 80.0],
  ["Tommen Baratheon", "Rare", "Baratheon", "🦌", "Tommen Baratheon · Baratheon. Une figure des archives de Westeros.", "images/32-81-tommen.png", "ASOIAF", 13.5],
  ["Shireen Baratheon", "Commune", "Baratheon", "🦌", "Shireen Baratheon · Baratheon. Une figure des archives de Westeros.", "images/33-81-shireen.png", "ASOIAF", 80.0],
  ["Petyr Baelish", "Légendaire", "Baelish", "⚔️", "Petyr Baelish · Baelish. Une figure des archives de Westeros.", "images/34-81-littlefinger.png", "ASOIAF", 1.5],
  ["Varys", "Légendaire", "Conseil restreint", "⚔️", "Varys · Conseil restreint. Une figure des archives de Westeros.", "images/35-81-varys.png", "ASOIAF", 1.5],
  ["Melisandre", "Épique", "R'hllor", "⚔️", "Melisandre · R'hllor. Une figure des archives de Westeros.", "images/36-81-melisandre.png", "ASOIAF", 5.0],
  ["Sandor Clegane", "Épique", "Clegane", "⚔️", "Sandor Clegane · Clegane. Une figure des archives de Westeros.", "images/37-81-sandor.png", "ASOIAF", 5.0],
  ["Gregor Clegane", "Épique", "Clegane", "⚔️", "Gregor Clegane · Clegane. Une figure des archives de Westeros.", "images/38-81-gregor.png", "ASOIAF", 5.0],
  ["Oberyn Martell", "Épique", "Martell", "☀️", "Oberyn Martell · Martell. Une figure des archives de Westeros.", "images/39-81-oberyn.png", "ASOIAF", 5.0],
  ["Ellaria Sand", "Commune", "Martell", "☀️", "Ellaria Sand · Martell. Une figure des archives de Westeros.", "images/40-81-ellaria.png", "ASOIAF", 80.0],
  ["Olenna Tyrell", "Épique", "Tyrell", "🌹", "Olenna Tyrell · Tyrell. Une figure des archives de Westeros.", "images/41-81-ollena.png", "ASOIAF", 5.0],
  ["Margaery Tyrell", "Légendaire", "Tyrell", "🌹", "Margaery Tyrell · Tyrell. Une figure des archives de Westeros.", "images/42-81-margaery.png", "ASOIAF", 1.5],
  ["Loras Tyrell", "Rare", "Tyrell", "🌹", "Loras Tyrell · Tyrell. Une figure des archives de Westeros.", "images/43-81-loras.png", "ASOIAF", 13.5],
  ["Jorah Mormont", "Épique", "Mormont", "🐻", "Jorah Mormont · Mormont. Une figure des archives de Westeros.", "images/44-81-jorah.png", "ASOIAF", 5.0],
  ["Bronn", "Épique", "Mercenaires", "⚔️", "Bronn · Mercenaires. Une figure des archives de Westeros.", "images/45-81-bronn.png", "ASOIAF", 5.0],
  ["Davos Mervault", "Épique", "Mervault", "⚔️", "Davos Mervault · Mervault. Une figure des archives de Westeros.", "images/46-81-davos.png", "ASOIAF", 5.0],
  ["Theon Greyjoy", "Épique", "Greyjoy", "🐙", "Theon Greyjoy · Greyjoy. Une figure des archives de Westeros.", "images/47-81-theon.png", "ASOIAF", 5.0],
  ["Yara Greyjoy", "Rare", "Greyjoy", "🐙", "Yara Greyjoy · Greyjoy. Une figure des archives de Westeros.", "images/48-81-yara.png", "ASOIAF", 13.5],
  ["Brienne de Torth", "Épique", "Tarth", "⚔️", "Brienne de Torth · Tarth. Une figure des archives de Westeros.", "images/49-81-brienne.png", "ASOIAF", 5.0],
  ["Podrick Payne", "Rare", "Payne", "⚔️", "Podrick Payne · Payne. Une figure des archives de Westeros.", "images/50-81-podrick.png", "ASOIAF", 13.5],
  ["Tormund", "Épique", "Peuple libre", "🪓", "Tormund · Peuple libre. Une figure des archives de Westeros.", "images/51-81-tormund.png", "ASOIAF", 5.0],
  ["Brynden Tully", "Rare", "Tully", "🐟", "Brynden Tully · Tully. Une figure des archives de Westeros.", "images/52-81-brynden.png", "ASOIAF", 13.5],
  ["Walder Frey", "Commune", "Frey", "🌉", "Walder Frey · Frey. Une figure des archives de Westeros.", "images/53-81-walder.png", "ASOIAF", 80.0],
  ["Edmure Tully", "Commune", "Tully", "🐟", "Edmure Tully · Tully. Une figure des archives de Westeros.", "images/54-81-edmure.png", "ASOIAF", 80.0],
  ["Barristan Selmy", "Épique", "Selmy", "⚔️", "Barristan Selmy · Selmy. Une figure des archives de Westeros.", "images/55-81-barristan.png", "ASOIAF", 5.0],
  ["Ver Gris", "Épique", "Immaculés", "⚔️", "Ver Gris · Immaculés. Une figure des archives de Westeros.", "images/56-81-ver.png", "ASOIAF", 5.0],
  ["Missandei", "Épique", "Naath", "⚔️", "Missandei · Naath. Une figure des archives de Westeros.", "images/57-81-missandei.png", "ASOIAF", 5.0],
  ["Daario Naharis", "Rare", "Mercenaires", "⚔️", "Daario Naharis · Mercenaires. Une figure des archives de Westeros.", "images/58-81-daario.png", "ASOIAF", 13.5],
  ["Drogon", "Légendaire", "Targaryen", "🐉", "Drogon · Targaryen. Une figure des archives de Westeros.", "images/59-81-drogon.png", "ASOIAF", 1.5],
  ["Rhaegal", "Légendaire", "Targaryen", "🐉", "Rhaegal · Targaryen. Une figure des archives de Westeros.", "images/60-81-rhaegal.png", "ASOIAF", 1.5],
  ["Viserion", "Légendaire", "Targaryen", "🐉", "Viserion · Targaryen. Une figure des archives de Westeros.", "images/61-81-viserion.png", "ASOIAF", 1.5],
  ["Gilly", "Commune", "Peuple libre", "🪓", "Gilly · Peuple libre. Une figure des archives de Westeros.", "images/62-81-gilly.png", "ASOIAF", 80.0],
  ["Ramsay Bolton", "Épique", "Bolton", "🩸", "Ramsay Bolton · Bolton. Une figure des archives de Westeros.", "images/63-81-ramsay.png", "ASOIAF", 5.0],
  ["Roose Bolton", "Commune", "Bolton", "🩸", "Roose Bolton · Bolton. Une figure des archives de Westeros.", "images/64-81-roose.png", "ASOIAF", 80.0],
  ["Euron Greyjoy", "Rare", "Greyjoy", "🐙", "Euron Greyjoy · Greyjoy. Une figure des archives de Westeros.", "images/65-81-euron.png", "ASOIAF", 13.5],
  ["Balon Greyjoy", "Commune", "Greyjoy", "🐙", "Balon Greyjoy · Greyjoy. Une figure des archives de Westeros.", "images/66-81-balon.png", "ASOIAF", 80.0],
  ["Grand Mestre Pycelle", "Épique", "Citadelle", "⚔️", "Grand Mestre Pycelle · Citadelle. Une figure des archives de Westeros.", "images/67-81-pycelle.png", "ASOIAF", 5.0],
  ["Qyburn", "Rare", "Citadelle", "⚔️", "Qyburn · Citadelle. Une figure des archives de Westeros.", "images/68-81-qyburn.png", "ASOIAF", 13.5],
  ["Le Grand Moineau", "Commune", "Foi des Sept", "⚔️", "Le Grand Moineau · Foi des Sept. Une figure des archives de Westeros.", "images/69-81-moineau.png", "ASOIAF", 80.0],
  ["Samwell Tarly", "Épique", "Tarly", "🏹", "Samwell Tarly · Tarly. Une figure des archives de Westeros.", "images/70-81-samwell.png", "ASOIAF", 5.0],
  ["Jeor Mormont", "Commune", "Mormont", "🐻", "Jeor Mormont · Mormont. Une figure des archives de Westeros.", "images/71-81-jeor.png", "ASOIAF", 80.0],
  ["Mestre Aemon", "Commune", "Garde de Nuit", "🛡️", "Mestre Aemon · Garde de Nuit. Une figure des archives de Westeros.", "images/72-81-aemon.png", "ASOIAF", 80.0],
  ["Mance Rayder", "Commune", "Peuple libre", "🪓", "Mance Rayder · Peuple libre. Une figure des archives de Westeros.", "images/73-81-mance.png", "ASOIAF", 80.0],
  ["Quhorin Mimain", "Commune", "Garde de Nuit", "🛡️", "Quhorin Mimain · Garde de Nuit. Une figure des archives de Westeros.", "images/74-81-quhorin.png", "ASOIAF", 80.0],
  ["Alliser Thorne", "Commune", "Garde de Nuit", "🛡️", "Alliser Thorne · Garde de Nuit. Une figure des archives de Westeros.", "images/75-81-alliser.png", "ASOIAF", 80.0],
  ["Randyll Tarly", "Commune", "Tarly", "🏹", "Randyll Tarly · Tarly. Une figure des archives de Westeros.", "images/76-81-randyll.png", "ASOIAF", 80.0],
  ["Doran Martell", "Commune", "Martell", "☀️", "Doran Martell · Martell. Une figure des archives de Westeros.", "images/77-81-doran.png", "ASOIAF", 80.0],
  ["Obara Sand", "Commune", "Martell", "☀️", "Obara Sand · Martell. Une figure des archives de Westeros.", "images/78-81-obara.png", "ASOIAF", 80.0],
  ["Nymeria Sand", "Commune", "Martell", "☀️", "Nymeria Sand · Martell. Une figure des archives de Westeros.", "images/79-81-nymeria.png", "ASOIAF", 80.0],
  ["Tyene Sand", "Commune", "Martell", "☀️", "Tyene Sand · Martell. Une figure des archives de Westeros.", "images/80-81-tyene.png", "ASOIAF", 80.0],
  ["Le Roi de la Nuit", "Secrète", "Marcheurs Blancs", "❄️", "Le Roi de la Nuit · Marcheurs Blancs. Une figure des archives de Westeros.", "images/81-81-the-night-king.png", "ASOIAF", 0.5],
].map((c, i) => ({ id: i + 1, name: c[0], rarity: c[1], faction: c[2], emoji: c[3], description: c[4], image: c[5], set: c[6], dropRate: c[7], cardNumber: String(i + 1).padStart(3, '0') }));

CARD_DB.forEach(c => c.weight = c.dropRate / CARD_DB.filter(x => x.rarity === c.rarity).length);

function drawCard() {
  let t = CARD_DB.reduce((a, c) => a + c.weight, 0), r = Math.random() * t;
  for (const c of CARD_DB) {
    r -= c.weight;
    if (r < 0) return c;
  }
  return CARD_DB[0];
}

const RARITIES = ['Commune', 'Rare', 'Épique', 'Légendaire', 'Secrète'];
const EMPTY_OWNED = Object.fromEntries(CARD_DB.map(c => [c.id, 0]));
let state = loadState(), soundOn = true, timerHandle;
let currentUser = null;

function loadState() {
  const fresh = () => ({ owned: { ...EMPTY_OWNED }, boosters: 0, legendaries: 0, lastOpened: 0 });
  try {
    const saved = JSON.parse(localStorage.getItem(CONFIG.storageKey) || 'null');
    if (!saved) return fresh();
    return { ...fresh(), ...saved, owned: { ...EMPTY_OWNED, ...(saved.owned || {}) } };
  } catch (e) { return fresh(); }
}

function save() {
  localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
}

// SYNCHRONISATION SUPABASE
async function syncFromSupabase() {
  if (!currentUser) return;
  const { data, error } = await supabase
    .from('user_cards')
    .select('card_id')
    .eq('user_id', currentUser.id);

  if (!error && data) {
    let newOwned = { ...EMPTY_OWNED };
    data.forEach(row => {
      newOwned[row.card_id] = (newOwned[row.card_id] || 0) + 1;
    });
    state.owned = newOwned;
    save();
    route();
  }
}

async function saveCardToSupabase(cardId) {
  if (!currentUser) return;
  await supabase.from('user_cards').insert([{ user_id: currentUser.id, card_id: cardId }]);
}

function rarityClass(r) { return { 'Commune': 'common', 'Peu commune': 'uncommon', 'Rare': 'rare', 'Épique': 'epic', 'Légendaire': 'legendary', 'Secrète': 'secret' }[r] || 'common'; }
function ownedCount() { return Object.keys(state.owned).filter(id => state.owned[id] > 0).length; }

function imageMarkup(c, hidden = false) {
  const emoji = hidden ? '🔒' : c.emoji;
  const fallback = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 420"><rect width="300" height="420" fill="#121a2e"/><text x="150" y="230" text-anchor="middle" font-size="92">${emoji}</text></svg>`)}`;
  return `<img src="${c.image}" alt="" aria-hidden="true" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">`;
}

function cardTile(c, locked = false, showRarity = true, options = {}) {
  if (options.imageOnly) return `<article class="card-tile image-only ${rarityClass(c.rarity)} ${locked ? 'lock' : ''}" data-card="${c.id}"><div class="card-art">${imageMarkup(c, locked)}${locked ? '<span class="card-mask" aria-hidden="true"></span>' : ''}</div></article>`;
  return `<article class="card-tile ${rarityClass(c.rarity)} ${locked ? 'lock' : ''}" data-card="${c.id}"><div class="card-art">${imageMarkup(c, locked)}</div><div class="card-info"><strong>${locked ? '???' : c.name}</strong>${showRarity ? `<small>${locked ? 'Carte manquante' : c.rarity + ' · #' + c.cardNumber}</small>` : ''}</div></article>`;
}

function stats() { return `<div class="stats-strip"><div class="stat"><strong>${CARD_DB.length}</strong><span>Cartes disponibles</span></div><div class="stat"><strong>${ownedCount()}<small> / ${CARD_DB.length}</small></strong><span>Cartes possédées</span></div><div class="stat"><strong>${state.boosters}</strong><span>Boosters ouverts</span></div></div>`; }

function home() { return `<section class="view"><div class="hero"><div class="hero-copy"><div class="eyebrow">Archives de Westeros · Saison I</div><h1>La guerre des<br><em>trônes</em> est dans vos mains.</h1><p class="lead">Collectionnez les figures qui ont façonné les Sept Couronnes. Ouvrez un booster. Écrivez votre propre légende.</p><a class="cta" href="#booster">Ouvrir un booster <span>→</span></a></div><div class="hero-collage" aria-hidden="true"><img class="c2" src="images/poster-herald.png" alt=""><img class="c1" src="images/poster-jon.png" alt=""><img class="c3" src="images/poster-daemon.png" alt=""></div></div><div class="ticker"><span>Winter is coming ◆ Fire and blood ◆ Hear me roar ◆ The North remembers ◆ Winter is coming ◆ Fire and blood ◆ Hear me roar ◆ The North remembers ◆</span></div>${stats()}<div class="herald"><img src="images/poster-herald.png" alt="Édition spéciale du Westeros Herald"><div><div class="eyebrow">Édition spéciale</div><h2>Le Westeros Herald</h2><p class="lead">Scandales, trahisons et dragons. Quand on joue au jeu des trônes, on gagne ou on meurt.</p><a class="cta" href="#collection">Voir ma collection <span>→</span></a></div></div><div class="section-head"><div><div class="eyebrow">Cinq niveaux de pouvoir</div><h2>Les raretés</h2></div></div><div class="rarity-row">${RARITIES.map(r => `<div class="rarity-box ${rarityClass(r)}"><div class="eyebrow">${r === 'Légendaire' ? '✦' : r === 'Secrète' ? '❖' : ''}</div><strong>${r}</strong><p>${({ Commune: 'Les fondations.', Secrète: 'Connue de quelques-uns seulement.', Rare: 'Le destin se révèle.', Épique: 'Les grands noms.', Légendaire: 'Une place dans l’histoire.' })[r]}</p></div>`).join('')}</div></section>`; }

function remaining() { return Math.max(0, CONFIG.cooldownMs - (Date.now() - state.lastOpened)); }
function timeString(ms) { let s = Math.ceil(ms / 1000), m = Math.floor(s / 60); return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }

function booster() { let wait = remaining(), ready = wait <= 0; return `<section class="view booster-view"><div class="eyebrow">Rituel d’ouverture · 3 cartes par booster</div><h1>Le prochain tirage</h1><p class="lead" style="margin:15px auto">Brisez le sceau. Trois cartes vous attendent, face cachée. À vous de les révéler, une par une.</p><div class="booster-stage"><div class="booster-pack" id="pack"><img src="images/booster.png" alt="Booster Westeros TCG"></div></div><div class="timer" id="timer">${ready ? 'PRÊT À OUVRIR' : timeString(wait)}</div><button id="openBooster" class="cta" ${ready ? '' : 'disabled'}>${ready ? 'Ouvrir le booster' : 'Le prochain booster arrive'}</button><div id="revealArea"></div></section>`; }

const FX = { 'Commune': { ms: 700, f: 392, c: '#a3a3a3' }, 'Peu commune': { ms: 800, f: 440, c: '#5fc5ae' }, 'Rare': { ms: 1000, f: 523, c: '#51a8e7' }, 'Épique': { ms: 1400, f: 659, c: '#bd75ed' }, 'Légendaire': { ms: 2000, f: 880, c: '#e6a63d' }, 'Secrète': { ms: 2000, f: 988, c: '#ff4fd8' } };
const CINE = { 'Rare': { d: 6000, n: 18 }, 'Épique': { d: 6500, n: 30 }, 'Légendaire': { d: 7000, n: 44 }, 'Secrète': { d: 8000, n: 64 } };
let cineAudio = null, lastOpening = 0; const OPENING_SOUNDS = 4;

function pickOpeningSound() { let n; do { n = 1 + Math.floor(Math.random() * OPENING_SOUNDS); } while (n === lastOpening && OPENING_SOUNDS > 1); lastOpening = n; return `sounds/ouverture${n}.mp3`; }
function flash(c) { let f = document.createElement('div'); f.className = 'flash'; f.style.background = c; document.body.appendChild(f); setTimeout(() => f.remove(), 1000); }

function pickCard(o, i) { let c = o.c; return `<div class="pick" data-i="${i}"><div class="flip-card ${rarityClass(c.rarity)}" data-rarity="${c.rarity}" data-id="${c.id}" style="animation-delay:${i * .18}s"><div class="flip-inner"><div class="flip-front"><img src="images/logo.jpg" alt=""><span>Touchez</span></div><div class="flip-back"><div class="reveal-image">${imageMarkup(c)}</div></div></div></div><div class="reveal-label ${rarityClass(c.rarity)}"><strong>${c.name}</strong><small>${c.rarity} · #${c.cardNumber}</small>${o.isNew ? '<em>Nouvelle !</em>' : ''}</div></div>`; }

function cinematic(el) {
  return new Promise(res => {
    let r = el.dataset.rarity, cfg = CINE[r], d = cfg.d, c = CARD_DB.find(x => x.id == el.dataset.id), R = n => Math.random() * n;
    let o = document.createElement('div'); o.className = 'cine ' + rarityClass(r);
    let sp = Array.from({ length: cfg.n }, () => { let a = R(6.28), dist = 180 + R(Math.min(innerWidth, 900) * .6); return `<i style="--s:${3 + R(7)}px;--x:${Math.cos(a) * dist}px;--y:${Math.sin(a) * dist}px;--dl:${R(.4)}s"></i>`; }).join('');
    let em = Array.from({ length: 26 }, () => `<i style="--l:${R(100)}%;--dx:${R(120) - 60}px;--t:${2 + R(2.5)}s;--dl:${R(3)}s"></i>`).join('');
    o.innerHTML = `<div class="cine-bg"></div><div class="cine-rays"></div><div class="cine-embers">${em}</div><div class="cine-card"><div class="cine-inner"><div class="cine-front"><img src="images/logo.jpg" alt=""></div><div class="cine-back">${imageMarkup(c)}</div></div></div><div class="cine-sparks">${sp}</div><div class="cine-title"><small>Rareté</small><strong>${r}</strong><span>${c.name}</span></div>`;
    document.body.appendChild(o);
    if (soundOn) { try { cineAudio = new Audio(pickOpeningSound()); cineAudio.volume = .9; cineAudio.play().catch(() => { }); } catch (e) { } }
    let at = (p, f) => setTimeout(f, d * p);
    requestAnimationFrame(() => requestAnimationFrame(() => o.classList.add('p0')));
    at(.1, () => o.classList.add('p1')); at(.4, () => o.classList.add('p2'));
    at(.66, () => { o.classList.remove('p2'); o.classList.add('p3'); flash(FX[r].c); if (r !== 'Rare') { document.body.classList.add('quake'); setTimeout(() => document.body.classList.remove('quake'), 700); } });
    at(.93, () => { o.classList.add('p4'); res(); });
    at(1, () => { o.remove(); if (cineAudio) { cineAudio.pause(); cineAudio = null; } });
  });
}

function openBooster() {
  let btn = document.querySelector('#openBooster'), pack = document.querySelector('#pack'); if (!btn || btn.disabled) return; btn.disabled = true;
  let list = Array.from({ length: CONFIG.boosterSlots }, drawCard);
  let seen = {}, picks = list.map(c => { let n = !state.owned[c.id] && !seen[c.id]; seen[c.id] = 1; return { c, isNew: n }; });
  for (let i = picks.length - 1; i > 0; i--) { let k = Math.floor(Math.random() * (i + 1));[picks[i], picks[k]] = [picks[k], picks[i]]; }
  
  state.lastOpened = Date.now(); state.boosters++;
  picks.forEach(({ c }) => {
    state.owned[c.id] = (state.owned[c.id] || 0) + 1;
    if (c.rarity === 'Légendaire') state.legendaries++;
    saveCardToSupabase(c.id);
  });
  save();

  pack.classList.add('opening'); sound(200); setTimeout(() => sound(300), 450); setTimeout(() => sound(450), 900);
  setTimeout(() => {
    flash('#fff'); sound(660); btn.remove(); document.querySelector('.booster-stage').style.display = 'none';
    let area = document.querySelector('#revealArea');
    area.innerHTML = `<div class="section-head"><h2>Votre tirage</h2><span class="meta" id="revealCount">0 / ${picks.length} révélées</span></div><p class="hint">Touchez une carte pour la révéler</p><div class="reveal-grid">${picks.map(pickCard).join('')}</div><div class="reveal-actions"><button class="cta secondary" id="revealAll">Tout révéler</button></div>`;
    let done = 0, busy = false;
    const reveal = (pick, fast) => new Promise(res => {
      let el = pick.querySelector('.flip-card'); if (busy || el.classList.contains('revealed')) { res(); return; } busy = true;
      let r = el.dataset.rarity, fx = FX[r], big = !!CINE[r], ms = fast ? 350 : fx.ms;
      const land = () => {
        el.classList.remove('charging'); el.classList.add('revealed'); pick.classList.add('done');
        el.insertAdjacentHTML('beforeend', '<i class="burst"></i><i class="burst b2"></i>'); if (!big) sound(fx.f);
        done++; document.querySelector('#revealCount').textContent = done + ' / ' + picks.length + ' révélées'; busy = false;
        if (done === picks.length) { document.querySelector('.reveal-actions').innerHTML = '<a class="cta" href="#collection">Voir ma collection <span>→</span></a>'; document.querySelector('.hint').textContent = 'Tirage terminé'; toast('Booster ouvert — votre collection s’agrandit.'); }
        res();
      };
      if (big) cinematic(el).then(land);
      else { el.style.setProperty('--charge', ms + 'ms'); el.classList.add('charging'); sound(fx.f / 2); setTimeout(() => sound(fx.f * .7), ms * .6); setTimeout(land, ms); }
    });
    area.querySelectorAll('.pick').forEach(p => p.querySelector('.flip-card').onclick = () => reveal(p, false));
    document.querySelector('#revealAll').onclick = async () => { for (let p of area.querySelectorAll('.pick')) await reveal(p, true); };
  }, 1400);
}

function collection() { return `<section class="view"><div class="eyebrow">Votre archive personnelle</div><h1>Ma collection</h1><p class="lead">Chaque carte raconte une bataille. Complétez le registre, une ouverture à la fois.</p><div class="section-head"><span class="meta">${ownedCount()} / ${CARD_DB.length} cartes uniques</span><span class="meta">${Math.round(ownedCount() / CARD_DB.length * 100)}%</span></div><div class="progress-line"><i style="width:${ownedCount() / CARD_DB.length * 100}%"></i></div><div class="filters"><input id="search" class="input" placeholder="Rechercher une carte…"><select id="ownedFilter" class="select"><option value="all">Toutes</option><option value="owned">Possédées</option><option value="missing">Manquantes</option></select><select id="sortFilter" class="select"><option value="number">Numéro</option><option value="name">Alphabétique</option></select></div><div id="collectionGrid" class="cards-grid"></div></section>`; }

function renderCollection() { let q = (document.querySelector('#search')?.value || '').toLowerCase(), o = document.querySelector('#ownedFilter')?.value || 'all', s = document.querySelector('#sortFilter')?.value || 'number', arr = CARD_DB.filter(c => (!q || c.name.toLowerCase().includes(q) || c.faction.toLowerCase().includes(q)) && (o === 'all' || o === 'owned' ? (o === 'all' || state.owned[c.id]) : !state.owned[c.id])).sort((a, b) => s === 'name' ? a.name.localeCompare(b.name) : a.id - b.id); document.querySelector('#collectionGrid').innerHTML = arr.map(c => cardTile(c, !state.owned[c.id], false, { imageOnly: true })).join(''); bindCards(); }

function registry() { return `<section class="view"><div class="eyebrow">Registre complet · Saison I</div><h1>Les cartes</h1><p class="lead">Un inventaire des héros, reines, monstres et conspirateurs de Westeros.</p><div class="filters">${RARITIES.map(r => `<span class="rarity-box ${rarityClass(r)}" style="min-height:auto;padding:12px 18px">${r}</span>`).join('')}</div><div class="cards-grid">${CARD_DB.map(c => cardTile(c, !state.owned[c.id])).join('')}</div></section>`; }

function profile() { let pct = Math.round(ownedCount() / CARD_DB.length * 100); return `<section class="view"><div class="eyebrow">Dossier du joueur</div><h1>Profil</h1><div class="panel profile-head"><div class="avatar">♜</div><div><h2>${currentUser ? currentUser.email : 'Gardien des archives'}</h2><p class="meta">${currentUser ? 'Compte Cloud Synchro' : 'Mode Invité (Local)'}</p></div></div><div class="panel" style="margin-top:14px"><div class="section-head"><h3>Progression de collection</h3><strong>${pct}%</strong></div><div class="progress-line"><i style="width:${pct}%"></i></div><span class="meta">${ownedCount()} cartes uniques sur ${CARD_DB.length}</span></div><div class="profile-grid"><div class="panel"><span class="meta">Boosters ouverts</span><div class="big-number">${state.boosters}</div></div><div class="panel"><span class="meta">Légendaires obtenues</span><div class="big-number">${state.legendaries}</div></div><div class="panel"><span class="meta">Cartes possédées</span><div class="big-number">${ownedCount()}</div></div><div class="panel"><span class="meta">Factions représentées</span><div class="big-number">${new Set(CARD_DB.filter(c => state.owned[c.id]).map(c => c.faction)).size}</div></div></div></section>`; }

function bindCards() { document.querySelectorAll('[data-card]').forEach(el => el.onclick = () => showCard(+el.dataset.card)); }

function showCard(id) { let c = CARD_DB.find(x => x.id === id); document.querySelector('#modalContent').innerHTML = `<div class="detail ${rarityClass(c.rarity)}"><div class="detail-art">${state.owned[id] ? imageMarkup(c) : '<span class=\"emoji-fallback\">🔒</span>'}</div><div><span class="eyebrow">${c.rarity} · #${c.cardNumber}</span><h2>${state.owned[id] ? c.name : 'Carte inconnue'}</h2><p class="meta">MAISON / FACTION : ${c.faction}</p><p class="lead">${state.owned[id] ? c.description : 'Cette carte n’a pas encore rejoint vos archives.'}</p><div class="panel"><span class="meta">Exemplaires possédés</span><div class="big-number">${state.owned[id] || 0}</div></div></div></div>`; document.querySelector('#cardModal').classList.add('open'); document.querySelector('#cardModal').setAttribute('aria-hidden', 'false'); }

function toast(msg) { let t = document.querySelector('#toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000); }

function sound(freq) { if (!soundOn) return; try { let a = new AudioContext(), o = a.createOscillator(), g = a.createGain(); o.frequency.value = freq; o.type = 'sine'; g.gain.value = .035; o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + .12); } catch (e) { } }

function route() { let view = location.hash.slice(1) || 'accueil', valid = ['accueil', 'booster', 'collection', 'profil']; if (!valid.includes(view)) view = 'accueil'; document.querySelector('#app').innerHTML = { accueil: home, booster, collection, profil: profile }[view](); document.querySelectorAll('.main-nav a').forEach(a => a.classList.toggle('active', a.dataset.view === view)); document.querySelector('#mainNav').classList.remove('open'); bindCards(); if (view === 'collection') { document.querySelectorAll('.filters select,.filters input').forEach(x => x.oninput = renderCollection); renderCollection(); } if (view === 'booster') { clearInterval(timerHandle); timerHandle = setInterval(() => { let t = document.querySelector('#timer'); if (t && remaining() > 0) t.textContent = timeString(remaining()); }, 1000); document.querySelector('#openBooster')?.addEventListener('click', openBooster); document.querySelector('#pack')?.addEventListener('click', () => document.querySelector('#openBooster')?.click()); } }

// LOGIQUE AUTHENTIFICATION
let isSignUpMode = false;

function setupAuthUI() {
  const authBtn = document.querySelector('#authBtn');
  const authModal = document.querySelector('#authModal');
  const closeBtns = [document.querySelector('#closeAuthModal'), document.querySelector('#closeAuthModalBtn')];
  const authForm = document.querySelector('#authForm');
  const toggleAuthMode = document.querySelector('#toggleAuthMode');

  authBtn.onclick = () => {
    if (currentUser) {
      supabase.auth.signOut().then(() => {
        currentUser = null;
        updateUserUI();
        toast('Déconnecté avec succès');
      });
    } else {
      authModal.classList.add('open');
    }
  };

  closeBtns.forEach(btn => btn.onclick = () => authModal.classList.remove('open'));

  toggleAuthMode.onclick = () => {
    isSignUpMode = !isSignUpMode;
    document.querySelector('#authTitle').textContent = isSignUpMode ? "S'inscrire" : "Se connecter";
    document.querySelector('#authSubmitBtn').textContent = isSignUpMode ? "S'inscrire" : "Se connecter";
    toggleAuthMode.textContent = isSignUpMode ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? S'inscrire";
  };

  authForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#authEmail').value;
    const password = document.querySelector('#authPassword').value;

    if (isSignUpMode) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) toast('Erreur : ' + error.message);
      else {
        toast('Compte créé ! Vérifiez votre email.');
        authModal.classList.remove('open');
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast('Erreur : ' + error.message);
      else {
        currentUser = data.user;
        updateUserUI();
        syncFromSupabase();
        authModal.classList.remove('open');
        toast('Connecté !');
      }
    }
  };
}

function updateUserUI() {
  const userDisplay = document.querySelector('#userDisplay');
  const authBtn = document.querySelector('#authBtn');
  if (currentUser) {
    userDisplay.textContent = currentUser.email.split('@')[0].toUpperCase();
    authBtn.textContent = 'Déconnexion';
  } else {
    userDisplay.textContent = 'INVITÉ';
    authBtn.textContent = 'Connexion';
  }
}

// INITIALISATION DE LA SESSION
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    currentUser = session.user;
    updateUserUI();
    syncFromSupabase();
  }
});

document.addEventListener('click', e => { if (e.target.matches('[data-close-modal]')) { document.querySelector('#cardModal').classList.remove('open'); } });
document.querySelector('#menuToggle').onclick = () => document.querySelector('#mainNav').classList.toggle('open');
document.querySelector('#soundBtn').onclick = () => { soundOn = !soundOn; document.querySelector('#soundBtn').classList.toggle('is-off', !soundOn); toast(soundOn ? 'Son activé' : 'Son coupé'); };
window.addEventListener('hashchange', route);

setupAuthUI();
route();