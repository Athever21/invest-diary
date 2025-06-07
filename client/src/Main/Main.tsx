import React from "react";
import { Routes, Route } from 'react-router-dom';

import "./Main.scss";

import Filters from '../Filters/Filters';
import Trades from '../Trades/Trades';
import SingleTrade from '../SingleTrade/SingleTrade';
import { useAuth } from "../AuthProvider/AuthProvider";

const Main = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) return <></>;

    return (
        <main>
            <div className="main-container">
                <Routes>
                    <Route path="/" element={
                        <>
                            <button className="create-new-trade">Create New Trade</button>
                            <Filters />
                            <hr className="main-line" />
                            <Trades />
                        </>
                    }>

                    </Route>
                    <Route path="/:tradeId" element={
                        <>
                            <SingleTrade />
                        </>
                    }>
                    </Route>
                </Routes>
            </div>
        </main>
    )
}

export default Main;