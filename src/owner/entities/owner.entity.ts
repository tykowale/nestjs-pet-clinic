import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Owner as PrismaOwner } from '@prisma/client';
import { Pet } from '../../pet/entities/pet.entity';

@ObjectType()
export class Owner implements Partial<PrismaOwner> {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  telephone: string;

  @Field(() => [Pet], { nullable: 'itemsAndList' })
  pets?: Pet[];

  // We'll add relations like pets later
}
