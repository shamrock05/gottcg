/* IRON COLLECTION — données et logique de jeu avec synchronisation Supabase */

// CONFIGURATION SUPABASE
const SUPABASE_URL = 'https://fyyuqdgksecdecrdquix.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_D8WeUT8Qn5JFej3HhyO2FQ_rkuiilor';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const CONFIG = { cooldownMs: 5 * 60 * 1000, boosterSlots: 3, storageKey: 'iron-collection-state-v3' };

const CARD_DB = [
  ["Aerys Targaryen", "Secrète", "Targaryen", "🐉", "Le Roi Fou, dernier dragon avant la rébellion.", "images/1-8-aerys.webp", "Robert's Rebellion", 0.5],
  ["Tywin Lannister", "Secrète", "Lannister", "🦁", "Le lion de Castral Roc, stratège impitoyable.", "images/2-8-tywin.webp", "Robert's Rebellion", 0.5],
  ["Gregor Clegane", "Secrète", "Clegane", "⚔️", "La Montagne, colosse de la maison Clegane.", "images/3-8-gregor.webp", "Robert's Rebellion", 0.5],
  ["Arthur Dayne", "Secrète", "Dayne", "🗡️", "L’Épée du Matin, le plus noble des chevaliers.", "images/4-8-arthur.webp", "Robert's Rebellion", 0.5],
  ["Jaime Lannister", "Secrète", "Lannister", "🦁", "Le jeune Régicide, chevalier de la Garde Royale.", "images/5-8-kingslayer.webp", "Robert's Rebellion", 0.5],
  ["Ned Stark", "Secrète", "Stark", "🐺", "Le jeune loup du Nord, lié par l’honneur.", "images/6-8-ned.webp", "Robert's Rebellion", 0.5],
  ["Robert Baratheon", "Secrète", "Baratheon", "🦌", "Le cerf couronné, forgé par la rébellion.", "images/7-8-robert.webp", "Robert's Rebellion", 0.5],
  ["Rhaegar Targaryen", "Secrète", "Targaryen", "🐉", "Le prince dragon, héritier de la dynastie.", "images/8-8-rhaegar.webp", "Robert's Rebellion", 0.5],
  ["Daenerys Targaryen", "Légendaire", "Targaryen", "🐉", "La Mère des Dragons, née de la tempête.", "images/1-81-daenerys.webp", "ASOIAF", 1.5],
  ["Aerys II Targaryen", "Commune", "Targaryen", "🐉", "Aerys II Targaryen · Targaryen. Une figure des archives de Westeros.", "images/2-81-aerys.webp", "ASOIAF", 80.0],
  ["Rhaegar Targaryen", "Commune", "Targaryen", "🐉", "Le prince dragon dans une autre chronique.", "images/3-81-rhaegar.webp", "ASOIAF", 80.0],
  ["Jon Snow", "Légendaire", "Stark", "🐺", "Le bâtard du Nord qui ne plie jamais le genou.", "images/4-81-jon.webp", "ASOIAF", 1.5],
  ["Lyanna Stark", "Commune", "Stark", "🐺", "Une louve du Nord au destin légendaire.", "images/5-81-lyanna.webp", "ASOIAF", 80.0],
  ["Khal Drogo", "Épique", "Dothraki", "🏇", "Sang de mon sang, seigneur du grand khalasar.", "images/6-81-drogo.webp", "ASOIAF", 5.0],
  ["Ned Stark", "Épique", "Stark", "🐺", "Le seigneur de Winterfell, gardien de l’honneur.", "images/7-81-ned.webp", "ASOIAF", 5.0],
  ["Sansa Stark", "Rare", "Stark", "🐺", "Une reine forgée par l’hiver.", "images/8-81-sansa.webp", "ASOIAF", 13.5],
  ["Arya Stark", "Rare", "Stark", "🐺", "Personne. Mais toujours quelqu’un.", "images/9-81-arya.webp", "ASOIAF", 13.5],
  ["Bran Stark", "Épique", "Stark", "🐺", "Le passé, le présent et ce qui vient.", "images/10-81-bran.webp", "ASOIAF", 5.0],
  ["Robb Stark", "Épique", "Stark", "🐺", "Robb Stark · Stark. Une figure des archives de Westeros.", "images/11-81-robb.webp", "ASOIAF", 5.0],
  ["Catelyn Stark", "Commune", "Stark", "🐺", "Catelyn Stark · Stark. Une figure des archives de Westeros.", "images/12-81-catelyn.webp", "ASOIAF", 80.0],
  ["Benjen Stark", "Commune", "Stark", "🐺", "Benjen Stark · Stark. Une figure des archives de Westeros.", "images/13-81-benjen.webp", "ASOIAF", 80.0],
  ["Rickon Stark", "Commune", "Stark", "🐺", "Rickon Stark · Stark. Une figure des archives de Westeros.", "images/14-81-rickon.webp", "ASOIAF", 80.0],
  ["Jojen Reed", "Commune", "Reed", "⚔️", "Jojen Reed · Reed. Une figure des archives de Westeros.", "images/15-81-jojen.webp", "ASOIAF", 80.0],
  ["Meera Reed", "Commune", "Reed", "⚔️", "Meera Reed · Reed. Une figure des archives de Westeros.", "images/16-81-meera.webp", "ASOIAF", 80.0],
  ["Hodor", "Épique", "Stark", "🐺", "Hodor · Stark. Une figure des archives de Westeros.", "images/17-81-hodor.webp", "ASOIAF", 5.0],
  ["Osha", "Commune", "Peuple libre", "🪓", "Osha · Peuple libre. Une figure des archives de Westeros.", "images/18-81-osha.webp", "ASOIAF", 80.0],
  ["Talisa Maegyr", "Commune", "Maegyr", "⚔️", "Talisa Maegyr · Maegyr. Une figure des archives de Westeros.", "images/19-81-talisa.webp", "ASOIAF", 80.0],
  ["Tywin Lannister", "Légendaire", "Lannister", "🦁", "Tywin Lannister · Lannister. Une figure des archives de Westeros.", "images/20-81-tywin.webp", "ASOIAF", 1.5],
  ["Cersei Lannister", "Légendaire", "Lannister", "🦁", "Cersei Lannister · Lannister. Une figure des archives de Westeros.", "images/21-81-cersei.webp", "ASOIAF", 1.5],
  ["Jaime Lannister", "Légendaire", "Lannister", "🦁", "Jaime Lannister · Lannister. Une figure des archives de Westeros.", "images/22-81-jaime.webp", "ASOIAF", 1.5],
  ["Tyrion Lannister", "Légendaire", "Lannister", "🦁", "Tyrion Lannister · Lannister. Une figure des archives de Westeros.", "images/23-81-tyrion.webp", "ASOIAF", 1.5],
  ["Kevan Lannister", "Commune", "Lannister", "🦁", "Kevan Lannister · Lannister. Une figure des archives de Westeros.", "images/24-81-kevan.webp", "ASOIAF", 80.0],
  ["Lancel Lannister", "Commune", "Lannister", "🦁", "Lancel Lannister · Lannister. Une figure des archives de Westeros.", "images/25-81-lancel.webp", "ASOIAF", 80.0],
  ["Ilyn Payne", "Rare", "Payne", "⚔️", "Le bourreau muet du roi, dont l’épée ne manque jamais sa cible.", "images/26-81-ilyn.webp", "ASOIAF", 13.5],
  ["Robert Baratheon", "Rare", "Baratheon", "🦌", "Robert Baratheon · Baratheon. Une figure des archives de Westeros.", "images/27-81-robert.webp", "ASOIAF", 13.5],
  ["Stannis Baratheon", "Légendaire", "Baratheon", "🦌", "Stannis Baratheon · Baratheon. Une figure des archives de Westeros.", "images/28-81-stannis.webp", "ASOIAF", 1.5],
  ["Renly Baratheon", "Rare", "Baratheon", "🦌", "Renly Baratheon · Baratheon. Une figure des archives de Westeros.", "images/29-81-renly.webp", "ASOIAF", 13.5],
  ["Joffrey Baratheon", "Épique", "Baratheon", "🦌", "Joffrey Baratheon · Baratheon. Une figure des archives de Westeros.", "images/30-81-joffrey.webp", "ASOIAF", 5.0],
  ["Myrcella Baratheon", "Commune", "Baratheon", "🦌", "Myrcella Baratheon · Baratheon. Une figure des archives de Westeros.", "images/31-81-myrcella.webp", "ASOIAF", 80.0],
  ["Tommen Baratheon", "Rare", "Baratheon", "🦌", "Tommen Baratheon · Baratheon. Une figure des archives de Westeros.", "images/32-81-tommen.webp", "ASOIAF", 13.5],
  ["Shireen Baratheon", "Commune", "Baratheon", "🦌", "Shireen Baratheon · Baratheon. Une figure des archives de Westeros.", "images/33-81-shireen.webp", "ASOIAF", 80.0],
  ["Petyr Baelish", "Légendaire", "Baelish", "⚔️", "Petyr Baelish · Baelish. Une figure des archives de Westeros.", "images/34-81-littlefinger.webp", "ASOIAF", 1.5],
  ["Varys", "Légendaire", "Conseil restreint", "⚔️", "Varys · Conseil restreint. Une figure des archives de Westeros.", "images/35-81-varys.webp", "ASOIAF", 1.5],
  ["Melisandre", "Épique", "R'hllor", "⚔️", "Melisandre · R'hllor. Une figure des archives de Westeros.", "images/36-81-melisandre.webp", "ASOIAF", 5.0],
  ["Sandor Clegane", "Épique", "Clegane", "⚔️", "Sandor Clegane · Clegane. Une figure des archives de Westeros.", "images/37-81-sandor.webp", "ASOIAF", 5.0],
  ["Gregor Clegane", "Épique", "Clegane", "⚔️", "Gregor Clegane · Clegane. Une figure des archives de Westeros.", "images/38-81-gregor.webp", "ASOIAF", 5.0],
  ["Oberyn Martell", "Épique", "Martell", "☀️", "Oberyn Martell · Martell. Une figure des archives de Westeros.", "images/39-81-oberyn.webp", "ASOIAF", 5.0],
  ["Ellaria Sand", "Commune", "Martell", "☀️", "Ellaria Sand · Martell. Une figure des archives de Westeros.", "images/40-81-ellaria.webp", "ASOIAF", 80.0],
  ["Olenna Tyrell", "Épique", "Tyrell", "🌹", "Olenna Tyrell · Tyrell. Une figure des archives de Westeros.", "images/41-81-ollena.webp", "ASOIAF", 5.0],
  ["Margaery Tyrell", "Légendaire", "Tyrell", "🌹", "Margaery Tyrell · Tyrell. Une figure des archives de Westeros.", "images/42-81-margaery.webp", "ASOIAF", 1.5],
  ["Loras Tyrell", "Rare", "Tyrell", "🌹", "Loras Tyrell · Tyrell. Une figure des archives de Westeros.", "images/43-81-loras.webp", "ASOIAF", 13.5],
  ["Jorah Mormont", "Épique", "Mormont", "🐻", "Jorah Mormont · Mormont. Une figure des archives de Westeros.", "images/44-81-jorah.webp", "ASOIAF", 5.0],
  ["Bronn", "Épique", "Mercenaires", "⚔️", "Bronn · Mercenaires. Une figure des archives de Westeros.", "images/45-81-bronn.webp", "ASOIAF", 5.0],
  ["Davos Mervault", "Épique", "Mervault", "⚔️", "Davos Mervault · Mervault. Une figure des archives de Westeros.", "images/46-81-davos.webp", "ASOIAF", 5.0],
  ["Theon Greyjoy", "Épique", "Greyjoy", "🐙", "Theon Greyjoy · Greyjoy. Une figure des archives de Westeros.", "images/47-81-theon.webp", "ASOIAF", 5.0],
  ["Yara Greyjoy", "Rare", "Greyjoy", "🐙", "Yara Greyjoy · Greyjoy. Une figure des archives de Westeros.", "images/48-81-yara.webp", "ASOIAF", 13.5],
  ["Brienne de Torth", "Épique", "Tarth", "⚔️", "Brienne de Torth · Tarth. Une figure des archives de Westeros.", "images/49-81-brienne.webp", "ASOIAF", 5.0],
  ["Podrick Payne", "Rare", "Payne", "⚔️", "Podrick Payne · Payne. Une figure des archives de Westeros.", "images/50-81-podrick.webp", "ASOIAF", 13.5],
  ["Tormund", "Épique", "Peuple libre", "🪓", "Tormund · Peuple libre. Une figure des archives de Westeros.", "images/51-81-tormund.webp", "ASOIAF", 5.0],
  ["Brynden Tully", "Rare", "Tully", "🐟", "Brynden Tully · Tully. Une figure des archives de Westeros.", "images/52-81-brynden.webp", "ASOIAF", 13.5],
  ["Walder Frey", "Commune", "Frey", "🌉", "Walder Frey · Frey. Une figure des archives de Westeros.", "images/53-81-walder.webp", "ASOIAF", 80.0],
  ["Edmure Tully", "Commune", "Tully", "🐟", "Edmure Tully · Tully. Une figure des archives de Westeros.", "images/54-81-edmure.webp", "ASOIAF", 80.0],
  ["Barristan Selmy", "Épique", "Selmy", "⚔️", "Barristan Selmy · Selmy. Une figure des archives de Westeros.", "images/55-81-barristan.webp", "ASOIAF", 5.0],
  ["Ver Gris", "Épique", "Immaculés", "⚔️", "Ver Gris · Immaculés. Une figure des archives de Westeros.", "images/56-81-ver.webp", "ASOIAF", 5.0],
  ["Missandei", "Épique", "Naath", "⚔️", "Missandei · Naath. Une figure des archives de Westeros.", "images/57-81-missandei.webp", "ASOIAF", 5.0],
  ["Daario Naharis", "Rare", "Mercenaires", "⚔️", "Daario Naharis · Mercenaires. Une figure des archives de Westeros.", "images/58-81-daario.webp", "ASOIAF", 13.5],
  ["Drogon", "Légendaire", "Targaryen", "🐉", "Drogon · Targaryen. Une figure des archives de Westeros.", "images/59-81-drogon.webp", "ASOIAF", 1.5],
  ["Rhaegal", "Légendaire", "Targaryen", "🐉", "Rhaegal · Targaryen. Une figure des archives de Westeros.", "images/60-81-rhaegal.webp", "ASOIAF", 1.5],
  ["Viserion", "Légendaire", "Targaryen", "🐉", "Viserion · Targaryen. Une figure des archives de Westeros.", "images/61-81-viserion.webp", "ASOIAF", 1.5],
  ["Gilly", "Commune", "Peuple libre", "🪓", "Gilly · Peuple libre. Une figure des archives de Westeros.", "images/62-81-gilly.webp", "ASOIAF", 80.0],
  ["Ramsay Bolton", "Épique", "Bolton", "🩸", "Ramsay Bolton · Bolton. Une figure des archives de Westeros.", "images/63-81-ramsay.webp", "ASOIAF", 5.0],
  ["Roose Bolton", "Commune", "Bolton", "🩸", "Roose Bolton · Bolton. Une figure des archives de Westeros.", "images/64-81-roose.webp", "ASOIAF", 80.0],
  ["Euron Greyjoy", "Rare", "Greyjoy", "🐙", "Euron Greyjoy · Greyjoy. Une figure des archives de Westeros.", "images/65-81-euron.webp", "ASOIAF", 13.5],
  ["Balon Greyjoy", "Commune", "Greyjoy", "🐙", "Balon Greyjoy · Greyjoy. Une figure des archives de Westeros.", "images/66-81-balon.webp", "ASOIAF", 80.0],
  ["Grand Mestre Pycelle", "Épique", "Citadelle", "⚔️", "Grand Mestre Pycelle · Citadelle. Une figure des archives de Westeros.", "images/67-81-pycelle.webp", "ASOIAF", 5.0],
  ["Qyburn", "Rare", "Citadelle", "⚔️", "Qyburn · Citadelle. Une figure des archives de Westeros.", "images/68-81-qyburn.webp", "ASOIAF", 13.5],
  ["Le Grand Moineau", "Commune", "Foi des Sept", "⚔️", "Le Grand Moineau · Foi des Sept. Une figure des archives de Westeros.", "images/69-81-moineau.webp", "ASOIAF", 80.0],
  ["Samwell Tarly", "Épique", "Tarly", "🏹", "Samwell Tarly · Tarly. Une figure des archives de Westeros.", "images/70-81-samwell.webp", "ASOIAF", 5.0],
  ["Jeor Mormont", "Commune", "Mormont", "🐻", "Jeor Mormont · Mormont. Une figure des archives de Westeros.", "images/71-81-jeor.webp", "ASOIAF", 80.0],
  ["Mestre Aemon", "Commune", "Garde de Nuit", "🛡️", "Mestre Aemon · Garde de Nuit. Une figure des archives de Westeros.", "images/72-81-aemon.webp", "ASOIAF", 80.0],
  ["Mance Rayder", "Commune", "Peuple libre", "🪓", "Mance Rayder · Peuple libre. Une figure des archives de Westeros.", "images/73-81-mance.webp", "ASOIAF", 80.0],
  ["Quhorin Mimain", "Commune", "Garde de Nuit", "🛡️", "Quhorin Mimain · Garde de Nuit. Une figure des archives de Westeros.", "images/74-81-quhorin.webp", "ASOIAF", 80.0],
  ["Alliser Thorne", "Commune", "Garde de Nuit", "🛡️", "Alliser Thorne · Garde de Nuit. Une figure des archives de Westeros.", "images/75-81-alliser.webp", "ASOIAF", 80.0],
  ["Randyll Tarly", "Commune", "Tarly", "🏹", "Randyll Tarly · Tarly. Une figure des archives de Westeros.", "images/76-81-randyll.webp", "ASOIAF", 80.0],
  ["Doran Martell", "Commune", "Martell", "☀️", "Doran Martell · Martell. Une figure des archives de Westeros.", "images/77-81-doran.webp", "ASOIAF", 80.0],
  ["Obara Sand", "Commune", "Martell", "☀️", "Obara Sand · Martell. Une figure des archives de Westeros.", "images/78-81-obara.webp", "ASOIAF", 80.0],
  ["Nymeria Sand", "Commune", "Martell", "☀️", "Nymeria Sand · Martell. Une figure des archives de Westeros.", "images/79-81-nymeria.webp", "ASOIAF", 80.0],
  ["Tyene Sand", "Commune", "Martell", "☀️", "Tyene Sand · Martell. Une figure des archives de Westeros.", "images/80-81-tyene.webp", "ASOIAF", 80.0],
  ["Le Roi de la Nuit", "Secrète", "Marcheurs Blancs", "❄️", "Le Roi de la Nuit · Marcheurs Blancs. Une figure des archives de Westeros.", "images/81-81-the-night-king.webp", "ASOIAF", 0.5],
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
  const { data, error } = await supabaseClient
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
  await supabaseClient.from('user_cards').insert([{ user_id: currentUser.id, card_id: cardId }]);
}

