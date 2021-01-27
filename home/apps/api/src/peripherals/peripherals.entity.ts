import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum PeripheralInterface {
  WIRE = "1wire",
  I2C = "i2c",
  SPI = "spi",
  DIRECT = "direct",
}

export enum PeripheralType {
  SENSOR = "sensor",
  HEATER = "heater"
}

export type PeripheralPosition = {
  x: number;
  y: number;
  z: number;
}

@Entity('peripherals')
export class Peripheral {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Name: string;

  @Column("simple-json")
  Data: Record<string, unknown>;

  @Column({type: "tinyint"})
  IsActive: boolean;

  @Column({
    type: "enum",
    enum: PeripheralType,
    default: PeripheralType.SENSOR,
  })
  Type: string;

  @Column({
    type: "enum",
    enum: PeripheralInterface,
    default: PeripheralInterface.DIRECT,
  })
  Interface: string;

  @Column()
  Description: string;

  @Column({type: 'datetime'})
  LastUpdate: Date;

  @Column({type: 'json'})
  Position: PeripheralPosition;
}
