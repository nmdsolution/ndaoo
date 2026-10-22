import { render, screen, fireEvent } from '@testing-library/react';
import App from './App.jsx';

describe('NDAOO site', () => {
  it('affiche le logo et le titre principal', () => {
    render(<App />);
    expect(screen.getAllByAltText('NDAOO').length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/ingénierie logicielle/i);
  });

  it('ouvre le méga-menu au clic', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Nos services' }));
    expect(screen.getAllByText('Agents IA').length).toBeGreaterThan(0);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('fait défiler les témoignages', () => {
    render(<App />);
    const before = screen.getByTestId('quote').textContent;
    fireEvent.click(screen.getByLabelText('Suivant'));
    expect(screen.getByTestId('quote').textContent).not.toBe(before);
  });

  it('valide et envoie le formulaire de contact', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Awa' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'awa@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Envoyer' }));
    expect(screen.getByRole('status')).toHaveTextContent('Merci Awa');
  });
});
