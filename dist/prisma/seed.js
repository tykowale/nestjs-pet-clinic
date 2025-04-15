"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log(`Start seeding ...`);
    console.log('Seeding PetTypes...');
    const petTypes = [
        { name: 'cat' },
        { name: 'dog' },
        { name: 'lizard' },
        { name: 'snake' },
        { name: 'bird' },
        { name: 'hamster' },
    ];
    await prisma.petType.upsert({
        where: { name: 'cat' },
        update: {},
        create: { name: 'cat' },
    });
    await prisma.petType.upsert({
        where: { name: 'dog' },
        update: {},
        create: { name: 'dog' },
    });
    await prisma.petType.upsert({
        where: { name: 'lizard' },
        update: {},
        create: { name: 'lizard' },
    });
    await prisma.petType.upsert({
        where: { name: 'snake' },
        update: {},
        create: { name: 'snake' },
    });
    await prisma.petType.upsert({
        where: { name: 'bird' },
        update: {},
        create: { name: 'bird' },
    });
    await prisma.petType.upsert({
        where: { name: 'hamster' },
        update: {},
        create: { name: 'hamster' },
    });
    const createdPetTypes = await prisma.petType.findMany();
    const petTypeMap = new Map(createdPetTypes.map((pt) => [pt.name, pt.id]));
    console.log(`Upserted/Found ${createdPetTypes.length} PetTypes.`);
    console.log('Seeding Specialties...');
    const specialties = [
        { name: 'radiology' },
        { name: 'surgery' },
        { name: 'dentistry' },
    ];
    await prisma.specialty.upsert({
        where: { name: 'radiology' },
        update: {},
        create: { name: 'radiology' },
    });
    await prisma.specialty.upsert({
        where: { name: 'surgery' },
        update: {},
        create: { name: 'surgery' },
    });
    await prisma.specialty.upsert({
        where: { name: 'dentistry' },
        update: {},
        create: { name: 'dentistry' },
    });
    const createdSpecialties = await prisma.specialty.findMany();
    const specialtyMap = new Map(createdSpecialties.map((s) => [s.name, s.id]));
    console.log(`Upserted/Found ${createdSpecialties.length} Specialties.`);
    console.log('Seeding Vets...');
    const vet1 = await prisma.vet.upsert({
        where: { firstName_lastName: { firstName: 'James', lastName: 'Carter' } },
        update: {},
        create: { firstName: 'James', lastName: 'Carter' },
    });
    const vet2 = await prisma.vet.upsert({
        where: { firstName_lastName: { firstName: 'Helen', lastName: 'Leary' } },
        update: {
            specialties: { connect: [{ id: specialtyMap.get('radiology') }] },
        },
        create: {
            firstName: 'Helen',
            lastName: 'Leary',
            specialties: { connect: [{ id: specialtyMap.get('radiology') }] },
        },
    });
    const vet3 = await prisma.vet.upsert({
        where: { firstName_lastName: { firstName: 'Linda', lastName: 'Douglas' } },
        update: {
            specialties: {
                connect: [
                    { id: specialtyMap.get('surgery') },
                    { id: specialtyMap.get('dentistry') },
                ],
            },
        },
        create: {
            firstName: 'Linda',
            lastName: 'Douglas',
            specialties: {
                connect: [
                    { id: specialtyMap.get('surgery') },
                    { id: specialtyMap.get('dentistry') },
                ],
            },
        },
    });
    const createdVets = await prisma.vet.findMany();
    console.log(`Upserted/Found ${createdVets.length} Vets.`);
    console.log('Seeding Owners...');
    const owner1 = await prisma.owner.upsert({
        where: { telephone: '555-1234' },
        update: {},
        create: {
            firstName: 'George',
            lastName: 'Franklin',
            address: '110 W. Liberty St.',
            city: 'Madison',
            telephone: '555-1234',
        },
    });
    const owner2 = await prisma.owner.upsert({
        where: { telephone: '555-5678' },
        update: {},
        create: {
            firstName: 'Betty',
            lastName: 'Davis',
            address: '638 Cardinal Ave.',
            city: 'Sun Prairie',
            telephone: '555-5678',
        },
    });
    const owner3 = await prisma.owner.upsert({
        where: { telephone: '555-9101' },
        update: {},
        create: {
            firstName: 'Eduardo',
            lastName: 'Rodriquez',
            address: '2693 Commerce St.',
            city: 'McFarland',
            telephone: '555-9101',
        },
    });
    const createdOwners = await prisma.owner.findMany();
    console.log(`Upserted/Found ${createdOwners.length} Owners.`);
    console.log('Seeding Pets...');
    const pet1 = await prisma.pet.upsert({
        where: { name_ownerId: { name: 'Leo', ownerId: owner1.id } },
        update: {},
        create: {
            name: 'Leo',
            birthDate: new Date('2010-09-07'),
            typeId: petTypeMap.get('cat'),
            ownerId: owner1.id,
        },
    });
    const pet2 = await prisma.pet.upsert({
        where: { name_ownerId: { name: 'Basil', ownerId: owner2.id } },
        update: {},
        create: {
            name: 'Basil',
            birthDate: new Date('2012-08-06'),
            typeId: petTypeMap.get('hamster'),
            ownerId: owner2.id,
        },
    });
    const pet3 = await prisma.pet.upsert({
        where: { name_ownerId: { name: 'Rosy', ownerId: owner3.id } },
        update: {},
        create: {
            name: 'Rosy',
            birthDate: new Date('2011-04-17'),
            typeId: petTypeMap.get('dog'),
            ownerId: owner3.id,
        },
    });
    const createdPets = await prisma.pet.findMany();
    console.log(`Upserted/Found ${createdPets.length} Pets.`);
    console.log('Seeding Visits...');
    await prisma.visit.createMany({
        data: [
            {
                visitDate: new Date('2023-01-10'),
                description: 'Routine checkup',
                petId: pet1.id,
                vetId: vet1.id,
            },
            {
                visitDate: new Date('2023-03-15'),
                description: 'Vaccination',
                petId: pet1.id,
                vetId: vet2.id,
            },
            {
                visitDate: new Date('2023-04-20'),
                description: 'Check teeth',
                petId: pet2.id,
                vetId: vet3.id,
            },
        ],
        skipDuplicates: true,
    });
    const createdVisits = await prisma.visit.findMany();
    console.log(`Created ${createdVisits.length} Visits.`);
    console.log(`Seeding finished.`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map