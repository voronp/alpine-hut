import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { useCallback } from 'react';
import { uniqId } from '@home/util';

type ActiveType = 'HIGH' | 'LOW';
export interface PeripheralHeaterAdminProps {
  Active: ActiveType;
  Pin: number;
  IsEditDisabled: boolean;
  onChange: (e: Pick<PeripheralHeaterAdminProps, 'Pin'> | Pick<PeripheralHeaterAdminProps, 'Active'>) => void;
}
const options = [
  {label: 'HIGH', value: 'HIGH'},
  {label: 'LOW', value: 'LOW'},
];
export function PeripheralHeaterAdmin({
  Active,
  Pin,
  IsEditDisabled,
  onChange,
}: PeripheralHeaterAdminProps) {
  const [valueActive, setValueActive] = useState(Active);
  const [valuePin, setValuePin] = useState(Pin);
  const onActiveChange = useCallback((e: {value: ActiveType}) => {
    onChange({'Active': e.value});
    setValueActive(e.value);
  }, [onChange, setValueActive]);
  const onPinChange = useCallback((e: {value: number}) => {
    onChange({'Pin': e.value});
    setValuePin(e.value);
  }, [onChange, setValuePin]);
  const dropId1 = uniqId('dropdn');
  const inpId2 = uniqId('inp');
  return (
    <>
      <div className='col-12 md:col-6'>
        <div className='theme-cell'>
          <span className="p-float-label" style={{width: '100%'}}>
            <Dropdown id={dropId1} className='theme-wide' disabled={IsEditDisabled} value={valueActive} options={options} onChange={onActiveChange} placeholder="Select the Active level" />
            <label htmlFor={dropId1}>Active Level</label>
          </span>
        </div>
      </div>
      <div className='col-12 md:col-6'>
        <div className='theme-cell'>
          <span className="p-float-label" style={{width: '100%'}}>
            <InputNumber id={inpId2} className='theme-wide' disabled={IsEditDisabled} value={valuePin} onChange={onPinChange} placeholder="Select the Pin" />
            <label htmlFor={inpId2}>Pin</label>
          </span>
        </div>
      </div>
    </>
  );
}

export default PeripheralHeaterAdmin;
