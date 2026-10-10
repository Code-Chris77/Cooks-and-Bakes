import { BUSINESS, CATEGORIES, CURRENCY, DESIGNS } from '../data/menu.js';
import ExpressNotice from './ExpressNotice.jsx';

export default function Home({ go }) {
  return (
    <>
      <section className="hero">
        <div className="hero-card glass">
          <p className="eyebrow">Home of Cream &amp; Moist Cakes</p>
          <h1>We don’t just bake cakes… <span className="gold">We save birthdays.</span></h1>
          <p className="lead">Freshly made, beautifully designed and ready when you need it. Same-day express cakes — no pre-order needed.</p>
          <div className="cta-row">
            <button className="btn btn-gold" onClick={() => go('order')}>Order on WhatsApp</button>
            <button className="btn btn-glass" onClick={() => go('menu')}>See the Menu</button>
          </div>
        </div>
        <div className="hero-strip" aria-hidden="true">
          {DESIGNS.slice(0, 4).map((d, i) => (
            <img key={d.code} src={d.img} alt="" className={`strip-img s${i}`} loading="lazy" />
          ))}
        </div>
      </section>

      <ExpressNotice />

      <section className="section">
        <h2 className="section-title">What we bake</h2>
        <div className="grid cats">
          {CATEGORIES.map((c) => (
            <article key={c.id} className="glass card hover-lift">
              <div className="card-icon">{c.icon}</div>
              <h3>{c.name}</h3>
              <p className="muted">{c.blurb}</p>
              <p className="from">From <strong>{CURRENCY}{Math.min(...c.options.map((o) => o.price))}</strong></p>
              <button className="btn btn-glass sm" onClick={() => go('order', { category: c.id })}>Order now</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="glass card cta-banner">
          <div>
            <h2>Ready when you are</h2>
            <p className="muted">Visit us at {BUSINESS.location} or call {BUSINESS.phones[0].display}.</p>
          </div>
          <button className="btn btn-gold" onClick={() => go('contact')}>Contact us</button>
        </div>
      </section>
    </>
  );
}
