import { InputType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreatePetInput {
  @Field()
  name: string;

  @Field(() => GraphQLISODateTime)
  birthDate: Date;

  @Field(() => Int)
  typeId: number; // ID of the PetType

  @Field(() => Int)
  ownerId: number; // ID of the Owner
} 