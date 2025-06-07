import React from 'react';
import { useSelector } from 'react-redux';

import "./Filter.scss";

import { RootState } from '../redux/store';

import DateFilter from './DateFilter';
import SimpleFilter from './SimpleFilter';
import SelectFilter from './SelectFilter';

import useFilterDispatch from '../hooks/useFilterrDispatch';
import { Filters } from '../redux/tradeFiltersSlice';

const Filter = ({ label, name, type, placeholder, options }: FilterFieldConfig) => {
    const value = useSelector((state: RootState) => state.tradeFilters[name]);
    const setValue = useFilterDispatch()(name);

    const renderField = () => {
        switch (type) {
            case 'text':
            case 'number':
                return <SimpleFilter 
                    name={name}
                    value={value || ''} 
                    onChange={(e) => setValue(e.target.value)} 
                    placeholder={placeholder}
                    type={type} 
                />;
            case 'date':
                return <DateFilter 
                    value={value ? new Date(value) : undefined  as Date | undefined} 
                    onChange={(date) => setValue(date ? date.toString() : null as any)}
                />;
            case 'select':
                return <SelectFilter 
                    name={name}
                    value={value as string | undefined}
                    options={options!}
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                />
            default:
                return null;
        }
    };

    return (
        <div className='filter'>
            <label htmlFor={name}>{label}</label>
            {renderField()}
            <p className='filter-error'></p>
        </div>
    )
}

export type FilterFieldConfig = {
    name: keyof Filters;
    label: string;
    type: 'text' | 'number' | 'date' | 'select';
    placeholder?: string,
    options?: { label: string; value: string | number }[];
};

export default Filter;