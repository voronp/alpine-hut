import { Test, TestingModule } from '@nestjs/testing';
import { PeripheralsResolver } from './peripherals.resolver';

describe('PeripheralsResolver', () => {
  let resolver: PeripheralsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeripheralsResolver],
    }).compile();

    resolver = module.get<PeripheralsResolver>(PeripheralsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
