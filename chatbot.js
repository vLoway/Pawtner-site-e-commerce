const PW_FAQ = [
  {
    patterns: ['commande', 'colis', 'arrivée', 'reçu', 'livré', 'livraison', 'suivi', 'tracking', 'expédié', 'expédition', 'où est'],
    answer: 'Votre commande est expédiée sous 24h (jours ouvrés) et arrive en 3 à 5 jours en France métropolitaine. Vous recevez un email avec le lien de suivi dès l\'expédition. Si vous ne le retrouvez pas, contactez-nous à <strong>support@pawtner.fr</strong> avec votre numéro de commande.'
  },
  {
    patterns: ['retour', 'renvoyer', 'renvoi', 'retourner', 'retourné', 'échange'],
    answer: 'Vous avez <strong>30 jours</strong> après réception pour retourner un produit non ouvert et dans son emballage d\'origine. Envoyez-nous votre demande à <strong>support@pawtner.fr</strong> en indiquant votre numéro de commande, et nous vous communiquerons l\'adresse de retour.'
  },
  {
    patterns: ['remboursement', 'remboursé', 'rembourser', 'argent', 'payé', 'paiement retour'],
    answer: 'Dès réception de votre retour, le remboursement est effectué sous <strong>5 à 7 jours ouvrés</strong> sur votre moyen de paiement initial. Vous recevrez un email de confirmation dès que le virement est lancé.'
  },
  {
    patterns: ['livraison', 'délai', 'combien de temps', 'quand', 'délais'],
    answer: 'La livraison standard prend <strong>3 à 5 jours ouvrés</strong> en France métropolitaine. La livraison est gratuite à partir de <strong>40€</strong> d\'achat, et 4,90€ en dessous. Nous expédions également en Belgique, Suisse et Luxembourg.'
  },
  {
    patterns: ['provenance', 'origine', 'fabriqué', 'fabrication', 'ingrédients', 'composition', 'où viennent', 'sourcé', 'sourcing'],
    answer: 'Tous nos produits sont sourcés en <strong>Europe</strong> auprès de fournisseurs sélectionnés et régulièrement audités. Nos recettes sont validées par des vétérinaires nutritionnistes, sans additifs artificiels ni colorants. Chaque lot est contrôlé avant expédition.'
  },
  {
    patterns: ['fiable', 'confiance', 'sécurisé', 'sécurité', 'arnaque', 'sérieux', 'légal', 'avis', 'vrai', 'véritable', 'marque'],
    answer: 'Pawtner est une marque française créée par des passionnés d\'animaux. Les paiements sont <strong>100% sécurisés via Stripe</strong> (aucune donnée bancaire stockée). Nos avis clients sont vérifiés, et notre service client répond sous 24h à <strong>support@pawtner.fr</strong>.'
  },
  {
    patterns: ['annuler', 'annulation', 'modifier', 'modification', 'changer ma commande'],
    answer: 'Vous pouvez annuler ou modifier votre commande dans les <strong>2 heures</strong> suivant la validation. Passé ce délai, elle est déjà en préparation. Contactez-nous en urgence à <strong>support@pawtner.fr</strong> avec votre numéro de commande.'
  },
  {
    patterns: ['payer', 'paiement', 'carte', 'virement', 'paypal', 'moyen de paiement'],
    answer: 'Nous acceptons les cartes Visa, Mastercard et American Express, ainsi que PayPal. Les paiements sont traités de façon sécurisée par Stripe. Aucune information bancaire n\'est stockée sur nos serveurs.'
  },
  {
    patterns: ['contact', 'joindre', 'téléphone', 'email', 'mail', 'parler', 'humain', 'conseiller'],
    answer: 'Notre équipe est joignable par email à <strong>support@pawtner.fr</strong>, du lundi au vendredi de 9h à 18h. Nous répondons généralement sous <strong>24h ouvrées</strong>. Pour les urgences commande, précisez votre numéro de commande dans l\'objet.'
  },
  {
    patterns: ['vétérinaire', 'santé', 'allergie', 'sensible', 'problème', 'maladie', 'conseil santé'],
    answer: 'Nos produits sont formulés avec l\'aide de vétérinaires nutritionnistes, mais nous ne pouvons pas remplacer un avis médical vétérinaire. Si votre chien a des problèmes de santé spécifiques, consultez votre vétérinaire avant de changer son alimentation.'
  },
  {
    patterns: ['code promo', 'réduction', 'discount', 'offre', 'promotions', 'soldes'],
    answer: 'Nos offres promotionnelles sont partagées par email et sur notre page Instagram. Abonnez-vous à notre newsletter pour ne rien manquer. Les codes promo s\'appliquent directement dans le panier au moment du paiement.'
  },
  {
    patterns: ['bonjour', 'salut', 'hello', 'bonsoir', 'coucou', 'hey'],
    answer: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ? N\'hésitez pas à me poser votre question sur vos commandes, nos produits ou notre marque 🐾'
  },
  {
    patterns: ['merci', 'super', 'parfait', 'nickel', 'ok merci', 'thanks'],
    answer: 'Avec plaisir ! Si vous avez d\'autres questions, je suis là 🐾 Belle journée à vous et à votre compagnon !'
  }
];

const FALLBACK = "Je n'ai pas la réponse à cette question précise. Notre équipe sera ravie de vous aider directement à <strong>support@pawtner.fr</strong> — réponse sous 24h ouvrées 🐾";

function pwFind(text) {
  const t = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  let best = null, bestScore = 0;
  for (const entry of PW_FAQ) {
    const score = entry.patterns.filter(p => t.includes(p.normalize('NFD').replace(/[̀-ͯ]/g, ''))).length;
    if (score > bestScore) { bestScore = score; best = entry; }
  }
  return bestScore > 0 ? best.answer : FALLBACK;
}

function pwAddMsg(text, role) {
  const box = document.getElementById('pw-msgs');
  const d = document.createElement('div');
  d.className = 'pw-m ' + role;
  if (role === 'bot') d.innerHTML = text;
  else d.textContent = text;
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
  return d;
}

function pwSend() {
  const inp = document.getElementById('pw-inp');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  document.getElementById('pw-chips').style.display = 'none';
  pwAddMsg(text, 'user');

  const typing = pwAddMsg('...', 'typing');
  const delay = 500 + Math.random() * 400;
  setTimeout(() => {
    typing.remove();
    pwAddMsg(pwFind(text), 'bot');
  }, delay);
}

function pwChip(btn) {
  document.getElementById('pw-inp').value = btn.textContent;
  pwSend();
}

function pwOpen() {
  document.getElementById('pw-chat').classList.add('open');
  document.getElementById('pw-launcher').classList.add('hidden');
  setTimeout(() => document.getElementById('pw-inp').focus(), 400);
}

function pwClose() {
  document.getElementById('pw-chat').classList.remove('open');
  setTimeout(() => document.getElementById('pw-launcher').classList.remove('hidden'), 300);
}
