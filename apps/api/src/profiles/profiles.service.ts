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
}
