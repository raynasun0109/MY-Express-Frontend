import { render, screen } from '@testing-library/react';
import App from './App';

test('home rendered', () => {
  render(<App />);
  const linkElement = screen.getByText(/What's NEW/i);
  expect(linkElement).toBeInTheDocument();
});
