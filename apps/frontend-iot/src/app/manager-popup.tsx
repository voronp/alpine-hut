import {useDispatch, useSelector} from 'react-redux';
import {managerPopupActions, selectManagerPopupData, selectManagerPopupHeader, selectManagerPopupIsOpened, selectManagerPopupItem} from "./manager-popup.slice";
import {Dialog} from "primereact/dialog";
import { ProgressSpinner } from 'primereact/progressspinner';
import { BlockUI } from 'primereact/blockui';
import { Button } from 'primereact/button';
import React, { useCallback, useState } from "react";
import {PeripheralGroup, Profile, useGetProfileAuthorizationQuery} from '@home/data-access';
import { PeripheralGroupFormConnected } from './components/PeripheralGroupFormConnected';
import { useManagerPopupSaveBtn } from './hooks/common';

export function ManagerPopup() {
  const [saveNode, setSaveNode] = useState(null);
  const saveRef = useCallback((el) => setSaveNode(el), []);
  const dispatch = useDispatch();
  const isModalOpened = useSelector(state => selectManagerPopupIsOpened(state));
  const managerPopupData = useSelector(state => selectManagerPopupData(state));
  const managerPopupItem = useSelector(state => selectManagerPopupItem(state));
  const managerPopupHeader = useSelector(state => selectManagerPopupHeader(state));
  const { data, loading, error } = useGetProfileAuthorizationQuery();
  const { 
    saveBtnLabel, 
    saveBtnIcon, 
    saveBtnClass, 
    saveBtnDisabled,
    isSaveLoading,
    setAlreadySaved,
    setHasChanges,
    setIsSaveLoading,
   } = useManagerPopupSaveBtn();
  if (loading) return <BlockUI blocked template={<ProgressSpinner/>} fullScreen />
  if (error) return <Dialog modal visible onHide={() => undefined}>{error.message}</Dialog>
  const { getProfile: profileData } = data;
  return isModalOpened && profileData && <Dialog
    breakpoints={{'960px': '75vw', '640px': '100vw'}}
    style={{maxWidth: '800px'}}
    header={managerPopupHeader}
    footer={<Button
      loading={isSaveLoading}
      label={saveBtnLabel}
      icon={saveBtnIcon}
      className={saveBtnClass}
      disabled={saveBtnDisabled}
      ref={saveRef}
    />}
    visible={isModalOpened}
    onHide={() => dispatch(managerPopupActions.closePopup())}
  >
    { managerPopupItem && managerPopupItem.Type === 'PeripheralGroup' && <PeripheralGroupFormConnected
      ID={managerPopupItem.ID}
      profile={profileData as Profile}
      setAlreadySaved={setAlreadySaved}
      setHasChanges={setHasChanges}
      setIsSaveLoading={setIsSaveLoading}
      saveNode={saveNode}
    /> }
  </Dialog>
}
