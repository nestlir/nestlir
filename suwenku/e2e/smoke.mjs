import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const port = 8799;
const child = spawn(process.execPath, ['api/server.mjs'], { env: { ...process.env, NODE_ENV: 'production', PORT: String(port), DATA_DIR: '/tmp/momoha-smoke-data' }, stdio: 'ignore' });
const base = `http://127.0.0.1:${port}`;
try {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try { if ((await fetch(`${base}/api/health`)).ok) break; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const health = await fetch(`${base}/api/health`); assert.equal(health.status, 200);
  const menu = await fetch(`${base}/api/menu`); const menuPayload = await menu.json(); assert.equal(menuPayload.items.length, 3);
  const order = await fetch(`${base}/api/orders`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ customerName: 'Smoke Test', email: 'smoke@example.com', items: [{ itemId: 'ramen', qty: 1 }, { itemId: 'daifuku', qty: 2 }] }) });
  const orderPayload = await order.json(); assert.equal(order.status, 201); assert.equal(orderPayload.order.total, 2020);
  console.log('MOMOHA API smoke: PASS');
} finally { child.kill('SIGTERM'); }
