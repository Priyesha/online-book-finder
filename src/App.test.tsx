import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app bar header', () => {
  render(<App />);
  const appBarElement = screen.getByText(/Books Finder/i);
  expect(appBarElement).toBeInTheDocument();
});
