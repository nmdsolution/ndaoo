import { useState } from 'react';
import { industries } from '../data.js';

export default function Industries() {
  const [active, setActive] = useState(0);

  return (
    <section className="section">
      <div className="container">
        <h2 className="reveal">Résultats clients par secteur</h2>
        <div className="industries reveal">
          {industries.map((ind, idx) => (
            <button
              key={ind.name}
              className={`industry ${idx === active ? 'is-active' : ''}`}
              style={{ backgroundImage: `url(${ind.img})` }}
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
