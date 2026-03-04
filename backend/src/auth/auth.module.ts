import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClerkGuard } from './clerk.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ClerkGuard],
  exports: [AuthService, ClerkGuard],
})
export class AuthModule {}
