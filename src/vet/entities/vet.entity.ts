import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Vet as PrismaVet } from '@prisma/client';
import { Specialty } from '../../specialty/entities/specialty.entity'; // Import Specialty

@ObjectType()
export class Vet implements Partial<PrismaVet> {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => [Specialty], { nullable: 'itemsAndList' })
  specialties?: Specialty[];
} 