import { Injectable } from '@nestjs/common';
import { AbstractHardware } from "./abstract-hardware";

@Injectable()
export class StubHardware extends AbstractHardware {
  temperatureSensorErrorProbablity = 0.95;
  waterSensorErrorProbablity = 0.05;

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
    if (Math.random() <= this.temperatureSensorErrorProbablity) throw new Error('sensor measurement error');
    return Math.random()*50;
  }

  async getWaterLevel():Promise<number> {
    if (Math.random() <= this.waterSensorErrorProbablity) throw new Error('water sensor measurement error');
    return Math.random();
  }
}
