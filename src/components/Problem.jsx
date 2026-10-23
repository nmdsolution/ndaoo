import { useLang } from '../i18n.jsx';

export default function Problem() {
  const { ui } = useLang();
  return (
    <section className="section section--grey">
      <div className="container">
        <h2 className="reveal">{ui.problemTitle}</h2>
        <div className="cols-2">
          <article className="card reveal" style={{ '--i': 0 }}>
            <span className="tag">{ui.forCtos}</span>
            <h3>{ui.ctoCard}</h3>
          </article>
          <article className="card reveal" style={{ '--i': 1 }}>
            <span className="tag">{ui.forCios}</span>
            <h3>{ui.cioCard}</h3>
          </article>
        </div>
        <p className="lead reveal">{ui.problemLead}</p>
      </div>
    </section>
  );
}
