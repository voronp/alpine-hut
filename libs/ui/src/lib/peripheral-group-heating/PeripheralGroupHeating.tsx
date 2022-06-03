import React, { useState } from 'react';
import { AuthorizationDict } from '../CommonPropTypes';
import { PeripheralGroup } from '@home/data-access';
import { InputSwitch } from 'primereact/inputswitch';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import PeripheralHeater from '../peripheral-heater/PeripheralHeater';
import PeripheralTemperatureSensor from '../peripheral-temperature-sensor/PeripheralTemperatureSensor';
import './PeripheralGroupHeating.scss';

/* eslint-disable-next-line */
export interface PeripheralGroupHeatingProps {
  access: AuthorizationDict
  data: PeripheralGroup
  onEnable: (v:boolean) => void
  onUpdateData: (v:{[k:string]: string|number}) => void
}

export function PeripheralGroupHeating({access, data, onEnable, onUpdateData}: PeripheralGroupHeatingProps) {
  const [valueTLimit, setValueTLimit] = useState(data.Data.TemperatureLimit);
  const temperatureSensorData = data.Peripherals.find(v => v.ID === data.Data.TemperatureSensorID);
  const heaterData = data.Peripherals.find(v => v.ID === data.Data.HeaterID);
  const onChangeTLimit = (tLimit:number) => {
    setValueTLimit(tLimit);
    onUpdateData({ 'Data.TemperatureLimit': tLimit });
  }
  return (
    <div className='peripheral-group-heating'>
      <div className='peripheral-group-heating__temp-control'>
        <label htmlFor={`temperature-input${data.ID}`} className="peripheral-group-heating__temp-label">Temperature Limit:</label>
        <InputText id={`temperature-input${data.ID}`} className="peripheral-group-heating__temp-input" disabled={!access.Setup} value={valueTLimit} onChange={(e) => onChangeTLimit(Number(e.target.value))} />
      </div>
      { access.Setup && <Slider value={valueTLimit} onChange={(e) => onChangeTLimit(Number(e.value))} min={5} max={40} /> }
      <InputSwitch disabled={!access.Activate} checked={data.Data.IsActive} onChange={(e) => onEnable(e.value)} />
      <Divider style={{width: '100%'}}/>
      <div className="grid">
          <div className="col-12 md:col-5 flex align-items-stretch justify-content-center">
              <PeripheralTemperatureSensor
                Name={temperatureSensorData.Name}
                Temperature={temperatureSensorData.Data.Temperature}
              />
          </div>
          <div className="md:col-2">
              <Divider layout="vertical">
                  <i className='pi pi-arrows-h'/>
              </Divider>
          </div>
          <div className="col-12 md:col-5 flex align-items-stretch justify-content-center">
            <PeripheralHeater
              IsActive={!!heaterData.IsActive}
              Name={heaterData.Name}
            />
          </div>
      </div>
    </div>
  );
}

export default PeripheralGroupHeating;
