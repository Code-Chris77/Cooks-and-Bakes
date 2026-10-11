import { BUSINESS, CATEGORIES, CURRENCY, DESIGNS, STORY } from '../data/menu.js';
import ExpressNotice from './ExpressNotice.jsx';

const CAT_BG = { cream: 'sd1', cupcakes: 'sd7', bento: 'sd4', parfait: 'sd2' };

export default function Home({ go }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true"><span /><span /><span /></div>
        <div className="container hero-inner">
          <div className="hero-card glass">
            <p className="eyebrow">Home of Cream &amp; Moist Cakes</p>
            <h1 className="hero-title">
              <span className="hero-line l1">Welcome to</span>
              <span className="hero-line l2">Cooks &amp; Bakes.</span>
            </h1>
            <p className="lead">{BUSINESS.tagline}</p>
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
        </div>
      </section>

      <div className="container"><ExpressNotice /></div>

      <section className="container section">
        <p className="kicker">What we bake</p>
        <h2 className="section-title">Our Categories</h2>
        <div className="grid cats">
          {CATEGORIES.map((c) => (
            <article key={c.id} className="cat-card hover-lift">
              <div className="cat-bg" style={{ backgroundImage: `url(/designs/${CAT_BG[c.id]}.jpg)` }} aria-hidden="true" />
              <div className="cat-layer" aria-hidden="true" />
              <div className="cat-body">
                <div className="card-icon">{c.icon}</div>
                <h3>{c.name}</h3>
                <p>{c.blurb}</p>
                <p className="from">From <strong>{CURRENCY}{Math.min(...c.options.map((o) => o.price))}</strong></p>
                <button className="btn btn-gold sm" onClick={() => go('order', { category: c.id })}>Order now</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story" aria-label="Bake, Celebrate, Enjoy">
        <h2 className="story-heading container">Bake, Celebrate, Enjoy.</h2>
        {STORY.map((s, i) => (
          <div key={s.title} className={`story-panel ${i % 2 === 0 ? 'maroon' : 'gold'}`}>
            <div className="container story-inner">
              <div className="story-img glass">
                <img src={DESIGNS[i * 2 + 1].img} alt="" loading="lazy" />
              </div>
              <div className="story-text glass">
                <span className="story-num">0{i + 1}</span>
                <h3>{s.icon} {s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="container section">
        <div className="cta-banner">
          <div>
            <h2>Ready when you are</h2>
            <p>Visit us at {BUSINESS.location} or call {BUSINESS.phones[0].display}.</p>
          </div>
          <button className="btn btn-gold" onClick={() => go('contact')}>Contact us</button>
        </div>
      </section>
    </>
  );
}
