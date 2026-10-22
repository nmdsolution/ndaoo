import { useEffect, useState } from 'react';
import { testimonials } from '../data.js';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[i];
  const n = testimonials.length;

  // Défilement automatique toutes les 7 s, en pause au survol
  useEffect(() => {
    if (paused) return undefined;
    const id = setTimeout(() => setI((v) => (v + 1) % n), 7000);
    return () => clearTimeout(id);
  }, [i, paused, n]);

  return (
    <section className="section">
      <div
        className="container testimonial reveal"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <span className="testimonial__mark" aria-hidden="true">“</span>
        <div key={i} className="testimonial__slide">
          <blockquote data-testid="quote">{t.quote}</blockquote>
          <p className="testimonial__author"><strong>{t.name}</strong>, {t.company}</p>
        </div>
        <div className="slider-controls">
          <button onClick={() => setI((i - 1 + n) % n)} aria-label="Précédent">←</button>
          <span>{i + 1} / {n}</span>
          <button onClick={() => setI((i + 1) % n)} aria-label="Suivant">→</button>
          {!paused && <span key={`p${i}`} className="slider-progress" aria-hidden="true" />}
        </div>
      </div>
    </section>
  );
}
