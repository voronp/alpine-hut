import { Module } from '@nestjs/common';
import { ProfileAuthorizationsService } from './profile-authorizations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileAuthorization } from './profile-authorization.entity';
import { ProfileAuthorizationsResolver } from './profile-authorizations.resolver';

// @ts-ignore
@Module({
  providers: [ProfileAuthorizationsService, ProfileAuthorizationsResolver],
  imports: [TypeOrmModule.forFeature([ProfileAuthorization])],
  controllers: [],
  exports: [ProfileAuthorizationsService, TypeOrmModule],
})
export class ProfileAuthorizationsModule {}

