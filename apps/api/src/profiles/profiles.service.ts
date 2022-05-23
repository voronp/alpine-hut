import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FindOneOptions, Repository} from "typeorm";
import {Profile} from "./profile.entity";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  findOne(id: number, options?: FindOneOptions<Profile>): Promise<Profile> {
    return this.profileRepository.findOne(id, options);
  }

  async getAccessForPeripheralGroup(ProfileID:number, PeripheralGroupID:number):Promise<{Read: boolean, Setup:boolean, Activate: boolean}> {
    const profile:Profile = await this.findOne(ProfileID, {relations: ['Authorizations']});
    return profile.Authorizations
      .filter(v => v.PeripheralGroupID === PeripheralGroupID)
      .reduce((acc, v) => ({...acc, [v.Access]: true}), {Read: profile.IsAdmin, Setup:profile.IsAdmin, Activate:profile.IsAdmin})
  }
}
