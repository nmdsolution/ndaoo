import { useLang } from '../i18n.jsx';

export default function Services() {
  const { data, ui } = useLang();
  const { services } = data;
  return (
    <section id="services" className="section section--grey">
      <div className="container">
        <h2 className="reveal">{ui.servicesTitle}</h2>
        <div className="cols-3">
          {services.map((s, i) => (
            <article key={s.title} className="card card--service reveal" style={{ '--i': i % 3 }}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
        <a href="#contact" className="btn btn--dark">{ui.allServices}</a>
      </div>
    </section>
  );
}
