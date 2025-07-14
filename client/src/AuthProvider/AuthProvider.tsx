import React, { createContext, ReactElement, Suspense, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import eventEmitter, { Events } from '../EventEmitter/EventEmitter';

const AuthContext = createContext({} as AuthContext);

const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const getToken = async () => {
        try {
            const res = await axios.post('http://localhost:6868/auth/refresh_token', null, { withCredentials: true });

            setToken(res.data.accessToken);
            setUser(res.data.tokenPayload);
            setIsLoggedIn(true);
        } catch (err) { }
    }

    const logout = async () => {
        try {
            await axios.post('http://localhost:6868/auth/logout', null, { withCredentials: true });

            setToken("");
            setUser(null);
            setIsLoggedIn(false);
        } catch (err) { }
    }

    const login = (token: string, user: User) => {
        setToken(token);
        setUser(user);
        setIsLoggedIn(true);

        eventEmitter.emit(Events.HIDE_MODAL);
    }

    useEffect(() => {
        getToken();

        const interval = setInterval(getToken, 55 * 60 * 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthContext.Provider value={{ token, user, logout, login, isLoggedIn }}>
                {children}
            </AuthContext.Provider>
        </Suspense>
    )
}

export const useAuth = () => useContext(AuthContext);

type Props = {
    children: ReactElement[] | ReactElement;
}

type User = {
    username: string
}

type AuthContext = {
    token: string,
    user: User | null,
    isLoggedIn: boolean,
    logout: Function,
    login: Function
}

export default AuthProvider;