import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PeripheralGroup} from "../peripheral-groups/peripheral-group.entity";
import {Repository} from "typeorm";
import {Peripheral} from "./peripherals.entity";

@Injectable()
export class PeripheralsService {
  constructor(
    @InjectRepository(Peripheral)
    private peripheralRepository: Repository<Peripheral>,
  ) {}

}
