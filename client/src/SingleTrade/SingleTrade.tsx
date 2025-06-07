import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import "./SingleTrade.scss";
import { Trade } from '../Trade/types';
import { GET_TRADE } from './query';
import PropertyField from './PropertyField';
import DateComponent from '../Date/Date';
import Images from '../Images/Images';

const SingleTrade = () => {
    const { tradeId } = useParams();

    const { data, loading, error } = useQuery<SingleTradeResponse>(GET_TRADE, {
        variables: { tradeId }
    });

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (!data?.getUserTrade) return <div>Not found</div>

    const trade = data.getUserTrade;

    return (
        <div className='single-trade'>
            <h2 className='single-trade-header'>{trade.title || trade.asset}</h2>
            <div className='single-trade-row'>
                <div className='left'>
                    <PropertyField label='Title:' value={trade.title} />
                    <PropertyField label='Asset:' value={trade.asset} />
                    <PropertyField label='Enter Price:' value={trade.enterPrice} />
                    <PropertyField label='Close Price:' value={trade.closePrice} />
                </div>
                <div className='right'>
                    <PropertyField label='Volume:' value={trade.volume} />
                    <PropertyField label='Status:' value={trade.status} />
                    <DateComponent name='Enter Date:' date={trade.enterDate} />
                    <DateComponent name='Close Date:' date={trade.enterDate} />
                </div>
            </div>
            {trade.images && <Images images={trade.images} />}
        </div>
    )
}


type SingleTradeResponse = {
    getUserTrade: Trade
}

export default SingleTrade; 