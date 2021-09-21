import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const result = render(<App />);
  const appElement = result.container.querySelector('.app');
  expect(appElement).toBeInTheDocument();
});
