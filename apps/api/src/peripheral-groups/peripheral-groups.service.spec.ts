import { Test, TestingModule } from '@nestjs/testing';
import { PeripheralGroupsService } from './peripheral-groups.service';

describe('PeripheralGroupsService', () => {
  let service: PeripheralGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeripheralGroupsService],
    }).compile();

    service = module.get<PeripheralGroupsService>(PeripheralGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
