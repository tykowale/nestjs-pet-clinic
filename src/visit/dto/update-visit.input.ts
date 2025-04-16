import { CreateVisitInput } from './create-visit.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVisitInput extends PartialType(CreateVisitInput) {
  // Inherits optional fields: visitDate, description, petId, vetId
} 