import React, { useState, useCallback } from 'react';

import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner'
import { Message } from 'primereact/message'
import { useAuthorizationDict, useManagerPopupSaveBtn } from '../hooks/common'
import { PeripheralGroupFormConnected } from './PeripheralGroupFormConnected'

export interface PeripheralListAccordionItemProps {
  PeripheralGroupID:number;
}

export function PeripheralListAccordionItem(props: PeripheralListAccordionItemProps) {
  const { PeripheralGroupID } = props;
  const [saveNode, setSaveNode] = useState(null);
  const saveRef = useCallback((el) => setSaveNode(el), []);
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
  const {data: permissions, loading: permissionsLoading, error: permissionsError} = useAuthorizationDict(PeripheralGroupID);
  return (<div>
    { permissionsLoading && <ProgressSpinner/>}
    { permissionsError && <Message severity="error" text="Permissions error" /> }
    { permissions && permissions.Read && <div><PeripheralGroupFormConnected
      permissions={permissions}
      ID={PeripheralGroupID}
      setAlreadySaved={setAlreadySaved}
      setHasChanges={setHasChanges}
      setIsSaveLoading={setIsSaveLoading}
      saveNode={saveNode}
    /><div><Button
    loading={isSaveLoading}
    label={saveBtnLabel}
    icon={saveBtnIcon}
    className={saveBtnClass}
    disabled={saveBtnDisabled}
    ref={saveRef}
  /></div></div> }
  </div>);
}

export default PeripheralListAccordionItem;