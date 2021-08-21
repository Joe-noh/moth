import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@tauri-apps/api/tauri', () => {
  return {
    invoke: () => {},
  }
})

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/tauri/i);
  expect(linkElement).toBeInTheDocument();
});
