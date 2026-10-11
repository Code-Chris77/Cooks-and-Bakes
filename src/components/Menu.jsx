import { useState } from 'react';
import { CATEGORIES, CURRENCY, DESIGNS, SIZES } from '../data/menu.js';
import ExpressNotice from './ExpressNotice.jsx';

const cream = CATEGORIES.find((c) => c.id === 'cream');

export default function Menu({ go }) {
  const [sizeId, setSizeId] = useState('pancake');
  const size = cream.options.find((o) => o.id === sizeId);

  return (
    <>
      <h1 className="page-title">Our <span className="gold">Menu</span></h1>
      <ExpressNotice />

      <section className="section">
        <h2 className="section-title">Express Cake Designs</h2>
        <div className="size-picker">
          <span className="muted">Pick a size to see price &amp; servings:</span>
          <div className="chips">
            {cream.options.map((o) => (
              <button key={o.id} className={`chip ${sizeId === o.id ? 'on' : ''}`} onClick={() => setSizeId(o.id)}>{o.label}</button>
            ))}
          </div>
          <p><strong>{CURRENCY}{size.price}</strong> · {size.spec} · feeds {size.serves}</p>
        </div>
        <div className="grid designs">
          {DESIGNS.map((d) => (
            <article key={d.code} className="card design hover-lift">
              <div className="design-img">
                <img src={d.img} alt={`${d.name} cake`} loading="lazy" />
              </div>
              <h3>{d.name}</h3>
              <p className="price">{CURRENCY}{size.price}<small> · {size.label}</small></p>
              <p className="muted small">{size.spec} · {size.serves}</p>
              <button className="btn btn-gold sm" onClick={() => go('order', { category: 'cream', size: sizeId, design: d.code })}>Order {d.code}</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Price List</h2>
        <div className="grid prices">
          {CATEGORIES.map((c) => (
            <article key={c.id} className="card">
              <h3>{c.icon} {c.name}</h3>
              <ul className="price-list">
                {c.options.map((o) => (
                  <li key={o.id}>
                    <span>{o.label} <small className="muted">{o.spec !== 'Cupcakes' ? `(${o.spec})` : ''}</small></span>
                    <i />
                    <strong>{CURRENCY}{o.price}</strong>
                  </li>
                ))}
              </ul>
              <button className="btn btn-glass sm" onClick={() => go('order', { category: c.id })}>Order</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">How many people a cake feeds</h2>
        <div className="grid serving">
          {Object.values(SIZES).map((s) => (
            <div key={s.label} className="card serving-card hover-lift">
              <strong className="pink">{s.label}</strong>
              <span className="big">{s.serves.replace(' people', '')}</span>
              <small>people</small>
              <small className="muted">({s.spec})</small>
            </div>
          ))}
        </div>
        <p className="muted center small">NB: Cake cutting is relative depending on the one serving.</p>
      </section>
    </>
  );
}
