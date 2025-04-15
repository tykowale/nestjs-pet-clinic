import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Owner, Prisma } from '@prisma/client';
import { CreateOwnerInput } from './dto/create-owner.input';

@Injectable()
export class OwnerService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Owner[]> {
    return this.prisma.owner.findMany();
  }

  async findOne(id: number): Promise<Owner | null> {
    const owner = await this.prisma.owner.findUnique({
      where: { id },
    });
    if (!owner) {
      return null;
    }
    return owner;
  }

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const data: Prisma.OwnerCreateInput = {
      firstName: createOwnerInput.firstName,
      lastName: createOwnerInput.lastName,
      address: createOwnerInput.address,
      city: createOwnerInput.city,
      telephone: createOwnerInput.telephone,
    };
    return this.prisma.owner.create({ data });
  }

  // We'll add update, delete later
}
