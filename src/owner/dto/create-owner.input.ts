import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOwnerInput {
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
}
