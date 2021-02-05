import React from 'react';
import { render } from '@testing-library/react';

import Header, {HeaderProps} from './header';


describe('Header', () => {
  it('should render successfully', () => {
    const headOpts:HeaderProps = {
      onLogin: (login:string, password:string) => {},
      onLogout: () => {},
      isAuthenticated: true,
      isAuthLoading: false,
      authUserName: 'tester',
      authError: null,
    }
    const { baseElement } = render(<Header {...headOpts} />);
    expect(baseElement).toBeTruthy();
  });
});
