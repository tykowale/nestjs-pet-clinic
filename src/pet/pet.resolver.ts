import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';

@Resolver(() => Pet)
export class PetResolver {
  constructor(private readonly petService: PetService) {}

  @Query(() => [Pet], { name: 'pets' })
  findAllPets() {
    return this.petService.findAll();
  }

  @Query(() => Pet, { name: 'pet', nullable: true })
  findOnePet(@Args('id', { type: () => Int }) id: number) {
    return this.petService.findOne(id);
  }

  // Field resolvers for owner, type, visits will be added later
}
