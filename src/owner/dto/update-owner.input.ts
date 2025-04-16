import { CreateOwnerInput } from './create-owner.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {
  // No need to redefine fields, PartialType makes them optional
  // We don't include ID here; it will be a separate argument in the mutation
} 