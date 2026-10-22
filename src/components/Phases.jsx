import { phases } from '../data.js';

export default function Phases() {
  return (
    <section className="section section--dark">
      <div className="container">
        <h2 className="reveal">Quatre phases. Une sortie possible à chaque étape. Aucun engagement long terme.</h2>
        <ol className="phases">
          {phases.map((p, i) => (
            <li key={p.n} className="phase reveal" style={{ '--i': i }}>
              <span className="phase__circle">
                <svg viewBox="0 0 72 72" aria-hidden="true">
                  <circle className="phase__track" cx="36" cy="36" r="34" />
                  <circle className="phase__ring" cx="36" cy="36" r="34" pathLength="100" />
                </svg>
                <span className="phase__n">{p.n}</span>
              </span>
              <h3>{p.title}</h3>
              <em>{p.time}</em>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
