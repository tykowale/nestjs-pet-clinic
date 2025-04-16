import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { VisitService } from './visit.service';
import { Visit } from './entities/visit.entity';
import { CreateVisitInput } from './dto/create-visit.input';
import { UpdateVisitInput } from './dto/update-visit.input';
import { Pet } from '../pet/entities/pet.entity';
import { Vet } from '../vet/entities/vet.entity';
import { VetService } from '../vet/vet.service';
import {
  Visit as PrismaVisit,
  Pet as PrismaPet,
  Vet as PrismaVet,
} from '@prisma/client';

@Resolver(() => Visit)
export class VisitResolver {
  constructor(
    private readonly visitService: VisitService,
    private readonly vetService: VetService,
  ) {}

  @Query(() => [Visit], { name: 'visits' })
  findAllVisits() {
    return this.visitService.findAll();
  }

  @Query(() => Visit, { name: 'visit', nullable: true })
  findOneVisit(@Args('id', { type: () => Int }) id: number) {
    return this.visitService.findOne(id);
  }

  // Since the service includes related objects, the resolvers are simple
  @ResolveField('pet', () => Pet)
  getPet(@Parent() visit: PrismaVisit & { pet: PrismaPet }): PrismaPet {
    return visit.pet;
  }

  @ResolveField('vet', () => Vet)
  async getVet(
    @Parent() visit: PrismaVisit & { vet: PrismaVet },
  ): Promise<Vet> {
    return this.vetService.findOne(visit.vetId);
  }

  @Mutation(() => Visit)
  createVisit(@Args('createVisitInput') createVisitInput: CreateVisitInput) {
    return this.visitService.create(createVisitInput);
  }

  @Mutation(() => Visit)
  updateVisit(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateVisitInput') updateVisitInput: UpdateVisitInput,
  ) {
    return this.visitService.update(id, updateVisitInput);
  }

  @Mutation(() => Visit)
  removeVisit(@Args('id', { type: () => Int }) id: number) {
    return this.visitService.remove(id);
  }
}
