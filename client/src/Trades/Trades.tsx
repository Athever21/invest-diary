import React from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

import { GET_TRADES } from './query';
import { RootState } from 'src/redux/store';
import { TradesResponse } from './types';
import Trade from '../Trade/Trade';

import "./Trades.scss";
import { Filters } from '../redux/tradeFiltersSlice';

const Trades = () => {
    const filters = useSelector((state: RootState) => state.tradeFilters);

    const getCleanFilters = (filters: Partial<Filters>) => {
        return Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
        );
    };
    
    const { data, loading, error } = useQuery<TradesResponse>(GET_TRADES, {
        variables: {
            filters: getCleanFilters(filters)
        }
    });

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    return (
        <div className='trades'>
            {data!.getUserTrades.trades.map((trade) => <Trade key={trade.id} trade={trade} />)}
        </div>
    )
}

export default Trades;