import React from 'react';

import { useAuth } from '../AuthProvider/AuthProvider';
import "./Trades.scss";

const Trades = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) return [];

    return (
        <div>
            trades
        </div>
    )
}

export default Trades;