function rarityClass(r) { return { 'Commune': 'common', 'Peu commune': 'uncommon', 'Rare': 'rare', 'Épique': 'epic', 'Légendaire': 'legendary', 'Secrète': 'secret' }[r] || 'common'; }
function ownedCount() { return Object.keys(state.owned).filter(id => state.owned[id] > 0).length; }

/* ---------- Images : webp + chargement optimisé ---------- */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const preloaded = new Set();

function fallbackSvg(emoji) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><rect width="300" height="400" fill="#121a2e"/><text x="150" y="230" text-anchor="middle" font-size="92">${emoji}</text></svg>`);
}

/* Si un .webp est introuvable : on tente .png puis .jpg, puis l'emoji de la carte */
function imgFail(el) {
  const s = el.getAttribute('src') || '';
  const m = s.match(/\.(webp|png|jpg)$/);
  if (m && !s.startsWith('data:')) {
    const next = { webp: 'png', png: 'jpg' }[m[1]];
    if (next) { el.src = s.replace(/\.\w+$/, '.' + next); return; }
  }
  el.onerror = null;
  if (el.dataset.emoji) el.src = fallbackSvg(el.dataset.emoji);
}

/* Précharge + décode une image en arrière-plan (utilisé avant les révélations) */
function preloadImg(src) {
  if (preloaded.has(src)) return;
  preloaded.add(src);
  const i = new Image(); i.decoding = 'async'; i.src = src;
  if (i.decode) i.decode().catch(() => { });
}

function imageMarkup(c, hidden = false, opts = {}) {
  const emoji = hidden ? '🔒' : c.emoji;
  const loading = opts.eager ? 'fetchpriority="high"' : 'loading="lazy"';
  return `<img class="card-img" src="${c.image}" alt="" aria-hidden="true" width="300" height="400" decoding="async" ${loading} data-emoji="${emoji}" onload="this.classList.add('loaded')" onerror="imgFail(this)">`;
}

/* Images hors cartes (posters, booster, logo) : décodage async, lazy sauf hero/booster, repli de format */
function optimizeImages(root = document) {
  root.querySelectorAll('img:not(.card-img)').forEach(img => {
    img.decoding = 'async';
    const eager = img.closest('.hero-collage, .booster-stage, .topbar, .flip-front, .cine');
    if (!eager) img.loading = 'lazy';
    if (img.matches('.hero-collage .c1')) img.fetchPriority = 'high';
    if (!img.dataset.opt) {
      img.dataset.opt = '1';
      img.addEventListener('error', () => imgFail(img));
      if (img.complete && !img.naturalWidth && img.getAttribute('src')) imgFail(img);
    }
  });
}

function cardTile(c, locked = false, showRarity = true, options = {}) {
  /* Carte non débloquée : simple carré noir, aucune image n'est chargée */
  const art = locked
    ? '<div class="card-art"><span class="black-card" aria-hidden="true"></span></div>'
    : `<div class="card-art">${imageMarkup(c)}</div>`;
  const cls = `card-tile ${options.imageOnly ? 'image-only ' : ''}${rarityClass(c.rarity)} ${locked ? 'lock' : ''}`;
  if (options.imageOnly) return `<article class="${cls}" data-card="${c.id}" aria-label="${locked ? 'Carte verrouillée' : c.name}">${art}</article>`;
  return `<article class="${cls}" data-card="${c.id}">${art}<div class="card-info"><strong>${locked ? '???' : c.name}</strong>${showRarity ? `<small>${locked ? 'Carte manquante' : c.rarity + ' · #' + c.cardNumber}</small>` : ''}</div></article>`;
}

function stats() { return `<div class="stats-strip"><div class="stat"><strong data-count="${CARD_DB.length}">${CARD_DB.length}</strong><span>Cartes disponibles</span></div><div class="stat"><strong><i data-count="${ownedCount()}">${ownedCount()}</i><small> / ${CARD_DB.length}</small></strong><span>Cartes possédées</span></div><div class="stat"><strong data-count="${state.boosters}">${state.boosters}</strong><span>Boosters ouverts</span></div></div>`; }

function home() { return `<section class="view"><div class="hero"><div class="hero-copy"><div class="eyebrow">Archives de Westeros · Saison I</div><h1>La guerre des<br><em>trônes</em> est dans vos mains.</h1><p class="lead">Collectionnez les figures qui ont façonné les Sept Couronnes. Ouvrez un booster. Écrivez votre propre légende.</p><a class="cta" href="#booster">Ouvrir un booster <span>→</span></a></div><div class="hero-collage" aria-hidden="true"><img class="c2" src="images/poster-herald.webp" alt=""><img class="c1" src="images/poster-jon.webp" alt=""><img class="c3" src="images/poster-daemon.webp" alt=""></div></div><div class="ticker"><span>Winter is coming ◆ Fire and blood ◆ Hear me roar ◆ The North remembers ◆ Winter is coming ◆ Fire and blood ◆ Hear me roar ◆ The North remembers ◆</span></div>${stats()}<div class="herald"><img src="images/poster-herald.webp" alt="Édition spéciale du Westeros Herald"><div><div class="eyebrow">Édition spéciale</div><h2>Le Westeros Herald</h2><p class="lead">Scandales, trahisons et dragons. Quand on joue au jeu des trônes, on gagne ou on meurt.</p><a class="cta" href="#collection">Voir ma collection <span>→</span></a></div></div><div class="section-head"><div><div class="eyebrow">Cinq niveaux de pouvoir</div><h2>Les raretés</h2></div></div><div class="rarity-row">${RARITIES.map(r => `<div class="rarity-box ${rarityClass(r)}"><div class="eyebrow">${r === 'Légendaire' ? '✦' : r === 'Secrète' ? '❖' : ''}</div><strong>${r}</strong><p>${({ Commune: 'Les fondations.', Secrète: 'Connue de quelques-uns seulement.', Rare: 'Le destin se révèle.', Épique: 'Les grands noms.', Légendaire: 'Une place dans l’histoire.' })[r]}</p></div>`).join('')}</div></section>`; }

function remaining() { return Math.max(0, CONFIG.cooldownMs - (Date.now() - state.lastOpened)); }
function timeString(ms) { let s = Math.ceil(ms / 1000), m = Math.floor(s / 60); return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }

function booster() {
  const left = remaining(), ready = left <= 0;
  return `<section class="view booster-view ${ready ? '' : 'cooldown'}"><div class="eyebrow intro">Rituel d’ouverture · 3 cartes par booster</div><h1 class="intro">Le prochain tirage</h1><p class="lead intro" style="margin:15px auto">Brisez le sceau. Trois cartes vous attendent, face cachée. À vous de les révéler, une par une.</p><div class="booster-stage">${stageEmbers()}<span class="stage-flare"></span><div class="booster-pack" id="pack" role="button" tabindex="0" aria-label="Ouvrir le booster"><span class="pack-glow"></span><span class="pack-shadow"></span><div class="pack-float"><div class="pack-tilt"><img class="pack-img" src="images/booster.webp" alt="Booster Westeros TCG" decoding="async" draggable="false"><span class="pack-foil"></span><span class="pack-glare"></span></div></div><i class="tw" style="--x:-10%;--y:14%;--s:18px;--d:0s"></i><i class="tw" style="--x:104%;--y:22%;--s:14px;--d:.8s"></i><i class="tw" style="--x:-6%;--y:70%;--s:12px;--d:1.5s"></i><i class="tw" style="--x:100%;--y:78%;--s:20px;--d:2.1s"></i><i class="tw" style="--x:46%;--y:-8%;--s:14px;--d:1.1s"></i></div></div><div class="timer ${ready ? 'ready' : ''}" id="timer">${ready ? 'PRÊT À OUVRIR' : timeString(left)}</div><button id="openBooster" class="cta" ${ready ? '' : 'disabled'}>${ready ? 'Ouvrir le booster' : 'Le prochain booster arrive'}</button><div id="revealArea"></div></section>`;
}

const FX = { 'Commune': { ms: 700, f: 392, c: '#a3a3a3' }, 'Peu commune': { ms: 800, f: 440, c: '#5fc5ae' }, 'Rare': { ms: 1000, f: 523, c: '#51a8e7' }, 'Épique': { ms: 1400, f: 659, c: '#bd75ed' }, 'Légendaire': { ms: 2000, f: 880, c: '#e6a63d' }, 'Secrète': { ms: 2000, f: 988, c: '#ff4fd8' } };
const CINE = { 'Rare': { d: 6000, n: 18 }, 'Épique': { d: 6500, n: 30 }, 'Légendaire': { d: 7000, n: 44 }, 'Secrète': { d: 8000, n: 64 } };
let cineAudio = null, lastOpening = 0; const OPENING_SOUNDS = 4;

function pickOpeningSound() { let n; do { n = 1 + Math.floor(Math.random() * OPENING_SOUNDS); } while (n === lastOpening && OPENING_SOUNDS > 1); lastOpening = n; return `sounds/ouverture${n}.mp3`; }
/* ---------- Utilitaires & moteur de particules (canvas) ---------- */
const MOBILE = window.matchMedia('(max-width: 800px)').matches;
const LITE = MOBILE || window.matchMedia('(pointer: coarse)').matches || (navigator.hardwareConcurrency || 8) <= 2;
const wait = ms => new Promise(r => setTimeout(r, ms));

const FXC = (() => {
  let cv, ctx, W = 0, H = 0, dpr = 1, parts = [], raf = 0, last = 0;
  const TAU = Math.PI * 2, R = (a, b) => a + Math.random() * (b - a);

  function init() {
    if (cv) return;
    cv = document.createElement('canvas'); cv.id = 'fxCanvas'; cv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cv); ctx = cv.getContext('2d'); resize();
    window.addEventListener('resize', resize);
  }
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, LITE ? 1 : 1.5); W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function add(p) {
    init();
    if (parts.length > 420) parts.shift();
    p.max = p.life; parts.push(p);
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
  }
  function loop(t) {
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    ctx.clearRect(0, 0, W, H); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]; p.life -= dt;
      if (p.life <= 0) { parts.splice(i, 1); continue; }
      const k = 1 - p.life / p.max;
      ctx.fillStyle = ctx.strokeStyle = p.c === 'rainbow' ? `hsl(${(p.h + k * 260) % 360} 100% 62%)` : p.c;
      if (p.k === 'streak') {            // étincelle filante
        p.vx -= p.vx * p.drag * dt; p.vy -= p.vy * p.drag * dt; p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt;
        ctx.globalAlpha = Math.min(1, (1 - k) * 1.5); ctx.lineWidth = p.s;
        ctx.beginPath(); ctx.moveTo(p.x - p.vx * .035, p.y - p.vy * .035); ctx.lineTo(p.x, p.y); ctx.stroke();
      } else if (p.k === 'dot') {        // point lumineux (traînée du curseur)
        p.vx -= p.vx * p.drag * dt; p.vy -= p.vy * p.drag * dt; p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt;
        const a = 1 - k; if (!LITE) { ctx.globalAlpha = a * .3; ctx.beginPath(); ctx.arc(p.x, p.y, p.s * 3.2, 0, TAU); ctx.fill(); }
        ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(p.x, p.y, p.s * (1 - k * .5), 0, TAU); ctx.fill();
      } else if (p.k === 'in') {         // particule aspirée vers une cible
        const e = k * k, x = p.sx + (p.tx - p.sx) * e, y = p.sy + (p.ty - p.sy) * e;
        ctx.globalAlpha = Math.sin(Math.min(1, k * 1.6) * Math.PI * .5) * (1 - e * .6);
        ctx.beginPath(); ctx.arc(x, y, p.s * (1 - e * .6), 0, TAU); ctx.fill();
        if (!LITE) { ctx.globalAlpha *= .3; ctx.beginPath(); ctx.arc(x, y, p.s * 3, 0, TAU); ctx.fill(); }
      } else if (p.k === 'ring') {       // onde de choc
        const e = 1 - Math.pow(1 - k, 3);
        ctx.globalAlpha = (1 - k) * .9; ctx.lineWidth = Math.max(.5, p.w * (1 - k));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.maxR * e, 0, TAU); ctx.stroke();
      } else if (p.k === 'ember') {      // braise montante
        p.x += (p.vx + Math.sin(k * 9 + p.ph) * 22) * dt; p.y += p.vy * dt;
        ctx.globalAlpha = Math.sin(k * Math.PI) * .9; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, TAU); ctx.fill();
        if (!LITE) { ctx.globalAlpha *= .25; ctx.beginPath(); ctx.arc(p.x, p.y, p.s * 3, 0, TAU); ctx.fill(); }
      }
    }
    if (parts.length) raf = requestAnimationFrame(loop);
    else { raf = 0; ctx.clearRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; }
  }
  const n = v => Math.max(1, Math.round(v * .6)); // même quantité sur PC et téléphone
  return {
    burst(x, y, o = {}) {
      const spread = o.spread || TAU;
      for (let i = 0; i < n(o.count || 60); i++) {
        const a = (o.angle === undefined ? R(0, TAU) : o.angle + R(-spread / 2, spread / 2)), sp = R(.35, 1) * (o.speed || 420);
        add({ k: 'streak', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, drag: o.drag ?? 2.2, g: o.gravity ?? 160, s: R(1.2, 3.2) * (o.size || 1), life: R(.6, 1.2) * (o.life || 1), c: o.color || '#fff', h: R(0, 360) });
      }
    },
    converge(x, y, o = {}) {
      for (let i = 0; i < n(o.count || 6); i++) {
        const a = R(0, TAU), d = R(.45, 1) * (o.radius || Math.min(W || innerWidth, H || innerHeight) * .5);
        add({ k: 'in', sx: x + Math.cos(a) * d, sy: y + Math.sin(a) * d, tx: x, ty: y, s: R(1.4, 3.2), life: R(.45, .9) * (o.life || 1), c: o.color || '#fff', h: R(0, 360) });
      }
    },
    ring(x, y, o = {}) { add({ k: 'ring', x, y, maxR: o.maxR || 400, w: o.width || 5, life: o.life || .9, c: o.color || '#fff', h: 0 }); },
    ember(o = {}) { add({ k: 'ember', x: R(0, innerWidth), y: innerHeight + 10, vx: R(-20, 20), vy: -R(50, 130), s: R(1.2, 3), life: R(3, 5.5), c: o.color || '#ff6a3d', h: R(0, 360), ph: R(0, TAU) }); },
    trail(x, y, o = {}) { add({ k: 'dot', x, y, vx: R(-30, 30), vy: R(-70, -20), drag: 1.2, g: -20, s: R(1, 2.4), life: R(.5, .9), c: o.color || '#fff', h: R(0, 360) }); },
    clear() { parts.length = 0; }
  };
})();

function flash(c, soft = false) { const f = document.createElement('div'); f.className = 'flash' + (soft ? ' soft' : ''); f.style.background = c; document.body.appendChild(f); setTimeout(() => f.remove(), 1300); return f; }

function pickCard(o, i) { let c = o.c; return `<div class="pick" data-i="${i}"><div class="flip-card ${rarityClass(c.rarity)}" data-rarity="${c.rarity}" data-id="${c.id}" style="animation-delay:${(i * .13 + .05).toFixed(2)}s"><div class="flip-inner"><div class="flip-front"><img src="images/logo.webp" alt="" onerror="imgFail(this)"><span>Touchez</span></div><div class="flip-back"><div class="reveal-image">${imageMarkup(c, false, { eager: true })}</div></div></div></div><div class="reveal-label ${rarityClass(c.rarity)}"><strong>${c.name}</strong><small>${c.rarity} · #${c.cardNumber}</small>${o.isNew ? '<em>Nouvelle !</em>' : ''}</div></div>`; }

