import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetResolver } from './set.resolver';
import {UsersResolver} from '../users/users.resolver'

import {environment} from '../environments/environment'
import {AuthModule} from "../auth/auth.module";
import {join} from "path";

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

    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SetResolver, UsersResolver],
})
export class AppModule {}
