import React, { useCallback, useMemo, useState } from 'react';
import { AuthorizationDict } from '../CommonPropTypes';
import { PeripheralGroup } from '@home/data-access';
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import PeripheralGroupHeatingInfo from './PeripheralGroupHeatingInfo';
import PeripheralGroupHeatingAdmin, { PeripheralGroupHeatingAdminProps } from './PeripheralGroupHeatingAdmin';
import PeripheralHeater from '../peripheral-heater/PeripheralHeater';
import PeripheralTemperatureSensor from '../peripheral-temperature-sensor/PeripheralTemperatureSensor';
import withConfirmUnlock from '../hocs/withConfirmUnlock';
import './PeripheralGroupHeating.scss';

export interface PeripheralGroupHeatingProps {
  access: AuthorizationDict
  data: PeripheralGroup
  onEnable: (v:boolean) => void
  onUpdateData: (v:{[k:string]: string|number}) => void
}

const LockableAdminPGComponent = withConfirmUnlock<PeripheralGroupHeatingAdminProps>(PeripheralGroupHeatingAdmin);

export function PeripheralGroupHeating({access, data, onEnable, onUpdateData}: PeripheralGroupHeatingProps) {
  const [editSensor, setEditSensor] = useState(false);
  const [editHeater, setEditHeater] = useState(false);
  const temperatureSensorData = data.Peripherals.find(v => v.ID === data.Data.TemperatureSensorID);
  const heaterData = data.Peripherals.find(v => v.ID === data.Data.HeaterID);
  const onUpdate = useCallback((v: {'TemperatureLimit': number}) => {
    onUpdateData({'Data.TemperatureLimit': v.TemperatureLimit});
  }, [onUpdateData]);
  const onAdminUpdate = useCallback((v: {HeaterID?: number, TemperatureSensorID?: number}) => {
    onUpdateData(Object.keys(v).reduce((acc, k) => ({...acc, [`Data.${k}`]: v[k]}), {}));
  }, [onUpdateData]);
  const availablePeripherals = useMemo(() => data.Peripherals.map(v => ({Name: v.Name, ID: v.ID})), [data.Peripherals]);
  return (
    <div className='peripheral-group-heating'>
      <PeripheralGroupHeatingInfo 
        ID={data.ID}
        TemperatureLimit={data.Data.TemperatureLimit}
        IsActive={data.Data.IsActive}
        access={access}
        onEnable={onEnable}
        onUpdate={onUpdate}
      />
      <LockableAdminPGComponent
        title={data.Name}
        HeaterID={data.Data.HeaterID}
        TemperatureSensorID={data.Data.TemperatureSensorID}
        AvailablePeripherals={availablePeripherals}
        onChange={onAdminUpdate}
      />
      <Divider style={{width: '100%'}}/>
      <div className="grid">
          <div className="col-12 md:col-5 flex align-items-stretch justify-content-center relative">
              {!editSensor && <PeripheralTemperatureSensor
                Name={temperatureSensorData.Name}
                Temperature={temperatureSensorData.Data.Temperature}
              />}
              {access && access.Setup && <Button className='peripheral-group-heating__edit-button p-button-rounded p-button-sm p-button-outlined' icon='pi pi-pencil' onClick={() => setEditSensor((prev) => !prev)} />}
          </div>
          <div className="hidden md:block md:col-2">
              <Divider layout="vertical">
                  <i className='pi pi-arrows-h'/>
              </Divider>
          </div>
          <div className="col-12 md:col-5 flex align-items-stretch justify-content-center relative">
            {!editHeater && <PeripheralHeater
              IsActive={!!heaterData.IsActive}
              Name={heaterData.Name}
            />}
            {access && access.Setup && <Button className='peripheral-group-heating__edit-button p-button-rounded p-button-sm p-button-outlined' icon='pi pi-pencil' onClick={() => setEditHeater((prev) => !prev)} />}
          </div>
      </div>
    </div>
  );
}

export default PeripheralGroupHeating;
