import { caseStudies } from '../data.js';

export default function CaseStudies() {
  return (
    <section className="section section--grey">
      <div className="container cols-3">
        {caseStudies.map((c, i) => (
          <a key={c} href="#contact" className="card card--link reveal" style={{ '--i': i }}>
            <span className="tag">Étude de cas</span>
            <p>{c}</p>
            <span className="arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
