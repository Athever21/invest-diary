import React from 'react';
import { Link } from 'react-router-dom';

import "./Trade.scss";
import { Props, Trade } from './types';

import DateComponent from '../Date/Date';

const Trade = ({ trade }: Props) => {
    const showTitle = (trade: Trade) => {
        return trade.title || trade.asset;
    }

    return (
        <div className='trade'>
            <Link to={`/${trade.id}`}>
                <div className='trade-header'>
                    <h1>{showTitle(trade)}</h1>
                    <p className={trade.status}>{trade.status}</p>
                </div>
                <div className='trade-dates'>
                    <DateComponent name="Enter Date:" date={trade.enterDate} />
                    <DateComponent name="Close Date:" date={trade.closeDate} />
                </div>
            </Link>
        </div>
    )
}

export default Trade;