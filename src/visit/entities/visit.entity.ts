import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Visit as PrismaVisit } from '@prisma/client';
import { Pet } from '../../pet/entities/pet.entity'; // Import Pet
import { Vet } from '../../vet/entities/vet.entity'; // Import Vet

@ObjectType()
export class Visit implements Partial<PrismaVisit> {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  visitDate: Date;

  @Field()
  description: string;

  @Field(() => Pet) // Add resolved pet field
  pet: Pet;

  @Field(() => Vet)
  vet: Vet;
} 