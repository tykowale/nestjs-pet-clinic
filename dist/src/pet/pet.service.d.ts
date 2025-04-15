import { PrismaService } from '../prisma.service';
import { Pet } from '@prisma/client';
export declare class PetService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Pet[]>;
    findOne(id: number): Promise<Pet | null>;
}
