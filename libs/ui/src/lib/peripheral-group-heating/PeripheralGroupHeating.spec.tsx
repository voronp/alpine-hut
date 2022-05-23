import React from 'react';
import { render } from '@testing-library/react';

import PeripheralGroupHeating from './PeripheralGroupHeating';

describe('PeripheralGroupHeating', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PeripheralGroupHeating />);
    expect(baseElement).toBeTruthy();
  });
});
