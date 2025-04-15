import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Pet } from '@prisma/client';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Pet[]> {
    return this.prisma.pet.findMany();
  }

  async findOne(id: number): Promise<Pet | null> {
    return this.prisma.pet.findUnique({ where: { id } });
  }

  // Add create, update, delete later
}
