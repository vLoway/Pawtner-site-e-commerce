/* ══════════════════════════════════
   PAWTNER — app.js
   ══════════════════════════════════ */

// ── PRODUCTS DATA ──────────────────────────────────────────
const products = [
  {
    id:6, name:'Friandises Training', sub:'Poulet lyophilisé — 80g',
    price:5.90, cat:'Friandises', emoji:'🍗', stock:250, featured:true,
    img:'Images/Id 6 — Friandises Training.png', badge:undefined,
    desc:'Fabriquées à partir de poulet 100% français lyophilisé à froid, ces friandises conservent tous les nutriments naturels de la viande. Leur petite taille les rend idéales pour le dressage : distribuables en grande quantité sans surcharger la ration calorique de votre chien.',
    details:[
      { icon:'🥩', label:'Ingrédient unique', value:'Poulet lyophilisé 100%' },
      { icon:'⚖️', label:'Poids net', value:'80 g' },
      { icon:'🔥', label:'Énergie', value:'340 kcal / 100g' },
      { icon:'🌍', label:'Origine', value:'Poulet français, fabriqué en UE' },
    ],
    ingredients:'Poulet lyophilisé (100%). Sans additifs, sans conservateurs, sans colorants.',
    usage:'Idéal pour le dressage et la récompense. Ne pas dépasser 10% de la ration journalière. Eau fraîche toujours disponible.',
  },
  {
    id:7, name:'Bœuf Séché Naturel', sub:'150g sans additifs',
    price:7.90, cat:'Friandises', emoji:'🥓', stock:180, featured:true, badge:'bestseller', img:"Images/Id 7 — Bœuf Séché Naturel.png",
    desc:'Tranches de bœuf européen séchées lentement à basse température pour préserver les protéines et les arômes naturels. Sans sel ajouté, sans sucre, sans conservateurs. Une friandise plébiscitée par les chiens les plus difficiles.',
    details:[
      { icon:'🥩', label:'Ingrédient unique', value:'Bœuf séché 100%' },
      { icon:'⚖️', label:'Poids net', value:'150 g' },
      { icon:'🔥', label:'Protéines', value:'68% min.' },
      { icon:'🌍', label:'Origine', value:'Bœuf européen certifié' },
    ],
    ingredients:'Bœuf séché (100%). Aucun additif, aucun conservateur, aucun colorant.',
    usage:'Friandise de récompense ou d\'occupation. 2 à 5 tranches par jour selon le gabarit. Superviser la consommation.',
  },
  {
    id:8, name:'Sticks Dentaires', sub:'Menthe & chlorophylle — ×28',
    price:8.50, cat:'Friandises', emoji:'🦷', stock:150, featured:false, badge:'new', img:"Images/Id 8 — Sticks Dentaires.png",
    desc:'Formulés avec de la chlorophylle naturelle et de l\'extrait de menthe, ces sticks dentaires réduisent le tartre et rafraîchissent l\'haleine dès la première semaine d\'utilisation. Texture croquante adaptée à une mastication efficace.',
    details:[
      { icon:'📦', label:'Contenu', value:'28 sticks' },
      { icon:'⚖️', label:'Poids net', value:'180 g' },
      { icon:'🌿', label:'Actifs', value:'Chlorophylle & menthe naturelle' },
      { icon:'🦷', label:'Action', value:'Anti-tartre, haleine fraîche' },
    ],
    ingredients:'Céréales, glycérine végétale, chlorophylle (0,3%), extrait de menthe (0,2%), vitamines E. Sans colorants artificiels.',
    usage:'1 stick par jour, de préférence après le repas. Convient aux chiens à partir de 6 mois. Superviser la mastication.',
  },
  {
    id:9, name:'Os à Mâcher Naturel', sub:'Moelle séchée — ×3',
    price:6.50, cat:'Friandises', emoji:'🦴', stock:120, featured:true, img:"Images/Id 9 — Os à Mâcher Naturel.png",
    desc:'Os de bœuf remplis de moelle naturelle, séchés à l\'air sans cuisson. La mastication prolongée stimule la production de salive, favorise l\'hygiène dentaire et occupe votre chien jusqu\'à 30 minutes. Sans aucun traitement chimique.',
    details:[
      { icon:'📦', label:'Contenu', value:'3 os par sachet' },
      { icon:'📏', label:'Taille', value:'10–12 cm (taille M)' },
      { icon:'🌍', label:'Origine', value:'Bœuf européen, séché à l\'air' },
      { icon:'⏱️', label:'Durée', value:'20 à 40 min de mastication' },
    ],
    ingredients:'Os de bœuf avec moelle (100%). Séché à l\'air libre. Sans additifs, non cuit.',
    usage:'Superviser la mastication. Retirer si l\'os se fragmente. Convient aux chiens adultes. 2 à 3 fois par semaine maximum.',
  },
  {
    id:10, name:'Laisse Ergonomique', sub:'Nylon renforcé — 1,5m',
    price:19.90, cat:'Accessoires', emoji:'🔗', stock:90, featured:false, img:"Images/Id 10 — Laisse Ergonomique.png",
    desc:'Laisse en nylon double-couche renforcé avec poignée rembourrée en néoprène. Le mousqueton à vis en alliage zinc garantit une résistance à la traction de 150 kg. Légère, imperméable, lavable en machine. La laisse quotidienne par excellence.',
    details:[
      { icon:'📏', label:'Longueur', value:'1,5 m' },
      { icon:'💪', label:'Résistance', value:'150 kg à la traction' },
      { icon:'🔩', label:'Attache', value:'Mousqueton à vis zinc' },
      { icon:'🎨', label:'Coloris', value:'Noir, terracotta, kaki' },
    ],
    ingredients:null,
    usage:'Attacher au harnais ou au collier. Lavage machine 30°C. Ne pas exposer à des tractions supérieures à 150 kg.',
    matiere:'Nylon double-couche 900D, poignée néoprène, mousqueton alliage zinc.',
  },
  {
    id:11, name:'Harnais Sport', sub:'Réglable S à XL',
    price:34.90, cat:'Accessoires', emoji:'🎽', stock:70, featured:true, badge:'bestseller', img:"Images/Id 11 — Harnais Sport.png",
    desc:'Harnais en Y avec double point d\'attache (dorsal + frontal) et rembourrage en maille aérée sur le poitrail. Répartit la traction sur le sternum et les épaules, sans pression sur la trachée. Réglable sur 4 points pour s\'adapter à toutes les morphologies.',
    details:[
      { icon:'📐', label:'Tailles', value:'S (35–45cm) · M (45–58cm) · L (58–72cm) · XL (72–90cm)' },
      { icon:'🔗', label:'Attaches', value:'Dorsale + frontale (double D-ring)' },
      { icon:'🛡️', label:'Sécurité', value:'Boucles de sécurité double-clic' },
      { icon:'🎨', label:'Coloris', value:'Noir, terracotta, gris anthracite' },
    ],
    ingredients:null,
    usage:'Mesurer le tour de poitrail avant commande. Ajuster les 4 sangles pour un contact sans friction. Nettoyage à la main, séchage à l\'air.',
    matiere:'Oxford 600D, rembourrage maille 3D, boucles polypropylène renforcé.',
  },
  {
    id:12, name:'Collier Réglable', sub:'Nylon doux — 5 couleurs',
    price:12.90, cat:'Accessoires', emoji:'🏷️', stock:130, featured:false, img:"Images/Id 12 — Collier Réglable.png",
    desc:'Collier en nylon doux brossé avec boucle de sécurité à double clic et anneau de laisse en acier inoxydable. Recommandé pour porter la médaille d\'identification. Disponible en 5 coloris, réglable sur 6 cm pour un ajustement précis.',
    details:[
      { icon:'📏', label:'Réglage', value:'30–36 cm · 36–44 cm · 44–54 cm' },
      { icon:'🔒', label:'Fermeture', value:'Boucle double-clic sécurité' },
      { icon:'💧', label:'Entretien', value:'Lavable, résistant à l\'eau' },
      { icon:'🎨', label:'Coloris', value:'Noir, terracotta, kaki, sable, rose' },
    ],
    ingredients:null,
    usage:'Usage recommandé pour la médaille uniquement. Ne pas attacher la laisse sur ce collier pour les chiens qui tirent. Vérifier régulièrement l\'ajustement.',
    matiere:'Nylon brossé 25mm, anneau acier inoxydable 304, boucle plastique ABS.',
  },
  {
    id:13, name:'Gamelle Antidérapante', sub:'Inox double — taille M',
    price:14.90, cat:'Accessoires', emoji:'🥗', stock:85, featured:false, badge:'new', img:"Images/Id 13 — Gamelle Antidérapante.png",
    desc:'Gamelle double paroi en inox alimentaire 304 avec base antidérapante en silicone. Le fond surélevé de 3 cm ralentit l\'ingestion pour les chiens gloutons. Compatible lave-vaisselle, sans BPA, sans phtalates. Pour l\'eau comme pour les croquettes.',
    details:[
      { icon:'📏', label:'Contenance', value:'900 ml (taille M)' },
      { icon:'🔩', label:'Matière', value:'Inox alimentaire 304, silicone alimentaire' },
      { icon:'🍽️', label:'Compatibilité', value:'Lave-vaisselle, micro-ondes non' },
      { icon:'🐕', label:'Pour', value:'Chiens 10–25 kg' },
    ],
    ingredients:null,
    usage:'Nettoyer avant première utilisation. Lavage lave-vaisselle panier du haut. Remplacer si rayures profondes. Inspecter la base silicone régulièrement.',
    matiere:'Inox 304 double paroi, base silicone alimentaire antidérapante.',
  },
];

