import { render } from '@testing-library/react';

import PeripheralGroupHeatingInfo from './PeripheralGroupHeatingInfo';

describe('PeripheralGroupHeatingInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PeripheralGroupHeatingInfo />);
    expect(baseElement).toBeTruthy();
  });
});
