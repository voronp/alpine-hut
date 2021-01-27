import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PeripheralGroup} from "./peripheral-group.entity";
import {Repository} from "typeorm";

@Injectable()
export class PeripheralGroupsService {
  constructor(
    @InjectRepository(PeripheralGroup)
    private peripheralGroupRepository: Repository<PeripheralGroup>,
  ) {}

  findAll(): Promise<PeripheralGroup[]> {
    return this.peripheralGroupRepository.find();
  }

  findOne(id: number): Promise<PeripheralGroup> {
    return this.peripheralGroupRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.peripheralGroupRepository.delete(id);
  }
}
