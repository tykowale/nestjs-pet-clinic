import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PetTypeService } from './pet-type.service';
import { PetType } from './entities/pet-type.entity';
import { UpdatePetTypeInput } from './dto/update-pet-type.input';

@Resolver(() => PetType)
export class PetTypeResolver {
  constructor(private readonly petTypeService: PetTypeService) {}

  @Query(() => [PetType], { name: 'petTypes' })
  findAllPetTypes() {
    return this.petTypeService.findAll();
  }

  @Query(() => PetType, { name: 'petType', nullable: true })
  findOnePetType(@Args('id', { type: () => Int }) id: number) {
    return this.petTypeService.findOne(id);
  }

  @Mutation(() => PetType)
  updatePetType(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePetTypeInput') updatePetTypeInput: UpdatePetTypeInput,
  ) {
    return this.petTypeService.update(id, updatePetTypeInput);
  }

  @Mutation(() => PetType)
  removePetType(@Args('id', { type: () => Int }) id: number) {
    // Note: If pets use this type, this will fail unless handled
    return this.petTypeService.remove(id);
  }
}
