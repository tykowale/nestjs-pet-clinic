import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Specialty as PrismaSpecialty } from '@prisma/client';

@ObjectType()
export class Specialty implements Partial<PrismaSpecialty> {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
} 