const API_BASE = (window.MOMOHA_API_URL || '').replace(/\/$/, '');
const apiUrl = (path) => `${API_BASE}${path}`;
const FALLBACK_MENU = [
  { id: 'ramen', name: 'Tokyo Ramen', price: 980, category: 'savory', description: 'Rich broth · noodles · egg · nori', image: 'assets/food.jpg' },
  { id: 'takoyaki', name: 'Takoyaki', price: 680, category: 'street', description: '6 crispy octopus balls · bonito · sauce', image: 'assets/news-2.jpg' },
  { id: 'daifuku', name: 'Strawberry Daifuku', price: 520, category: 'sweet', description: 'Soft mochi · fresh strawberry · cream', image: 'assets/news-3.jpg' }
];
const NEWS = {
  ramen: { kicker: 'NEW · 06.12.26', title: 'Midnight ramen is back.', body: 'Our late-night Tokyo ramen is back on the menu: rich broth, springy noodles, a jammy egg and crisp nori. Come hungry, leave happy.', item: 'ramen' },
  takoyaki: { kicker: 'HOT · 05.28.26', title: 'Our takoyaki, extra crispy.', body: 'Six golden takoyaki with a crisp shell, fluffy center, bonito, sauce and a little extra sparkle. Best eaten hot from the tray.', item: 'takoyaki' },
  daifuku: { kicker: 'SWEET · 05.14.26', title: 'Strawberry season has landed.', body: 'Soft mochi, fresh strawberry and cloud-like cream make this our sweetest seasonal bite. Limited while the berries are at their best.', item: 'daifuku' }
};
const state = { menu: [], cart: [] };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const menuGrid = $('#menu-grid');
const menuToggle = $('.menu-toggle');
const nav = $('.site-nav');
const dialog = $('#order-dialog');
const newsDialog = $('#news-dialog');
const form = $('#order-form');
const message = $('#form-message');
const itemSelect = $('#order-item');
const qtyInput = $('#order-qty');
const totalOutput = $('#order-total');
const cartList = $('#cart-list');
const addItemButton = $('#add-item');
const submitButton = $('#submit-order');
let lastOrderTrigger = null;
let lastNewsTrigger = null;

const money = (value) => `¥ ${Number(value).toLocaleString('en-US')}`;
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* storage can be blocked */ } }
};
const setMenuState = (open) => {
  nav?.classList.toggle('open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuToggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
menuToggle?.addEventListener('click', () => setMenuState(!nav?.classList.contains('open')));
$$('.site-nav a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));

function saveCart() { storage.set('momoha-cart', JSON.stringify(state.cart)); }
function loadCart() {
  try {
    const saved = JSON.parse(storage.get('momoha-cart') || '[]');
    if (Array.isArray(saved)) state.cart = saved.filter((entry) => entry && typeof entry.itemId === 'string' && Number.isInteger(entry.qty) && entry.qty > 0 && entry.qty <= 12);
  } catch { state.cart = []; }
}
function getItem(id) { return state.menu.find((item) => item.id === id); }
function cartTotal() { return state.cart.reduce((sum, entry) => sum + (getItem(entry.itemId)?.price || 0) * entry.qty, 0); }
function renderCart() {
  if (!cartList) return;
  if (!state.cart.length) {
    cartList.innerHTML = '<div class="cart-empty">Your box is empty. Add something delicious below.</div>';
  } else {
    cartList.innerHTML = state.cart.map((entry) => {
      const item = getItem(entry.itemId);
      return `<div class="cart-row"><div><div class="cart-name">${item?.name || 'Item'}</div><div class="cart-meta">${entry.qty} × ${money(item?.price || 0)}</div></div><strong>${money((item?.price || 0) * entry.qty)}</strong><button class="cart-remove" type="button" data-remove="${entry.itemId}" aria-label="Remove ${item?.name || 'item'}">×</button></div>`;
    }).join('');
  }
  if (totalOutput) totalOutput.textContent = money(cartTotal());
  $$('.cart-remove', cartList).forEach((button) => button.addEventListener('click', () => {
    state.cart = state.cart.filter((entry) => entry.itemId !== button.dataset.remove);
    saveCart(); renderCart();
  }));
}
function addToCart(itemId, qty = 1) {
  const item = getItem(itemId);
  if (!item) return false;
  const amount = Math.min(12, Math.max(1, Number(qty) || 1));
  const existing = state.cart.find((entry) => entry.itemId === itemId);
  if (existing) existing.qty = Math.min(12, existing.qty + amount);
  else state.cart.push({ itemId, qty: amount });
  saveCart(); renderCart();
  return true;
}
function renderSelect() {
  if (!itemSelect) return;
  itemSelect.innerHTML = state.menu.map((item) => `<option value="${item.id}">${item.name} — ${money(item.price)}</option>`).join('');
}
function observeReveal(elements, threshold = .08) {
  if (!elements.length) return;
  if (!('IntersectionObserver' in window)) { elements.forEach((element) => element.classList.add('is-visible')); return; }
  const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
  }), { threshold });
  elements.forEach((element) => reveal.observe(element));
}
function renderMenu() {
  if (!menuGrid) return;
  menuGrid.innerHTML = state.menu.map((item, index) => `<article class="menu-card ${index === 0 ? 'featured' : ''}"><div class="card-art"><img src="${item.image}" alt="${item.name}" width="900" height="900" loading="lazy" decoding="async"></div><div class="menu-info"><span>${item.category === 'sweet' ? 'SWEET' : item.category === 'street' ? 'HOT' : 'NEW'}</span><h3>${item.name}</h3><p>${item.description}</p><strong>${money(item.price)}</strong><button class="card-order" type="button" data-add="${item.id}">ADD TO ORDER <span>+</span></button></div></article>`).join('');
  $$('.card-order', menuGrid).forEach((button) => button.addEventListener('click', () => { if (addToCart(button.dataset.add, 1)) openOrder(button.dataset.add, button); }));
  const cards = $$('.menu-card', menuGrid);
  cards.forEach((element, index) => { element.classList.add('reveal'); element.style.transitionDelay = `${Math.min(index * 80, 180)}ms`; });
  observeReveal(cards);
}
async function fetchJson(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(apiUrl(path), { ...options, signal: controller.signal });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload?.error?.message || `Request failed (${response.status}).`);
    return payload;
  } finally { clearTimeout(timer); }
}
async function loadMenu() {
  try {
    if (!API_BASE) throw new Error('No API configured');
    const payload = await fetchJson('/api/menu', { headers: { accept: 'application/json' } });
    state.menu = Array.isArray(payload.items) && payload.items.length ? payload.items : FALLBACK_MENU;
  } catch { state.menu = FALLBACK_MENU; }
  renderMenu(); renderSelect(); renderCart();
}
function openDialog(target) {
  if (!target) return false;
  if (typeof target.showModal !== 'function') { target.setAttribute('open', ''); return true; }
  if (!target.open) target.showModal();
  return true;
}
function closeDialog(target) { if (!target) return; if (target.open) target.close(); else target.removeAttribute('open'); }
function openOrder(itemId = '', trigger = null) {
  if (!dialog) return;
  lastOrderTrigger = trigger || document.activeElement;
  if (itemId && itemSelect) itemSelect.value = itemId;
  openDialog(dialog);
  renderCart();
  setTimeout(() => itemSelect?.focus(), 50);
}
function closeOrder() { closeDialog(dialog); setTimeout(() => lastOrderTrigger?.focus?.(), 0); }
$$('.js-order').forEach((button) => button.addEventListener('click', () => openOrder(button.dataset.item || '', button)));
addItemButton?.addEventListener('click', () => {
  if (!addToCart(itemSelect?.value, Number(qtyInput?.value || 1))) return;
  qtyInput.value = '1'; itemSelect?.focus();
});
dialog?.querySelector('[data-close]')?.addEventListener('click', closeOrder);
dialog?.addEventListener('click', (event) => { if (event.target === dialog) closeOrder(); });
autoCloseOnEscape(dialog, closeOrder);

