import React from "react";
import "./Header.scss";

import Auth from "../Auth/Auth";

const Header = () => {
    return (
        <header>
            <div className="header-container">
                <h1 className="header-logo">Trading Diary</h1>
                <Auth />
            </div>
        </header>
    )
}

export default Header;