import { OwnerService } from './owner.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { Pet } from '../pet/entities/pet.entity';
import { PrismaService } from '../prisma.service';
export declare class OwnerResolver {
    private readonly ownerService;
    private readonly prisma;
    constructor(ownerService: OwnerService, prisma: PrismaService);
    findAllOwners(): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        telephone: string;
    }[]>;
    findOneOwner(id: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        telephone: string;
    }>;
    createOwner(createOwnerInput: CreateOwnerInput): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        telephone: string;
    }>;
    getPets(owner: Owner): Promise<Pet[]>;
}
