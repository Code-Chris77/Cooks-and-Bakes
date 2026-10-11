import { useState } from 'react';

const LINKS = [['home', 'Home'], ['menu', 'Menu'], ['order', 'Order'], ['contact', 'Contact']];

export default function Header({ page, go }) {
  const [open, setOpen] = useState(false);
  const nav = (p) => { setOpen(false); go(p); };
  return (
    <header className="header">
      <button className="brand" onClick={() => nav('home')} aria-label="Cooks & Bakes home">
        <span className="brand-mark">C&amp;B</span>
        <span className="brand-text"><strong>Cooks &amp; Bakes</strong><small>Home of Cream &amp; Moist Cakes</small></span>
      </button>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <nav className={`nav ${open ? 'open' : ''}`}>
        {LINKS.map(([id, label]) => (
          <button key={id} className={`nav-link ${page === id ? 'active' : ''}`} onClick={() => nav(id)}>{label}</button>
        ))}
      </nav>
    </header>
  );
}
