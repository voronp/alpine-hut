import { Injectable } from '@nestjs/common';
import rpio from 'rpio';

@Injectable()
export class AbstractHardware {
  static HIGH = rpio.HIGH;
  static LOW = rpio.LOW;
  static OUTPUT = rpio.OUTPUT;
  static INPUT = rpio.INPUT;

  openPIO(pio:number, mode:string, option:string) {

  }
  setHighPIO(pio:number) {

  }
  setLowPIO(pio:number) {

  }
  async getTemperature(id:string):Promise<number> {
    return 999;
  }
}
