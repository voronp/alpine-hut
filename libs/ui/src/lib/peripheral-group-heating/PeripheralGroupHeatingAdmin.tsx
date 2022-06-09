import { useState } from 'react';
import styles from './PeripheralGroupHeatingAdmin.module.scss';
import { Dropdown } from 'primereact/dropdown';
import { useCallback, useMemo } from 'react';
import { uniqId } from '@home/util';

interface AvailablePeripheral {
  ID: number
  Name: string
}

export interface PeripheralGroupHeatingAdminProps {
  TemperatureSensorID: number;
  HeaterID: number;
  AvailablePeripherals: AvailablePeripheral[];
  IsEditDisabled: boolean;
  onChange: (e: {[k in 'TemperatureSensorID'|'HeaterID']?: number}) => void;
}

export function PeripheralGroupHeatingAdmin(
  {
    TemperatureSensorID,
    HeaterID,
    AvailablePeripherals,
    IsEditDisabled,
    onChange,
  }: PeripheralGroupHeatingAdminProps
) {
  const options = useMemo(() => AvailablePeripherals.map(v => ({
    label: v.Name,
    value: v.ID,
  })), [AvailablePeripherals]);
  const [valueTemperatureSensorID, setValueTemperatureSensorID] = useState(TemperatureSensorID);
  const [valueHeaterID, setValueHeaterID] = useState(HeaterID);
  const onSensorChange = useCallback((e: {value: number}) => {
    onChange({'TemperatureSensorID': e.value});
    setValueTemperatureSensorID(e.value);
  }, [onChange, setValueTemperatureSensorID]);
  const onHeaterChange = useCallback((e: {value: number}) => {
    onChange({'HeaterID': e.value});
    setValueHeaterID(e.value);
  }, [onChange, setValueHeaterID]);
  const dropId1 = uniqId('dropdn');
  const dropId2 = uniqId('dropdn');
  return (
    <div className='grid'>
      <div className='col-12 md:col-6'>
        <div className={styles['cell']}>
          <span className="p-float-label" style={{width: '100%'}}>
            <Dropdown id={dropId1} className={styles['dropdown']} disabled={IsEditDisabled} value={valueTemperatureSensorID} options={options} onChange={onSensorChange} placeholder="Select a Temperature sensor" />
            <label htmlFor={dropId1}>Sensor</label>
          </span>
        </div>
      </div>
      <div className='col-12 md:col-6'>
        <div className={styles['cell']}>
          <span className="p-float-label" style={{width: '100%'}}>
            <Dropdown id={dropId2} className={styles['dropdown']} disabled={IsEditDisabled} value={valueHeaterID} options={options} onChange={onHeaterChange} placeholder="Select a Heater" />
            <label htmlFor={dropId2}>Heater</label>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PeripheralGroupHeatingAdmin;
