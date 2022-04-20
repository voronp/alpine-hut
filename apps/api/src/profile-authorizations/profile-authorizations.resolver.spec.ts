import { Test, TestingModule } from '@nestjs/testing';
import { ProfileAuthorizationsResolver } from './profile-authorizations.resolver';

describe('ProfileAuthorizationsResolver', () => {
  let resolver: ProfileAuthorizationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileAuthorizationsResolver],
    }).compile();

    resolver = module.get<ProfileAuthorizationsResolver>(
      ProfileAuthorizationsResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
