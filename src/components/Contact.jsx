import { BUSINESS, toWaNumber } from '../data/menu.js';

export default function Contact() {
  return (
    <>
      <h1 className="page-title">Get in <span className="gold">Touch</span></h1>
      <div className="grid contact">
        <article className="card hover-lift">
          <div className="card-icon">📍</div><h3>Visit us</h3>
          <p>{BUSINESS.location}</p>
        </article>
        <article className="card hover-lift">
          <div className="card-icon">📞</div><h3>Call / WhatsApp</h3>
          {BUSINESS.phones.map((p) => (
            <p key={p.local}>
              <a href={`tel:${p.local}`}>{p.display}</a> · <a href={`https://wa.me/${toWaNumber(p.local)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </p>
          ))}
        </article>
        <article className="card hover-lift">
          <div className="card-icon">💬</div><h3>Follow us</h3>
          <p>
            <a href={BUSINESS.socials.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> ·{' '}
            <a href={BUSINESS.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
          <p className="muted small">@{BUSINESS.socials.handle}</p>
        </article>
      </div>
    </>
  );
}
