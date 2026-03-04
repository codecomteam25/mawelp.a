import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];

    try {
      // In production, verify the JWT token using Clerk's backend SDK:
      // const { clerkClient } = require('@clerk/backend');
      // const session = await clerkClient.verifyToken(token);
      // request.auth = { userId: session.sub };

      // Placeholder for development:
      request.auth = { userId: 'dev_user', token };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
