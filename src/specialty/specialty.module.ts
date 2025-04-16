import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyResolver } from './specialty.resolver';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SpecialtyService, SpecialtyResolver],
})
export class SpecialtyModule {}
