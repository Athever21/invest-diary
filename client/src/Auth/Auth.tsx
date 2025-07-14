import React from "react";
import "./Auth.scss";

import Login from '../Login/Login';
import UserHeader from '../UserHeader/UserHeader';
import { useAuth } from "../AuthProvider/AuthProvider";

const Auth = () => {
    const user = useAuth().user;

    return (
        <div>
            {
                (user) ? <UserHeader /> : <Login />
            }
        </div>
    )
}

export default Auth;