function cinematic(el) {
  return new Promise(res => {
    const r = el.dataset.rarity, cfg = CINE[r], d = cfg.d, c = CARD_DB.find(x => x.id == el.dataset.id), col = FX[r].c, big = r !== 'Rare';
    const o = document.createElement('div'); o.className = 'cine ' + rarityClass(r);
    const letters = [...r].map((ch, i) => `<span style="--i:${i}">${ch}</span>`).join('');
    o.innerHTML = `<div class="cine-bg"></div><div class="cine-vignette"></div><div class="cine-stage"><div class="cine-rays"></div><div class="cine-rays r2"></div><div class="cine-card"><div class="cine-inner"><div class="cine-front"><img src="images/logo.webp" alt="" onerror="imgFail(this)"></div><div class="cine-back">${imageMarkup(c, false, { eager: true })}<i class="cine-shine"></i></div></div></div></div><div class="cine-flash"></div><div class="cine-title"><small>Rareté</small><strong>${letters}</strong><span>${c.name}</span></div><div class="cine-skip">Toucher pour passer</div>`;
    document.body.appendChild(o); document.body.classList.add('cine-open');

    const timers = [], ivs = [], t0 = Date.now(); let ended = false, audio = null;
    const at = (p, f) => timers.push(setTimeout(f, d * p));
    const centre = () => { const b = o.querySelector('.cine-card').getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; };
    const converge = (every, count) => ivs.push(setInterval(() => { const [x, y] = centre(); FXC.converge(x, y, { color: col, count, radius: Math.min(innerWidth, innerHeight) * .6 }); }, every));
    const embers = every => ivs.push(setInterval(() => FXC.ember({ color: col }), every));

    if (soundOn) { try { audio = cineAudio = new Audio(pickOpeningSound()); audio.volume = .9; audio.play().catch(() => { }); } catch (e) { } }

    const onKey = e => { if (['Escape', ' ', 'Enter'].includes(e.key) && Date.now() - t0 > 500) { e.preventDefault(); finish(); } };
    const finish = () => {
      if (ended) return; ended = true;
      const flipped = o.classList.contains('p3'), quick = !flipped || Date.now() - t0 < d * .95;
      timers.forEach(clearTimeout); ivs.forEach(clearInterval); document.removeEventListener('keydown', onKey);
      o.classList.remove('p2'); o.classList.add('p4'); res(flipped);
      fadeAudio(audio, quick ? 500 : 1000);
      setTimeout(() => { o.remove(); document.body.classList.remove('cine-open'); }, quick ? 700 : 1100);
    };
    document.addEventListener('keydown', onKey);
    o.addEventListener('click', () => { if (Date.now() - t0 > 700) finish(); });

    requestAnimationFrame(() => requestAnimationFrame(() => o.classList.add('p0')));
    at(.08, () => { o.classList.add('p1'); converge(100, Math.round(cfg.n / 12) + 1); embers(140); });                                  // la carte lévite, l'énergie afflue
    at(.40, () => { o.classList.add('p2'); ivs.forEach(clearInterval); ivs.length = 0; converge(45, Math.round(cfg.n / 7) + 2); embers(80); }); // tension maximale
    at(.66, () => {                                                                                                                  // révélation
      ivs.forEach(clearInterval); ivs.length = 0;
      o.classList.remove('p2'); o.classList.add('p3');
      const [x, y] = centre(), far = Math.max(innerWidth, innerHeight);
      if (big) o.querySelector('.cine-stage').classList.add('shake');
      FXC.ring(x, y, { color: col, maxR: far * .7, width: 9, life: 1.2 });
      timers.push(setTimeout(() => FXC.ring(x, y, { color: '#fff', maxR: far * .5, width: 4, life: .9 }), 160));
      FXC.burst(x, y, { color: col, count: cfg.n * 3, speed: 780, life: 1.4 });
      FXC.burst(x, y, { color: '#fff', count: cfg.n, speed: 520, life: 1 });
      if (r === 'Secrète') FXC.burst(x, y, { color: 'rainbow', count: 110, speed: 640, life: 1.4 });
      embers(90);
    });
    at(.93, finish);
  });
}

