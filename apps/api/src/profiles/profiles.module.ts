import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { Profile } from './profile.entity';
import { ProfilesResolver } from './profiles.resolver';
import { ProfileAuthorizationsModule } from '../profile-authorizations/profile-authorizations.module';

// @ts-ignore
@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    ProfileAuthorizationsModule,
  ],
  providers: [ProfilesService, ProfilesResolver],
  controllers: [],
  exports: [ProfilesService, TypeOrmModule],
})
export class ProfilesModule {}
