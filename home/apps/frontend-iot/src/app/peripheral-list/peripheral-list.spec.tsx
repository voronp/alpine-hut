import React from 'react';
import { render } from '@testing-library/react';

import PeripheralList from './peripheral-list';

describe('PeripheralList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PeripheralList />);
    expect(baseElement).toBeTruthy();
  });
});
