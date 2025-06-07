import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { DateFilterProps } from './types';

const DateFilter = (props: DateFilterProps) => {
    return (
        <>
            <DatePicker 
                showTimeSelect
                selected={props.value}
                onChange={props.onChange} 
                dateFormat="Pp"
                isClearable
                className="filter-input"
            />
        </>
    )
}

export default DateFilter;