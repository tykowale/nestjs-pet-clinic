import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PetType as PrismaPetType } from '@prisma/client';

@ObjectType()
export class PetType implements Partial<PrismaPetType> {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
} 