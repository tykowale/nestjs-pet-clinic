import { PetService } from './pet.service';
export declare class PetResolver {
    private readonly petService;
    constructor(petService: PetService);
    findAllPets(): Promise<{
        name: string;
        id: number;
        birthDate: Date;
        typeId: number;
        ownerId: number;
    }[]>;
    findOnePet(id: number): Promise<{
        name: string;
        id: number;
        birthDate: Date;
        typeId: number;
        ownerId: number;
    }>;
}
