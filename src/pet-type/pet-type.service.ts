import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PetType } from '@prisma/client';
import { UpdatePetTypeInput } from './dto/update-pet-type.input';

@Injectable()
export class PetTypeService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PetType[]> {
    return this.prisma.petType.findMany();
  }

  async findOne(id: number): Promise<PetType | null> {
    return this.prisma.petType.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updatePetTypeInput: UpdatePetTypeInput,
  ): Promise<PetType> {
    return this.prisma.petType.update({
      where: { id },
      data: updatePetTypeInput,
    });
  }

  async remove(id: number): Promise<PetType> {
    // TODO: Handle related Pets or configure cascade delete
    return this.prisma.petType.delete({ where: { id } });
  }

  // Potential future methods: create, update, delete if needed
}
