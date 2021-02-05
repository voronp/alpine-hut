import { Test, TestingModule } from '@nestjs/testing';
import { PeripheralGroupsResolver } from './peripheral-groups.resolver';

describe('PeripheralGroupsResolver', () => {
  let resolver: PeripheralGroupsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeripheralGroupsResolver],
    }).compile();

    resolver = module.get<PeripheralGroupsResolver>(PeripheralGroupsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
