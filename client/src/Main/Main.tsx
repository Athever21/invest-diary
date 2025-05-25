import React from "react";
import "./Main.scss";

import Trades from '../Trades/Trades';

const Main = () => {
    return (
        <main>
            <div className="main-container">
                <Trades />
            </div>
        </main>
    )
}

export default Main;