import React, { useState } from "react";
import "./SignInModal.scss";

import Input from '../Input/Input';
import Button from '../Button/Button';
import { ButtonTypes } from '../Button/ButtonTypes';
import eventEmitter, { Events } from '../EventEmitter/EventEmitter';
import { NotificationTypes } from '../Notifications/NotificationTypes'
import axios from "axios";
import { useAuth } from "../AuthProvider/AuthProvider";

const SignInModal = () => {
    const auth = useAuth();

    const [login, setLogin] = useState('');
    const [loginError, setLoginError] = useState('')
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('')

    const validate = () => {
        let isValid = true;

        if (!login) {
            setLoginError("Field cannot be empty")
            isValid = false;
        }

        if (!password) {
            setPasswordError("Field cannot be empty")
            isValid = false;
        }

        return isValid;
    }

    const signIn = async() => {
        if (!validate()) return;

        try {
            const res = await axios.post("http://localhost:6868/auth/login", { login, password }, {withCredentials: true});

            const user = res.data.tokenPayload;
            const token = res.data.accessToken;

            auth.login(token, user);
        } catch (err: any) {
            const response = err.response;
            const message = response ? response.data.message : "Something went wrong"

            eventEmitter.emit(Events.SHOW_NOTIFICATION, { message, type: NotificationTypes.FAIL, time: 5 })
        }
    }

    return (
        <>
            <div className='form'>
                <Input value={login} setValue={setLogin} type='text' name='Login' error={loginError} setError={setLoginError} />
                <Input value={password} setValue={setPassword} type='password' name='Password' error={passwordError} setError={setPasswordError} />
                <Button onClick={signIn} type={ButtonTypes.Login}>Sign In</Button>
            </div>
        </>
    )
}

export default SignInModal;