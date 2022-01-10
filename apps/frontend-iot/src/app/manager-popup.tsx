import {useDispatch, useSelector} from 'react-redux';
import {managerPopupActions, selectManagerPopupData, selectManagerPopupIsOpened} from "./manager-popup.slice";
import {Dialog} from "primereact/dialog";
import React from "react";
import { IPeripheralGroupInfoProps } from './view3d/components/PeripheralGroupInfo';

const getHeader = (data: any) => {
  if(data[IPeripheralGroupInfoProps]) return data.Name;
  return 'Unknown';
};

const getFooter = (data: any) => {
  if(data[IPeripheralGroupInfoProps]) return `footer of ${data.Name}`;
  return '';
};

export function ManagerPopup() {
  const dispatch = useDispatch();
  const isModalOpened = useSelector(state => selectManagerPopupIsOpened(state));
  const managerPopupData = useSelector(state => selectManagerPopupData(state));

  return managerPopupData && <Dialog header={getHeader(managerPopupData)} visible={isModalOpened} footer={getFooter(managerPopupData)} onHide={() => dispatch(managerPopupActions.closePopup())}>

  </Dialog>
}
