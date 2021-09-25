import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {PeripheralGroupsService} from "./peripheral-groups.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/gql-jwt-auth.guard";
import {User, PeripheralGroup} from "../graphql";
import {CurrentUser} from "../auth/gql-user.decorator";
import {Object3dReference} from "../object-3d-references/object-3d-references.entity";
import {Object3dReferencesService} from "../object-3d-references/object-3d-references.service";

@Resolver(PeripheralGroup)
export class PeripheralGroupsResolver {
  constructor(
    private peripheralGroupService:PeripheralGroupsService,
    private object3DReferenceService:Object3dReferencesService,
  ) {}

  @Query(returns => PeripheralGroup)
  @UseGuards(GqlAuthGuard)
  async peripheralGroupList(@CurrentUser() user: User) {
    // for now will not check exact permissions besides user is logged in
    return this.peripheralGroupService.findAll()
  }

  @ResolveField()
  public async Object3DReference(@Parent() parent): Promise<Object3dReference> {
    return this.object3DReferenceService.findOne(parent.Object3DReferenceID)
  }
}
