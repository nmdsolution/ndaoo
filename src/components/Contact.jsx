import { useState } from 'react';
import SphereMorph from './SphereMorph.jsx';
import { useLang } from '../i18n.jsx';

export default function Contact() {
  const { ui } = useLang();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !/\S+@\S+\.\S+/.test(form.email)) return;
    setSent(true);
  };

  return (
    <section id="contact" className="section section--dark contact-hero">
      <div className="container contact">
        <SphereMorph />
        <div className="contact__content">
          <div className="reveal">
            <h2>{ui.contactTitle}</h2>
            <p className="lead">{ui.contactLead}</p>
          </div>
          {sent ? (
            <p role="status" className="contact__ok">{ui.thanks(form.name)}</p>
          ) : (
            <form onSubmit={onSubmit} className="form reveal" style={{ '--i': 1 }}>
              <label>{ui.name}<input value={form.name} onChange={set('name')} required /></label>
              <label>{ui.email}<input type="email" value={form.email} onChange={set('email')} required /></label>
              <label>{ui.message}<textarea rows="4" value={form.message} onChange={set('message')} /></label>
              <button className="btn btn--accent" type="submit">{ui.send}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
