import { useState } from 'react';
import { useLang } from '../i18n.jsx';
import { industryImages } from '../data.js';

export default function Industries() {
  const { data, ui } = useLang();
  const { industries } = data;
  const [active, setActive] = useState(0);

  return (
    <section className="section">
      <div className="container">
        <h2 className="reveal">{ui.industriesTitle}</h2>
        <div className="industries reveal">
          {industries.map((ind, idx) => (
            <button
              key={ind.name}
              className={`industry ${idx === active ? 'is-active' : ''}`}
              style={{ backgroundImage: `url(${industryImages[idx]})` }}
              onMouseEnter={() => setActive(idx)}
              onFocus={() => setActive(idx)}
              onClick={() => setActive(idx)}
              aria-pressed={idx === active}
            >
              <span className="industry__name">{ind.name}</span>
              <span className="industry__body">
                <strong>{ind.value}</strong>
                <span>{ind.text}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
