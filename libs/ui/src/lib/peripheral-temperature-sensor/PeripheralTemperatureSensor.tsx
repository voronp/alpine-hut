import React from 'react';
import {Knob} from 'primereact/knob';
import './PeripheralTemperatureSensor.scss';

export interface PeripheralTemperatureSensorProps {
  Temperature: number
  Name: string
}
const min = 0;
const max = 50;

const getValueColor = (v:number) => {
  const range = [
    [20, 117, 252],
    [46, 234, 255],
    [30, 140, 8],
    [240, 147, 17],
    [247, 59, 59],
  ];
  if (v >= max) return `rgb(${range[range.length-1][0]}, ${range[range.length-1][1]}, ${range[range.length-1][2]})`;
  if (v <= min) return `rgb(${range[0][0]}, ${range[0][1]}, ${range[0][2]})`;
  const step = (max - min) / (range.length - 1);
  for (let i=1;i<range.length;i++) {
    if (v < min + step * i) {
      const mult = (v - (min + step * (i - 1))) / step;
      return `rgb(${range[i-1][0] + (range[i][0] - range[i-1][0]) * mult}, ${range[i-1][1] + (range[i][1] - range[i-1][1]) * mult}, ${range[i-1][2] + (range[i][2] - range[i-1][2]) * mult})`;
    };
  }
}

export function PeripheralTemperatureSensor(
  props: PeripheralTemperatureSensorProps
) {
  return (
    <div className='peripheral-temperature-sensor'>
      <h3 className='peripheral-temperature-sensor__header'>{props.Name}</h3>
      <div className='peripheral-temperature-sensor__container'>
        <Knob value={Number(Number(props.Temperature).toFixed(1))} min={min} max={max} valueColor={getValueColor(props.Temperature)}/>
      </div>
    </div>
  );
}

export default PeripheralTemperatureSensor;
