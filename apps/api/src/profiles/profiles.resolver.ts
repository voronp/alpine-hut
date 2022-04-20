import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {UseGuards} from "@nestjs/common";
import {Profile, User} from "../graphql";
import {GqlAuthGuard} from "../auth/gql-jwt-auth.guard";
import {CurrentUser} from "../auth/gql-user.decorator";

import {ProfilesService} from "./profiles.service";
import {ProfileAuthorization} from "../profile-authorizations/profile-authorization.entity";

@Resolver(Profile)
export class ProfilesResolver {
  constructor(
    private profileService:ProfilesService,
  ) {}

  @Query(() => Profile)
  @UseGuards(GqlAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return this.profileService.findOne(user.Profile.ID)
  }

  @ResolveField()
  public async Authorizations(@Parent() parent, @CurrentUser() user: User): Promise<ProfileAuthorization[]> {
    const pr = await this.profileService.findOne(user.Profile.ID, {relations: ['Authorizations']});
    return pr.Authorizations;
  }
}
