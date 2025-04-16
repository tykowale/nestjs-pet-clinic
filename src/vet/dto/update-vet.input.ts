import { InputType, Field, PartialType } from '@nestjs/graphql';

// Simple input for updating basic vet info
// For managing specialties, a dedicated input/mutation is better
@InputType()
export class UpdateVetInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
} 