import { Test, TestingModule } from '@nestjs/testing';
import { Hardware } from './hardware';

describe('Hardware', () => {
  let provider: Hardware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Hardware],
    }).compile();

    provider = module.get<Hardware>(Hardware);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
