import React from 'react';

import "./Filters.scss";
import Filter, { FilterFieldConfig } from '../Filter/Filter';
import { Filters } from '../redux/tradeFiltersSlice';

const config: FilterFieldConfig[] = [
    { name: 'search', label: 'Search:', type: 'text' },
    { name: 'enterDate', label: 'From Date:', type: 'date' },
    { name: 'status', label: 'Status:', type: 'select', options: [
        { label: 'Open', value: 'OPEN' },
        { label: 'Close', value: 'CLOSED' }
    ]},
    { name: 'closeDate', label: 'Close Date:', type: 'date' },
]

const Filters = () => {
    return (
        <div className='filters'>
            {config.map((filter, i) => <Filter
                key={i}
                name={filter.name}
                label={filter.label}
                type={filter.type}
                placeholder={filter.placeholder}
                options={filter.options}
            />)}
        </div>
    )
}



export default Filters;