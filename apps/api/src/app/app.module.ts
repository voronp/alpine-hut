import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import GraphQLJSON from 'graphql-type-json';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersResolver } from '../users/users.resolver'

import {environment} from '../environments/environment'
import {AuthModule} from "../auth/auth.module";
import {CommonModule} from "../common/common.module";
import {PeripheralGroupsResolver} from "../peripheral-groups/peripheral-groups.resolver";
import {PeripheralGroupsModule} from "../peripheral-groups/peripheral-groups.module";
import {Object3dReferencesModule} from "../object-3d-references/object-3d-references.module";
import {PeripheralsModule} from "../peripherals/peripherals.module";
import {BaseModule} from "../base/base.module";
import {HistoryModule} from "../history/history.module";
import {Context} from "graphql-ws";

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
      logging: true,
      //synchronize: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolvers: {
        JSON: GraphQLJSON,
      },
      subscriptions: {
        'graphql-ws': {
          onConnect: (context: Context<{user:Record<string, unknown>}>) => {
            const { extra } = context;
            console.log('context', context);
            // user validation will remain the same as in the example above
            // when using with graphql-ws, additional context value should be stored in the extra field
            extra.user = { user: {} };
          },
        },
      },
    }),
    AuthModule,
    CommonModule,
    PeripheralGroupsModule,
    PeripheralsModule,
    Object3dReferencesModule,
    BaseModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersResolver,
    PeripheralGroupsResolver,
  ],
})
export class AppModule {}
