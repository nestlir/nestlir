import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer, validateOrder } from './server.mjs';

test('validates multi-item carts and totals server-side', () => {
  const result = validateOrder({ customerName: 'Momo', email: 'momo@example.com', items: [{ itemId: 'ramen', qty: 2 }, { itemId: 'takoyaki', qty: 1 }] });
  assert.equal(result.ok, true); assert.equal(result.orderInput.total, 2640);
});
test('rejects unknown item and invalid quantity', () => {
  assert.equal(validateOrder({ customerName: 'Momo', email: 'momo@example.com', items: [{ itemId: 'pizza', qty: 1 }] }).ok, false);
  assert.equal(validateOrder({ customerName: 'Momo', email: 'momo@example.com', items: [{ itemId: 'ramen', qty: 13 }] }).ok, false);
});
test('rejects invalid contact details', () => {
  assert.equal(validateOrder({ customerName: '', email: 'momo@example.com', items: [{ itemId: 'ramen', qty: 1 }] }).ok, false);
  assert.equal(validateOrder({ customerName: 'Momo', email: 'bad', items: [{ itemId: 'ramen', qty: 1 }] }).ok, false);
});

test('serves health and menu endpoints', async () => {
  process.env.NODE_ENV = 'test';
  const server = createServer(); await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  try {
    const health = await fetch(`http://127.0.0.1:${port}/api/health`); assert.equal(health.status, 200); assert.equal((await health.json()).ok, true);
    const menu = await fetch(`http://127.0.0.1:${port}/api/menu`); const payload = await menu.json(); assert.equal(menu.status, 200); assert.equal(payload.items.length, 3);
  } finally { await new Promise((resolve) => server.close(resolve)); }
});
