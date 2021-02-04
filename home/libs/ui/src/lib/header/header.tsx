import React, {useEffect, useRef, useState} from 'react';
import {Toolbar, ToolbarProps} from 'primereact/toolbar';
import {Button, ButtonProps} from 'primereact/button';
import {ConfirmPopup} from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import {Dialog} from "primereact/dialog";
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import './header.scss';

const leftContents = (props) => (
  <React.Fragment>
    <div className="main-title">Alpine Hut</div>
  </React.Fragment>
);



/* eslint-disable-next-line */
export interface HeaderProps {
  onLogin: (login:string, password:string) => void
  onLogout: () => void
  isAuthenticated: boolean
  isAuthLoading: boolean
  authUserName: string
  authError: string
  onClickList: () => void
  onClick3D: () => void
}


export function AppHeader({onLogin, onLogout, isAuthenticated, isAuthLoading, authUserName, authError, onClick3D, onClickList}: HeaderProps) {
  const toast = useRef()
  useEffect(() => {
    if(authError && toast.current !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.current.show({severity: 'error', summary: 'Login failed', detail: authError});
    }
  }, [authError])
  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false)
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const rightContents = (p) => {
    return (<React.Fragment>
      <Button label="3d view" icon="pi pi-home" className="p-d-sm-block p-d-none" onClick={onClick3D} />
      <Button label="List" icon="pi pi-list" className="p-d-sm-block p-d-none" onClick={onClickList} />
      <Button
        icon={"pi "+(isAuthLoading ? ' pi-spin pi-spinner ' : isAuthenticated ? ' pi-sign-out' : ' pi-user')}
        className="p-mr-2"
        label={isAuthenticated ? authUserName || '' : ''}
        onClick={() => setLogoutConfirmVisible(true)}
      />
      <Button icon="pi pi-bars" className="p-d-sm-none p-mr-2 p-d-block"/>
    </React.Fragment>)
  };
  return (<>
      <Toast ref={toast} />
      <Dialog
        closable={false}
        header="Please sign in"
        visible={!isAuthenticated}
        style={{ width: '300px' }}
        onHide={() => {
          console.log('onHide')
        }}
        footer={
          <div>
            <Button type="submit" label="Confirm" icon="pi pi-check" onClick={() => onLogin(userName, userPassword)}  />
          </div>
        }
      >
        <form onSubmit={(e) => {onLogin(userName, userPassword); e.preventDefault(); return false;}}>
          <div className="p-inputgroup p-p-1">
              <span className="p-inputgroup-addon">
                  <i className="pi pi-user"/>
              </span>
              <InputText
                name="login"
                type="text"
                value={userName}
                onChange={(e) => setUserName((e.target as HTMLInputElement).value)}
                placeholder="Login or email"
                autoFocus
                autocomplete="on"
              />
          </div>
          <div className="p-inputgroup p-p-1">
              <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"/>
              </span>
              <Password
                name="password"
                value={userPassword}
                onChange={(e) => setUserPassword((e.target as HTMLInputElement).value)}
                feedback={false}
                autocomplete="on"
              />
          </div>
          <input type="submit" style={{display: 'none'}} />
        </form>
      </Dialog>
      <ConfirmPopup
        target={document.querySelector('.pi-sign-out')}
        visible={logoutConfirmVisible}
        onHide={() => setLogoutConfirmVisible(false)}
        message="Are you sure you want to logout?"
        icon="pi pi-exclamation-triangle"
        accept={onLogout}
        reject={() => setLogoutConfirmVisible(false)}
      />
    <Toolbar left={leftContents} right={rightContents} className="header-toolbar" />
    </>
  );
}

export default AppHeader;
