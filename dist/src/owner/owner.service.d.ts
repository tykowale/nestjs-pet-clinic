import { PrismaService } from '../prisma.service';
import { Owner } from '@prisma/client';
import { CreateOwnerInput } from './dto/create-owner.input';
export declare class OwnerService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Owner[]>;
    findOne(id: number): Promise<Owner | null>;
    create(createOwnerInput: CreateOwnerInput): Promise<Owner>;
}
