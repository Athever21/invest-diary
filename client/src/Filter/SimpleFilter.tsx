import React from 'react';

import { FilterProps } from './types';

const SimpleFilter = (props: FilterProps) => {
    return (
        <>
            <input 
                className='filter-input'
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
        </>
    )
}

export default SimpleFilter;