import { Module } from '@nestjs/common';
import { PeripheralsController } from './peripherals.controller';
import { PeripheralsResolver } from './peripherals.resolver';
import { PeripheralsService } from './peripherals.service';
import {Peripheral} from "./peripherals.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Peripheral])],
  controllers: [PeripheralsController],
  providers: [PeripheralsResolver, PeripheralsService],
  exports: [PeripheralsService, TypeOrmModule],
})
export class PeripheralsModule {}
