import { Test, TestingModule } from '@nestjs/testing';
import { PeripheralsController } from './peripherals.controller';

describe('PeripheralsController', () => {
  let controller: PeripheralsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeripheralsController],
    }).compile();

    controller = module.get<PeripheralsController>(PeripheralsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
