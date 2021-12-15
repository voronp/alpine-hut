import {Inject, Injectable} from '@nestjs/common';
import {ServerState} from "../common/state";
import {InjectRepository} from "@nestjs/typeorm";
import {PeripheralGroup} from "../peripheral-groups/peripheral-group.entity";
import {Repository} from "typeorm";
import {History, HistoryEntityType} from "./history.entity";

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async add(EntityType: string, EntityID: number, Data: Record<string, unknown>):Promise<History> {
    const item:History = this.historyRepository.create({
      EntityType,
      EntityID,
      Data,
    });
    return this.historyRepository.save(item);
  }

  async addForPeripheral(ID: number, Data: Record<string, unknown>):Promise<History> {
    return this.add(HistoryEntityType.Peripheral, ID, Data);
  }

  async addForPeripheralGroup(ID: number, Data: Record<string, unknown>):Promise<History> {
    return this.add(HistoryEntityType.PeripheralGroup, ID, Data);
  }
}
