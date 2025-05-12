import React, { useState, useEffect } from 'react';
import "./Modal.scss";

import eventEmitter, { Events } from '../EventEmitter/EventEmitter';
import { ModalTypes } from './ModalTypes';

import SignInModal from '../SignInModal/SignInModal';
import SignUpModal from '../SignUpModal/SignUpModal';

const Modal = () => {
    const [isVisible, setIsVisible] = useState(0);
    const [modalType, setModalType] = useState(null as unknown as ModalTypes);
    
    useEffect(() => {
        eventEmitter.on(Events.SHOW_MODAL, showModal);
        eventEmitter.on(Events.HIDE_MODAL, hideModal);
        
        return () => {
            eventEmitter.off(Events.SHOW_MODAL, showModal);
            eventEmitter.off(Events.HIDE_MODAL, hideModal);
        }
    }, []);

    const showModal = (modalType: ModalTypes) => {
        setIsVisible(1);
        setModalType(modalType);
    };

    const hideModal = () => setIsVisible(0);

    const closeModal = (e : React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        
        if (!target.getAttribute("close-modal")) return;

        setIsVisible(0);
    }

    if (!isVisible) return <></>;

    return (
        <div className='modal-conatiner' close-modal="1" onClick={closeModal}>
            <div className='modal-content'>
                {modalType == ModalTypes.SIGN_IN && <SignInModal />}
                {modalType == ModalTypes.SIGN_UP && <SignUpModal />}
            </div>
        </div>
    )
}

export default Modal;