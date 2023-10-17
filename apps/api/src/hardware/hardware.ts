import { Injectable } from '@nestjs/common';
import { AbstractHardware } from "./abstract-hardware";
import { readDevice } from './ds-1820';
import rpio from 'rpio';
import ModbusRTU from 'modbus-serial';

@Injectable()
export class Hardware extends AbstractHardware {
  modbusClient;
  constructor() {
    super();
    this.modbusClient = new ModbusRTU();
    this.modbusClient.connectRTUBuffered("/dev/ttyAMA0", { baudRate: 9600 });
    this.modbusClient.setID(1);
  }
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
  async getWaterLevel():Promise<number> {
    return new Promise((res, rej) => {
      this.modbusClient.readHoldingRegisters(0, 10, function(err, data) {
        if (err) return rej(err);
        res(data.data);
      });
    });
  }
}
