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
import { Pet } from '../pet/entities/pet.entity';
import { PrismaService } from '../prisma.service';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Owner], { name: 'owners' })
  findAllOwners() {
    return this.ownerService.findAll();
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
  async getPets(@Parent() owner: Owner): Promise<Pet[]> {
    const { id } = owner;
    return this.prisma.pet.findMany({
      where: {
        ownerId: id,
      },
    });
  }

  // We'll add update, delete later
}
