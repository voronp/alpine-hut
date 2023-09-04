import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {Object3dReference} from "../object-3d-references/object-3d-references.entity";

export enum PeripheralInterface {
  WIRE = "1wire",
  I2C = "i2c",
  SPI = "spi",
  DIRECT = "direct",
}

export enum PeripheralType {
  SENSOR = "Sensor",
  HEATER = "Heater"
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

  @Column({type: "int2"})
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

  @Column({type: 'timestamp'})
  LastUpdate: Date;

  @Column({type: 'json'})
  Position: PeripheralPosition;

  @Column()
  Object3DReferenceID: number;

  @ManyToOne(() => Object3dReference, ref => ref.Peripherals)
  @JoinColumn({ name: "Object3DReferenceID" })
  Object3DReference: Object3dReference;
}
