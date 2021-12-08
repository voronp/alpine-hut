import { Module } from '@nestjs/common';
import { PeripheralsController } from './peripherals.controller';
import { PeripheralsResolver } from './peripherals.resolver';
import { PeripheralsService } from './peripherals.service';
import {Peripheral} from "./peripherals.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Object3dReferencesModule} from "../object-3d-references/object-3d-references.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Peripheral]),
    Object3dReferencesModule,
  ],
  controllers: [PeripheralsController],
  providers: [PeripheralsResolver, PeripheralsService],
  exports: [PeripheralsService, TypeOrmModule],
})
export class PeripheralsModule {}
