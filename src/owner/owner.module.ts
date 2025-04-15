import { Module } from '@nestjs/common';
import { OwnerResolver } from './owner.resolver';
import { OwnerService } from './owner.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [OwnerResolver, OwnerService],
})
export class OwnerModule {}
