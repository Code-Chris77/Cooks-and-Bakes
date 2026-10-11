import { useEffect, useMemo, useState } from 'react';
import { BUSINESS, CATEGORIES, CURRENCY, DEFAULT_ORDER_LINE, DESIGNS, FLAVORS } from '../data/menu.js';
import { buildOrderMessage, buildWhatsAppUrl, calcTotal, findCategory, findOption } from '../data/order.js';
import ExpressNotice from './ExpressNotice.jsx';

const initial = (pre) => {
  const category = pre?.category || 'cream';
  const cat = findCategory(category);
  return {
    category,
    size: findOption(cat, pre?.size) ? pre.size : cat.options[0].id,
    flavors: ['', '', ''],
    design: pre?.design || '',
    quantity: 1,
    name: '',
    date: '',
    message: '',
    notes: '',
    line: DEFAULT_ORDER_LINE,
  };
};

export default function OrderForm({ preselect }) {
  const [f, setF] = useState(() => initial(preselect));
  const [error, setError] = useState('');

  useEffect(() => { if (preselect) setF(initial(preselect)); }, [preselect]);

  const cat = findCategory(f.category);
  const opt = findOption(cat, f.size);
  const total = useMemo(() => calcTotal(opt, f.quantity), [opt, f.quantity]);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const changeCategory = (id) => {
    const c = findCategory(id);
    setF((s) => ({ ...s, category: id, size: c.options[0].id, design: c.designs ? s.design : '' }));
  };
  const setFlavor = (i, v) => setF((s) => ({ ...s, flavors: s.flavors.map((x, j) => (j === i ? v : x)) }));

  const submit = (e) => {
    e.preventDefault();
    const needed = f.flavors.slice(0, opt.flavors);
    if (needed.some((x) => !x)) { setError(`Please choose ${opt.flavors > 1 ? `all ${opt.flavors} flavors` : 'a flavor'}.`); return; }
    setError('');
    window.open(buildWhatsAppUrl(f.line, buildOrderMessage(f)), '_blank', 'noopener');
  };

  return (
    <>
      <h1 className="page-title">Place an <span className="gold">Order</span></h1>
      <ExpressNotice />
      <form className="order" onSubmit={submit}>
        <div className="form-grid">
          <label>Cake type
            <select value={f.category} onChange={(e) => changeCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label>Size
            <select value={f.size} onChange={(e) => set('size', e.target.value)}>
              {cat.options.map((o) => <option key={o.id} value={o.id}>{o.label} – {o.spec} – {CURRENCY}{o.price}</option>)}
            </select>
          </label>
          {Array.from({ length: opt.flavors }, (_, i) => (
            <label key={i}>{opt.flavors > 1 ? `Flavor ${i + 1}` : 'Flavor'}
              <select value={f.flavors[i]} onChange={(e) => setFlavor(i, e.target.value)}>
                <option value="">Select flavor…</option>
                {FLAVORS.map((fl) => <option key={fl}>{fl}</option>)}
              </select>
            </label>
          ))}
          {cat.designs && (
            <label>Design (optional)
              <select value={f.design} onChange={(e) => set('design', e.target.value)}>
                <option value="">Custom / no preference</option>
                {DESIGNS.map((d) => <option key={d.code} value={d.code}>{d.code} – {d.name}</option>)}
              </select>
            </label>
          )}
          <label>Quantity
            <select value={f.quantity} onChange={(e) => set('quantity', Number(e.target.value))}>
              {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
            </select>
          </label>
          <label>Your name
            <input value={f.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Ama" />
          </label>
          <label>Date needed
            <input type="date" value={f.date} onChange={(e) => set('date', e.target.value)} />
          </label>
          <label>Order line
            <select value={f.line} onChange={(e) => set('line', e.target.value)}>
              {BUSINESS.phones.map((p, i) => <option key={p.local} value={p.local}>{p.display}{i === 0 ? ' (primary)' : ''}</option>)}
            </select>
          </label>
        </div>

        {cat.designs && f.design && (
          <div className="selected-design">
            <img src={DESIGNS.find((d) => d.code === f.design).img} alt="" />
            <span>{DESIGNS.find((d) => d.code === f.design).code} – {DESIGNS.find((d) => d.code === f.design).name}</span>
          </div>
        )}

        <label>Message on cake (optional)
          <input value={f.message} onChange={(e) => set('message', e.target.value)} placeholder='e.g. "Happy Birthday Love"' />
        </label>
        <label>Notes (optional)
          <textarea rows="3" value={f.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Allergies, delivery, anything else…" />
        </label>

        <div className="total">
          <span>Estimated total</span>
          <strong>{CURRENCY}{total}</strong>
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button type="submit" className="btn btn-gold wa">Send Order via WhatsApp</button>
        <p className="muted small center">Opens WhatsApp with your order pre-filled. Final price confirmed by our team.</p>
      </form>
    </>
  );
}
