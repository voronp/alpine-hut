import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useCallback } from 'react';
import { uniqId } from '@home/util';

export interface PeripheralInfoProps {
  Name: string;
  Description: string;
  IsEditDisabled: boolean;
  onChange: (e: Pick<PeripheralInfoProps, 'Name'> | Pick<PeripheralInfoProps, 'Description'>) => void;
}

export function PeripheralInfo(
  {
    Name,
    Description,
    IsEditDisabled,
    onChange,
  }: PeripheralInfoProps
) {
  const [valueName, setValueName] = useState(Name);
  const [valueDescription, setValueDescription] = useState(Description);
  const onNameChange = useCallback((e: {target: {value: string}}) => {
    onChange({'Name': e.target.value});
    setValueName(e.target.value);
  }, [onChange, setValueName]);
  const onDescriptionChange = useCallback((e: {target: {value: string}}) => {
    onChange({'Description': e.target.value});
    setValueDescription(e.target.value);
  }, [onChange, setValueDescription]);
  const inpId1 = uniqId('inp');
  const inpId2 = uniqId('inp');
  return (
    <div className='grid'>
      <div className='col-12 md:col-6'>
        <div className='theme-cell'>
          <span className="p-float-label" style={{width: '100%'}}>
            <InputText id={inpId1} className='theme-wide' disabled={IsEditDisabled} value={valueName} onChange={onNameChange} placeholder="Enter Name" />
            <label htmlFor={inpId1}>Name</label>
          </span>
        </div>
      </div>
      <div className='col-12 md:col-6'>
        <div className='theme-cell'>
          <span className="p-float-label" style={{width: '100%'}}>
            <InputTextarea id={inpId2} className='theme-wide' disabled={IsEditDisabled} value={valueDescription} onChange={onDescriptionChange} placeholder="Enter Description" />
            <label htmlFor={inpId2}>Description</label>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PeripheralInfo;

