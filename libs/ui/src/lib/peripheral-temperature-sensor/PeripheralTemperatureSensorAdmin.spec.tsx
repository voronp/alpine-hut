import { render } from '@testing-library/react';

import PeripheralTemperatureSensorAdmin from './PeripheralTemperatureSensorAdmin';

describe('PeripheralTemperatureSensorAdmin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PeripheralTemperatureSensorAdmin />);
    expect(baseElement).toBeTruthy();
  });
});
