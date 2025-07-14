import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Header', () => {
  it('renders the logo', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.getByText(/Trading Diary/i)).toBeInTheDocument();
  });
}); 