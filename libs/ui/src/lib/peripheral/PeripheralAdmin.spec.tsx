import { render } from '@testing-library/react';

import PeripheralAdmin from './PeripheralAdmin';

describe('PeripheralAdmin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PeripheralAdmin />);
    expect(baseElement).toBeTruthy();
  });
});
