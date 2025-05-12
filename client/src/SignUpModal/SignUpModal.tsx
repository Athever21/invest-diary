import React, { useState } from 'react';
import axios from 'axios';

import "./SignUpModal.scss";

import Input from '../Input/Input';
import Button from '../Button/Button';
import { ButtonTypes } from '../Button/ButtonTypes';
import eventEmitter, { Events } from '../EventEmitter/EventEmitter';
import { NotificationTypes } from '../Notifications/NotificationTypes'

const SignUpModal = () => {
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

    const clearForm = () => {
        setPassword('');
        setLogin('');
    }

    const signUp = async () => {
        if (!validate()) return;

        try {
            await axios.post("http://localhost:6868/user", { login, password });

            eventEmitter.emit(Events.SHOW_NOTIFICATION, { message: "User successfully created", type: NotificationTypes.SUCCESS, time: 5 });
            clearForm();
        } catch (err: any) {
            const response = err.response;
            const message = response ? response.data.message[0] : "Something went wrong"

            eventEmitter.emit(Events.SHOW_NOTIFICATION, { message, type: NotificationTypes.FAIL, time: 5 })
        }
    }

    return (
        <>
            <div className='form'>
                <Input value={login} setValue={setLogin} type='text' name='Login' error={loginError} setError={setLoginError} />
                <Input value={password} setValue={setPassword} type='password' name='Password' error={passwordError} setError={setPasswordError} />
                <Button onClick={signUp} type={ButtonTypes.Login}>Sign Up</Button>
            </div>
        </>
    )
}

export default SignUpModal;