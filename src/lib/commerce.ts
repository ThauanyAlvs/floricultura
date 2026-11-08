export type RegistrationInput = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type CartLine = {
  productId: string;
  quantity: number;
  unitPrice: number;
};

export function normalizeSearchQuery(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isStrongPassword(value: string) {
  return value.length >= 12 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);
}

export function isValidBrazilianPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  return /^\d{10,11}$/.test(digits) && digits.length >= 10;
}

export function validateCustomerRegistration(input: RegistrationInput) {
  const errors: Record<string, string> = {};

  if (!input.fullName?.trim()) errors.fullName = 'Informe seu nome completo.';
  if (!isValidEmail(input.email ?? '')) errors.email = 'Informe um e-mail válido.';
  if (!isValidBrazilianPhone(input.phone ?? '')) errors.phone = 'Informe um telefone brasileiro válido.';
  if (!isStrongPassword(input.password ?? '')) errors.password = 'A senha deve ter pelo menos 12 caracteres, incluindo letras, números e símbolo.';
  if ((input.password ?? '') !== (input.confirmPassword ?? '')) errors.confirmPassword = 'As senhas não coincidem.';

  return errors;
}

export function computeCartSummary(items: CartLine[]) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const shipping = subtotal > 0 ? 25 : 0;
  const total = subtotal + shipping;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}
