import { Test, TestingModule } from '@nestjs/testing';
import { ProfileAuthorizationsService } from './profile-authorizations.service';

describe('ProfileAuthorizationsService', () => {
  let service: ProfileAuthorizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileAuthorizationsService],
    }).compile();

    service = module.get<ProfileAuthorizationsService>(ProfileAuthorizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
