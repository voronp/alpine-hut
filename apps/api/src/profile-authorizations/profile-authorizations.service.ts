import { Injectable } from '@nestjs/common';
import {FindOneOptions, Repository} from "typeorm";
import {ProfileAuthorization} from "./profile-authorization.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProfileAuthorizationsService {
  constructor(
    @InjectRepository(ProfileAuthorization)
    private profileAuthorizationRepository: Repository<ProfileAuthorization>,
  ) {}

  find(options?: FindOneOptions<ProfileAuthorization>): Promise<ProfileAuthorization[]> {
    return this.profileAuthorizationRepository.find(options);
  }
}
