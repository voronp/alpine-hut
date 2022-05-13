import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';

import { Profile } from '../profiles/profile.entity'
import {PeripheralGroup} from "../peripheral-groups/peripheral-group.entity";
import {TypeormLoader} from "type-graphql-dataloader";

export enum ProfileAuthorizationAccess {
  READ = "Read",
  Setup = "Setup",
  Activate = "Activate",
}

@Entity('profile_authorizations')
export class ProfileAuthorization {

  @PrimaryGeneratedColumn()
  ID: number;

  @ManyToOne(() => PeripheralGroup)
  @TypeormLoader()
  @JoinColumn({ name: "PeripheralGroupID" })
  PeripheralGroup: PeripheralGroup;

  @ManyToOne(() => Profile)
  @TypeormLoader()
  @JoinColumn({ name: "ProfileID" })
  Profile: Profile;

  @Column({
    type: "enum",
    enum: ProfileAuthorizationAccess,
    default: ProfileAuthorizationAccess.READ,
  })
  Access: string;

  @Column()
  PeripheralGroupID: number
}
