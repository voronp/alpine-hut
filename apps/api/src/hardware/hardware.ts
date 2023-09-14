import { Injectable } from '@nestjs/common';
import { AbstractHardware } from "./abstract-hardware";
import { readDevice } from './ds-1820';
import rpio from 'rpio';

@Injectable()
export class Hardware extends AbstractHardware {
  openPIO(pio:number, mode:string, option?:string) {
    console.trace('openPIO');
    rpio.open(pio, mode, option);
  }
  setHighPIO(pio:number) {
    console.trace('setHighPIO');
    rpio.write(pio, AbstractHardware.HIGH);
  }
  setLowPIO(pio:number) {
    console.trace('setLowPIO');
    rpio.write(pio, AbstractHardware.LOW);
  }
  async getTemperature(id:string):Promise<number> {
    const { value } = await readDevice(id);
    return value;
  }
}
