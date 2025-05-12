import React, { MouseEventHandler, ReactElement } from 'react'
import { ButtonTypes } from "./ButtonTypes";

import "./Button.scss";

const Button = (props: Props) => {
    return (
        <>
            <button 
                className={`button button-${props.type}`}
                onClick={props.onClick}
            >
                    {props.children}
            </button>
        </>
    )
}
type Props = {
    children: ReactElement | string;
    onClick: MouseEventHandler;
    type: ButtonTypes
}

export default Button;