import React from 'react';
import { render } from '@testing-library/react';

import View3d from './view3d';

describe('View3d', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<View3d />);
    expect(baseElement).toBeTruthy();
  });
});