/* Déchire le paquet en deux moitiés (ligne zigzag) + faisceau de lumière */
function tearPack(pack) {
  const tilt = pack.querySelector('.pack-tilt'), img = pack.querySelector('.pack-img'), src = img.currentSrc || img.src;
  tilt.insertAdjacentHTML('beforeend', `<div class="pack-half top"><img src="${src}" alt=""></div><div class="pack-half bottom"><img src="${src}" alt=""></div><span class="pack-beam"></span><span class="pack-core"></span>`);
  pack.classList.remove('charging', 'hard'); pack.classList.add('torn');
}

async function openBooster() {
  const btn = document.querySelector('#openBooster'), pack = document.querySelector('#pack'), stage = document.querySelector('.booster-stage'), view = document.querySelector('.booster-view');
  if (!btn || btn.disabled || !pack) return; btn.disabled = true;

  let list = Array.from({ length: CONFIG.boosterSlots }, drawCard);
  list.forEach(c => preloadImg(c.image)); // décodées pendant l'animation du booster
  let seen = {}, picks = list.map(c => { let n = !state.owned[c.id] && !seen[c.id]; seen[c.id] = 1; return { c, isNew: n }; });
  for (let i = picks.length - 1; i > 0; i--) { let k = Math.floor(Math.random() * (i + 1)); [picks[i], picks[k]] = [picks[k], picks[i]]; }

  state.lastOpened = Date.now(); state.boosters++;
  picks.forEach(({ c }) => {
    state.owned[c.id] = (state.owned[c.id] || 0) + 1;
    if (c.rarity === 'Légendaire') state.legendaries++;
    saveCardToSupabase(c.id);
  });
  save();

  const centre = () => { const b = pack.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; };
  const small = Math.min(innerWidth, innerHeight);

  /* 1 — montée en tension : le paquet tremble, l'énergie est aspirée */
  pack.classList.remove('hover'); pack.classList.add('charging'); stage.classList.add('opening');
  sweep(150, 900, 1.3, .045);
  const conv = setInterval(() => { const [x, y] = centre(); FXC.converge(x, y, { color: Math.random() < .5 ? '#ff5a4f' : '#ffd27a', count: 5, radius: small * .5, life: .9 }); }, 60);
  await wait(600); pack.classList.add('hard');
  await wait(650); clearInterval(conv);

  /* 2 — déchirure : deux moitiés, faisceau, gerbe d'étincelles */
  tearPack(pack); stage.classList.add('burst');
  const [x, y] = centre();
  FXC.burst(x, y - pack.offsetHeight * .28, { color: '#ffd27a', count: 120, speed: 720, angle: -Math.PI / 2, spread: Math.PI * 1.2, life: 1.2 });
  FXC.burst(x, y, { color: '#fff', count: 60, speed: 480, life: .9 });
  FXC.ring(x, y, { color: '#ffd27a', maxR: small * .6, width: 6, life: 1 });
  sound(660); sweep(500, 1500, .5, .03, 'triangle');
  await wait(380);

  /* 3 — fondu au blanc, puis les cartes jaillissent depuis l'emplacement du paquet */
  flash('#fff', true);
  await wait(230);
  view.classList.add('revealing'); stage.style.display = 'none'; btn.remove();
  const area = document.querySelector('#revealArea');
  area.innerHTML = `<div class="section-head"><h2>Votre tirage</h2><span class="meta" id="revealCount">0 / ${picks.length} révélées</span></div><p class="hint">Touchez une carte pour la révéler</p><div class="reveal-grid">${picks.map(pickCard).join('')}</div><div class="reveal-actions"><button class="cta secondary" id="revealAll">Tout révéler</button></div>`;
  window.scrollTo({ top: Math.max(0, area.getBoundingClientRect().top + window.scrollY - 70), behavior: 'instant' });
  requestAnimationFrame(() => area.querySelectorAll('.flip-card').forEach(card => {
    const b = card.getBoundingClientRect();
    card.style.setProperty('--fx', (x - (b.left + b.width / 2)) + 'px');
    card.style.setProperty('--fy', (y - (b.top + b.height / 2)) + 'px');
    card.style.setProperty('--fr', (Math.random() * 40 - 20) + 'deg');
    card.classList.add('dealt');
  }));

  let done = 0, busy = false;
  const reveal = (pick, fast) => new Promise(res => {
    const el = pick.querySelector('.flip-card');
    if (busy || el.classList.contains('revealed') || !el.classList.contains('dealt')) { res(); return; } busy = true;
    const r = el.dataset.rarity, fx = FX[r], big = !!CINE[r], ms = fast ? 320 : fx.ms;
    const land = instant => {
      el.classList.remove('charging'); if (instant) el.classList.add('instant');
      el.classList.add('revealed'); pick.classList.add('done');
      const b = el.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
      FXC.burst(cx, cy, { color: fx.c, count: instant ? 26 : 46, speed: 360, life: .9 });
      if (!instant) FXC.ring(cx, cy, { color: fx.c, maxR: b.width * 1.3, width: 4, life: .8 });
      if (!big) sound(fx.f);
      done++; document.querySelector('#revealCount').textContent = done + ' / ' + picks.length + ' révélées'; busy = false;
      if (done === picks.length) { document.querySelector('.reveal-actions').innerHTML = '<a class="cta" href="#collection">Voir ma collection <span>→</span></a>'; document.querySelector('.hint').textContent = 'Tirage terminé'; toast('Booster ouvert — votre collection s’agrandit.'); }
      res();
    };
    if (big) cinematic(el).then(flipped => land(flipped));
    else { el.style.setProperty('--charge', ms + 'ms'); el.classList.add('charging'); sound(fx.f / 2); setTimeout(() => sound(fx.f * .7), ms * .6); setTimeout(() => land(false), ms); }
  });
  area.querySelectorAll('.pick').forEach(p => p.querySelector('.flip-card').onclick = () => reveal(p, false));
  document.querySelector('#revealAll').onclick = async () => { for (let p of area.querySelectorAll('.pick')) await reveal(p, true); };
}

