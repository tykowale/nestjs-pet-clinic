import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { OwnerModule } from './owner/owner.module';
import { PetModule } from './pet/pet.module';
import { VetModule } from './vet/vet.module';
import { PetTypeModule } from './pet-type/pet-type.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { VisitModule } from './visit/visit.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Enable GraphQL Playground
    }),
    PrismaModule,
    OwnerModule,
    PetModule,
    VetModule,
    PetTypeModule,
    SpecialtyModule,
    VisitModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
