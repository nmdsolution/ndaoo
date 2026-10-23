import SphereMorph from './SphereMorph.jsx';
import { useLang } from '../i18n.jsx';

export default function Hero() {
  const { ui } = useLang();
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <SphereMorph />
        <div className="hero__content">
          <p className="eyebrow anim" style={{ '--d': '0s' }}>{ui.heroEyebrow}</p>
          <h1 className="anim" style={{ '--d': '.15s' }}>{ui.heroTitle}</h1>
          <p className="hero__lead anim" style={{ '--d': '.3s' }}>{ui.heroLead}</p>
          <div className="hero__actions anim" style={{ '--d': '.45s' }}>
            <a href="#contact" className="btn btn--accent">{ui.heroCta}</a>
            <a href="#services" className="btn btn--ghost">{ui.heroCta2}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
