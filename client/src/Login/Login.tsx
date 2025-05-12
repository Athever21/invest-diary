import React from "react";
import "./Login.scss";

import eventEmitter, { Events } from "../EventEmitter/EventEmitter";
import { ModalTypes } from "../Modal/ModalTypes";

const Login = () => {
    const showModal = (modalType: ModalTypes) => {
        eventEmitter.emit(Events.SHOW_MODAL, modalType);
    }

    return (
        <div className="login-container">
            <div className="login-signin" onClick={() => showModal(ModalTypes.SIGN_IN)}>sign in</div>
            <div className="login-signup" onClick={() => showModal(ModalTypes.SIGN_UP)}>signup</div>
        </div>
    )
}

export default Login;