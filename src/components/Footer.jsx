import logo from '../assets/logo-light.png';
import { megaMenu } from '../data.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <img src={logo} alt="NDAOO" className="footer__logo" />
          <p>Services technologiques : logiciel, cloud, data et IA.</p>
        </div>
        {Object.entries(megaMenu).map(([label, cols]) => (
          <div key={label}>
            <h4>{label}</h4>
            <ul>
              {cols[0].items.slice(0, 5).map((i) => <li key={i}><a href="#services">{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} NDAOO. Tous droits réservés.</p>
    </footer>
  );
}
