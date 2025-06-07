import React from 'react';
import { format } from 'date-fns';

import "./Date.scss";

const DateComponent = ({ name, date, dateFormat = "MM/dd/yyyy HH:mm" }: Props) => {
    return (
        <div className='date'>
            <p className='date-name'>{name}</p>
            {date && <p>{format(date, dateFormat)}</p>}
        </div>
    )
}

type Props = {
    name: string,
    date: Date,
    dateFormat?: string
}

export default DateComponent;