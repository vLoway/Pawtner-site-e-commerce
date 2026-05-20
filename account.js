/* ════════════════════════════════════
   PAWTNER — account.js
   Espace client (simulation localStorage)
   ════════════════════════════════════ */

// ── ÉTAT ────────────────────────────────────────────────────
let acUser = JSON.parse(localStorage.getItem('pw_user') || 'null');

const AC_ORDERS = [
  { id: 'PAW-A1B2C3D4', date: '12 mai 2025',   items: 'Friandises Training × 2, Os à Mâcher × 1', total: 18.30, status: 'delivered', points: 18 },
  { id: 'PAW-E5F6G7H8', date: '28 avr. 2025',  items: 'Harnais Sport × 1',                        total: 34.90, status: 'delivered', points: 35 },
  { id: 'PAW-I9J0K1L2', date: '3 mai 2025',    items: 'Bœuf Séché × 3, Sticks Dentaires × 1',    total: 32.20, status: 'shipping',  points: 32 },
];

const AC_OFFERS = [
  { icon: '🦴', title: 'Bienvenue chez Pawtner !',      sub: 'Offre exclusive pour votre 1re commande', code: 'WELCOME10', expiry: 'Valable 30 jours' },
  { icon: '🎁', title: '-15% sur les Friandises',       sub: 'Basé sur vos achats récents',             code: 'FRIAN15',   expiry: 'Expire le 31 mai 2025' },
  { icon: '🚀', title: 'Livraison offerte',             sub: 'Sur votre prochaine commande',            code: 'SHIP0',     expiry: 'Valable 15 jours' },
];

const AC_REWARDS = [
  { icon: '🎟️', name: '-5% sur votre prochaine commande', cost: 100,  minTier: 0 },
  { icon: '🚚', name: 'Livraison gratuite',               cost: 150,  minTier: 0 },
  { icon: '🎁', name: 'Friandise offerte',                cost: 200,  minTier: 1 },
  { icon: '👑', name: '-10% illimité (1 mois)',           cost: 500,  minTier: 2 },
];

const AC_TIERS = [
  { icon: '🐾', name: 'Rookie',   min: 0,   max: 199  },
  { icon: '⭐', name: 'Fidèle',   min: 200, max: 499  },
  { icon: '💎', name: 'Premium',  min: 500, max: 999  },
  { icon: '👑', name: 'VIP',      min: 1000, max: Infinity },
];

function acPoints() { return acUser ? (acUser.points || 0) : 0; }
function acTier()   { return AC_TIERS.findLast(t => acPoints() >= t.min) || AC_TIERS[0]; }
function acTierIdx(){ return AC_TIERS.indexOf(acTier()); }

