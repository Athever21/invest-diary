import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main';
import * as AuthProvider from '../AuthProvider/AuthProvider';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { HashRouter } from 'react-router-dom';

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:6969/graphql' }),
    cache: new InMemoryCache(),
});

describe('Main', () => {
    it('renders nothing when not logged in', () => {
        const mockAuth = {
            isLoggedIn: false,
            token: '',
            user: { username: '' },
            logout: jest.fn(),
            login: jest.fn(),
        };
        jest.spyOn(AuthProvider, 'useAuth').mockReturnValue(mockAuth);
        const { container } = render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <HashRouter>
                        <Main />
                    </HashRouter>
                </Provider>
            </ApolloProvider>
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('renders create button when logged in', () => {
        const mockAuth = {
            isLoggedIn: true,
            token: '',
            user: { username: '' },
            logout: jest.fn(),
            login: jest.fn(),
        };
        jest.spyOn(AuthProvider, 'useAuth').mockReturnValue(mockAuth);
        render(
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <HashRouter>
                        <Main />
                    </HashRouter>
                </Provider>
            </ApolloProvider>
        );
        expect(screen.getByText(/Create New Trade/i)).toBeInTheDocument();
    });
});