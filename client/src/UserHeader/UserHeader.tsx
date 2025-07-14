import React from 'react'

import "./UserHeader.scss";

import { useAuth } from '../AuthProvider/AuthProvider';
import Button from '../Button/Button';
import { ButtonTypes } from '../Button/ButtonTypes';

const UserHeader = () => {
    const { user, logout } = useAuth();
    
    return (
        <div className="user-header">
            <p>{user?.username}</p>
            <Button type={ButtonTypes.Logout} onClick={async() => await logout()}>logout</Button>
        </div>
    )
}

export default UserHeader