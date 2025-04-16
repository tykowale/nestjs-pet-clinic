import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SpecialtyService } from './specialty.service';
import { Specialty } from './entities/specialty.entity';
import { UpdateSpecialtyInput } from './dto/update-specialty.input';

@Resolver(() => Specialty)
export class SpecialtyResolver {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Query(() => [Specialty], { name: 'specialties' })
  findAllSpecialties() {
    return this.specialtyService.findAll();
  }

  @Query(() => Specialty, { name: 'specialty', nullable: true })
  findOneSpecialty(@Args('id', { type: () => Int }) id: number) {
    return this.specialtyService.findOne(id);
  }

  @Mutation(() => Specialty)
  updateSpecialty(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateSpecialtyInput') updateSpecialtyInput: UpdateSpecialtyInput,
  ) {
    return this.specialtyService.update(id, updateSpecialtyInput);
  }

  @Mutation(() => Specialty)
  removeSpecialty(@Args('id', { type: () => Int }) id: number) {
    // Note: If vets have this specialty, this will fail unless handled
    return this.specialtyService.remove(id);
  }
}
