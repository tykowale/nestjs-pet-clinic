import { InputType, Field, PartialType } from '@nestjs/graphql';

// Base input for creation
@InputType()
class CreateSpecialtyInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateSpecialtyInput extends PartialType(CreateSpecialtyInput) {
  // Inherits optional name field
} 