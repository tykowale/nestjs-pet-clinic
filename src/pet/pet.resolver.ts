import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Owner } from '../owner/entities/owner.entity';
import { PetType } from '../pet-type/entities/pet-type.entity';
import { PrismaService } from '../prisma.service';
import { Pet as PrismaPet, Visit as PrismaVisit } from '@prisma/client';
import { Visit } from '../visit/entities/visit.entity';

@Resolver(() => Pet)
export class PetResolver {
  constructor(
    private readonly petService: PetService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Pet], { name: 'pets' })
  findAllPets() {
    return this.petService.findAll();
  }

  @Query(() => Pet, { name: 'pet', nullable: true })
  findOnePet(@Args('id', { type: () => Int }) id: number) {
    return this.petService.findOne(id);
  }

  @ResolveField('owner', () => Owner)
  async getOwner(@Parent() pet: PrismaPet): Promise<Owner> {
    return this.prisma.owner.findUnique({
      where: {
        id: pet.ownerId,
      },
    });
  }

  @ResolveField('type', () => PetType)
  async getType(@Parent() pet: PrismaPet): Promise<PetType> {
    return this.prisma.petType.findUnique({
      where: {
        id: pet.typeId,
      },
    });
  }

  @Mutation(() => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
    return this.petService.create(createPetInput);
  }

  @Mutation(() => Pet)
  updatePet(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePetInput') updatePetInput: UpdatePetInput,
  ) {
    return this.petService.update(id, updatePetInput);
  }

  @Mutation(() => Pet)
  removePet(@Args('id', { type: () => Int }) id: number) {
    return this.petService.remove(id);
  }

  @ResolveField('visits', () => [Visit])
  async getVisits(@Parent() pet: Pet): Promise<PrismaVisit[]> {
    const { id } = pet;
    return this.prisma.visit.findMany({
      where: {
        petId: id,
      },
    });
  }
}
