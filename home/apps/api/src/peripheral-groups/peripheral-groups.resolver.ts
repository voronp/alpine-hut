import {Query, Resolver} from '@nestjs/graphql';
import {PeripheralGroupsService} from "./peripheral-groups.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/gql-jwt-auth.guard";
import {User, PeripheralGroup} from "../graphql";
import {CurrentUser} from "../auth/gql-user.decorator";

@Resolver()
export class PeripheralGroupsResolver {
  constructor(private peripheralGroupService:PeripheralGroupsService) {

  }

  @Query(returns => PeripheralGroup)
  @UseGuards(GqlAuthGuard)
  async peripheralGroupList(@CurrentUser() user: User) {
    console.log(user)
    // for now will not check exact permissions besides user is logged in
    return this.peripheralGroupService.findAll()
  }

}
