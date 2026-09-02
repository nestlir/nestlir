import http from 'node:http';
import { randomUUID } from 'node:crypto';

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '0.0.0.0';

const MENU = [
  { id: 'ramen', name: 'Tokyo Ramen', price: 980, category: 'savory', description: 'Rich broth · noodles · egg · nori', image: '/suwenku/assets/food.svg' },
  { id: 'takoyaki', name: 'Takoyaki', price: 680, category: 'street', description: '6 crispy octopus balls · bonito · sauce', image: '/suwenku/assets/news-2.svg' },
  { id: 'daifuku', name: 'Strawberry Daifuku', price: 520, category: 'sweet', description: 'Soft mochi · fresh strawberry · cream', image: '/suwenku/assets/news-3.svg' },
];

const orders = [];
const rateWindowMs = 60_000;
const rateLimit = 30;
const hits = new Map();

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(body),
  });
  res.end(body);
}

function readBody(req, maxBytes = 8_000) {
  return new Promise((resolve, reject) => {
    let total = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > maxBytes) {
        reject(Object.assign(new Error('Payload too large'), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function checkRateLimit(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start >= rateWindowMs) {
    hits.set(ip, { start: now, count: 1 });
    return true;
  }
  entry.count += 1;
  return entry.count <= rateLimit;
}

function validateOrder(input) {
  const item = MENU.find((menuItem) => menuItem.id === input?.itemId);
  const qty = Number(input?.qty);
  if (!item) return { ok: false, error: 'Unknown menu item.' };
  if (!Number.isInteger(qty) || qty < 1 || qty > 12) return { ok: false, error: 'Quantity must be an integer from 1 to 12.' };
  return { ok: true, item, qty };
}

const server = http.createServer(async (req, res) => {
  const requestId = randomUUID();
  res.setHeader('x-request-id', requestId);
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-methods', 'GET,POST,OPTIONS');
  res.setHeader('access-control-allow-headers', 'content-type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (!checkRateLimit(req)) {
    sendJson(res, 429, { ok: false, error: { code: 'RATE_LIMITED', message: 'Too many requests.', requestId } });
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || `${HOST}:${PORT}`}`);

  if (req.method === 'GET' && url.pathname === '/api/health') {
    sendJson(res, 200, { ok: true, service: 'momoha-api', timestamp: new Date().toISOString(), requestId });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/menu') {
    sendJson(res, 200, { ok: true, items: MENU, requestId });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/orders') {
    try {
      const raw = await readBody(req);
      let input;
      try {
        input = JSON.parse(raw || '{}');
      } catch {
        sendJson(res, 400, { ok: false, error: { code: 'INVALID_JSON', message: 'Request body must be valid JSON.', requestId } });
        return;
      }

      const result = validateOrder(input);
      if (!result.ok) {
        sendJson(res, 400, { ok: false, error: { code: 'VALIDATION_ERROR', message: result.error, requestId } });
        return;
      }

      const order = {
        id: `MM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
        itemId: result.item.id,
        item: result.item.name,
        qty: result.qty,
        unitPrice: result.item.price,
        total: result.item.price * result.qty,
        createdAt: new Date().toISOString(),
      };

      orders.push(order);
      if (orders.length > 500) orders.shift();

      sendJson(res, 201, { ok: true, order, requestId });
      return;
    } catch (error) {
      const status = error?.statusCode || 500;
      sendJson(res, status, { ok: false, error: { code: 'SERVER_ERROR', message: status === 413 ? 'Payload too large.' : 'Unexpected server error.', requestId } });
      return;
    }
  }

  sendJson(res, 404, { ok: false, error: { code: 'NOT_FOUND', message: 'Route not found.', requestId } });
});

server.listen(PORT, HOST, () => {
  console.log(`MOMOHA API listening on http://${HOST}:${PORT}`);
});
