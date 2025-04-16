import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Specialty } from '@prisma/client';
import { UpdateSpecialtyInput } from './dto/update-specialty.input';

@Injectable()
export class SpecialtyService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Specialty[]> {
    return this.prisma.specialty.findMany();
  }

  async findOne(id: number): Promise<Specialty | null> {
    return this.prisma.specialty.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateSpecialtyInput: UpdateSpecialtyInput,
  ): Promise<Specialty> {
    return this.prisma.specialty.update({
      where: { id },
      data: updateSpecialtyInput,
    });
  }

  async remove(id: number): Promise<Specialty> {
    // TODO: Handle related Vets (disconnect?) or configure cascade delete?
    // Deleting a Specialty might be uncommon/restricted in a real app.
    return this.prisma.specialty.delete({ where: { id } });
  }

  // Potential future methods: create, update, delete if needed
}
