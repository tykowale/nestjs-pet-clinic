import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
// import { describe } from 'node:test'; // Ensure describe is imported if not global

// --- Re-define GraphQL Documents directly here (or import if preferred) ---
// Note: No need for gql tag from graphql-request when using plain strings
const LIST_VETS_QUERY = `
  query ListVets {
    vets { id firstName lastName specialties { id name } }
  }
`;

const GET_OWNER_QUERY = `
  query GetOwner($id: Int!) {
    owner(id: $id) {
      id firstName lastName address city telephone
      pets { id name birthDate type { id name } visits { id visitDate description } }
    }
  }
`;

const UPDATE_OWNER_MUTATION = `
  mutation UpdateOwner($id: Int!, $input: UpdateOwnerInput!) {
    updateOwner(id: $id, updateOwnerInput: $input) { id firstName lastName address city telephone }
  }
`;

const CREATE_OWNER_MUTATION = `
  mutation CreateOwner($input: CreateOwnerInput!) {
    createOwner(createOwnerInput: $input) { id firstName lastName address city telephone }
  }
`;

const GET_PET_QUERY = `
  query GetPet($id: Int!) {
    pet(id: $id) {
      id name birthDate type { id name } owner { id firstName lastName }
      visits { id visitDate description vet { id firstName lastName } }
    }
  }
`;

const UPDATE_PET_MUTATION = `
  mutation UpdatePet($id: Int!, $input: UpdatePetInput!) {
    updatePet(id: $id, updatePetInput: $input) { id name birthDate type { id name } owner { id firstName } }
  }
`;

const CREATE_PET_MUTATION = `
  mutation CreatePet($input: CreatePetInput!) {
    createPet(createPetInput: $input) { id name birthDate type { id name } owner { id firstName } }
  }
`;

const CREATE_VISIT_MUTATION = `
  mutation CreateVisit($input: CreateVisitInput!) {
    createVisit(createVisitInput: $input) { id visitDate description pet { id name } vet { id firstName } }
  }
`;

const LIST_OWNERS_QUERY = `
  query ListOwners($lastName: String) {
    owners(lastName: $lastName) {
      id firstName lastName address city telephone
      pets { id name birthDate type { id name } }
    }
  }
`;

describe('PetClinic GraphQL API (e2e)', () => {
  let app: INestApplication;
  let createdOwnerId: number | null = null;
  let createdPetId: number | null = null;
  const existingOwnerId = 1;
  const existingPetId = 1;
  const existingVetId = 1;
  const existingPetTypeId = 1;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const graphqlRequest = (query: string, variables?: any) => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query, variables });
  };

  it('should list vets and their specialties', async () => {
    const response = await graphqlRequest(LIST_VETS_QUERY);
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.vets).toBeInstanceOf(Array);
    expect(response.body.data.vets.length).toBeGreaterThan(0);
    expect(response.body.data.vets[0].specialties).toBeDefined();
  });

  it('should list all owners', async () => {
    const response = await graphqlRequest(LIST_OWNERS_QUERY);
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.owners).toBeInstanceOf(Array);
    expect(response.body.data.owners.length).toBeGreaterThan(0);
  });

  it('should find owner by last name', async () => {
    const response = await graphqlRequest(LIST_OWNERS_QUERY, {
      lastName: 'Franklin',
    });
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.owners).toBeInstanceOf(Array);
    expect(response.body.data.owners.length).toBe(1);
    expect(response.body.data.owners[0].lastName).toBe('Franklin');
  });

  it('should view specific owner info', async () => {
    const response = await graphqlRequest(GET_OWNER_QUERY, {
      id: existingOwnerId,
    });
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.owner.id).toBe(existingOwnerId);
    expect(response.body.data.owner.pets).toBeInstanceOf(Array);
  });

  it('should update owner info', async () => {
    const newAddress = `456 Updated Ave ${Date.now()}`;
    const response = await graphqlRequest(UPDATE_OWNER_MUTATION, {
      id: existingOwnerId,
      input: {
        address: newAddress,
      },
    });
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.updateOwner.id).toBe(existingOwnerId);
    expect(response.body.data.updateOwner.address).toBe(newAddress);
  });

  it('should add a new owner', async () => {
    const newLastName = `TestOwner${Date.now()}`;
    const response = await graphqlRequest(CREATE_OWNER_MUTATION, {
      input: {
        firstName: 'E2E',
        lastName: newLastName,
        address: '789 E2E St',
        city: 'Testville',
        telephone: `555-e2e-${Math.floor(Math.random() * 1000)}`,
      },
    });
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.createOwner.id).toBeDefined();
    expect(response.body.data.createOwner.lastName).toBe(newLastName);
    createdOwnerId = response.body.data.createOwner.id;
    console.log(` -> E2E Created Owner ID: ${createdOwnerId}`);
  });

  it('should view specific pet info including visits', async () => {
    const response = await graphqlRequest(GET_PET_QUERY, { id: existingPetId });
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.pet.id).toBe(existingPetId);
    expect(response.body.data.pet.owner).toBeDefined();
    expect(response.body.data.pet.type).toBeDefined();
    expect(response.body.data.pet.visits).toBeInstanceOf(Array);
  });

  it('should update pet info', async () => {
    const newName = `LeoE2E_${Date.now()}`;
    const response = await graphqlRequest(UPDATE_PET_MUTATION, {
      id: existingPetId,
      input: { name: newName },
    });
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.updatePet.id).toBe(existingPetId);
    expect(response.body.data.updatePet.name).toBe(newName);
  });

  it('should add a new pet to the newly created owner', async () => {
    expect(createdOwnerId).toBeDefined();
    const newPetName = `BuddyE2E_${Date.now()}`;
    const response = await graphqlRequest(CREATE_PET_MUTATION, {
      input: {
        name: newPetName,
        birthDate: new Date().toISOString(),
        typeId: existingPetTypeId,
        ownerId: createdOwnerId,
      },
    });
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.createPet.id).toBeDefined();
    expect(response.body.data.createPet.name).toBe(newPetName);
    expect(response.body.data.createPet.owner.id).toBe(createdOwnerId);
    createdPetId = response.body.data.createPet.id;
    console.log(` -> E2E Created Pet ID: ${createdPetId}`);
  });

  it('should add a visit for the newly created pet', async () => {
    expect(createdPetId).toBeDefined();
    const description = `Test Visit E2E ${Date.now()}`;
    const response = await graphqlRequest(CREATE_VISIT_MUTATION, {
      input: {
        visitDate: new Date().toISOString(),
        description: description,
        petId: createdPetId,
        vetId: existingVetId,
      },
    });
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.createVisit.id).toBeDefined();
    expect(response.body.data.createVisit.description).toBe(description);
    expect(response.body.data.createVisit.pet.id).toBe(createdPetId);
    expect(response.body.data.createVisit.vet.id).toBe(existingVetId);
  });
});
