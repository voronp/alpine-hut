import { render } from '@testing-library/react';

import PeripheralGroupHeatingAdmin from './PeripheralGroupHeatingAdmin';

describe('PeripheralGroupHeatingAdmin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PeripheralGroupHeatingAdmin />);
    expect(baseElement).toBeTruthy();
  });
});
