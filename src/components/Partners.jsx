import { useLang } from '../i18n.jsx';

export default function Partners() {
  const { data, ui } = useLang();
  const { partners } = data;
  return (
    <section className="section">
      <div className="container">
        <h2 className="reveal">{ui.partnersTitle}</h2>
        <p className="lead reveal">{ui.partnersLead}</p>
      </div>
      {/* Bandeau défilant en continu : la liste est doublée pour une boucle sans saut */}
      <div className="marquee reveal">
        <ul className="marquee__track">
          {[...partners, ...partners].map((p, i) => (
            <li key={i} aria-hidden={i >= partners.length}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
