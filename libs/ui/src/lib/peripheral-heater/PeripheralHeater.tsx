import React from 'react';

import './PeripheralHeater.scss';

export interface PeripheralHeaterProps {
  IsActive:boolean
  Name:string
}

export function PeripheralHeater(props: PeripheralHeaterProps) {
  return (
    <div className='peripheral-heater'>
      <h3 className='peripheral-heater__header'>{props.Name}</h3>
      <div className='peripheral-heater__container'>
        {
          props.IsActive 
            ? <div className='peripheral-heater__bulb peripheral-heater__bulb--active'>
              <div className='peripheral-heater__waver' style={{'animationDelay': '1s'}}></div>
              <div className='peripheral-heater__waver' style={{'animationDelay': '2s'}}></div>
              <div className='peripheral-heater__waver' style={{'animationDelay': '3s'}}></div>
              <i className='pi pi-bolt' />
            </div>
            : <div className='peripheral-heater__bulb peripheral-heater__bulb--inactive'>
              <i className='pi pi-power-off' />
            </div>
        }
      </div>
    </div>
  );
}

export default PeripheralHeater;
