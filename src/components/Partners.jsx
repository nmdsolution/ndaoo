import { partners } from '../data.js';

export default function Partners() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="reveal">Des technologies et plateformes que vos équipes utilisent déjà</h2>
        <p className="lead reveal">NDAOO maîtrise les principaux écosystèmes cloud et data du marché.</p>
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
