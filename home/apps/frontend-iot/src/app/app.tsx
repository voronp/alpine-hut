import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './app.scss';

import { Route, Link } from 'react-router-dom';

import { FeaturePeripheralsList } from '@home/feature-peripherals/list';
import {loginThunk, logoutThunk, getAuthState} from './auth.slice'

import {AppHeader, HeaderProps} from '@home/ui';
import {useWhoAmIQuery} from "@home/data-access";

export function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => getAuthState(state).isAuthenticated)
  const isAuthLoading = useSelector(state => getAuthState(state).loadingStatus)
  const loginError = useSelector(state => getAuthState(state).error)
  const {data, error: authError, loading, refetch: refetchWhoAmI} = useWhoAmIQuery()

  useEffect(() => {
    refetchWhoAmI()
  }, [isAuthenticated])



  const headerProps:HeaderProps = {
    onLogout: () => dispatch(logoutThunk()),
    onLogin: (login, password) => dispatch(loginThunk({login, password})),
    isAuthenticated: isAuthenticated && !!data,
    isAuthLoading: isAuthLoading === 'loading',
    authUserName: data?.whoAmI?.Login,
    authError: loginError,
  }

  return (
    <div className="app">
      <header className="header">
        <AppHeader {...headerProps} />
      </header>
      <main className="main">
        {
          authError ? <div>Please login</div> :
            loading ? <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}/> : <div>content</div>
        }
      </main>


      <div className="flex">
      </div>

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/list">FeaturePeripheralsList</Link>
          </li>
          <li>
            <Link to="/feature">ListFeature</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route path="/list" component={FeaturePeripheralsList} />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
      {/* END: routes */}
    </div>
  );
}

export default App;
