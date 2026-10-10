import { CATEGORIES, CURRENCY, DESIGNS, toWaNumber } from './menu.js';

export const findCategory = (id) => CATEGORIES.find((c) => c.id === id);
export const findOption = (cat, id) => cat?.options.find((o) => o.id === id);

export function calcTotal(option, quantity) {
  if (!option) return 0;
  return option.price * Math.max(1, Number(quantity) || 1);
}

export function buildOrderMessage(o) {
  const cat = findCategory(o.category);
  const opt = findOption(cat, o.size);
  const design = DESIGNS.find((d) => d.code === o.design);
  const qty = Math.max(1, Number(o.quantity) || 1);
  const flavors = o.flavors.slice(0, opt?.flavors || 1).filter(Boolean);
  const lines = [
    'Hello Cooks & Bakes! I would like to place an order:',
    '',
    `Cake type: ${cat.name}`,
    `Size: ${opt.label} (${opt.spec})`,
    `Flavor${flavors.length > 1 ? 's' : ''}: ${flavors.join(', ') || 'Not specified'}`,
  ];
  if (cat.designs) lines.push(`Design: ${design ? `${design.code} – ${design.name}` : 'Custom / not specified'}`);
  lines.push(`Quantity: ${qty}`, `Total: ${CURRENCY}${calcTotal(opt, qty)}`);
  if (o.date) lines.push(`Needed on: ${o.date}`);
  if (o.message) lines.push(`Message on cake: ${o.message}`);
  if (o.notes) lines.push(`Notes: ${o.notes}`);
  if (o.name) lines.push('', `Name: ${o.name}`);
  return lines.join('\n');
}

export const buildWhatsAppUrl = (localNumber, message) =>
  `https://wa.me/${toWaNumber(localNumber)}?text=${encodeURIComponent(message)}`;
