import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Visit, Prisma } from '@prisma/client';
import { CreateVisitInput } from './dto/create-visit.input';
import { UpdateVisitInput } from './dto/update-visit.input';

@Injectable()
export class VisitService {
  constructor(private prisma: PrismaService) {}

  // Include only pet when finding visits initially
  private visitInclude = Prisma.validator<Prisma.VisitInclude>()({
    pet: true,
    // vet: true, // Removed vet include
  });

  async findAll(): Promise<Visit[]> {
    return this.prisma.visit.findMany({ include: this.visitInclude });
  }

  async findOne(id: number): Promise<Visit | null> {
    return this.prisma.visit.findUnique({
      where: { id },
      include: this.visitInclude,
    });
  }

  async create(createVisitInput: CreateVisitInput): Promise<Visit> {
    const data: Prisma.VisitCreateInput = {
      visitDate: createVisitInput.visitDate,
      description: createVisitInput.description,
      // Connect to existing Pet and Vet
      pet: {
        connect: { id: createVisitInput.petId },
      },
      vet: {
        connect: { id: createVisitInput.vetId },
      },
    };
    // Use include to return the relations immediately after creation
    return this.prisma.visit.create({ data, include: this.visitInclude });
  }

  async update(id: number, updateVisitInput: UpdateVisitInput): Promise<Visit> {
    const { petId, vetId, ...restData } = updateVisitInput;
    const data: Prisma.VisitUpdateInput = { ...restData };

    if (petId !== undefined) {
      data.pet = { connect: { id: petId } };
    }
    if (vetId !== undefined) {
      data.vet = { connect: { id: vetId } };
    }

    return this.prisma.visit.update({
      where: { id },
      data,
      include: this.visitInclude, // Include pet in return
    });
  }

  async remove(id: number): Promise<Visit> {
    // Visits usually don't have cascading dependencies, safe to delete directly
    return this.prisma.visit.delete({ where: { id } });
  }
}
