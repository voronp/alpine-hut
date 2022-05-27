import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Toolbar, ToolbarProps} from 'primereact/toolbar';
import {Button, ButtonProps} from 'primereact/button';
import {ConfirmPopup} from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import {Dialog} from "primereact/dialog";
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
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
  const menu = useRef(null);
  const menuOptions = useMemo(() => ([
    {
      label: '3d view',
      icon: 'pi pi-home',
      command: onClick3D,
    },
    {
      label: 'List',
      icon: 'pi pi-list',
      command: onClickList,
    },
  ]), [onClick3D, onClickList]);
  const rightContents = (p) => {
    return (<React.Fragment>
      <Button label="3d view" icon="pi pi-home" className="sm:block hidden" onClick={onClick3D} />
      <Button label="List" icon="pi pi-list" className="sm:block hidden" onClick={onClickList} />
      <Button
        icon={"pi "+(isAuthLoading ? ' pi-spin pi-spinner ' : isAuthenticated ? ' pi-sign-out' : ' pi-user')}
        className="mr-2"
        label={isAuthenticated ? authUserName || '' : ''}
        onClick={() => setLogoutConfirmVisible(true)}
      />
      <Button icon="pi pi-bars" className="sm:hidden mr-2 block" onClick={(event) => menu.current.toggle(event)}/>
      <Menu model={menuOptions} popup ref={menu} id="popup_menu" />
    </React.Fragment>)
  };
  return (<>
      <Toast ref={toast} />
      <Dialog
        closable={false}
        header="Please sign in"
        visible={!isAuthenticated && !isAuthLoading}
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
          <div className="inputgroup p-1">
              <span className="inputgroup-addon">
                  <i className="pi pi-user"/>
              </span>
              <InputText
                name="login"
                type="text"
                value={userName}
                onChange={(e) => setUserName((e.target as HTMLInputElement).value)}
                placeholder="Login or email"
                autoFocus
                autoComplete="on"
              />
          </div>
          <div className="inputgroup p-1">
              <span className="inputgroup-addon">
                  <i className="pi pi-lock"/>
              </span>
              <Password
                name="password"
                value={userPassword}
                onChange={(e) => setUserPassword((e.target as HTMLInputElement).value)}
                feedback={false}
                autoComplete="on"
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