const categories = ['Toutes', 'Friandises', 'Accessoires'];

const catColors = {
  'Friandises':  '#EEF5EE',
  'Accessoires': '#F5ECD8',
};

// ── PANIER ─────────────────────────────────────────────────
let cart = [];

function fmt(n) { return n.toFixed(2).replace('.', ',') + ' €'; }
function getCartItem(id) { return cart.find(i => i.id === id); }

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = getCartItem(id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCartUI();
  showToast(`✅ ${product.name} ajouté au panier`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = getCartItem(id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) {
    countEl.textContent = count;
    countEl.classList.toggle('hidden', count === 0);
  }

  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const FREE_SHIP = 40;
  const shipping  = (cart.length > 0 && subtotal < FREE_SHIP) ? 3.99 : 0;
  const total     = subtotal + shipping;
  const itemsEl   = document.getElementById('cartItems');
  const footerEl  = document.getElementById('cartFooter');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍️</div>
        <p>Votre panier est vide</p>
        <p style="font-size:13px;color:var(--muted);margin-top:6px;">Ajoutez des produits depuis la boutique</p>
      </div>`;
    if (footerEl) footerEl.style.display = 'none';
    // Barre vide
    const bar = document.getElementById('cart-free-ship');
    if (bar) bar.innerHTML = '';
    return;
  }

  // Barre livraison gratuite
  const barEl = document.getElementById('cart-free-ship');
  if (barEl) {
    if (subtotal >= FREE_SHIP) {
      barEl.innerHTML = `
        <div class="cfs-unlocked">
          <span class="cfs-check">✓</span> Livraison offerte !
        </div>`;
    } else {
      const remaining = (FREE_SHIP - subtotal).toFixed(2).replace('.', ',');
      const pct       = Math.min(100, Math.round(subtotal / FREE_SHIP * 100));
      barEl.innerHTML = `
        <div class="cfs-label">Plus que <strong>${remaining} €</strong> pour la livraison gratuite</div>
        <div class="cfs-track">
          <div class="cfs-fill" style="width:${pct}%"></div>
        </div>`;
    }
  }

  if (footerEl) {
    footerEl.style.display = 'block';
    document.getElementById('cartSubtotal').textContent = fmt(subtotal);
    const shippingEl = document.getElementById('cartShipping');
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Gratuite 🎉' : fmt(shipping);
    document.getElementById('cartTotal').textContent = fmt(total);
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img" style="background:${catColors[item.cat] || 'var(--warm)'};">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmt(item.price)}</div>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
      </div>
      <button class="cart-remove" onclick="removeFromCart(${item.id})" title="Retirer">✕</button>
    </div>`).join('');
}

