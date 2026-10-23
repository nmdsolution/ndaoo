import TopBar from './components/TopBar.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Problem from './components/Problem.jsx';
import Phases from './components/Phases.jsx';
import Testimonials from './components/Testimonials.jsx';
import CaseStudies from './components/CaseStudies.jsx';
import Partners from './components/Partners.jsx';
import Services from './components/Services.jsx';
import Industries from './components/Industries.jsx';
import Insights from './components/Insights.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import GravityField from './components/GravityField.jsx';
import { LangProvider } from './i18n.jsx';
import useReveal from './useReveal.js';

export default function App() {
  useReveal();

  return (
    <LangProvider>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Phases />
        <Testimonials />
        <CaseStudies />
        <Partners />
        <Services />
        <Industries />
        <Insights />
        <Contact />
      </main>
      <Footer />
      <GravityField />
    </LangProvider>
  );
}
