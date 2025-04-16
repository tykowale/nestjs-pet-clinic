import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitResolver } from './visit.resolver';
import { PrismaModule } from '../prisma.module';
import { VetModule } from '../vet/vet.module';

@Module({
  imports: [PrismaModule, VetModule],
  providers: [VisitService, VisitResolver],
})
export class VisitModule {}
