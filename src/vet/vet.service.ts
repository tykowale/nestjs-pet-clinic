import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Vet, Prisma } from '@prisma/client';
import { UpdateVetInput } from './dto/update-vet.input';

@Injectable()
export class VetService {
  constructor(private prisma: PrismaService) {}

  // Include specialties when finding vets
  private vetInclude = Prisma.validator<Prisma.VetInclude>()({
    specialties: true,
  });

  async findAll(): Promise<Vet[]> {
    return this.prisma.vet.findMany({ include: this.vetInclude });
  }

  async findOne(id: number): Promise<Vet | null> {
    return this.prisma.vet.findUnique({
      where: { id },
      include: this.vetInclude,
    });
  }

  async update(id: number, updateVetInput: UpdateVetInput): Promise<Vet> {
    return this.prisma.vet.update({
      where: { id },
      data: updateVetInput,
      include: this.vetInclude,
    });
  }

  async remove(id: number): Promise<Vet> {
    return this.prisma.vet.delete({ where: { id } });
  }

  // Add create, update, delete later
}
