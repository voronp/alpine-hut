import {Parent, Query, ResolveField, Resolver, Args, Mutation} from '@nestjs/graphql';
import {PeripheralGroupsService} from "./peripheral-groups.service";
import {Inject, UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/gql-jwt-auth.guard";
import {User, PeripheralGroup} from "../graphql";
import {CurrentUser} from "../auth/gql-user.decorator";
import {Object3dReference} from "../object-3d-references/object-3d-references.entity";
import {Object3dReferencesService} from "../object-3d-references/object-3d-references.service";
import {ServerState} from "../common/state";
import {HistoryService} from "../history/history.service";
import {HistoryActions} from "../history/history.entity";

@Resolver(PeripheralGroup)
export class PeripheralGroupsResolver {
  constructor(
    @Inject('STATE')
    private serverState: ServerState,
    private peripheralGroupService:PeripheralGroupsService,
    private object3DReferenceService:Object3dReferencesService,
    @Inject(HistoryService)
    private historyService: HistoryService,
  ) {}

  @Query(returns => PeripheralGroup)
  @UseGuards(GqlAuthGuard)
  async peripheralGroupList(@CurrentUser() user: User) {
    // for now will not check exact permissions besides user is logged in
    return this.peripheralGroupService.findAll()
  }

  @Query(returns => PeripheralGroup)
  @UseGuards(GqlAuthGuard)
  async getPeripheralGroupsBy3DPart(@Args('view3DPart') view3DPart: String, @CurrentUser() user: User) {
    // for now will not check exact permissions besides user is logged in
    return this.peripheralGroupService.findBy3DPart(view3DPart).then(res => {
      console.log(res);
      return res;
    });
  }

  @ResolveField()
  public async Object3DReference(@Parent() parent): Promise<Object3dReference> {
    return this.object3DReferenceService.findOne(parent.Object3DReferenceID)
  }

  @Mutation(returns => PeripheralGroup)
  async addPeripheralGroup(
    @Args('Name')
    Name: string,
    @Args('Data')
    Data: Record<string, unknown>,
    @Args('Data')
    Description: string,
    @Args('Data')
    Type: string,
    @CurrentUser() user: User,
  ) {
    return this.peripheralGroupService.add({Name, Data, Description, Type});
  }

  @Mutation(returns => PeripheralGroup)
  async activatePeripheralGroup(@Args('ID') ID: number, @CurrentUser() user: User) {
    try {
      const pg:PeripheralGroup = await this.peripheralGroupService.activatePeripheralGroupByID(ID);
      await this.historyService.addForPeripheralGroup(ID, {
        Action: HistoryActions.Activate,
        User: user.ID,
      });
      return pg;
    } catch (e) {
      return {result: false, error: e};
    }
  }

  @Mutation(returns => PeripheralGroup)
  async deactivatePeripheralGroup(@Args('ID') ID: number, @CurrentUser() user: User) {
    try {
      const pg:PeripheralGroup = await this.peripheralGroupService.deactivatePeripheralGroupByID(ID);
      await this.historyService.addForPeripheralGroup(ID, {
        Action: HistoryActions.Deactivate,
        User: user.ID,
      });
      return pg;
    } catch (e) {
      return {result: false, error: e};
    }
  }
}
