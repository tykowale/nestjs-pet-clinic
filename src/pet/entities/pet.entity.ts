import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Pet as PrismaPet } from '@prisma/client';
// We'll import Owner and PetType entities later when needed for resolvers

@ObjectType()
export class Pet implements Partial<PrismaPet> {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => GraphQLISODateTime)
  birthDate: Date;

  @Field(() => Int) // Expose foreign key
  typeId: number;

  @Field(() => Int) // Expose foreign key
  ownerId: number;

  // We'll add resolvers for type, owner, and visits later
} 