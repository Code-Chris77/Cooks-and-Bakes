import { useEffect, useState } from 'react';
import { DESIGNS } from '../data/menu.js';

const DURATION = 4200;

// Circular cake-carousel reveal shown once per session before the homepage.
export default function Intro({ onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), DURATION);
    const t2 = setTimeout(onDone, DURATION + 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  const skip = () => { setLeaving(true); setTimeout(onDone, 500); };

  return (
    <div className={`intro ${leaving ? 'leaving' : ''}`} role="presentation">
      <div className="intro-stage" aria-hidden="true">
        <div className="intro-ring ring-outer">
          {DESIGNS.map((d, i) => (
            <div key={d.code} className="intro-slot" style={{ '--a': `${i * 45}deg`, '--d': `${0.15 * i}s` }}>
              <img src={d.img} alt="" className="intro-photo" />
            </div>
          ))}
        </div>
        <div className="intro-core">
          <span className="intro-mark">C&amp;B</span>
        </div>
      </div>
      <h1 className="intro-title">Cooks <span>&amp;</span> Bakes</h1>
      <p className="intro-sub">Home of Cream &amp; Moist Cakes</p>
      <button className="intro-skip" onClick={skip}>Skip</button>
    </div>
  );
}
