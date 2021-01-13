import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {UsersService} from './users.service'
import {User} from "../graphql";
import {CurrentUser} from "../auth/gql-user.decorator";
import {GqlAuthGuard} from "../auth/gql-jwt-auth.guard";
import {UseGuards} from "@nestjs/common";

@Resolver('User')
export class UsersResolver {
  constructor(
    //private usersService: UsersService,
  ) {}

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    console.log(user)
    return user
  }


}
