import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { URL } from 'node:url';
import fs from 'node:fs/promises';
import path from 'node:path';

export const MENU = [
  { id: 'ramen', name: 'Tokyo Ramen', price: 980, category: 'savory', description: 'Rich broth · noodles · egg · nori', image: '/suwenku/assets/food.jpg' },
  { id: 'takoyaki', name: 'Takoyaki', price: 680, category: 'street', description: '6 crispy octopus balls · bonito · sauce', image: '/suwenku/assets/news-2.jpg' },
  { id: 'daifuku', name: 'Strawberry Daifuku', price: 520, category: 'sweet', description: 'Soft mochi · fresh strawberry · cream', image: '/suwenku/assets/news-3.jpg' },
];

export function validateOrder(input) {
  if (!Array.isArray(input?.items) || input.items.length < 1 || input.items.length > 20) return { ok: false, error: 'Cart must contain between 1 and 20 items.' };
  const customerName = typeof input.customerName === 'string' ? input.customerName.trim().slice(0, 80) : '';
  const email = typeof input.email === 'string' ? input.email.trim().slice(0, 120) : '';
  const note = typeof input.note === 'string' ? input.note.trim().slice(0, 300) : '';
  if (customerName.length < 2) return { ok: false, error: 'Please provide your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Please provide a valid email.' };
  const items = [];
  for (const entry of input.items) {
    const item = MENU.find((candidate) => candidate.id === entry?.itemId);
    const qty = Number(entry?.qty);
    if (!item || !Number.isInteger(qty) || qty < 1 || qty > 12) return { ok: false, error: 'Invalid cart item or quantity.' };
    items.push({ itemId: item.id, item: item.name, qty, unitPrice: item.price, total: item.price * qty });
  }
  return { ok: true, orderInput: { customerName, email, note, items, total: items.reduce((sum, item) => sum + item.total, 0) } };
}

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '0.0.0.0';
const DATA_DIR = process.env.DATA_DIR || path.resolve(process.cwd(), 'api/data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
const hits = new Map();
let writeQueue = Promise.resolve();

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'content-length': Buffer.byteLength(body) });
  res.end(body);
}
function clientIp(req) { return (req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || 'unknown').trim(); }
function rateLimited(req) {
  const key = clientIp(req); const now = Date.now(); const current = hits.get(key);
  if (!current || now - current.start >= 60_000) { hits.set(key, { start: now, count: 1 }); return false; }
  current.count += 1; return current.count > 30;
}
async function body(req, max = 16_000) {
  return new Promise((resolve, reject) => { let size = 0; const chunks = [];
    req.on('data', (chunk) => { size += chunk.length; if (size > max) { reject(Object.assign(new Error('Payload too large'), { statusCode: 413 })); req.destroy(); return; } chunks.push(chunk); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8'))); req.on('error', reject);
  });
}
async function readOrders() { try { return JSON.parse(await fs.readFile(ORDERS_FILE, 'utf8')); } catch (error) { if (error.code === 'ENOENT') return []; throw error; } }
async function persist(orders) { await fs.mkdir(DATA_DIR, { recursive: true }); const tmp = `${ORDERS_FILE}.tmp`; await fs.writeFile(tmp, JSON.stringify(orders.slice(-500), null, 2)); await fs.rename(tmp, ORDERS_FILE); }
async function createOrder(input) { const task = writeQueue.then(async () => { const orders = await readOrders(); const order = { id: `MM-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 8).toUpperCase()}`, ...input, status: 'received', createdAt: new Date().toISOString() }; orders.push(order); await persist(orders); return order; }); writeQueue = task.catch(() => {}); return task; }

export function createServer() {
  return http.createServer(async (req, res) => {
    const requestId = randomUUID();
    res.setHeader('x-request-id', requestId);
    res.setHeader('access-control-allow-origin', CORS_ORIGIN);
    res.setHeader('access-control-allow-methods', 'GET,POST,OPTIONS');
    res.setHeader('access-control-allow-headers', 'content-type');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
    if (rateLimited(req)) { json(res, 429, { ok: false, error: { code: 'RATE_LIMITED', message: 'Too many requests.', requestId } }); return; }
    const url = new URL(req.url || '/', `http://${req.headers.host || `${HOST}:${PORT}`}`);
    try {
      if (req.method === 'GET' && url.pathname === '/api/health') return json(res, 200, { ok: true, service: 'momoha-api', timestamp: new Date().toISOString(), requestId });
      if (req.method === 'GET' && url.pathname === '/api/menu') return json(res, 200, { ok: true, items: MENU, requestId });
      if (req.method === 'GET' && url.pathname === '/api/orders') { const orders = await readOrders(); return json(res, 200, { ok: true, orders: orders.slice(-50).reverse(), requestId }); }
      if (req.method === 'POST' && url.pathname === '/api/orders') {
        let input; try { input = JSON.parse(await body(req) || '{}'); } catch { return json(res, 400, { ok: false, error: { code: 'INVALID_JSON', message: 'Request body must be valid JSON.', requestId } }); }
        const result = validateOrder(input); if (!result.ok) return json(res, 400, { ok: false, error: { code: 'VALIDATION_ERROR', message: result.error, requestId } });
        const order = await createOrder(result.orderInput); return json(res, 201, { ok: true, order, requestId });
      }
      return json(res, 404, { ok: false, error: { code: 'NOT_FOUND', message: 'Route not found.', requestId } });
    } catch (error) { const status = error.statusCode || 500; return json(res, status, { ok: false, error: { code: status === 413 ? 'PAYLOAD_TOO_LARGE' : 'SERVER_ERROR', message: status === 413 ? 'Payload too large.' : 'Unexpected server error.', requestId } }); }
  });
}

if (process.env.NODE_ENV !== 'test') createServer().listen(PORT, HOST, () => console.log(`MOMOHA API listening on http://${HOST}:${PORT}`));
