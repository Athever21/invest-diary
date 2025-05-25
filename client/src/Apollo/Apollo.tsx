import React, { ReactElement } from 'react';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { useAuth } from '../AuthProvider/AuthProvider';

const httpLink = new HttpLink({ uri: 'http://localhost:6969/graphql' });

const ApolloWrapper = ({ children }: Props) => {
    const { token } = useAuth();

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}

type Props = {
    children: ReactElement[] | ReactElement;
}

export default ApolloWrapper;