// --- Configuration ---
const endpoint = 'http://localhost:3000/graphql'; // Default NestJS port
let client; // Will be initialized later
let gql; // Will be initialized later

// --- GraphQL Documents (Declared but not defined yet) ---
let LIST_VETS_QUERY;
let GET_OWNER_QUERY;
let UPDATE_OWNER_MUTATION;
let CREATE_OWNER_MUTATION;
let GET_PET_QUERY;
let UPDATE_PET_MUTATION;
let CREATE_PET_MUTATION;
let CREATE_VISIT_MUTATION;
let LIST_OWNERS_QUERY;

async function runTest(testName, query, variables) {
  if (!client) {
    console.error('GraphQL client not initialized!');
    return undefined;
  }
  console.log(`\n--- Running Test: ${testName} ---`);
  try {
    const data = await client.request(query, variables);
    console.log('Response Data:');
    console.dir(data, { depth: null });
    return data;
  } catch (error) {
    console.error(`Error during ${testName}:`);
    if (error.response) {
      console.error(
        'GraphQL Errors:',
        JSON.stringify(error.response.errors, null, 2),
      );
    } else {
      console.error(error.message);
    }
    return undefined;
  }
}

// --- Test Execution ---
async function runAllTests() {
  const graphqlRequest = await import('graphql-request');
  gql = graphqlRequest.gql;
  const GraphQLClient = graphqlRequest.GraphQLClient;

  client = new GraphQLClient(endpoint);

  LIST_VETS_QUERY = gql`
    query ListVets {
      vets {
        id
        firstName
        lastName
        specialties {
          id
          name
        }
      }
    }
  `;

  GET_OWNER_QUERY = gql`
    query GetOwner($id: Int!) {
      owner(id: $id) {
        id
        firstName
        lastName
        address
        city
        telephone
        pets {
          id
          name
          birthDate
          type {
            id
            name
          }
          visits {
            id
            visitDate
            description
          }
        }
      }
    }
  `;
  UPDATE_OWNER_MUTATION = gql`
    mutation UpdateOwner($id: Int!, $input: UpdateOwnerInput!) {
      updateOwner(id: $id, updateOwnerInput: $input) {
        id
        firstName
        lastName
        address
        city
        telephone
      }
    }
  `;
  CREATE_OWNER_MUTATION = gql`
    mutation CreateOwner($input: CreateOwnerInput!) {
      createOwner(createOwnerInput: $input) {
        id
        firstName
        lastName
        address
        city
        telephone
      }
    }
  `;
  GET_PET_QUERY = gql`
    query GetPet($id: Int!) {
      pet(id: $id) {
        id
        name
        birthDate
        type {
          id
          name
        }
        owner {
          id
          firstName
          lastName
        }
        visits {
          id
          visitDate
          description
          vet {
            id
            firstName
            lastName
          }
        }
      }
    }
  `;
  UPDATE_PET_MUTATION = gql`
    mutation UpdatePet($id: Int!, $input: UpdatePetInput!) {
      updatePet(id: $id, updatePetInput: $input) {
        id
        name
        birthDate
        type {
          id
          name
        }
        owner {
          id
          firstName
        }
      }
    }
  `;
  CREATE_PET_MUTATION = gql`
    mutation CreatePet($input: CreatePetInput!) {
      createPet(createPetInput: $input) {
        id
        name
        birthDate
        type {
          id
          name
        }
        owner {
          id
          firstName
        }
      }
    }
  `;
  CREATE_VISIT_MUTATION = gql`
    mutation CreateVisit($input: CreateVisitInput!) {
      createVisit(createVisitInput: $input) {
        id
        visitDate
        description
        pet {
          id
          name
        }
        vet {
          id
          firstName
        }
      }
    }
  `;
  LIST_OWNERS_QUERY = gql`
    query ListOwners($lastName: String) {
      owners(lastName: $lastName) {
        id
        firstName
        lastName
        address
        city
        telephone
        pets {
          id
          name
          birthDate
          type {
            id
            name
          }
        }
      }
    }
  `;

  console.log('Starting API Tests...');

  let newOwnerId = null;
  let newPetId = null;
  let existingOwnerId = 1;
  let existingPetId = 1;
  let existingVetId = 1;
  let existingPetTypeId = 1;

  await runTest('List Vets', LIST_VETS_QUERY);

  await runTest('List All Owners', LIST_OWNERS_QUERY);

  await runTest('Find Owner by Last Name', LIST_OWNERS_QUERY, {
    lastName: 'Franklin',
  });

  const ownerData = await runTest('Get Owner 1 Info', GET_OWNER_QUERY, {
    id: existingOwnerId,
  });
  if (ownerData) {
    console.log(
      `(Retrieved owner data: ${JSON.stringify(ownerData).substring(0, 100)}...)`,
    );
  }

  await runTest('Update Owner 1 Info', UPDATE_OWNER_MUTATION, {
    id: existingOwnerId,
    input: { address: `123 Updated St ${Date.now()}`, city: 'Updated City' },
  });

  const newOwnerData = await runTest('Add New Owner', CREATE_OWNER_MUTATION, {
    input: {
      firstName: 'Test',
      lastName: `Owner ${Date.now()}`,
      address: '555 Test Ave',
      city: 'Testville',
      telephone: `555-${Math.floor(Math.random() * 10000)}`,
    },
  });
  if (newOwnerData?.createOwner?.id) {
    newOwnerId = newOwnerData.createOwner.id;
    console.log(`-> Created Owner ID: ${newOwnerId}`);
  }

  await runTest('Get Pet 1 Info', GET_PET_QUERY, { id: existingPetId });

  await runTest('Update Pet 1 Info', UPDATE_PET_MUTATION, {
    id: existingPetId,
    input: { name: `LeoUpdated ${Date.now()}` },
  });

  const ownerIdForNewPet = newOwnerId ?? existingOwnerId;
  const newPetData = await runTest('Add New Pet', CREATE_PET_MUTATION, {
    input: {
      name: `Buddy ${Date.now()}`,
      birthDate: new Date().toISOString(),
      typeId: existingPetTypeId, // Cat
      ownerId: ownerIdForNewPet,
    },
  });
  if (newPetData?.createPet?.id) {
    newPetId = newPetData.createPet.id;
    console.log(`-> Created Pet ID: ${newPetId}`);
  }

  await runTest('Get Pet 1 Visits', GET_PET_QUERY, { id: existingPetId });

  const petIdForNewVisit = newPetId ?? existingPetId;
  await runTest('Add New Visit', CREATE_VISIT_MUTATION, {
    input: {
      visitDate: new Date().toISOString(),
      description: `Test visit ${Date.now()}`,
      petId: petIdForNewVisit,
      vetId: existingVetId,
    },
  });

  console.log('\nAPI Tests Finished.');
}

runAllTests().catch((err) => {
  console.error('\n--- UNHANDLED ERROR DURING TEST EXECUTION ---');
  console.error(err);
  process.exit(1);
});
