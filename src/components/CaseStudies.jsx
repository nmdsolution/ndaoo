import { useLang } from '../i18n.jsx';

export default function CaseStudies() {
  const { data, ui } = useLang();
  const { caseStudies } = data;
  return (
    <section className="section section--grey">
      <div className="container cols-3">
        {caseStudies.map((c, i) => (
          <a key={c} href="#contact" className="card card--link reveal" style={{ '--i': i }}>
            <span className="tag">{ui.caseStudy}</span>
            <p>{c}</p>
            <span className="arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
