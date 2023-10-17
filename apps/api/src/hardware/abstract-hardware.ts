/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import rpio from 'rpio';

@Injectable()
export class AbstractHardware {
  static HIGH = rpio.HIGH;
  static LOW = rpio.LOW;
  static OUTPUT = rpio.OUTPUT;
  static INPUT = rpio.INPUT;

  openPIO(pio:number, mode:string, option:string):void {}
  setHighPIO(pio:number):void {}
  setLowPIO(pio:number):void {}
  async getTemperature(id:string):Promise<number> {
    return 999;
  }
  async getWaterLevel():Promise<number> {
    return 0.5;
  }
}
