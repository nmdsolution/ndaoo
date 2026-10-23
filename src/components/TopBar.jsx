import { useLang } from '../i18n.jsx';

export default function TopBar() {
  const { ui } = useLang();

  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <a href="mailto:contact@ndaoo.com">contact@ndaoo.com</a>
        <span>{ui.openAllDay}</span>
      </div>
    </div>
  );
}
