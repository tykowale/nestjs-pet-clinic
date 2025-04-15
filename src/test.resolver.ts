import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class TestResolver {
  // Simple query that returns a string
  @Query(() => String)
  testQuery(): string {
    return 'GraphQL setup is working!';
  }
}
