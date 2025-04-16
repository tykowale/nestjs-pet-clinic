import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { VetService } from './vet.service';
import { Vet } from './entities/vet.entity';
import { UpdateVetInput } from './dto/update-vet.input';
import { Specialty } from '../specialty/entities/specialty.entity';
import { Vet as PrismaVet, Specialty as PrismaSpecialty } from '@prisma/client';

@Resolver(() => Vet)
export class VetResolver {
  constructor(private readonly vetService: VetService) {}

  @Query(() => [Vet], { name: 'vets' })
  findAllVets() {
    return this.vetService.findAll();
  }

  @Query(() => Vet, { name: 'vet', nullable: true })
  findOneVet(@Args('id', { type: () => Int }) id: number) {
    return this.vetService.findOne(id);
  }

  // Since the service includes specialties, the resolver is simple
  @ResolveField('specialties', () => [Specialty])
  getSpecialties(
    @Parent() vet: PrismaVet & { specialties: PrismaSpecialty[] },
  ): Specialty[] {
    // The service already fetched specialties, just return them
    // We return PrismaSpecialty[] which is compatible with Specialty[] here
    return vet.specialties;
  }

  @Mutation(() => Vet)
  updateVet(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateVetInput') updateVetInput: UpdateVetInput,
  ) {
    return this.vetService.update(id, updateVetInput);
  }

  @Mutation(() => Vet)
  removeVet(@Args('id', { type: () => Int }) id: number) {
    return this.vetService.remove(id);
  }
}
