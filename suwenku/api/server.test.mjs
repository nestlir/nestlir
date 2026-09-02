import test from 'node:test';import assert from 'node:assert/strict';import {validateOrder} from './server.mjs';
test('accepts a known item',()=>{const result=validateOrder({itemId:'ramen',qty:2});assert.equal(result.ok,true);assert.equal(result.item.price,980);assert.equal(result.qty,2)});
test('rejects an unknown item',()=>assert.equal(validateOrder({itemId:'pizza',qty:1}).ok,false));
test('rejects invalid quantities',()=>{for(const qty of [0,13,1.5,'abc'])assert.equal(validateOrder({itemId:'ramen',qty}).ok,false)});
