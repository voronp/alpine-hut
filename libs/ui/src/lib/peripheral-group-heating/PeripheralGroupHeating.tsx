import React, { useState } from 'react';
import { AuthorizationDict } from '../CommonPropTypes';
import { PeripheralGroup } from '@home/data-access';
import { InputSwitch } from 'primereact/inputswitch';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
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
  const onChangeTLimit = (tLimit:number) => {
    setValueTLimit(tLimit);
    onUpdateData({ 'Data.TemperatureLimit': tLimit });
  }
  return (
    <div>
      <label htmlFor={`temperature-input${data.ID}`} className="block">Temperature Limit:</label>
      <InputText id={`temperature-input${data.ID}`} disabled={!access.Setup} value={valueTLimit} onChange={(e) => onChangeTLimit(Number(e.target.value))} />
      { access.Setup && <Slider value={valueTLimit} onChange={(e) => onChangeTLimit(Number(e.value))} /> }
      <Divider style={{width: '100%'}}/>
      <InputSwitch disabled={!access.Activate} checked={data.Data.IsActive} onChange={(e) => onEnable(e.value)} />
    </div>
  );
}

export default PeripheralGroupHeating;
