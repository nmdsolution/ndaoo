import ind1 from './assets/industries-img-1.webp';
import ind2 from './assets/industries-img-2.webp';
import ind3 from './assets/industries-img-3.webp';
import ind4 from './assets/industries-img-4.webp';
import ind5 from './assets/industries-img-5.webp';

export const megaMenu = {
  'Nos services': [
    { title: 'Développement IA', items: ['Conseil en IA', 'Agents IA', 'IA générative', 'Vision par ordinateur', 'RAG'] },
    { title: 'Ingénierie logicielle', items: ['Développement sur mesure', 'Applications mobiles', 'UI/UX', 'Modernisation applicative', 'Automatisation QA'] },
    { title: 'Cloud & DevOps', items: ['Migration cloud', 'DevOps', 'Gestion d’infrastructure', 'Applications cloud'] },
    { title: 'Data & Analytics', items: ['Data engineering', 'Data warehouse', 'Power BI', 'Gouvernance des données'] },
    { title: 'Sécurité & Qualité', items: ['DevSecOps', 'Tests d’intrusion', 'Continuité d’activité'] },
  ],
  Secteurs: [
    { title: 'Secteurs que nous servons', items: ['Finance', 'Retail & e-commerce', 'Santé', 'Logistique', 'Agritech', 'Télécoms'] },
  ],
  'À propos': [
    { title: 'Pourquoi NDAOO', items: ['Présentation', 'Équipe', 'Partenaires', 'Carrières', 'Actualités'] },
  ],
  Ressources: [
    { title: 'Insights', items: ['Blog d’experts', 'Livres blancs', 'Webinaires', 'Études de cas'] },
  ],
};

export const phases = [
  { n: '01', title: 'Audit', time: '2 semaines', text: 'Nos ingénieurs travaillent avec votre équipe, documentent vos besoins et chiffrent chaque opportunité. Si le rapport ne justifie pas la suite, vous vous arrêtez ici.' },
  { n: '02', title: 'Pilote', time: '4 à 6 semaines', text: 'Un premier périmètre est livré sur votre contexte réel, avec des indicateurs convenus dès le départ. À la fin, les chiffres ont bougé ou non.' },
  { n: '03', title: 'Déploiement', time: 'Selon périmètre', text: 'Ce qui a fonctionné est industrialisé et standardisé dans toute votre organisation, avec des gains visibles dans vos indicateurs.' },
  { n: '04', title: 'Excellence', time: 'En continu', text: 'Automatisation avancée, agents IA et amélioration continue pour les équipes prêtes à aller plus loin.' },
];

export const testimonials = [
  { quote: 'NDAOO nous a livré une plateforme fiable en quelques semaines. L’équipe comprend le métier autant que la technique.', name: 'Directeur technique', company: 'Client – Fintech' },
  { quote: 'Un partenaire réactif qui a su moderniser notre application historique sans interrompre nos opérations.', name: 'Directrice des opérations', company: 'Client – Logistique' },
  { quote: 'Grâce à leur approche par phases, nous avons validé la valeur avant d’investir davantage. Très rassurant.', name: 'CEO', company: 'Client – Retail' },
];

export const caseStudies = [
  'Une fintech. Application mobile livrée en 10 semaines. 60 000 utilisateurs le premier mois.',
  'Un opérateur logistique. Suivi de flotte en temps réel. Retards de livraison réduits de 35 %.',
  'Une plateforme e-commerce. Migration cloud sans interruption. Coûts d’hébergement −40 %.',
];

export const partners = ['AWS', 'Microsoft Azure', 'Google Cloud', 'Snowflake', 'Databricks', 'Stripe'];

export const services = [
  { title: 'Développement augmenté par l’IA', text: 'IA pour la génération de code, les tests et le DevOps, mesurée sur votre référence de livraison.' },
  { title: 'Conseil & mise en œuvre IA', text: 'Stratégie, MLOps et IA générative : du cadrage à la mise en production.' },
  { title: 'Agents IA', text: 'Agents sur mesure pour automatiser vos processus, avec une seule équipe de bout en bout.' },
  { title: 'Ingénierie logicielle', text: 'Applications web et mobiles, modernisation et ingénierie produit. Les mêmes ingénieurs du début à la fin.' },
  { title: 'Cloud & infrastructure', text: 'Migration, DevOps et gestion d’infrastructure sur AWS, Azure et Google Cloud.' },
  { title: 'Data & Analytics', text: 'Plateformes data, entrepôts de données et BI pour décider sur des chiffres fiables.' },
];

export const industries = [
  { name: 'Retail / E-commerce', img: ind1, value: '100K+', text: 'utilisateurs servis chaque jour via nos systèmes e-commerce.' },
  { name: 'Finance', img: ind2, value: '2 M€', text: 'de transactions traitées chaque mois pour une fintech.' },
  { name: 'Santé', img: ind3, value: '30+', text: 'cliniques connectées à une plateforme de gestion unique.' },
  { name: 'Logistique', img: ind4, value: '−35 %', text: 'de retards de livraison grâce au suivi en temps réel.' },
  { name: 'Agriculture', img: ind5, value: '10 000', text: 'hectares suivis via une plateforme d’agriculture de précision.' },
];

export const insights = [
  { title: 'Facturation par IA : le guide pour les équipes finance', tag: 'IA', date: '22 octobre 2026', type: 'Blog d’expert' },
  { title: 'Migration cloud : éviter les 5 erreurs les plus coûteuses', tag: 'Cloud', date: '16 octobre 2026', type: 'Livre blanc' },
  { title: 'Agents IA pour l’automatisation en entreprise', tag: 'IA', date: '12 octobre 2026', type: 'Webinaire' },
  { title: 'Une couche analytique gouvernée pour un BI cohérent', tag: 'Data', date: '09 octobre 2026', type: 'Livre blanc' },
];

export const topics = ['IA', 'Data', 'Cloud', 'Cybersécurité', 'Mobile', 'DevOps', 'UI/UX', 'Outsourcing'];
