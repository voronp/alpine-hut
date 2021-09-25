import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {Object3dReferencesService} from "../object-3d-references/object-3d-references.service";
import {Object3dReference} from "../object-3d-references/object-3d-references.entity";
import {Peripheral} from "./peripherals.entity";

@Resolver(Peripheral)
export class PeripheralsResolver {
  constructor(
    private object3DReferenceService:Object3dReferencesService,
  ) {}

  @ResolveField()
  public async Object3DReference(@Parent() parent): Promise<Object3dReference> {
    return this.object3DReferenceService.findOne(parent.Object3DReferenceID)
  }
}
