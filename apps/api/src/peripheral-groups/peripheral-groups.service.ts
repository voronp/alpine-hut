import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PeripheralGroup} from "./peripheral-group.entity";
import {Repository, FindConditions} from "typeorm";

@Injectable()
export class PeripheralGroupsService {
  constructor(
    @InjectRepository(PeripheralGroup)
    private peripheralGroupRepository: Repository<PeripheralGroup>,
  ) {}

  findAll(): Promise<PeripheralGroup[]> {
    return this.peripheralGroupRepository.find();
  }

  async findBy3DPart(view3DPart: String): Promise<PeripheralGroup[]> {
    /*
    return this.peripheralGroupRepository.find({
      where: {
        Object3DReference: {
          ActiveIn: view3DPart,
        },
      },
      relations: ["Object3DReference"],
    });
    */
    /*
    return this.peripheralGroupRepository
      .createQueryBuilder()
      .leftJoinAndSelect("PeripheralGroup.Object3DReference", "Object3DReference")
      .where('Object3DReference.ActiveIn=:view3DPart', {view3DPart})
      .getMany()
      */
    const ids = await this.peripheralGroupRepository
      .createQueryBuilder()
      .select('PeripheralGroup.ID')
      .leftJoinAndSelect("PeripheralGroup.Object3DReference", "Object3DReference")
      .where('Object3DReference.ActiveIn=:view3DPart', {view3DPart})
      .getMany();
    return this.peripheralGroupRepository.findByIds(ids.map(v => v.ID));
  }

  findOne(id: number): Promise<PeripheralGroup> {
    return this.peripheralGroupRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.peripheralGroupRepository.delete(id);
  }
}
