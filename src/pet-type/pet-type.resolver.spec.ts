import { Test, TestingModule } from '@nestjs/testing';
import { PetTypeResolver } from './pet-type.resolver';

describe('PetTypeResolver', () => {
  let resolver: PetTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetTypeResolver],
    }).compile();

    resolver = module.get<PetTypeResolver>(PetTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
