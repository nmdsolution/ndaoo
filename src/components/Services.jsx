import { services } from '../data.js';

export default function Services() {
  return (
    <section id="services" className="section section--grey">
      <div className="container">
        <h2 className="reveal">Ce que nous faisons</h2>
        <div className="cols-3">
          {services.map((s, i) => (
            <article key={s.title} className="card card--service reveal" style={{ '--i': i % 3 }}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
        <a href="#contact" className="btn btn--dark">Tous nos services</a>
      </div>
    </section>
  );
}
