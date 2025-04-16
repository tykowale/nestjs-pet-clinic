import { InputType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreateVisitInput {
  @Field(() => GraphQLISODateTime)
  visitDate: Date;

  @Field()
  description: string;

  @Field(() => Int)
  petId: number; // ID of the Pet being visited

  @Field(() => Int)
  vetId: number; // ID of the Vet performing the visit
} 