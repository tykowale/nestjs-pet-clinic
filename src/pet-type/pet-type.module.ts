import { Module } from '@nestjs/common';
import { PetTypeService } from './pet-type.service';
import { PetTypeResolver } from './pet-type.resolver';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PetTypeService, PetTypeResolver],
})
export class PetTypeModule {}
