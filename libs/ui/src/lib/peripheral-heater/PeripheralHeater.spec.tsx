import React from 'react';
import { render } from '@testing-library/react';

import PeripheralHeater from './PeripheralHeater';

describe('PeripheralHeater', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PeripheralHeater />);
    expect(baseElement).toBeTruthy();
  });
});
