import logo from '../assets/logo-light.png';
import { useLang } from '../i18n.jsx';

export default function Footer() {
  const { data, ui } = useLang();
  const { megaMenu } = data;
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <img src={logo} alt="NDAOO" className="footer__logo" />
          <p>{ui.footerTagline}</p>
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
      <p className="footer__copy">© {new Date().getFullYear()} NDAOO. {ui.rights}</p>
    </footer>
  );
}
