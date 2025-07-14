import React from 'react';
import { render } from '@testing-library/react';
import Trades from './Trades';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:6969/graphql' }),
  cache: new InMemoryCache(),
});

describe('Trades', () => {
  it('renders without crashing', () => {
    render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Trades />
        </Provider>
      </ApolloProvider>
    );
  });
}); 