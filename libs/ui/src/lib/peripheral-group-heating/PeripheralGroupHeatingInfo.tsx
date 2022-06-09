import styles from './PeripheralGroupHeatingInfo.module.scss';
import { AuthorizationDict } from '../CommonPropTypes';
import { useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';

export interface PeripheralGroupHeatingInfoProps {
  access: AuthorizationDict;
  ID: number;
  TemperatureLimit: number;
  IsActive: boolean;
  onEnable: (v:boolean) => void;
  onUpdate: (v:{[k:string]: string|number}) => void;
}

export function PeripheralGroupHeatingInfo(
  {
    access, 
    onEnable, 
    onUpdate, 
    ID, 
    TemperatureLimit, 
    IsActive,
  }: PeripheralGroupHeatingInfoProps
) {
  const [valueTLimit, setValueTLimit] = useState(TemperatureLimit);
  const onChangeTLimit = (tLimit:number) => {
    setValueTLimit(tLimit);
    onUpdate({ 'TemperatureLimit': tLimit });
  }
  return (
    <div className={styles['container']}>
      <div className={styles['control']}>
        <label htmlFor={`temperature-input${ID}`} className={styles['label']}>Temperature Limit:</label>
        <InputText id={`temperature-input${ID}`} className={styles['input']} disabled={!access.Setup} value={valueTLimit} onChange={(e) => onChangeTLimit(Number(e.target.value))} />
      </div>
      { access.Setup && <Slider value={valueTLimit} onChange={(e) => onChangeTLimit(Number(e.value))} min={5} max={40} /> }
      <InputSwitch disabled={!access.Activate} checked={IsActive} onChange={(e) => onEnable(e.value)} />
    </div>
  );
}

export default PeripheralGroupHeatingInfo;
