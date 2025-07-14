import React from 'react';
import { render } from '@testing-library/react';
import SimpleFilter from './SimpleFilter';

describe('SimpleFilter', () => {
  it('renders without crashing', () => {
    render(
      <SimpleFilter
        name="test"
        value=""
        onChange={() => {}}
        type="text"
        placeholder="Test Placeholder"
      />
    );
  });
}); 