import { render } from '@testing-library/react';

import PeripheralHeaterAdmin from './PeripheralHeaterAdmin';

describe('PeripheralHeaterAdmin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PeripheralHeaterAdmin />);
    expect(baseElement).toBeTruthy();
  });
});
