import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SingleTrade from './SingleTrade';
import { GET_TRADE } from './query';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ tradeId: '123' }),
}));

describe('SingleTrade', () => {
    const tradeId = '123';
    const tradeMock = {
        request: {
            query: GET_TRADE,
            variables: { tradeId },
        },
        result: {
            data: {
                getUserTrade: {
                    id: tradeId,
                    title: 'Test Trade',
                    asset: 'AAPL',
                    status: 'OPEN',
                    enterDate: '2023-01-01T10:00:00Z',
                    closeDate: '2023-01-02T10:00:00Z',
                    enterPrice: 100,
                    closePrice: 110,
                    volume: 10,
                    images: [
                        { url: 'http://example.com/img1.jpg', name: 'img1' },
                        { url: 'http://example.com/img2.jpg', name: 'img2' },
                    ],
                },
            },
        },
    };

    it('renders loading state', () => {
        render(
            <MockedProvider mocks={[tradeMock]} addTypename={false}>
                <SingleTrade />
            </MockedProvider>
        );
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        const errorMock = {
            request: {
                query: GET_TRADE,
                variables: { tradeId },
            },
            error: new Error('Test error'),
        };
        render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <SingleTrade />
            </MockedProvider>
        );
        await waitFor(() => expect(screen.getByText(/Test error/i)).toBeInTheDocument());
    });

    it('renders not found state', async () => {
        const notFoundMock = {
            request: {
                query: GET_TRADE,
                variables: { tradeId },
            },
            result: { data: { getUserTrade: null } },
        };
        render(
            <MockedProvider mocks={[notFoundMock]} addTypename={false}>
                <SingleTrade />
            </MockedProvider>
        );
        await waitFor(() => expect(screen.getByText(/Not found/i)).toBeInTheDocument());
    });

    it('renders trade data and fields', async () => {
        render(
            <MockedProvider mocks={[tradeMock]} addTypename={false}>
                <SingleTrade />
            </MockedProvider>
        );
        // Heading
        await waitFor(() => expect(screen.getByRole('heading', { name: /Test Trade/i })).toBeInTheDocument());
        // Property fields
        expect(screen.getByText('Title:')).toBeInTheDocument();
        expect(screen.getByText('AAPL')).toBeInTheDocument();
        expect(screen.getByText('OPEN')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('110')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        // Dates (formatted)
        expect(screen.getAllByText(/01\/01\/2023/).length).toBeGreaterThan(0);
        // Images
        expect(screen.getAllByRole('img').length).toBe(2);
        expect(screen.getByAltText('img1')).toHaveAttribute('src', 'http://example.com/img1.jpg');
        expect(screen.getByAltText('img2')).toHaveAttribute('src', 'http://example.com/img2.jpg');
    });

    it('can navigate images', async () => {
        render(
            <MockedProvider mocks={[tradeMock]} addTypename={false}>
                <SingleTrade />
            </MockedProvider>
        );
        await waitFor(() => expect(screen.getByRole('img', { name: 'img1' })).toBeInTheDocument());
        const nextButton = screen.getByRole('button', { name: '>' });
        fireEvent.click(nextButton);
        expect(screen.getByRole('img', { name: 'img2' })).toBeInTheDocument();
        const prevButton = screen.getByRole('button', { name: '<' });
        fireEvent.click(prevButton);
        expect(screen.getByRole('img', { name: 'img1' })).toBeInTheDocument();
    });
}); 