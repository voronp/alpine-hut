import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useCallback } from 'react';
import { uniqId } from '@home/util';
import styles from './PeripheralAdmin.module.scss';

const TypeVals = ['Sensor', 'Heater'] as const
const InterfaceVals = ['1wire', 'direct'] as const;
type TypeVal = typeof TypeVals[number];
type InterfaceVal = typeof InterfaceVals[number];
export interface PeripheralAdminProps {
  Type: TypeVal;
  Interface: InterfaceVal;
  IsEditDisabled: boolean;
  onChange: (e: Pick<PeripheralAdminProps, 'Type'> | Pick<PeripheralAdminProps, 'Interface'>) => void;
}
const interfaceOpts = TypeVals.map(v => ({label: v, value: v}));
const typeOpts = InterfaceVals.map(v => ({label: v, value: v}));

export function PeripheralAdmin({
  Type,
  Interface,
  IsEditDisabled,
  onChange,
}: PeripheralAdminProps) {
  const [valueType, setValueType] = useState(Type);
  const [valueInterface, setValueInterface] = useState(Interface);
  const onTypeChange = useCallback((e: {value: TypeVal}) => {
    onChange({'Type': e.value});
    setValueType(e.value);
  }, [onChange, setValueType]);
  const onInterfaceChange = useCallback((e: {value: InterfaceVal}) => {
    onChange({'Interface': e.value});
    setValueInterface(e.value);
  }, [onChange, setValueInterface]);
  const dropId1 = uniqId('dropdn');
  const dropId2 = uniqId('dropdn');
  return (
    <>
      <div className='col-12 md:col-6'>
        <div className={styles['cell']}>
          <span className="p-float-label" style={{width: '100%'}}>
            <Dropdown id={dropId1} className={styles['wide']} disabled={IsEditDisabled} value={valueType} options={typeOpts} onChange={onTypeChange} placeholder="Select the Type" />
            <label htmlFor={dropId1}>Type</label>
          </span>
        </div>
      </div>
      <div className='col-12 md:col-6'>
        <div className={styles['cell']}>
          <span className="p-float-label" style={{width: '100%'}}>
          <Dropdown id={dropId2} className={styles['wide']} disabled={IsEditDisabled} value={valueInterface} options={interfaceOpts} onChange={onInterfaceChange} placeholder="Select the Interface" />
            <label htmlFor={dropId2}>Interface</label>
          </span>
        </div>
      </div>
    </>
  );
}

export default PeripheralAdmin;
