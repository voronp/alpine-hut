import { Test, TestingModule } from '@nestjs/testing';
import { PeripheralGroupsController } from './peripheral-groups.controller';

describe('PeripheralGroupsController', () => {
  let controller: PeripheralGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeripheralGroupsController],
    }).compile();

    controller = module.get<PeripheralGroupsController>(PeripheralGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
