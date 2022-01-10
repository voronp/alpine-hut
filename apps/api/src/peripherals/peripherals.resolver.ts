import {Parent, ResolveField, Resolver, Subscription} from '@nestjs/graphql';
import {Inject, Injectable, UseGuards} from '@nestjs/common'
import {Object3dReferencesService} from "../object-3d-references/object-3d-references.service";
import {Object3dReference} from "../object-3d-references/object-3d-references.entity";
import {Peripheral} from "./peripherals.entity";
import {PubSub} from "graphql-subscriptions";
import {GqlAuthGuard} from "../auth/gql-jwt-auth.guard";
import {withCancel} from "../common/utils";

@Resolver(Peripheral)
@Injectable()
export class PeripheralsResolver {
  constructor(
    @Inject('PUB_SUB')
    private pubSub: PubSub,
    private object3DReferenceService:Object3dReferencesService,
  ) {}

  @ResolveField()
  public async Object3DReference(@Parent() parent): Promise<Object3dReference> {
    return this.object3DReferenceService.findOne(parent.Object3DReferenceID)
  }

  @Subscription('peripheralUpdated', {
    filter: (payload, variables) => {
      return payload.peripheralUpdated.ID === variables.peripheralID;
    },
  })
  public peripheralUpdated() {
    return withCancel(this.pubSub.asyncIterator('peripheralUpdated'), () => {
      console.log('unsubscribed', this.pubSub);
    });
  }
}
