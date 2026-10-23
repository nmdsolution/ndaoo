import { useState } from 'react';
import SphereMorph from './SphereMorph.jsx';

export default function Contact() {
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
            <h2>Parlons de votre projet</h2>
            <p className="lead">Décrivez votre besoin, nous revenons vers vous sous 48 h.</p>
          </div>
          {sent ? (
            <p role="status" className="contact__ok">Merci {form.name} ! Nous vous répondrons très vite.</p>
          ) : (
            <form onSubmit={onSubmit} className="form reveal" style={{ '--i': 1 }}>
              <label>Nom<input value={form.name} onChange={set('name')} required /></label>
              <label>E-mail<input type="email" value={form.email} onChange={set('email')} required /></label>
              <label>Message<textarea rows="4" value={form.message} onChange={set('message')} /></label>
              <button className="btn btn--accent" type="submit">Envoyer</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
