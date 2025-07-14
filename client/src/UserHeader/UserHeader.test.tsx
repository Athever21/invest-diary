import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserHeader from './UserHeader';
import * as AuthProvider from '../AuthProvider/AuthProvider';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:6969/graphql' }),
  cache: new InMemoryCache(),
});

describe('UserHeader', () => {
  it('renders username', () => {
    const mockAuth = {
      isLoggedIn: true,
      token: '',
      user: { username: 'testuser' },
      logout: jest.fn(),
      login: jest.fn(),
    };
    jest.spyOn(AuthProvider, 'useAuth').mockReturnValue(mockAuth);
    render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <UserHeader />
        </Provider>
      </ApolloProvider>
    );
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('calls logout on button click', () => {
    const mockAuth = {
      isLoggedIn: true,
      token: '',
      user: { username: 'testuser' },
      logout: jest.fn(),
      login: jest.fn(),
    };
    jest.spyOn(AuthProvider, 'useAuth').mockReturnValue(mockAuth);
    render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <UserHeader />
        </Provider>
      </ApolloProvider>
    );
    fireEvent.click(screen.getByText(/logout/i));
    expect(mockAuth.logout).toHaveBeenCalled();
  });
}); 