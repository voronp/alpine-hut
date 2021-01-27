import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import {Peripheral} from '../peripherals/peripherals.entity'

export enum PeripheralGroupType {
  HEATING = "heating_system",

}

@Entity('peripheral_groups')
export class PeripheralGroup {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Name: string;

  @Column("simple-json")
  Data: Record<string, unknown>;

  @Column({
    type: 'enum',
    enum: PeripheralGroupType,
    default: PeripheralGroupType.HEATING,
  })
  Type: string;

  @Column()
  Description: string;

  @ManyToMany(type => Peripheral, {
    eager: true
  })
  @JoinTable({
    name: "peripheral_group_peripherals", // table name for the junction table of this relation
    joinColumn: {
      name: "PeripheralGroupID",
      referencedColumnName: "ID"
    },
    inverseJoinColumn: {
      name: "PeripheralID",
      referencedColumnName: "ID"
    }
  })
  Peripherals: Peripheral[];

}
