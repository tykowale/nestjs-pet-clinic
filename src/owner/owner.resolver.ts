import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OwnerService } from './owner.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Pet } from '../pet/entities/pet.entity';
import { PrismaService } from '../prisma.service';
import { Pet as PrismaPet } from '@prisma/client';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Owner], { name: 'owners' })
  findAllOwners(
    @Args('lastName', { type: () => String, nullable: true }) lastName?: string,
  ) {
    return this.ownerService.findAll(lastName);
  }

  @Query(() => Owner, { name: 'owner', nullable: true })
  findOneOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownerService.findOne(id);
  }

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownerService.create(createOwnerInput);
  }

  @ResolveField('pets', () => [Pet])
  async getPets(@Parent() owner: Owner): Promise<PrismaPet[]> {
    const { id } = owner;
    return this.prisma.pet.findMany({
      where: {
        ownerId: id,
      },
    });
  }

  @Mutation(() => Owner)
  updateOwner(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput,
  ) {
    return this.ownerService.update(id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  removeOwner(@Args('id', { type: () => Int }) id: number) {
    // Note: If the owner has pets, this will likely fail due to foreign key constraints
    // unless cascade delete is configured in Prisma schema or handled in the service.
    return this.ownerService.remove(id);
  }
}
