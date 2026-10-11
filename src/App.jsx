import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Menu from './components/Menu.jsx';
import OrderForm from './components/OrderForm.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Intro from './components/Intro.jsx';
import Announcements from './components/Announcements.jsx';

const introSeen = () => { try { return sessionStorage.getItem('cb-intro') === '1'; } catch { return false; } };
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const PAGES = ['home', 'menu', 'order', 'contact'];
const readHash = () => {
  const h = window.location.hash.replace('#/', '').replace('#', '');
  return PAGES.includes(h) ? h : 'home';
};

export default function App() {
  const [page, setPage] = useState(readHash);
  const [preselect, setPreselect] = useState(null); // {category?, design?}
  const [showIntro, setShowIntro] = useState(() => !introSeen() && !reducedMotion());
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const onHash = () => { setPage(readHash()); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('hashchange', onHash);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  const finishIntro = () => { try { sessionStorage.setItem('cb-intro', '1'); } catch { /* ignore */ } setShowIntro(false); };

  const go = (p, pre = null) => { setPreselect(pre); window.location.hash = `#/${p}`; };

  return (
    <div className="app">
      {showIntro && <Intro onDone={finishIntro} />}
      <Announcements />
      <Header page={page} go={go} />
      {!online && <div className="offline-banner">You’re offline – browsing the menu still works. Reconnect to send your order.</div>}
      <main>
        {page === 'home' && <Home go={go} />}
        {page === 'menu' && <div className="container"><Menu go={go} /></div>}
        {page === 'order' && <div className="container"><OrderForm preselect={preselect} /></div>}
        {page === 'contact' && <div className="container"><Contact /></div>}
      </main>
      <Footer go={go} />
    </div>
  );
}
