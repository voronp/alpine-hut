import { Test, TestingModule } from '@nestjs/testing';
import { Object3dReferencesService } from './object-3d-references.service';

describe('Object3dReferencesService', () => {
  let service: Object3dReferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Object3dReferencesService],
    }).compile();

    service = module.get<Object3dReferencesService>(Object3dReferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