// ── CART PANEL ─────────────────────────────────────────────
let cartOpen = false;
function toggleCart() {
  cartOpen = !cartOpen;
  document.getElementById('cartPanel').classList.toggle('open', cartOpen);
  document.getElementById('cartOverlay').classList.toggle('open', cartOpen);
  document.body.style.overflow = cartOpen ? 'hidden' : '';
}

// ── CHECKOUT ───────────────────────────────────────────────
function openCheckout() {
  if (cart.length === 0) return;
  toggleCart();
  document.getElementById('checkoutModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
}
function confirmOrder(e) {
  e.preventDefault();
  const orderNum = 'PAW-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  document.getElementById('checkoutBody').innerHTML = `
    <div class="order-confirm">
      <div class="confirm-icon">🎉</div>
      <div class="confirm-title">Commande confirmée !</div>
      <p class="confirm-sub">
        Merci pour votre commande.<br>
        Votre numéro de commande est <span class="confirm-order-num">${orderNum}</span>.<br><br>
        Vous recevrez une confirmation fictive sous peu. Livraison estimée : 48h ouvrées.
        <br><br>
        <em style="font-size:13px;color:var(--muted);">(Rappel : site fictif — aucune transaction réelle n'a eu lieu.)</em>
      </p>
      <button class="btn btn-primary" style="margin-top:28px;" onclick="closeCheckout();clearCart();">Fermer</button>
    </div>`;
}
function clearCart() {
  cart = [];
  updateCartUI();
}
function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}

// ── AVIS CLIENTS ───────────────────────────────────────────
const REVIEWS = {
  6: [
    { name: 'Camille R.',   stars: 5, date: '12 mai 2025',    text: 'Mon chien devient fou dès qu\'il entend le sachet ! Ingrédients nickel, juste du poulet. On commande toutes les 3 semaines.' },
    { name: 'Julien M.',    stars: 5, date: '28 avr. 2025',   text: 'Parfait pour l\'entraînement. Petite taille idéale, mon Border Collie adore. Livraison rapide en plus.' },
    { name: 'Nathalie P.',  stars: 4, date: '3 avr. 2025',    text: 'Très bonne qualité, mon chien les dévore. Juste un peu chers au kilo, mais on sent la différence avec les friandises du supermarché.' },
    { name: 'Marc D.',      stars: 5, date: '17 mars 2025',   text: 'Le seul produit que mon golden retriever accepte sans hésiter. Composition irréprochable, vraiment satisfait.' },
    { name: 'Élodie K.',    stars: 4, date: '2 mars 2025',    text: 'Super pour le dressage, mon chiot réagit immédiatement. Aurait mérité 5 étoiles si le sachet se refermait mieux.' },
  ],
  7: [
    { name: 'Antoine B.',   stars: 5, date: '10 mai 2025',    text: 'Qualité exceptionnelle. Un seul ingrédient, aucun additif. Mon chien mange ça comme une friandise de luxe.' },
    { name: 'Sophie L.',    stars: 5, date: '22 avr. 2025',   text: 'Le meilleur bœuf séché que j\'ai trouvé. Mon labrador l\'a adopté immédiatement et il est très difficile.' },
    { name: 'Romain F.',    stars: 4, date: '8 avr. 2025',    text: 'Bon produit, mes chiens adorent. Texture agréable, ni trop dur ni trop mou. Je recommande.' },
    { name: 'Claire V.',    stars: 5, date: '25 mars 2025',   text: 'Enfin du bœuf séché sans sel ajouté ! Mon chien de 8 ans ne peut plus s\'en passer. Commande régulière.' },
    { name: 'Hugo T.',      stars: 3, date: '11 mars 2025',   text: 'Bon goût, mon chien aime bien. Portion un peu petite pour le prix, mais la qualité est là.' },
  ],
  8: [
    { name: 'Marie C.',     stars: 5, date: '8 mai 2025',     text: 'Dents impeccables depuis 2 mois ! Mon vétérinaire a remarqué la différence. Je les commande systématiquement.' },
    { name: 'Pierre A.',    stars: 4, date: '20 avr. 2025',   text: 'Mon beagle les attend chaque soir. Bonne odeur de menthe, pas trop sucrés. Efficace sur la fraîcheur de l\'haleine.' },
    { name: 'Lucie M.',     stars: 5, date: '5 avr. 2025',    text: 'Le seul stick dentaire que mon chien finit entièrement ! Les autres marques, il les abandonnait à moitié.' },
    { name: 'Kevin S.',     stars: 4, date: '19 mars 2025',   text: 'Bonne texture, mon golden labrador les mâche tranquillement. Je constate moins de tartre. Satisfait.' },
    { name: 'Isabelle N.',  stars: 5, date: '4 mars 2025',    text: 'Recommandé par ma vétérinaire. Mon chien les adore et j\'ai vu une vraie amélioration sur ses dents en 6 semaines.' },
  ],
  9: [
    { name: 'Thomas G.',    stars: 5, date: '14 mai 2025',    text: 'Mon berger allemand peut s\'occuper 30 minutes avec un seul os. Moelle naturelle, pas de colorant. Parfait.' },
    { name: 'Laura B.',     stars: 5, date: '29 avr. 2025',   text: 'Enfin un os qui tient ! Mon staffy mâcheur professionnel y passe un bon moment. Qualité sérieuse.' },
    { name: 'Nicolas H.',   stars: 4, date: '14 avr. 2025',   text: 'Bon produit, mon chien adore. Je reste à côté par précaution mais il n\'y a pas eu de problème depuis 6 commandes.' },
    { name: 'Aurélie D.',   stars: 5, date: '28 mars 2025',   text: 'Mon golden retriever est fou de ces os. Occupé pendant des heures, moelle bien présente. Top qualité.' },
    { name: 'Fabrice L.',   stars: 4, date: '12 mars 2025',   text: 'Très bonne qualité. Mon husky les finit en 20 min mais c\'est une grande race. Pour un chien moyen, c\'est parfait.' },
  ],
  10: [
    { name: 'Chloé R.',     stars: 5, date: '11 mai 2025',    text: 'Laisse solide, mousqueton fiable. Mon malinois tire fort et elle tient parfaitement depuis 4 mois. Recommandé.' },
    { name: 'David M.',     stars: 4, date: '24 avr. 2025',   text: 'Bonne laisse, matière agréable en main. La longueur de 1,5 m est parfaite pour la ville. Rien à redire.' },
    { name: 'Céline P.',    stars: 5, date: '9 avr. 2025',    text: 'Très robuste et légère à la fois. La couture du mousqueton est renforcée, on sent la qualité dès la prise en main.' },
    { name: 'Alexis F.',    stars: 4, date: '22 mars 2025',   text: 'Bon rapport qualité-prix. Facile à nettoyer après une sortie sous la pluie. Mon chien et moi sommes satisfaits.' },
    { name: 'Marion V.',    stars: 5, date: '7 mars 2025',    text: 'La meilleure laisse que j\'ai eue. Nylon résistant, couleur qui tient bien au lavage. J\'en ai commandé deux.' },
  ],
  11: [
    { name: 'Baptiste C.',  stars: 5, date: '13 mai 2025',    text: 'Harnais parfait pour mon husky qui tire. Attache frontale très efficace pour le rappel. Excellent produit.' },
    { name: 'Emilie T.',    stars: 5, date: '26 avr. 2025',   text: 'Qualité du rembourrage au top, mon golden ne souffre plus des frottements. Taille M parfaite selon le guide.' },
    { name: 'Sébastien L.', stars: 5, date: '11 avr. 2025',   text: 'Mon vétérinaire me l\'avait conseillé pour les promenades. Réglages faciles, ne glisse pas. Je recommande à 100%.' },
    { name: 'Virginie K.',  stars: 4, date: '25 mars 2025',   text: 'Très bon harnais. L\'attache dorsale et frontale est vraiment pratique. Juste un peu long à régler la première fois.' },
    { name: 'Olivier B.',   stars: 5, date: '9 mars 2025',    text: 'Transformé mes promenades avec mon berger australien. Plus de traction sur la trachée. Qualité irréprochable.' },
  ],
  12: [
    { name: 'Stéphanie M.', stars: 5, date: '9 mai 2025',     text: 'Collier solide et doux sur le cou. Les 5 coloris sont magnifiques, j\'en ai pris deux. Boucle très robuste.' },
    { name: 'Yann D.',      stars: 4, date: '21 avr. 2025',   text: 'Bon collier, réglage facile. Utilisé uniquement pour la médaille comme conseillé. La couleur tient bien.' },
    { name: 'Anaïs F.',     stars: 5, date: '6 avr. 2025',    text: 'Très joli et résistant. Mon labrador tire fort et le collier tient parfaitement pour porter sa médaille.' },
    { name: 'Rémi N.',      stars: 4, date: '20 mars 2025',   text: 'Qualité correcte pour le prix. Nylon doux, pas de frottement. Mon beagle ne le remarque même plus.' },
    { name: 'Jessica P.',   stars: 5, date: '5 mars 2025',    text: 'Le collier rose est parfait pour ma chienne ! Doux, solide, et le fermoir clique vraiment bien. Très satisfaite.' },
  ],
  13: [
    { name: 'Frédéric A.',  stars: 5, date: '7 mai 2025',     text: 'Fini les glissades ! L\'inox est parfait, facile à nettoyer au lave-vaisselle. Mon labrador mange enfin tranquillement.' },
    { name: 'Noemie C.',    stars: 5, date: '19 avr. 2025',   text: 'Gamelle très stable, mon bouledogue français poussait sa gamelle partout avant. Problème résolu ! Belle qualité inox.' },
    { name: 'Laurent M.',   stars: 4, date: '4 avr. 2025',    text: 'Bonne gamelle, fond caoutchouté efficace. Taille M parfaite pour mon cocker. Rien à redire sur la qualité.' },
    { name: 'Sandra B.',    stars: 5, date: '18 mars 2025',   text: 'Exactement ce que je cherchais. Double compartiment pratique, inox alimentaire de qualité. Je recommande.' },
    { name: 'Cyril V.',     stars: 4, date: '3 mars 2025',    text: 'Très bien fabriqué. L\'antidérapant fonctionne vraiment. Seul bémol : le fond en caoutchouc retient un peu l\'eau.' },
  ],
};

function starsHtml(n) {
  return Array.from({length: 5}, (_, i) =>
    `<span class="rv-star ${i < n ? 'on' : ''}">${i < n ? '★' : '☆'}</span>`
  ).join('');
}

function avgRating(id) {
  const r = REVIEWS[id];
  if (!r) return null;
  return (r.reduce((s, x) => s + x.stars, 0) / r.length).toFixed(1);
}

function openReviews(id) {
  const product = products.find(p => p.id === id);
  const reviews = REVIEWS[id] || [];
  const avg     = avgRating(id);
  const drawer  = document.getElementById('rv-drawer');
  const content = document.getElementById('rv-content');
  content.innerHTML = `
    <div class="rv-product-head">
      <div class="rv-product-emoji" style="background:${catColors[product.cat] || 'var(--warm)'};">${product.emoji}</div>
      <div>
        <div class="rv-product-name">${product.name}</div>
        <div class="rv-product-sub">${product.sub}</div>
        <div class="rv-avg-row">
          <span class="rv-avg-score">${avg}</span>
          <span class="rv-avg-stars">${starsHtml(Math.round(avg))}</span>
          <span class="rv-avg-count">${reviews.length} avis</span>
        </div>
      </div>
    </div>
    <div class="rv-list">
      ${reviews.map(r => `
        <div class="rv-item">
          <div class="rv-item-head">
            <div class="rv-avatar">${r.name[0]}</div>
            <div class="rv-meta">
              <div class="rv-name">${r.name}</div>
              <div class="rv-date">${r.date}</div>
            </div>
            <div class="rv-stars">${starsHtml(r.stars)}</div>
          </div>
          <p class="rv-text">${r.text}</p>
        </div>`).join('')}
    </div>`;
  drawer.classList.add('open');
  document.getElementById('rv-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReviews() {
  document.getElementById('rv-drawer').classList.remove('open');
  document.getElementById('rv-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── FICHE PRODUIT ──────────────────────────────────────────
function openProduct(id) {
  const p   = products.find(x => x.id === id);
  const bg  = catColors[p.cat] || 'var(--warm)';
  const avg = avgRating(id);
  const rv  = REVIEWS[id] || [];

  const stockHtml = id === 7
    ? `<div class="stock-low">⚠️ Plus que 4 en stock</div>`
    : id === 11
    ? `<div class="stock-low">⚠️ Plus que 2 en stock</div>`
    : `<div class="stock-ok">✓ En stock</div>`;

  const badgeHtml = p.badge === 'bestseller'
    ? `<span class="product-badge-label bestseller" style="position:static;box-shadow:none;">⭐ Best-seller</span>`
    : p.badge === 'new'
    ? `<span class="product-badge-label new" style="position:static;box-shadow:none;">✦ Nouveau</span>`
    : '';

  const visualHtml = p.img
    ? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;display:block;">`
    : `<span style="font-size:80px;">${p.emoji}</span>`;

  const detailsHtml = (p.details || []).map(d => `
    <div class="pd-detail">
      <span class="pd-detail-icon">${d.icon}</span>
      <div><div class="pd-detail-label">${d.label}</div><div class="pd-detail-val">${d.value}</div></div>
    </div>`).join('');

  const ingredientsHtml = p.ingredients ? `
    <div class="pd-section-title">Composition</div>
    <p class="pd-ingredients">${p.ingredients}</p>` : '';

  const matiereHtml = p.matiere ? `
    <div class="pd-section-title">Matériaux</div>
    <p class="pd-ingredients">${p.matiere}</p>` : '';

  const usageHtml = p.usage ? `
    <div class="pd-section-title">Conseils d'utilisation</div>
    <p class="pd-ingredients">${p.usage}</p>` : '';

  const reviewsHtml = rv.slice(0, 3).map(r => `
    <div class="rv-item">
      <div class="rv-item-head">
        <div class="rv-avatar">${r.name[0]}</div>
        <div class="rv-meta"><div class="rv-name">${r.name}</div><div class="rv-date">${r.date}</div></div>
        <div class="rv-stars">${starsHtml(r.stars)}</div>
      </div>
      <p class="rv-text">${r.text}</p>
    </div>`).join('');

  const ratingHtml = avg ? `
    <div class="pd-rating">
      <span class="pd-rating-score">${avg}</span>
      ${starsHtml(Math.round(avg))}
      <button class="pd-rating-link" onclick="closeProduct();openReviews(${id})">
        Voir les ${rv.length} avis →
      </button>
    </div>` : '';

  document.getElementById('pd-content').innerHTML = `
    <div class="pd-visual" style="background:${bg};">
      ${visualHtml}
      ${badgeHtml ? `<div style="position:absolute;top:12px;right:12px;">${badgeHtml}</div>` : ''}
    </div>
    <div class="pd-body">
      <div class="pd-cat">${p.cat}</div>
      <h2 class="pd-name">${p.name}</h2>
      <div class="pd-sub">${p.sub}</div>
      ${ratingHtml}
      <div class="pd-price">${fmt(p.price)}</div>
      ${stockHtml}
      <p class="pd-desc">${p.desc}</p>
      <div class="pd-details-grid">${detailsHtml}</div>
      ${ingredientsHtml}${matiereHtml}${usageHtml}
      ${rv.length ? `<div class="pd-section-title">Avis récents</div><div class="pd-reviews">${reviewsHtml}</div>` : ''}
      ${rv.length > 3 ? `<button class="pd-all-reviews" onclick="closeProduct();openReviews(${id})">Voir tous les avis (${rv.length}) →</button>` : ''}
    </div>
    <div class="pd-footer">
      <button class="btn-buy-now" onclick="addToCart(${id});closeProduct();showToast('✅ ${p.name} ajouté au panier')">
        + Ajouter au panier
      </button>
      <button class="btn-buy-now pd-buy-now-cta" onclick="buyNow(${id});closeProduct()">
        Acheter maintenant →
      </button>
    </div>`;

  document.getElementById('pd-drawer').classList.add('open');
  document.getElementById('pd-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProduct() {
  document.getElementById('pd-drawer').classList.remove('open');
  document.getElementById('pd-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── PRODUITS ───────────────────────────────────────────────
function productCard(p) {
  const bg  = catColors[p.cat] || 'var(--warm)';
  const avg = avgRating(p.id);
  const rv  = REVIEWS[p.id] || [];
  const stockLabel = p.id === 7
    ? `<div class="stock-low">⚠️ Plus que 4 en stock</div>`
    : p.id === 11
    ? `<div class="stock-low">⚠️ Plus que 2 en stock</div>`
    : `<div class="stock-ok">✓ En stock</div>`;
  const ratingRow = avg ? `
    <button class="pc-rating" onclick="event.stopPropagation();openReviews(${p.id})">
      <span class="pc-rating-score">${avg}</span>
      ${starsHtml(Math.round(avg))}
      <span class="pc-rating-count">(${rv.length})</span>
    </button>` : '';
  const badgeHtml = p.badge === 'bestseller'
    ? `<span class="product-badge-label bestseller">⭐ Best-seller</span>`
    : p.badge === 'new'
    ? `<span class="product-badge-label new">✦ Nouveau</span>`
    : '';
  const visual = p.img
    ? `<img src="${p.img}" alt="${p.name}" class="product-img-photo">`
    : p.emoji;
  return `
  <div class="product-card" onclick="openProduct(${p.id})" style="cursor:pointer;">
    <div class="product-image" style="background:${bg};">
      ${visual}
      <span class="product-badge-cat">${p.cat}</span>
      ${badgeHtml}
    </div>
    <div class="product-body">
      <div class="product-name">${p.name}</div>
      <div class="product-sub">${p.sub}</div>
      ${ratingRow}
      ${stockLabel}
    </div>
    <div class="product-footer">
      <div class="product-footer-top">
        <span class="product-price">${fmt(p.price)}</span>
        <button class="btn-add" onclick="event.stopPropagation();addToCart(${p.id})" title="Ajouter au panier">+</button>
      </div>
      <button class="btn-buy-now" onclick="event.stopPropagation();buyNow(${p.id})">Acheter maintenant</button>
    </div>
  </div>`;
}

function buyNow(id) {
  addToCart(id);
  openCheckout();
}

function renderFeatured() {
  const grid = document.getElementById('featuredProducts');
  if (!grid) return;
  grid.innerHTML = products.filter(p => p.featured).map(p => productCard(p)).join('');
}

function renderHomepageReviews() {
  const grid = document.getElementById('homepageReviews');
  if (!grid) return;
  // Les 3 meilleurs avis (note 5, sélectionnés manuellement)
  const top = [
    { productId: 11, idx: 2 },
    { productId:  6, idx: 0 },
    { productId:  8, idx: 2 },
  ];
  grid.innerHTML = top.map(({ productId, idx }) => {
    const p = products.find(x => x.id === productId);
    const r = REVIEWS[productId][idx];
    return `
    <div class="review-card">
      <div class="review-card-top">
        <div class="review-card-avatar">${r.name[0]}</div>
        <div>
          <div class="review-card-name">${r.name}</div>
          <div class="review-card-date">${r.date}</div>
        </div>
      </div>
      <div class="review-card-stars">${starsHtml(r.stars)}</div>
      <p class="review-card-text">${r.text}</p>
      <div class="review-card-product">${p.emoji} ${p.name}</div>
    </div>`;
  }).join('');
}

// ── BOUTIQUE ───────────────────────────────────────────────
let activeFilter = 'Toutes';

function renderShop(filter) {
  activeFilter = filter || 'Toutes';
  const bar = document.getElementById('filterBar');
  if (bar) {
    bar.innerHTML = categories.map(cat => `
      <button class="filter-btn ${activeFilter === cat ? 'active' : ''}" onclick="renderShop('${cat}')">
        ${cat}
      </button>`).join('');
  }
  const grid = document.getElementById('shopProducts');
  if (grid) {
    const filtered = activeFilter === 'Toutes' ? products : products.filter(p => p.cat === activeFilter);
    grid.innerHTML = filtered.map(p => productCard(p)).join('');
  }
  renderSuggestions();
}

function renderSuggestions() {
  const section = document.getElementById('suggestions-section');
  if (!section) return;

  let picks, tagline;

  if (activeFilter === 'Toutes') {
    // Sur "Toutes" : 3 produits featured, mélange des deux catégories
    tagline = 'Nos coups de cœur du moment';
    picks   = products.filter(p => p.featured).slice(0, 3);
  } else {
    // Sur un filtre catégorie : catégorie opposée, best-sellers en premier
    const oppositeCat = activeFilter === 'Friandises' ? 'Accessoires' : 'Friandises';
    tagline = activeFilter === 'Friandises'
      ? 'Les accessoires qui vont avec vos friandises'
      : 'Les friandises qui complètent votre équipement';
    const pool   = products.filter(p => p.cat === oppositeCat);
    const sorted = [...pool].sort((a, b) => {
      const rank = { bestseller: 0, new: 1 };
      return (rank[a.badge] ?? 2) - (rank[b.badge] ?? 2);
    });
    picks = sorted.slice(0, 3);
  }

  document.getElementById('suggestions-tagline').textContent = tagline;
  document.getElementById('suggestions-grid').innerHTML = picks.map(p => productCard(p)).join('');
  section.style.display = 'block';
}

// ── TOAST ──────────────────────────────────────────────────
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── FORMULAIRE CONTACT ─────────────────────────────────────
function submitContact(e) {
  e.preventDefault();
  showToast('✅ Message envoyé ! Nous vous répondons sous 24h.');
  e.target.reset();
}

// ── MOBILE NAV ─────────────────────────────────────────────
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('burgerBtn');
  const open = !nav.classList.contains('open');
  nav.classList.toggle('open', open);
  btn.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

// ── SCROLL ─────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('backTop')?.classList.toggle('visible', window.scrollY > 300);
});

// ── INIT PANIER VIDE ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});