function collection() { return `<section class="view"><div class="eyebrow">Votre archive personnelle</div><h1>Ma collection</h1><p class="lead">Chaque carte raconte une bataille. Complétez le registre, une ouverture à la fois.</p><div class="section-head"><span class="meta">${ownedCount()} / ${CARD_DB.length} cartes uniques</span><span class="meta">${Math.round(ownedCount() / CARD_DB.length * 100)}%</span></div><div class="progress-line"><i style="width:${ownedCount() / CARD_DB.length * 100}%"></i></div><div class="filters"><input id="search" class="input" placeholder="Rechercher une carte…"><select id="ownedFilter" class="select"><option value="all">Toutes</option><option value="owned">Possédées</option><option value="missing">Manquantes</option></select><select id="sortFilter" class="select"><option value="number">Numéro</option><option value="name">Alphabétique</option></select></div><div id="collectionGrid" class="cards-grid"></div></section>`; }

function renderCollection() { let q = (document.querySelector('#search')?.value || '').toLowerCase(), o = document.querySelector('#ownedFilter')?.value || 'all', s = document.querySelector('#sortFilter')?.value || 'number', arr = CARD_DB.filter(c => (!q || c.name.toLowerCase().includes(q) || c.faction.toLowerCase().includes(q)) && (o === 'all' || o === 'owned' ? (o === 'all' || state.owned[c.id]) : !state.owned[c.id])).sort((a, b) => s === 'name' ? a.name.localeCompare(b.name) : a.id - b.id); document.querySelector('#collectionGrid').innerHTML = arr.map(c => cardTile(c, !state.owned[c.id], false, { imageOnly: true })).join(''); bindCards(); staggerTiles(); markLoaded(document.querySelector('#collectionGrid')); }

