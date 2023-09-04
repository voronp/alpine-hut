import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

export enum HistoryEntityType {
  General = "General",
  Peripheral = "Peripheral",
  PeripheralGroup = "PeripheralGroup",
}

export enum HistoryActions {
  Reactivate = "Reactivate",
  Activate = "Activate",
  Deactivate = "Deactivate",
  Measure = "Measure",
}

export enum HistoryReasons {
  Malfunction = "Malfunction",
}

@Entity('history')
export class History {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'enum',
    enum: HistoryEntityType,
    default: HistoryEntityType.General,
  })
  EntityType: string;

  @Column()
  EntityID: number;

  @Column("simple-json")
  Data: Record<string, unknown>;

  @Column({type: 'timestamp'})
  Created: Date;
}

