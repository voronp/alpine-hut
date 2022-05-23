import { Module } from '@nestjs/common';
import { PeripheralGroupsController } from './peripheral-groups.controller';
import { PeripheralGroupsService } from './peripheral-groups.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PeripheralsModule} from "../peripherals/peripherals.module";
import {PeripheralGroup} from "./peripheral-group.entity";
import {HardwareModule} from "../hardware/hardware.module";
import { ProfilesModule } from '../profiles/profiles.module';
import { ProfileAuthorizationsModule } from '../profile-authorizations/profile-authorizations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PeripheralGroup]),
    PeripheralsModule,
    HardwareModule,
    ProfilesModule,
  ],
  providers: [PeripheralGroupsService, ],
  controllers: [PeripheralGroupsController],
  exports: [PeripheralGroupsService, TypeOrmModule],
})
export class PeripheralGroupsModule {}
