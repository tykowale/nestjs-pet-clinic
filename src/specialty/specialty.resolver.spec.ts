import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyResolver } from './specialty.resolver';

describe('SpecialtyResolver', () => {
  let resolver: SpecialtyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialtyResolver],
    }).compile();

    resolver = module.get<SpecialtyResolver>(SpecialtyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
