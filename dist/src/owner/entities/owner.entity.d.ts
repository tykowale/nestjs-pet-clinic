import { Owner as PrismaOwner } from '@prisma/client';
import { Pet } from '../../pet/entities/pet.entity';
export declare class Owner implements Partial<PrismaOwner> {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    telephone: string;
    pets?: Pet[];
}
