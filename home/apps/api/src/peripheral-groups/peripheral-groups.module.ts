import { Module } from '@nestjs/common';
import { PeripheralGroupsController } from './peripheral-groups.controller';
import { PeripheralGroupsResolver } from './peripheral-groups.resolver';
import { PeripheralGroupsService } from './peripheral-groups.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PeripheralsModule} from "../peripherals/peripherals.module";
import {PeripheralGroup} from "./peripheral-group.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([PeripheralGroup]),
    PeripheralsModule,

  ],
  providers: [PeripheralGroupsService, ],
  controllers: [PeripheralGroupsController],
  exports: [PeripheralGroupsService, TypeOrmModule],
})
export class PeripheralGroupsModule {}
