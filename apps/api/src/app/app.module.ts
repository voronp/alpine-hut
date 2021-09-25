import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import GraphQLJSON from 'graphql-type-json';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersResolver} from '../users/users.resolver'

import {environment} from '../environments/environment'
import {AuthModule} from "../auth/auth.module";
import {join} from "path";
import {CommonModule} from "../common/common.module";
import {PeripheralGroupsResolver} from "../peripheral-groups/peripheral-groups.resolver";
import {PeripheralGroupsModule} from "../peripheral-groups/peripheral-groups.module";
import {Object3dReferencesModule} from "../object-3d-references/object-3d-references.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environment.database.host,
      port: environment.database.port,
      username: environment.database.user,
      password: environment.database.password,
      database: environment.database.database,
      autoLoadEntities: true,
      entities: [

      ],
      //synchronize: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      resolvers: {
        JSON: GraphQLJSON,
      },
    }),
    AuthModule,
    CommonModule,
    PeripheralGroupsModule,
    Object3dReferencesModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersResolver, PeripheralGroupsResolver],
})
export class AppModule {}
