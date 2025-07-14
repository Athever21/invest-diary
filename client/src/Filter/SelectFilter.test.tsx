import React from 'react';
import { render } from '@testing-library/react';
import SelectFilter from './SelectFilter';
import { SelectOption } from '../redux/tradeFiltersSlice';

describe('SelectFilter', () => {
  it('renders without crashing', () => {
    const options: SelectOption<string>[] = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    render(
      <SelectFilter
        name={"search"}
        value={"1"}
        options={options}
        onChange={() => {}}
      />
    );
  });
}); 