import { Module } from '@nestjs/common';
import { Object3dReferencesController } from './object-3d-references.controller';
import { Object3dReferencesService } from './object-3d-references.service';
import { Object3dReferencesResolver } from './object-3d-references.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Object3dReference} from "./object-3d-references.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Object3dReference])],
  controllers: [Object3dReferencesController],
  providers: [Object3dReferencesService, Object3dReferencesResolver],
  exports: [Object3dReferencesService, TypeOrmModule],
})
export class Object3dReferencesModule {}
