import { BUSINESS } from '../data/menu.js';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="script">Your Home of Cream Cakes ♡</p>
      <p><strong>{BUSINESS.tagline}</strong></p>
      <p className="muted small">© {new Date().getFullYear()} {BUSINESS.name}</p>
    </footer>
  );
}
