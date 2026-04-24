/* ══════════════════════════════════
   PAWTNER — app.js
   ══════════════════════════════════ */

// ── PRODUCTS DATA ──────────────────────────────────────────
const products = [
  { id:1,  name:'Croquettes Adult Équilibre', sub:'Poulet & riz — 3 kg',          price:22.90, cat:'Alimentation',          emoji:'🍖', stock:150, featured:true  },
  { id:2,  name:'Croquettes Puppy',           sub:'Agneau & légumes — 2 kg',       price:18.50, cat:'Alimentation',          emoji:'🐶', stock:100, featured:true  },
  { id:3,  name:'Croquettes Senior',          sub:'Dinde & articulations — 2 kg',  price:19.90, cat:'Alimentation',          emoji:'🦌', stock:80,  featured:false },
  { id:4,  name:'Pâtée Quotidienne',          sub:'Bœuf & carottes — 6×400g',     price:11.90, cat:'Alimentation',          emoji:'🥩', stock:200, featured:false },
  { id:5,  name:'Pâtée Légère',               sub:'Dinde & courgettes — 400g',     price:4.20,  cat:'Alimentation',          emoji:'🥣', stock:300, featured:false },
  { id:6,  name:'Friandises Training',        sub:'Poulet lyophilisé — 80g',       price:5.90,  cat:'Friandises',            emoji:'🍗', stock:250, featured:true  },
  { id:7,  name:'Bœuf Séché Naturel',        sub:'150g sans additifs',            price:7.90,  cat:'Friandises',            emoji:'🥓', stock:180, featured:false },
  { id:8,  name:'Sticks Dentaires',           sub:'Menthe & chlorophylle — ×28',   price:8.50,  cat:'Friandises',            emoji:'🦷', stock:150, featured:false },
  { id:9,  name:'Os à Mâcher Naturel',        sub:'Moelle séchée — ×3',           price:6.50,  cat:'Friandises',            emoji:'🦴', stock:120, featured:true  },
  { id:10, name:'Laisse Ergonomique',         sub:'Nylon renforcé — 1,5m',        price:19.90, cat:'Accessoires',           emoji:'🔗', stock:90,  featured:false },
  { id:11, name:'Harnais Sport',              sub:'Réglable S à XL',              price:34.90, cat:'Accessoires',           emoji:'🎽', stock:70,  featured:true  },
  { id:12, name:'Collier Réglable',           sub:'Nylon doux — 5 couleurs',      price:12.90, cat:'Accessoires',           emoji:'🏷️', stock:130, featured:false },
  { id:13, name:'Gamelle Antidérapante',      sub:'Inox double — taille M',       price:14.90, cat:'Accessoires',           emoji:'🥗', stock:85,  featured:false },
  { id:14, name:'Complément Articulaire',     sub:'Glucosamine naturelle — 60 cp',price:16.90, cat:'Santé & Compléments',  emoji:'💊', stock:60,  featured:false },
  { id:15, name:'Huile de Saumon',            sub:'Oméga-3 — 250ml',             price:12.90, cat:'Santé & Compléments',  emoji:'🐟', stock:75,  featured:false },
];

const categories = ['Toutes', 'Alimentation', 'Friandises', 'Accessoires', 'Santé & Compléments'];

const catColors = {
  'Alimentation':        '#FDF0E6',
  'Friandises':          '#EEF5EE',
  'Accessoires':         '#F5ECD8',
  'Santé & Compléments': '#EFF4F9',
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

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + (cart.length > 0 ? 3.99 : 0);
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍️</div>
        <p>Votre panier est vide</p>
        <p style="font-size:13px;color:var(--muted);margin-top:6px;">Ajoutez des produits depuis la boutique</p>
      </div>`;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) {
    footerEl.style.display = 'block';
    document.getElementById('cartSubtotal').textContent = fmt(subtotal);
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

// ── PRODUITS ───────────────────────────────────────────────
function productCard(p) {
  const bg = catColors[p.cat] || 'var(--warm)';
  const stockLabel = p.stock <= 80
    ? `<div class="${p.stock <= 30 ? 'stock-low' : 'stock-ok'}">${p.stock <= 30 ? '⚠️ Stock limité' : '✓ En stock'}</div>`
    : `<div class="stock-ok">✓ En stock</div>`;
  return `
  <div class="product-card">
    <div class="product-image" style="background:${bg};">
      ${p.emoji}
      <span class="product-badge-cat">${p.cat}</span>
    </div>
    <div class="product-body">
      <div class="product-name">${p.name}</div>
      <div class="product-sub">${p.sub}</div>
      ${stockLabel}
    </div>
    <div class="product-footer">
      <span class="product-price">${fmt(p.price)}</span>
      <button class="btn-add" onclick="addToCart(${p.id})" title="Ajouter au panier">+</button>
    </div>
  </div>`;
}

function renderFeatured() {
  const grid = document.getElementById('featuredProducts');
  if (!grid) return;
  grid.innerHTML = products.filter(p => p.featured).map(p => productCard(p)).join('');
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