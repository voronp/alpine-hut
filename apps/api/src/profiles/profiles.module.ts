import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { Profile } from './profile.entity';
import { ProfilesResolver } from './profiles.resolver';

// @ts-ignore
@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [ProfilesService, ProfilesResolver],
  controllers: [],
  exports: [ProfilesService, TypeOrmModule],
})
export class ProfilesModule {}