function registry() { return `<section class="view"><div class="eyebrow">Registre complet · Saison I</div><h1>Les cartes</h1><p class="lead">Un inventaire des héros, reines, monstres et conspirateurs de Westeros.</p><div class="filters">${RARITIES.map(r => `<span class="rarity-box ${rarityClass(r)}" style="min-height:auto;padding:12px 18px">${r}</span>`).join('')}</div><div class="cards-grid">${CARD_DB.map(c => cardTile(c, !state.owned[c.id])).join('')}</div></section>`; }

function profile() { let pct = Math.round(ownedCount() / CARD_DB.length * 100); return `<section class="view"><div class="eyebrow">Dossier du joueur</div><h1>Profil</h1><div class="panel profile-head"><div class="avatar">♜</div><div><h2>${currentUser ? currentUser.email : 'Gardien des archives'}</h2><p class="meta">${currentUser ? 'Compte Cloud Synchro' : 'Mode Invité (Local)'}</p></div></div><div class="panel" style="margin-top:14px"><div class="section-head"><h3>Progression de collection</h3><strong>${pct}%</strong></div><div class="progress-line"><i style="width:${pct}%"></i></div><span class="meta">${ownedCount()} cartes uniques sur ${CARD_DB.length}</span></div><div class="profile-grid"><div class="panel"><span class="meta">Boosters ouverts</span><div class="big-number">${state.boosters}</div></div><div class="panel"><span class="meta">Légendaires obtenues</span><div class="big-number">${state.legendaries}</div></div><div class="panel"><span class="meta">Cartes possédées</span><div class="big-number">${ownedCount()}</div></div><div class="panel"><span class="meta">Factions représentées</span><div class="big-number">${new Set(CARD_DB.filter(c => state.owned[c.id]).map(c => c.faction)).size}</div></div></div></section>`; }

