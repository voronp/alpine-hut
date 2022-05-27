import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './app.scss';

import {Route, Link, useHistory} from 'react-router-dom';

import {PeripheralList} from './peripheral-list/peripheral-list';
import {View3d} from './view3d/view3d';
import {loginThunk, logoutThunk, getAuthState, authActions} from './auth.slice';
import {selectManagerPopupIsOpened, managerPopupActions, selectManagerPopupData} from './manager-popup.slice'
import {AppHeader, HeaderProps} from '@home/ui';
import {useWhoAmIQuery} from "@home/data-access";
import { Dialog } from 'primereact/dialog';
import {ManagerPopup} from "./manager-popup";
import {screenActions} from './screen.slice';

export function App() {
  const dispatch = useDispatch();
  const isModalOpened = useSelector(state => selectManagerPopupIsOpened(state));
  const isAuthenticated = useSelector(state => getAuthState(state).isAuthenticated);
  const isAuthLoading = useSelector(state => getAuthState(state).loadingStatus);
  const loginError = useSelector(state => getAuthState(state).error);
  const {data, error: authError, loading, refetch: refetchWhoAmI} = useWhoAmIQuery();
  const history = useHistory();

  useEffect(() => {
    refetchWhoAmI().then((res) => {
      dispatch(authActions.setIsAuthenticated(true));
    }).catch((err) => {
      if(isAuthenticated) {
        dispatch(logoutThunk());
      }
    });
  }, [isAuthenticated, dispatch, refetchWhoAmI]);

  useEffect(() => {
    const listener = () => {
      dispatch(screenActions.setHeight(window.innerHeight));
      dispatch(screenActions.setWidth(window.innerWidth));
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [dispatch]);

  const headerProps:HeaderProps = {
    onLogout: () => dispatch(logoutThunk()),
    onLogin: (login, password) => dispatch(loginThunk({login, password})),
    isAuthenticated: isAuthenticated,
    isAuthLoading: isAuthLoading === 'loading' || (isAuthLoading === 'initial' && loading),
    authUserName: data?.whoAmI?.Login,
    authError: loginError,
    onClickList: () => history.push('/list'),
    onClick3D: () => history.push('/view3d')
  };

  return (
    <div className="app">
      <header className="header">
        <AppHeader {...headerProps} />
      </header>
      <main className="main">
        {
          authError ? <div>Please login</div> :
            loading ? <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}/> : <>
              <Route path="/list" component={PeripheralList} />
              <Route path="/view3d" children={({ match }) => (<View3d isActive={match && match.path === '/view3d' && !isModalOpened}/>)} />
            </>
        }
      </main>
      { !authError && !loading && <ManagerPopup/> }
      <div className="footer flex">
        footer
      </div>
    </div>
  );
}

export default App;
