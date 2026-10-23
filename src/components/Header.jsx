import { useState } from 'react';
import logo from '../assets/logo-dark.png';
import { useLang } from '../i18n.jsx';

export default function Header() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const { lang, setLang, data, ui } = useLang();
  const { megaMenu } = data;
  const entries = Object.entries(megaMenu);
  const switchLang = (l) => { setOpen(null); setLang(l); };

  return (
    <header className="header" onMouseLeave={() => setOpen(null)}>
      <div className="container header__bar">
        <a href="#top" className="header__logo" aria-label={ui.home}>
          <img src={logo} alt="NDAOO" />
        </a>
        <nav className={`header__nav ${mobile ? 'is-open' : ''}`} aria-label={ui.mainNav}>
          {entries.map(([label]) => (
            <button
              key={label}
              className={`header__link ${open === label ? 'is-active' : ''}`}
              aria-expanded={open === label}
              onMouseEnter={() => setOpen(label)}
              onClick={() => setOpen(open === label ? null : label)}
            >
              {label}
            </button>
          ))}
          <a className="btn btn--dark header__cta" href="#contact" onClick={() => setMobile(false)}>
            {ui.contactUs}
          </a>
          <div className="lang" role="group" aria-label={ui.language}>
            {['fr', 'en'].map((l) => (
              <button
                key={l}
                className={`lang__btn ${lang === l ? 'is-active' : ''}`}
                aria-pressed={lang === l}
                lang={l}
                onClick={() => switchLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>
        <button
          className="header__burger"
          aria-label={ui.menu}
          aria-expanded={mobile}
          onClick={() => setMobile(!mobile)}
        >
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="mega" role="menu">
          <div className="container mega__grid">
            {megaMenu[open].map((col) => (
              <div key={col.title} className="mega__col">
                <h4>{col.title}</h4>
                <ul>
                  {col.items.map((i) => (
                    <li key={i}><a href="#services" onClick={() => setOpen(null)}>{i}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
