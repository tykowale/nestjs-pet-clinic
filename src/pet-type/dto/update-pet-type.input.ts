import { InputType, Field, PartialType } from '@nestjs/graphql';

// Base input for creation (even though we might not expose create mutation)
@InputType()
class CreatePetTypeInput {
  @Field()
  name: string;
}

@InputType()
export class UpdatePetTypeInput extends PartialType(CreatePetTypeInput) {
  // Inherits optional name field
} 