export default function Problem() {
  return (
    <section className="section section--grey">
      <div className="container">
        <h2 className="reveal">L’adoption des outils IA progresse. Les résultats de livraison, beaucoup moins.</h2>
        <div className="cols-2">
          <article className="card reveal" style={{ '--i': 0 }}>
            <span className="tag">Pour les CTO</span>
            <h3>Les ingénieurs sont plus rapides. Les sprints ne le sont pas.</h3>
          </article>
          <article className="card reveal" style={{ '--i': 1 }}>
            <span className="tag">Pour les DSI</span>
            <h3>Les outils IA sont en place mais déconnectés du cloud, des données et de la sécurité.</h3>
          </article>
        </div>
        <p className="lead reveal">
          L’approche NDAOO est mesurée sur votre code réel, connectée à votre infrastructure réelle, avant tout déploiement à grande échelle.
        </p>
      </div>
    </section>
  );
}
