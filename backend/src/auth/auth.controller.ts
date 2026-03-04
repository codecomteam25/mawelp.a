import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClerkGuard } from './clerk.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(ClerkGuard)
  async getCurrentUser(@Req() req: any) {
    const clerkId = req.auth?.userId;
    if (!clerkId) {
      return { error: 'Unauthorized' };
    }
    return this.authService.getUserByClerkId(clerkId);
  }

  @Post('webhook')
  async handleClerkWebhook(@Body() body: any) {
    return this.authService.handleWebhook(body);
  }
}