function bindCards() { document.querySelectorAll('[data-card]').forEach(el => el.onclick = () => showCard(+el.dataset.card)); }

function showCard(id) {
  let c = CARD_DB.find(x => x.id === id), own = state.owned[id] > 0;
  document.querySelector('#modalContent').innerHTML = `<div class="detail ${rarityClass(c.rarity)} ${own ? '' : 'is-locked'}"><div class="detail-art ${own ? 'tilt' : ''}">${own ? imageMarkup(c, false, { eager: true }) : '<span class="black-card big" aria-hidden="true"></span>'}</div><div><span class="eyebrow">${c.rarity} · #${c.cardNumber}</span><h2>${own ? c.name : 'Carte inconnue'}</h2><p class="meta">MAISON / FACTION : ${c.faction}</p><p class="lead">${own ? c.description : 'Cette carte n’a pas encore rejoint vos archives.'}</p><div class="panel"><span class="meta">Exemplaires possédés</span><div class="big-number">${state.owned[id] || 0}</div></div></div></div>`;
  document.querySelector('#cardModal').classList.add('open'); document.querySelector('#cardModal').setAttribute('aria-hidden', 'false');
  markLoaded(document.querySelector('#modalContent'));
  document.querySelector('#cardModal .modal-card').scrollTop = 0; document.querySelector('#modalContent').scrollTop = 0;
  if (own) bindTilt(document.querySelector('.detail-art.tilt'));
}

function toast(msg) { let t = document.querySelector('#toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000); }

let audioCtx = null;
function getAudio() {
  try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); if (audioCtx.state === 'suspended') audioCtx.resume(); return audioCtx; } catch (e) { return null; }
}
function sound(freq) {
  if (!soundOn) return; const a = getAudio(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
  o.type = 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.05, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + .22);
  o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + .25);
}
/* Glissando (montée en tension / déchirure) */
function sweep(f0, f1, dur = 1.2, vol = .035, type = 'sawtooth') {
  if (!soundOn) return; const a = getAudio(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain(), f = a.createBiquadFilter(), t = a.currentTime;
  o.type = type; f.type = 'lowpass'; f.frequency.setValueAtTime(700, t); f.frequency.exponentialRampToValueAtTime(5000, t + dur);
  o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(vol, t + dur * .85); g.gain.exponentialRampToValueAtTime(.0001, t + dur + .2);
  o.connect(f); f.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + .25);
}
function fadeAudio(a, ms) {
  if (!a) return; const v0 = a.volume, t0 = performance.now();
  const step = () => { const k = Math.min(1, (performance.now() - t0) / ms); try { a.volume = v0 * (1 - k); } catch (e) { } if (k < 1) requestAnimationFrame(step); else { a.pause(); if (cineAudio === a) cineAudio = null; } };
  step();
}

function routeInner() { let view = location.hash.slice(1) || 'accueil', valid = ['accueil', 'booster', 'collection', 'profil']; if (!valid.includes(view)) view = 'accueil'; document.querySelector('#app').innerHTML = { accueil: home, booster, collection, profil: profile }[view](); document.querySelectorAll('.main-nav a').forEach(a => a.classList.toggle('active', a.dataset.view === view)); document.querySelector('#mainNav').classList.remove('open'); bindCards(); if (view === 'collection') { document.querySelectorAll('.filters select').forEach(x => x.oninput = renderCollection); const sb = document.querySelector('#search'); if (sb) { let tm; sb.oninput = () => { clearTimeout(tm); tm = setTimeout(renderCollection, 160); }; } renderCollection(); } if (view === 'booster') { clearInterval(timerHandle); timerHandle = setInterval(() => { let t = document.querySelector('#timer'), b = document.querySelector('#openBooster'); if (!t) return; if (remaining() > 0) t.textContent = timeString(remaining()); else { t.textContent = 'PRÊT À OUVRIR'; t.classList.add('ready'); document.querySelector('.booster-view')?.classList.remove('cooldown'); if (b && b.disabled) { b.disabled = false; b.textContent = 'Ouvrir le booster'; } } }, 1000); document.querySelector('#openBooster')?.addEventListener('click', openBooster); initPack(); } else clearInterval(timerHandle); }


/* ---------- Animations & optimisations d'affichage ---------- */
function route() { routeInner(); afterRender(); }

function markLoaded(root = document) {
  root.querySelectorAll('img.card-img:not(.loaded)').forEach(i => { if (i.complete && i.naturalWidth) i.classList.add('loaded'); });
}

function afterRender() {
  optimizeImages(document.querySelector('#app'));
  markLoaded();
  initReveal();
  countUps();
  updateNavInk();
}

/* ---------- Booster : survol 3D, reflets holographiques, traînée d'étincelles ---------- */
function initPack() {
  const pack = document.querySelector('#pack'); if (!pack) return;
  const img = pack.querySelector('.pack-img');
  const setMask = () => pack.style.setProperty('--pack-img', `url("${img.currentSrc || img.src}")`); // le reflet épouse la forme du paquet
  if (img.complete && img.naturalWidth) setMask(); img.addEventListener('load', setMask);

  const reset = () => { pack.classList.remove('hover'); pack.style.setProperty('--rx', '0deg'); pack.style.setProperty('--ry', '0deg'); pack.style.setProperty('--mx', '50%'); pack.style.setProperty('--my', '50%'); };
  let raf = 0, lastTrail = 0;
  pack.addEventListener('pointerenter', () => { if (!pack.classList.contains('charging')) pack.classList.add('hover'); });
  pack.addEventListener('pointermove', e => {
    if (raf || pack.classList.contains('charging') || pack.classList.contains('torn')) return;
    const cx = e.clientX, cy = e.clientY;
    raf = requestAnimationFrame(() => {
      raf = 0; const r = pack.getBoundingClientRect(), x = Math.min(1, Math.max(0, (cx - r.left) / r.width)), y = Math.min(1, Math.max(0, (cy - r.top) / r.height));
      pack.classList.add('hover');
      pack.style.setProperty('--mx', (x * 100) + '%'); pack.style.setProperty('--my', (y * 100) + '%');
      pack.style.setProperty('--ry', ((x - .5) * 30) + 'deg'); pack.style.setProperty('--rx', ((.5 - y) * 26) + 'deg');
      const now = performance.now();
      if (now - lastTrail > 55) { lastTrail = now; FXC.trail(cx, cy, { color: Math.random() < .5 ? '#ffd27a' : '#ff6a5a' }); }
    });
  });
  pack.addEventListener('pointerleave', reset); pack.addEventListener('pointercancel', reset);
  pack.addEventListener('click', () => {
    const b = document.querySelector('#openBooster');
    if (b && !b.disabled) b.click();
    else if (!pack.classList.contains('charging')) { pack.classList.remove('denied'); void pack.offsetWidth; pack.classList.add('denied'); toast('Prochain booster dans ' + timeString(remaining())); }
  });
  pack.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pack.click(); } });
}

