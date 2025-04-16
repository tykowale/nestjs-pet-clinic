import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Pet, Prisma } from '@prisma/client';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Pet[]> {
    return this.prisma.pet.findMany();
  }

  async findOne(id: number): Promise<Pet | null> {
    return this.prisma.pet.findUnique({ where: { id } });
  }

  async create(createPetInput: CreatePetInput): Promise<Pet> {
    const data: Prisma.PetCreateInput = {
      name: createPetInput.name,
      birthDate: createPetInput.birthDate,
      owner: {
        connect: { id: createPetInput.ownerId },
      },
      type: {
        connect: { id: createPetInput.typeId },
      },
    };
    return this.prisma.pet.create({ data });
  }

  async update(id: number, updatePetInput: UpdatePetInput): Promise<Pet> {
    const { ownerId, typeId, ...restData } = updatePetInput;

    const data: Prisma.PetUpdateInput = {
      ...restData,
    };

    if (ownerId !== undefined) {
      data.owner = { connect: { id: ownerId } };
    }
    if (typeId !== undefined) {
      data.type = { connect: { id: typeId } };
    }

    return this.prisma.pet.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Pet> {
    return this.prisma.pet.delete({ where: { id } });
  }
}
