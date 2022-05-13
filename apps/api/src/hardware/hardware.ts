import { Injectable } from '@nestjs/common';
import { AbstractHardware } from "./abstract-hardware";
import { readDevice } from './ds-1820';
//import rpio from 'rpio';
const rpio = {open: (a,b,c) => true, write: (a,b) => true};

@Injectable()
export class Hardware extends AbstractHardware {
  openPIO(pio:number, mode:string, option?:string) {
    rpio.open(pio, mode, option);
  }
  setHighPIO(pio:number) {
    rpio.write(pio, AbstractHardware.HIGH);
  }
  setLowPIO(pio:number) {
    rpio.write(pio, AbstractHardware.LOW);
  }
  async getTemperature(id:string):Promise<number> {
    const { value } = await readDevice(id);
    return value;
  }
}
