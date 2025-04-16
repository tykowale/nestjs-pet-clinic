import { Module } from '@nestjs/common';
import { VetService } from './vet.service';
import { VetResolver } from './vet.resolver';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [VetService, VetResolver],
  exports: [VetService],
})
export class VetModule {}
