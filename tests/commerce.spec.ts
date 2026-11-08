import test from 'node:test';
import assert from 'node:assert/strict';

import {
  isStrongPassword,
  isValidBrazilianPhone,
  validateCustomerRegistration,
  computeCartSummary,
  normalizeSearchQuery,
} from '../src/lib/commerce.ts';

test('senhas fortes são aceitas e fracas rejeitadas', () => {
  assert.equal(isStrongPassword('Abcdefghijk1!'), true);
  assert.equal(isStrongPassword('12345'), false);
});

test('telefone brasileiro é validado corretamente', () => {
  assert.equal(isValidBrazilianPhone('(11) 98765-4321'), true);
  assert.equal(isValidBrazilianPhone('12345'), false);
});

test('cadastro válido passa na validação', () => {
  const errors = validateCustomerRegistration({
    fullName: 'Ana Souza',
    email: 'ana@email.com',
    phone: '(11) 98765-4321',
    password: 'Abcdefghijk1!',
    confirmPassword: 'Abcdefghijk1!',
  });

  assert.deepEqual(errors, {});
});

test('cálculo de subtotal e frete é consistente', () => {
  const summary = computeCartSummary([
    { productId: 'rose-1', quantity: 2, unitPrice: 89.9 },
    { productId: 'rose-2', quantity: 1, unitPrice: 49.9 },
  ]);

  assert.equal(summary.subtotal, 229.7);
  assert.equal(summary.shipping, 25);
  assert.equal(summary.total, 254.7);
});

test('normalização da busca remove acentos e padroniza texto', () => {
  assert.equal(normalizeSearchQuery('Buquê de rosas!'), 'buque de rosas');
});


