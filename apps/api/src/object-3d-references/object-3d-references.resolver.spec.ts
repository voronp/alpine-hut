import { Test, TestingModule } from '@nestjs/testing';
import { Object3dReferencesResolver } from './object-3d-references.resolver';

describe('Object3dReferencesResolver', () => {
  let resolver: Object3dReferencesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Object3dReferencesResolver],
    }).compile();

    resolver = module.get<Object3dReferencesResolver>(Object3dReferencesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
