import React from 'react';

import { SelectFilterProps } from './types';
import { Filters } from '../redux/tradeFiltersSlice';

const SelectFilter = <K extends keyof Filters>(props: SelectFilterProps<K>) => {
    return (
        <>
            <select
            value={props.value}
            onChange={props.onChange}
            className="filter-input"
          >
            <option value="">-- Select --</option>
            {props.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </>
    )
}

export default SelectFilter;