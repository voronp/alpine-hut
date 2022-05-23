import React from 'react';
import { render } from '@testing-library/react';

import PeripheralTemperatureSensor from './PeripheralTemperatureSensor';

describe('PeripheralTemperatureSensor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PeripheralTemperatureSensor />);
    expect(baseElement).toBeTruthy();
  });
});
