import { Test, TestingModule } from '@nestjs/testing';
import { PeripheralsService } from './peripherals.service';

describe('PeripheralsService', () => {
  let service: PeripheralsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeripheralsService],
    }).compile();

    service = module.get<PeripheralsService>(PeripheralsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
