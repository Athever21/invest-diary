import React from 'react';

const PropertyField = (props: Props) => {
    return (
        <div className='property'>
            <p className='property-label'>{props.label}</p>
            <p className='property-value'>{props.value}</p>
        </div>
    )
}

type Props = {
    label: string,
    value: string | number
}

export default PropertyField;