/* ---------- Survol : inclinaison des cartes + parallaxe du hero (souris uniquement) ---------- */
function initPointerFX() {
  if (!window.matchMedia('(hover: hover)').matches || REDUCED) return;
  let cur = null, raf = 0;
  const reset = el => { if (el) { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); } };
  document.addEventListener('pointermove', e => {
    const t = e.target.closest ? e.target : null;
    const el = t ? t.closest('.card-tile:not(.lock), .flip-card') : null;
    if (el !== cur) { reset(cur); cur = el; }
    const coll = document.querySelector('.hero-collage');
    if (coll) {
      const hero = t ? t.closest('.hero') : null;
      if (hero) { const r = hero.getBoundingClientRect(); coll.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5) * 2); coll.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5) * 2); }
      else { coll.style.setProperty('--px', 0); coll.style.setProperty('--py', 0); }
    }
    if (!el || raf) return;
    const cx = e.clientX, cy = e.clientY;
    raf = requestAnimationFrame(() => {
      raf = 0; if (cur !== el) return;
      const r = el.getBoundingClientRect(), x = (cx - r.left) / r.width, y = (cy - r.top) / r.height, k = el.classList.contains('flip-card') ? 22 : 16;
      el.style.setProperty('--mx', (x * 100) + '%'); el.style.setProperty('--my', (y * 100) + '%');
      el.style.setProperty('--ry', ((x - .5) * k) + 'deg'); el.style.setProperty('--rx', ((.5 - y) * k) + 'deg');
    });
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => { reset(cur); cur = null; });
}

/* ---------- Navigation : trait qui glisse sous le lien actif ---------- */
function updateNavInk(target) {
  const nav = document.querySelector('#mainNav'), ink = nav && nav.querySelector('.nav-ink');
  if (!ink || !window.matchMedia('(min-width: 801px)').matches) return;
  const a = target || nav.querySelector('a.active');
  if (!a) { ink.classList.remove('on'); return; }
  ink.style.setProperty('--x', a.offsetLeft + 'px'); ink.style.setProperty('--w', a.offsetWidth + 'px'); ink.classList.add('on');
}
function initNavInk() {
  const nav = document.querySelector('#mainNav'), ink = document.createElement('span'); ink.className = 'nav-ink'; nav.appendChild(ink);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('mouseenter', () => updateNavInk(a)));
  nav.addEventListener('mouseleave', () => updateNavInk());
  window.addEventListener('resize', () => updateNavInk());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => updateNavInk());
}

function stageEmbers() {
  const R = n => Math.random() * n;
  return '<div class="stage-embers" aria-hidden="true">' + Array.from({ length: LITE ? 6 : 14 }, () => `<i style="--l:${R(100)}%;--s:${3 + R(3)}px;--t:${3 + R(3)}s;--dl:${R(4)}s;--dx:${R(80) - 40}px"></i>`).join('') + '</div>';
}

function staggerTiles() {
  if (LITE || REDUCED) return; // pas d'animation par tuile sur téléphone
  document.querySelectorAll('#collectionGrid .card-tile').forEach((t, i) => { if (i > 11) return; t.classList.add('pop-in'); t.style.animationDelay = i * 30 + 'ms'; });
}

/* Apparition des blocs au scroll */
function initReveal() {
  if (REDUCED || LITE || !('IntersectionObserver' in window)) return;
  const els = [...document.querySelectorAll('#app .stat, #app .rarity-box, #app .herald, #app .section-head, #app .panel, #app .filters')];
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; el.classList.add('in'); io.unobserve(el);
    setTimeout(() => el.classList.remove('rv', 'in'), 1400);
  }), { threshold: .12, rootMargin: '0px 0px -4% 0px' });
  els.forEach(el => {
    const idx = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--d', Math.min(idx, 6) * 80 + 'ms');
    el.classList.add('rv'); io.observe(el);
  });
}

/* Compteurs animés */
function countUps() {
  document.querySelectorAll('#app [data-count], #app .big-number').forEach(el => {
    const target = parseInt(el.dataset.count ?? el.textContent, 10);
    if (isNaN(target) || target === 0 || REDUCED) return;
    const t0 = performance.now(), dur = 900;
    const tick = now => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * e);
      if (k < 1) requestAnimationFrame(tick);
    };
    el.textContent = 0; requestAnimationFrame(tick);
  });
}

/* Inclinaison 3D de la carte dans la modale (souris uniquement) */
function bindTilt(el) {
  if (!el || REDUCED || !window.matchMedia('(hover: hover)').matches) return;
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.setProperty('--rx', (-y * 14) + 'deg'); el.style.setProperty('--ry', (x * 14) + 'deg');
  });
  el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
}

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
      supabaseClient.auth.signOut().then(() => {
        currentUser = null;
        state.owned = { ...EMPTY_OWNED };
        save();
        updateUserUI();
        route();
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
      const { data, error } = await supabaseClient.auth.signUp({ email, password });
      if (error) toast('Erreur : ' + error.message);
      else {
        toast('Compte créé !');
        if (data.session) {
          currentUser = data.session.user;
          updateUserUI();
          syncFromSupabase();
        }
        authModal.classList.remove('open');
      }
    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
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
supabaseClient.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    currentUser = session.user;
    updateUserUI();
    syncFromSupabase();
  }
});

document.addEventListener('click', e => { if (e.target.matches('[data-close-modal]')) { document.querySelector('#cardModal').classList.remove('open'); } });
const menuBtn = document.querySelector('#menuToggle'), mainNav = document.querySelector('#mainNav');
function setMenu(open) { mainNav.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', open); menuBtn.textContent = open ? '✕' : '☰'; }
menuBtn.onclick = e => { e.stopPropagation(); setMenu(!mainNav.classList.contains('open')); };
document.addEventListener('click', e => { if (mainNav.classList.contains('open') && !mainNav.contains(e.target)) setMenu(false); });
mainNav.addEventListener('click', e => { const a = e.target.closest('a'); if (!a) return; setMenu(false); if (a.getAttribute('href') === location.hash) { route(); window.scrollTo(0, 0); } });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); document.querySelector('#cardModal').classList.remove('open'); document.querySelector('#authModal').classList.remove('open'); } });
document.querySelector('#soundBtn').onclick = () => { soundOn = !soundOn; document.querySelector('#soundBtn').classList.toggle('is-off', !soundOn); toast(soundOn ? 'Son activé' : 'Son coupé'); };
/* Transition de page fluide (View Transitions API quand elle existe) */
window.addEventListener('hashchange', () => {
  const go = () => { route(); window.scrollTo(0, 0); };
  if (document.startViewTransition && !REDUCED && !LITE) {
    document.documentElement.classList.add('vt');
    document.startViewTransition(go).finished.finally(() => document.documentElement.classList.remove('vt'));
  } else go();
});

setupAuthUI();
optimizeImages(document);
initNavInk();
initPointerFX();
route();