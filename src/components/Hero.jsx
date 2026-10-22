import SphereMorph from './SphereMorph.jsx';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <SphereMorph />
        <div className="hero__content">
          <p className="eyebrow anim" style={{ '--d': '0s' }}>NDAOO · Services technologiques</p>
          <h1 className="anim" style={{ '--d': '.15s' }}>Une ingénierie logicielle pragmatique, portée par l’IA</h1>
          <p className="hero__lead anim" style={{ '--d': '.3s' }}>
            NDAOO aide les entreprises à transformer leurs investissements technologiques en résultats mesurables :
            logiciels sur mesure, cloud, data, sécurité et intelligence artificielle.
          </p>
          <div className="hero__actions anim" style={{ '--d': '.45s' }}>
            <a href="#contact" className="btn btn--accent">Évaluez votre projet</a>
            <a href="#services" className="btn btn--ghost">Découvrir nos services</a>
          </div>
        </div>
      </div>
    </section>
  );
}