$$('.news-card-link').forEach((button) => button.addEventListener('click', () => {
  const story = NEWS[button.closest('.news-card')?.dataset.news];
  if (!story || !newsDialog) return;
  lastNewsTrigger = button;
  $('#news-dialog-kicker').textContent = story.kicker;
  $('#news-dialog-title').textContent = story.title;
  $('#news-dialog-body').textContent = story.body;
  $('.js-news-order', newsDialog).dataset.item = story.item;
  openDialog(newsDialog);
  setTimeout(() => $('.js-news-order', newsDialog)?.focus(), 50);
}));
function closeNews() { closeDialog(newsDialog); setTimeout(() => lastNewsTrigger?.focus?.(), 0); }
newsDialog?.querySelector('[data-news-close]')?.addEventListener('click', closeNews);
newsDialog?.addEventListener('click', (event) => { if (event.target === newsDialog) closeNews(); });
$('.js-news-order', newsDialog)?.addEventListener('click', () => { const item = $('.js-news-order', newsDialog).dataset.item; closeNews(); openOrder(item, lastNewsTrigger); });
autoCloseOnEscape(newsDialog, closeNews);

async function submitOrder() {
  const formData = new FormData(form);
  const payload = { items: state.cart, customerName: formData.get('customerName'), email: formData.get('email'), note: formData.get('note') };
  if (!payload.items.length) throw new Error('Add at least one item to your order.');
  if (!API_BASE) throw new Error('Ordering is not connected on this preview. Set MOMOHA_API_URL to the deployed API.');
  const result = await fetchJson('/api/orders', { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(payload) });
  if (!result?.order?.id) throw new Error('The server returned an invalid order response. Please try again.');
  return result;
}
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  submitButton.disabled = true;
  message.className = 'form-message';
  message.textContent = 'SENDING ORDER…';
  try {
    const payload = await submitOrder();
    message.textContent = `ORDER ${payload.order.id} RECEIVED — TOTAL ${money(payload.order.total)}.`;
    state.cart = []; saveCart(); renderCart(); form.reset();
    setTimeout(closeOrder, 1800);
  } catch (error) {
    message.className = 'form-message error';
    message.textContent = error.name === 'AbortError' ? 'The request timed out. Please try again.' : error.message;
  } finally { submitButton.disabled = false; }
});

document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && nav?.classList.contains('open')) setMenuState(false); });
function autoCloseOnEscape(target, close) { target?.addEventListener('cancel', (event) => { event.preventDefault(); close(); }); }
loadCart();
loadMenu();
const initialReveal = $$('.news-card,.kitchen-copy,.kitchen-image');
initialReveal.forEach((element, index) => { element.classList.add('reveal'); element.style.transitionDelay = `${Math.min(index * 70, 210)}ms`; });
observeReveal(initialReveal, .1);
