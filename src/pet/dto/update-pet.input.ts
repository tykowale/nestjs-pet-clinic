import { CreatePetInput } from './create-pet.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePetInput extends PartialType(CreatePetInput) {
  // Inherits optional fields: name, birthDate, typeId, ownerId
} 