import React, { useState, useEffect } from 'react'

import "./Notifications.scss"
import eventEmitter, { Events } from '../EventEmitter/EventEmitter';

const Notifications = () => {
    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState("");

    useEffect(() => {
        eventEmitter.on(Events.SHOW_NOTIFICATION, showNotification)

        return () => {
            eventEmitter.off(Events.SHOW_NOTIFICATION, showNotification)
        }
    }, [])

    const showNotification = ({ message, type, time }: any) => {
        setNotification(message);
        setNotificationType(type);
        
        setTimeout(() => setNotification(""), time * 1000);
    }

    if (!notification) return [];

    return (
        <div className={`notification ${notificationType}`}>
            <p className='notifiaction-text'>{notification}</p>
        </div>
    )
}

export default Notifications;