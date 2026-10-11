import { ANNOUNCEMENTS, formatPosted } from '../data/menu.js';

export default function Announcements() {
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS]; // duplicated for a seamless loop
  return (
    <div className="ticker" role="region" aria-label="Announcements">
      <span className="ticker-label">Latest</span>
      <div className="ticker-track">
        <ul className="ticker-list">
          {items.map((a, i) => (
            <li key={i} aria-hidden={i >= ANNOUNCEMENTS.length}>
              <time dateTime={a.postedAt}>{formatPosted(a.postedAt)}</time>
              <span>{a.text}</span>
              <b>✦</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
