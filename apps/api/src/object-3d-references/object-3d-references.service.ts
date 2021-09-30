import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Object3dReference } from "./object-3d-references.entity";
import { Repository } from "typeorm";
import {PeripheralGroup} from "../peripheral-groups/peripheral-group.entity";

@Injectable()
export class Object3dReferencesService {
  constructor(
    @InjectRepository(Object3dReference)
    private object3dReferenceRepository: Repository<Object3dReference>,
  ) {}

  findAll(): Promise<Object3dReference[]> {
    return this.object3dReferenceRepository.find();
  }

  findOne(id: number): Promise<Object3dReference> {
    return this.object3dReferenceRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.object3dReferenceRepository.delete(id);
  }
}
