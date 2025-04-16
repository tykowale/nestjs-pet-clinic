import { Test, TestingModule } from '@nestjs/testing';
import { VisitResolver } from './visit.resolver';

describe('VisitResolver', () => {
  let resolver: VisitResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitResolver],
    }).compile();

    resolver = module.get<VisitResolver>(VisitResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
