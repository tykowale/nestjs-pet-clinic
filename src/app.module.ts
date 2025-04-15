import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { TestModule } from './test/test.module';
import { TestResolver } from './test.resolver';
import { TestService } from './test.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Enable GraphQL Playground
    }),
    PrismaModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, TestResolver, TestService],
})
export class AppModule {}
