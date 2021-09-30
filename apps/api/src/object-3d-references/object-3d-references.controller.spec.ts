import { Test, TestingModule } from '@nestjs/testing';
import { Object3dReferencesController } from './object-3d-references.controller';

describe('Object3dReferencesController', () => {
  let controller: Object3dReferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Object3dReferencesController],
    }).compile();

    controller = module.get<Object3dReferencesController>(Object3dReferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
