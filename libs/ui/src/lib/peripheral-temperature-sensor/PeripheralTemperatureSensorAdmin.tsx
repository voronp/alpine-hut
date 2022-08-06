import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useCallback } from 'react';
import { uniqId } from '@home/util';

export interface PeripheralTemperatureSensorAdminProps {
  DeviceID: string;
  IsEditDisabled: boolean;
  onChange: (e: Pick<PeripheralTemperatureSensorAdminProps, 'DeviceID'>) => void;
}

export function PeripheralTemperatureSensorAdmin(
  {
    DeviceID,
    IsEditDisabled,
    onChange,
  }: PeripheralTemperatureSensorAdminProps
) {
  const [valueDeviceID, setValueDeviceID] = useState(DeviceID);
  const onDeviceIDChange = useCallback((e: {target: {value: string}}) => {
    onChange({'DeviceID': e.target.value});
    setValueDeviceID(e.target.value);
  }, [onChange, setValueDeviceID]);
  const inpId2 = uniqId('inp');
  return (
      <div className='col-12 md:col-6'>
        <div className='theme-cell'>
          <span className="p-float-label" style={{width: '100%'}}>
            <InputText id={inpId2} className='theme-wide' disabled={IsEditDisabled} value={valueDeviceID} onChange={onDeviceIDChange} placeholder="Select the Device ID" />
            <label htmlFor={inpId2}>Pin</label>
          </span>
        </div>
      </div>
  );
}

export default PeripheralTemperatureSensorAdmin;
