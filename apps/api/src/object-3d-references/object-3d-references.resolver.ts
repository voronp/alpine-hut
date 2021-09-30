import {Resolver, ResolveProperty, Parent} from '@nestjs/graphql';
import {Object3dReferencesService} from "./object-3d-references.service";
import {Object3dReference} from "./object-3d-references.entity";

@Resolver()
export class Object3dReferencesResolver {
  constructor(private object3DReferenceService:Object3dReferencesService) {

  }
}
