import { Pet as PrismaPet } from '@prisma/client';
export declare class Pet implements Partial<PrismaPet> {
    id: number;
    name: string;
    birthDate: Date;
    typeId: number;
    ownerId: number;
}
