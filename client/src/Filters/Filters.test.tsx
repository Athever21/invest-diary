import React from 'react';
import { render } from '@testing-library/react';
import Filters from './Filters';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Filters', () => {
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <Filters />
            </Provider>
        );
    });
}); 