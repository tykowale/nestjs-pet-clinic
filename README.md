# PetClinic NestJS GraphQL API

This project is a backend API implementation inspired by the Spring PetClinic application, specifically mirroring the functionality exposed by the [spring-petclinic-graphql](https://github.com/spring-petclinic/spring-petclinic-graphql) repository, but built using the NestJS framework.

The original Spring PetClinic can be found here: [spring-petclinic](https://github.com/spring-projects/spring-petclinic).

## Technology Stack

*   **Framework:** [NestJS](https://nestjs.com/) (^10.x)
*   **API:** [GraphQL](https://graphql.org/) (via `@nestjs/graphql` & Apollo Server)
*   **Database ORM:** [Prisma](https://www.prisma.io/) (^6.x)
*   **Database:** [PostgreSQL](https://www.postgresql.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

## Features

Provides GraphQL queries and mutations for managing:

*   Owners
*   Pets (including type and visits)
*   Vets (including specialties)
*   Pet Types
*   Specialties
*   Visits

## Setup and Running

### Prerequisites

*   Node.js (v20+ recommended)
*   npm
*   A running PostgreSQL instance
*   Docker (optional, if you prefer running PostgreSQL in a container)

### Configuration

1.  **Clone the repository:**
    ```bash
    # Replace with your actual repo URL if applicable
    git clone git@github.com:tykowale/nestjs-pet-clinic.git
    cd petclinic-nestjs-graphql
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Database Connection:**
    *   Copy the `.env.example` file (if one exists) or create a `.env` file in the project root.
    *   Set the `DATABASE_URL` environment variable in the `.env` file to point to your PostgreSQL instance. The format is:
        ```
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
        ```
        Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your actual database credentials. The default setup assumes user `user`, password `password`, host `localhost`, port `5432`, and database `petclinic`.

### Database Setup

1.  **Apply Migrations:** This command creates the database if it doesn't exist (based on the user's permissions) and applies all schema migrations.
    ```bash
    npx prisma migrate dev
    ```
    *(If you encounter issues with existing data during development, you might need `npx prisma migrate reset` to clear and reapply everything).* 

2.  **Seed Data:** Populate the database with initial sample data.
    ```bash
    npx prisma db seed
    ```

### Running the Application

1.  **Development Mode (with hot-reloading):**
    ```bash
    npm run start:dev
    ```

2.  **Production Mode:**
    ```bash
    npm run build
    npm run start:prod
    ```

The application will typically start on `http://localhost:3000`.

## GraphQL Playground

Once the application is running, you can access the GraphQL Playground (which provides an interactive schema explorer and query runner) in your browser at:

[http://localhost:3000/graphql](http://localhost:3000/graphql)

From here, you can explore the available queries and mutations and interact with the API.

## Testing the API

A sample script is provided to run through the core API functionalities:

```bash
npm run test:api
```
*(Make sure the main application is running in another terminal when you execute this script).*
