import { render } from '@testing-library/react';

import PeripheralInfo from './PeripheralInfo';

describe('PeripheralInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PeripheralInfo />);
    expect(baseElement).toBeTruthy();
  });
});
