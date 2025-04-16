import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Pet as PrismaPet } from '@prisma/client';
import { Owner } from '../../owner/entities/owner.entity';
import { PetType } from '../../pet-type/entities/pet-type.entity';
import { Visit } from '../../visit/entities/visit.entity';

@ObjectType()
export class Pet implements Partial<PrismaPet> {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => GraphQLISODateTime)
  birthDate: Date;

  @Field(() => PetType)
  type: PetType;

  @Field(() => Owner)
  owner: Owner;

  @Field(() => [Visit], { nullable: 'itemsAndList' })
  visits?: Visit[];

  // We'll add resolvers for visits later
} 