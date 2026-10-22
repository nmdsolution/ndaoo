import { insights, topics } from '../data.js';

export default function Insights() {
  return (
    <section className="section section--grey">
      <div className="container">
        <h2 className="reveal">Insights</h2>
        <ul className="topics">
          {topics.map((t, i) => <li key={t} className="reveal" style={{ '--i': i * 0.5 }}>{t}</li>)}
        </ul>
        <div className="cols-4">
          {insights.map((a, i) => (
            <article key={a.title} className="card card--link reveal" style={{ '--i': i }}>
              <span className="tag">{a.type}</span>
              <h3>{a.title}</h3>
              <p className="meta">{a.tag} · {a.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
