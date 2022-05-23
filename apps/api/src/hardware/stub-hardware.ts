import { Injectable } from '@nestjs/common';
import { AbstractHardware } from "./abstract-hardware";

@Injectable()
export class StubHardware extends AbstractHardware {
  openPIO(pio:number, mode:string, option:string) {
    // console.log('setHighPIO', pio, mode, option);
  }
  setHighPIO(pio:number) {
    // console.log('setHighPIO', pio);
  }
  setLowPIO(pio:number) {
    // console.log('setLowPIO', pio);
  }
  async getTemperature(id:string):Promise<number> {
    return Math.random()*50;
  }
}
