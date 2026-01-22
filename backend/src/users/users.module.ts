import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { UsersRepo } from './repo/users.repo';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepo],
  exports: [UsersService],
})
export class UsersModule {}