// ── OPEN / CLOSE ─────────────────────────────────────────────
function openAccount() {
  document.getElementById('account-panel').classList.add('open');
  document.getElementById('account-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderAccount();
}
function closeAccount() {
  document.getElementById('account-panel').classList.remove('open');
  document.getElementById('account-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── RENDER PRINCIPAL ─────────────────────────────────────────
function renderAccount() {
  if (acUser) {
    document.getElementById('ac-auth').style.display   = 'none';
    document.getElementById('ac-logged').style.display = 'flex';
    renderLogged();
  } else {
    document.getElementById('ac-auth').style.display   = 'flex';
    document.getElementById('ac-logged').style.display = 'none';
    renderAuth('login');
  }
  updateAccountBadge();
}

// ── BADGE HEADER ─────────────────────────────────────────────
function updateAccountBadge() {
  const badge = document.querySelector('.account-btn .account-badge');
  if (!badge) return;
  if (acUser) {
    badge.textContent = '✓';
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

// ── VUE AUTH ─────────────────────────────────────────────────
let acAuthMode = 'login';

function renderAuth(mode) {
  acAuthMode = mode;
  const loginTab    = document.getElementById('ac-tab-login');
  const registerTab = document.getElementById('ac-tab-register');
  const form        = document.getElementById('ac-form');
  const error       = document.getElementById('ac-error');
  if (error) error.classList.remove('show');

  loginTab.classList.toggle('active', mode === 'login');
  registerTab.classList.toggle('active', mode === 'register');

  if (mode === 'login') {
    form.innerHTML = `
      <div class="ac-field">
        <label>Adresse e-mail</label>
        <input type="email" id="ac-email" placeholder="votre@email.fr" autocomplete="email" />
      </div>
      <div class="ac-field">
        <label>Mot de passe</label>
        <input type="password" id="ac-password" placeholder="••••••••" autocomplete="current-password" />
      </div>
      <button class="ac-submit" onclick="acLogin()">Se connecter →</button>
    `;
  } else {
    form.innerHTML = `
      <div class="ac-field">
        <label>Prénom</label>
        <input type="text" id="ac-firstname" placeholder="Jean" autocomplete="given-name" />
      </div>
      <div class="ac-field">
        <label>Adresse e-mail</label>
        <input type="email" id="ac-email" placeholder="votre@email.fr" autocomplete="email" />
      </div>
      <div class="ac-field">
        <label>Mot de passe</label>
        <input type="password" id="ac-password" placeholder="8 caractères minimum" autocomplete="new-password" />
      </div>
      <div class="ac-field">
        <label>Téléphone (optionnel)</label>
        <input type="tel" id="ac-phone" placeholder="+33 6 00 00 00 00" autocomplete="tel" />
      </div>
      <button class="ac-submit" onclick="acRegister()">Créer mon compte →</button>
    `;
  }
}

function acShowError(msg) {
  const el = document.getElementById('ac-error');
  el.textContent = msg;
  el.classList.add('show');
}

function acLogin() {
  const email = document.getElementById('ac-email').value.trim();
  const pass  = document.getElementById('ac-password').value;
  if (!email || !pass) { acShowError('Veuillez remplir tous les champs.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { acShowError('Adresse e-mail invalide.'); return; }

  const stored = JSON.parse(localStorage.getItem('pw_accounts') || '{}');
  if (!stored[email]) { acShowError('Aucun compte trouvé avec cet e-mail.'); return; }
  if (stored[email].password !== btoa(pass)) { acShowError('Mot de passe incorrect.'); return; }

  acUser = stored[email];
  localStorage.setItem('pw_user', JSON.stringify(acUser));
  renderAccount();
  acToast('Bienvenue ' + acUser.firstname + ' ! 🐾');
}

function acRegister() {
  const firstname = document.getElementById('ac-firstname').value.trim();
  const email     = document.getElementById('ac-email').value.trim();
  const pass      = document.getElementById('ac-password').value;
  const phone     = document.getElementById('ac-phone') ? document.getElementById('ac-phone').value.trim() : '';
  if (!firstname || !email || !pass) { acShowError('Veuillez remplir les champs obligatoires.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { acShowError('Adresse e-mail invalide.'); return; }
  if (pass.length < 8) { acShowError('Le mot de passe doit contenir au moins 8 caractères.'); return; }

  const stored = JSON.parse(localStorage.getItem('pw_accounts') || '{}');
  if (stored[email]) { acShowError('Un compte existe déjà avec cet e-mail.'); return; }

  const newUser = { firstname, email, phone, password: btoa(pass), points: 50, joinDate: new Date().toLocaleDateString('fr-FR') };
  stored[email] = newUser;
  localStorage.setItem('pw_accounts', JSON.stringify(stored));
  acUser = newUser;
  localStorage.setItem('pw_user', JSON.stringify(acUser));
  renderAccount();
  acToast('Compte créé ! +50 points de bienvenue 🎉');
}

// ── VUE CONNECTÉ ─────────────────────────────────────────────
let acActiveTab = 'loyalty';

function renderLogged() {
  // Profil bar
  document.getElementById('ac-avatar').textContent  = acUser.firstname[0].toUpperCase();
  document.getElementById('ac-name').textContent    = acUser.firstname;
  document.getElementById('ac-email-display').textContent = acUser.email;

  // Points bar
  const pts   = acPoints();
  const tier  = acTier();
  const nextT = AC_TIERS[acTierIdx() + 1];
  document.getElementById('ac-pts-val').textContent  = pts + ' pts';
  document.getElementById('ac-pts-tier').textContent = tier.icon + ' ' + tier.name;
  const pct = nextT ? Math.min(100, Math.round((pts - tier.min) / (nextT.min - tier.min) * 100)) : 100;
  document.getElementById('ac-pts-fill').style.width = pct + '%';
  document.getElementById('ac-pts-next').textContent = nextT
    ? (nextT.min - pts) + ' pts pour atteindre ' + nextT.name
    : 'Niveau maximum atteint 👑';

  renderTab(acActiveTab);
}

function switchTab(tab) {
  acActiveTab = tab;
  document.querySelectorAll('.ac-nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  renderTab(tab);
}

function renderTab(tab) {
  const content = document.getElementById('ac-content');
  if (tab === 'loyalty')  content.innerHTML = renderLoyalty();
  if (tab === 'orders')   content.innerHTML = renderOrders();
  if (tab === 'offers')   content.innerHTML = renderOffers();
  if (tab === 'profile')  content.innerHTML = renderProfile();
  if (tab === 'referral') content.innerHTML = renderReferral();
}

// ── ONGLET FIDÉLITÉ ──────────────────────────────────────────
function renderLoyalty() {
  const pts     = acPoints();
  const tierIdx = acTierIdx();
  const tiers   = AC_TIERS.map((t, i) => `
    <div class="ac-tier ${i === tierIdx ? 'current' : ''}">
      <div class="ac-tier-icon">${t.icon}</div>
      <div class="ac-tier-name">${t.name}</div>
      <div class="ac-tier-pts">${t.min === 0 ? '0' : t.min + '+'} pts</div>
    </div>`).join('');

  const rewards = AC_REWARDS.map(r => {
    const canRedeem = pts >= r.cost;
    return `
    <div class="ac-reward ${canRedeem ? '' : 'locked'}">
      <div class="ac-reward-icon">${r.icon}</div>
      <div>
        <div class="ac-reward-name">${r.name}</div>
        <div class="ac-reward-cost">${r.cost} points</div>
      </div>
      <button class="ac-reward-btn" ${canRedeem ? '' : 'disabled'} onclick="acRedeem('${r.name}', ${r.cost})">
        ${canRedeem ? 'Utiliser' : r.cost - pts + ' pts'}
      </button>
    </div>`;
  }).join('');

  return `
    <div class="ac-section-title">Niveaux de fidélité</div>
    <div class="ac-loyalty-tiers">${tiers}</div>
    <div class="ac-section-title">Récompenses disponibles</div>
    <div class="ac-rewards-list">${rewards}</div>
    <p style="font-size:11px;color:var(--muted);margin-top:16px;line-height:1.6;">
      💡 Vous gagnez <strong>1 point par euro dépensé</strong>. Les points sont crédités après livraison.
    </p>`;
}

function acRedeem(name, cost) {
  if (acPoints() < cost) return;
  acUser.points -= cost;
  saveUser();
  renderLogged();
  acToast('Récompense activée : ' + name + ' 🎉');
}

// ── ONGLET COMMANDES ─────────────────────────────────────────
function renderOrders() {
  if (!AC_ORDERS.length) return `<p style="color:var(--muted);font-size:13px;">Aucune commande pour le moment.</p>`;
  const statusLabel = { delivered: 'Livré', shipping: 'En transit', pending: 'En préparation' };
  return AC_ORDERS.map(o => `
    <div class="ac-order">
      <div class="ac-order-head">
        <div>
          <div class="ac-order-num">${o.id}</div>
          <div class="ac-order-date">${o.date}</div>
        </div>
        <span class="ac-order-status ${o.status}">${statusLabel[o.status]}</span>
      </div>
      <div class="ac-order-items">${o.items}</div>
      <div class="ac-order-footer">
        <span class="ac-order-total">${o.total.toFixed(2).replace('.',',')} €</span>
        <button class="ac-order-invoice" onclick="openInvoice('${o.id}','${o.date}','${o.items}',${o.total})">
          📄 Voir la facture
        </button>
      </div>
    </div>`).join('');
}

// ── ONGLET PARRAINAGE ────────────────────────────────────────
function renderReferral() {
  // Génère un code unique par compte, déterministe (basé sur l'email)
  const code = acUser.referralCode || (() => {
    const hash = acUser.email.split('').reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
    const ref  = Math.abs(hash).toString(36).toUpperCase().padStart(5, '0').slice(0, 5);
    acUser.referralCode = ref;
    saveUser();
    return ref;
  })();
  const link       = `pawtner.fr/ref/${code}`;
  const sponsored  = acUser.sponsored || 0;
  const pending    = acUser.pendingReferrals || 0;

  return `
    <div class="ac-section-title">Mon lien de parrainage</div>

    <div class="ref-link-box">
      <div class="ref-link-label">Votre lien unique</div>
      <div class="ref-link-row">
        <span class="ref-link-url" id="ref-url">${link}</span>
        <button class="ref-copy-btn" onclick="acCopyRef('${link}')">
          <span id="ref-copy-icon">📋</span>
        </button>
      </div>
      <div class="ref-copy-msg" id="ref-copy-msg"></div>
    </div>

    <div class="ref-stats-row">
      <div class="ref-stat">
        <div class="ref-stat-num">${sponsored}</div>
        <div class="ref-stat-label">Amis parrainés</div>
      </div>
      <div class="ref-stat">
        <div class="ref-stat-num">${sponsored * 200}</div>
        <div class="ref-stat-label">Points gagnés</div>
      </div>
      <div class="ref-stat">
        <div class="ref-stat-num">${sponsored}</div>
        <div class="ref-stat-label">Friandises offertes</div>
      </div>
    </div>

    <div class="ac-section-title" style="margin-top:20px;">Comment ça marche</div>
    <div class="ref-steps">
      <div class="ref-step">
        <div class="ref-step-num">1</div>
        <div>
          <div class="ref-step-title">Partagez votre lien</div>
          <div class="ref-step-desc">Envoyez votre lien unique à vos amis propriétaires de chiens.</div>
        </div>
      </div>
      <div class="ref-step">
        <div class="ref-step-num">2</div>
        <div>
          <div class="ref-step-title">Votre ami commande</div>
          <div class="ref-step-desc">Il bénéficie de <strong>−10% sur sa première commande</strong> automatiquement.</div>
        </div>
      </div>
      <div class="ref-step">
        <div class="ref-step-num">3</div>
        <div>
          <div class="ref-step-title">Vous êtes récompensé</div>
          <div class="ref-step-desc">Dès sa commande validée, vous recevez une <strong>friandise offerte</strong> + 200 points de fidélité.</div>
        </div>
      </div>
    </div>

    <div class="ref-info-box">
      <div class="ref-info-row"><span class="ref-info-icon">🎁</span><div><strong>Pour vous (le parrain)</strong><br>1 friandise au choix offerte + 200 points par ami parrainé</div></div>
      <div class="ref-info-divider"></div>
      <div class="ref-info-row"><span class="ref-info-icon">🐾</span><div><strong>Pour votre ami (le filleul)</strong><br>−10% sur sa première commande, dès l'inscription</div></div>
    </div>`;
}

function acCopyRef(link) {
  navigator.clipboard.writeText('https://' + link).catch(() => {});
  const icon = document.getElementById('ref-copy-icon');
  const msg  = document.getElementById('ref-copy-msg');
  if (icon) icon.textContent = '✓';
  if (msg)  { msg.textContent = 'Lien copié !'; msg.classList.add('visible'); }
  const btn = document.querySelector('.ref-copy-btn');
  if (btn) btn.style.background = '#3a7a3a';
  setTimeout(() => {
    if (icon) icon.textContent = '📋';
    if (msg)  { msg.textContent = ''; msg.classList.remove('visible'); }
    if (btn)  btn.style.background = '';
  }, 2500);
}

// ── ONGLET OFFRES ────────────────────────────────────────────
function renderOffers() {
  return AC_OFFERS.map(o => `
    <div class="ac-offer">
      <div class="ac-offer-top">
        <div class="ac-offer-icon">${o.icon}</div>
        <div>
          <div class="ac-offer-title">${o.title}</div>
          <div class="ac-offer-sub">${o.sub}</div>
        </div>
      </div>
      <div class="ac-offer-body">
        <span class="ac-offer-code">${o.code}</span>
        <div>
          <div class="ac-offer-expiry">⏱ ${o.expiry}</div>
          <button style="margin-top:6px;font-size:11px;color:var(--terracotta);background:none;border:none;cursor:pointer;font-family:inherit;text-decoration:underline;" onclick="acCopyCode('${o.code}')">
            Copier le code
          </button>
        </div>
      </div>
    </div>`).join('');
}

function acCopyCode(code) {
  navigator.clipboard.writeText(code).catch(() => {});
  acToast('Code "' + code + '" copié ! 📋');
}

// ── ONGLET PROFIL ────────────────────────────────────────────
function renderProfile() {
  return `
    <div class="ac-section-title">Mes informations</div>
    <div class="ac-profile-form">
      <div class="ac-field">
        <label>Prénom</label>
        <input type="text" id="pf-firstname" value="${acUser.firstname || ''}" placeholder="Jean" />
      </div>
      <div class="ac-field">
        <label>Nom</label>
        <input type="text" id="pf-lastname" value="${acUser.lastname || ''}" placeholder="Dupont" />
      </div>
      <div class="ac-field">
        <label>Adresse e-mail</label>
        <input type="email" id="pf-email" value="${acUser.email || ''}" placeholder="votre@email.fr" />
      </div>
      <div class="ac-field">
        <label>Téléphone</label>
        <input type="tel" id="pf-phone" value="${acUser.phone || ''}" placeholder="+33 6 00 00 00 00" />
      </div>
      <div class="ac-field">
        <label>Adresse de livraison</label>
        <input type="text" id="pf-address" value="${acUser.address || ''}" placeholder="12 rue de la Paix, 75001 Paris" />
      </div>
      <div class="ac-field">
        <label>Nouveau mot de passe (laisser vide pour ne pas changer)</label>
        <input type="password" id="pf-password" placeholder="••••••••" />
      </div>
      <button class="ac-submit" onclick="acSaveProfile()">Enregistrer les modifications</button>
      <p style="font-size:11px;color:var(--muted);text-align:center;">Membre depuis le ${acUser.joinDate || 'aujourd\'hui'}</p>
      <button class="ac-logout" onclick="acLogout()">Se déconnecter</button>
    </div>`;
}

function acSaveProfile() {
  acUser.firstname = document.getElementById('pf-firstname').value.trim() || acUser.firstname;
  acUser.lastname  = document.getElementById('pf-lastname').value.trim();
  acUser.email     = document.getElementById('pf-email').value.trim() || acUser.email;
  acUser.phone     = document.getElementById('pf-phone').value.trim();
  acUser.address   = document.getElementById('pf-address').value.trim();
  const newPass    = document.getElementById('pf-password').value;
  if (newPass) {
    if (newPass.length < 8) { acToast('⚠️ Mot de passe trop court (8 car. min.)'); return; }
    acUser.password = btoa(newPass);
  }
  saveUser();
  renderLogged();
  acToast('Profil mis à jour ✓');
}

function acLogout() {
  acUser = null;
  localStorage.removeItem('pw_user');
  renderAccount();
  acToast('Déconnecté — à bientôt ! 🐾');
}

function saveUser() {
  localStorage.setItem('pw_user', JSON.stringify(acUser));
  const stored = JSON.parse(localStorage.getItem('pw_accounts') || '{}');
  stored[acUser.email] = acUser;
  localStorage.setItem('pw_accounts', JSON.stringify(stored));
}

// ── FACTURE ──────────────────────────────────────────────────
function openInvoice(id, date, items, total) {
  const shipping = 3.99;
  const subtotal = total - shipping;
  document.getElementById('inv-num').textContent       = id;
  document.getElementById('inv-date').textContent      = date;
  document.getElementById('inv-client').textContent    = (acUser.firstname || '') + ' ' + (acUser.lastname || '');
  document.getElementById('inv-email').textContent     = acUser.email;
  document.getElementById('inv-items').innerHTML       = items.split(',').map(i => `
    <div class="invoice-row"><span>${i.trim()}</span><span>—</span></div>`).join('');
  document.getElementById('inv-subtotal').textContent  = subtotal.toFixed(2).replace('.',',') + ' €';
  document.getElementById('inv-shipping').textContent  = shipping.toFixed(2).replace('.',',') + ' €';
  document.getElementById('inv-total').textContent     = total.toFixed(2).replace('.',',') + ' €';
  document.getElementById('invoice-modal').classList.add('open');
}
function closeInvoice() {
  document.getElementById('invoice-modal').classList.remove('open');
}

// ── TOAST ────────────────────────────────────────────────────
function acToast(msg) {
  let t = document.getElementById('ac-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'ac-toast';
    t.className = 'ac-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ── COMPTES DÉMO ─────────────────────────────────────────────
(function seedDemoAccounts() {
  const stored = JSON.parse(localStorage.getItem('pw_accounts') || '{}');
  if (!stored['demo@pawtner.fr']) {
    stored['demo@pawtner.fr'] = {
      firstname: 'Sophie', lastname: 'Martin', email: 'demo@pawtner.fr',
      phone: '+33 6 12 34 56 78', address: '12 rue de la Paix, 75001 Paris',
      password: btoa('pawtner2025'), points: 285, joinDate: '10 janvier 2025'
    };
  }
  if (!stored['vip@pawtner.fr']) {
    stored['vip@pawtner.fr'] = {
      firstname: 'Thomas', lastname: 'Dubois', email: 'vip@pawtner.fr',
      phone: '+33 7 98 76 54 32', address: '8 avenue des Champs, 69002 Lyon',
      password: btoa('pawtner2025'), points: 620, joinDate: '3 octobre 2024'
    };
  }
  localStorage.setItem('pw_accounts', JSON.stringify(stored));
})();

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateAccountBadge();
});
