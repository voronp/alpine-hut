import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Peripheral} from "../peripherals/peripherals.entity";
import {PeripheralGroup} from "../peripheral-groups/peripheral-group.entity";

export enum Object3dReferenceType {
  CUSTOM = "custom",
  BOX = "box",
  POINT = "point",
}

export enum model3dPartsType {
  FLOOR1 = "floor1Part",
  FLOOR2 = "floor2Part",
  FLOOR3 = "floor3Part",
  VERANDA = "verandaPart",
  FIREPLACE = "fireplacePart",
}

@Entity('object_3d_references')
export class Object3dReference {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: "enum",
    enum: Object3dReferenceType,
    default: Object3dReferenceType.CUSTOM,
  })
  Type: string;

  @Column({
    type: "enum",
    enum: model3dPartsType,
    default: model3dPartsType.FLOOR1,
  })
  ActiveIn: string;

  @Column("simple-json")
  Config: Record<string, unknown>;

  @OneToMany(() => Peripheral, peripheral => peripheral.Object3DReference)
  Peripherals: Peripheral[];

  @OneToMany(() => PeripheralGroup, peripheralGroup => peripheralGroup.Object3DReference)
  PeripheralGroups: PeripheralGroup[];
}
