import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from 'typeorm';
import {Peripheral} from '../peripherals/peripherals.entity'
import {Object3dReference} from "../object-3d-references/object-3d-references.entity";
import {TypeormLoader} from "type-graphql-dataloader";

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

  @Column()
  Object3DReferenceID: number;

  @ManyToOne(() => Object3dReference, ref => ref.PeripheralGroups)
  @JoinColumn({ name: "Object3DReferenceID" })
  @TypeormLoader()
  Object3DReference: Object3dReference;
}
