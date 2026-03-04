import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async getUserByClerkId(clerkId: string) {
    // In production, this queries Convex for the user by clerkId.
    // For now, returns a placeholder indicating the integration point.
    return {
      clerkId,
      message: 'Connect to Convex to fetch user profile',
    };
  }

  async handleWebhook(body: any) {
    // Handle Clerk webhook events (user.created, user.updated, etc.)
    // Sync user data to Convex database
    const eventType = body?.type;

    switch (eventType) {
      case 'user.created':
        // Create user in Convex
        return { handled: true, event: 'user.created' };
      case 'user.updated':
        // Update user in Convex
        return { handled: true, event: 'user.updated' };
      case 'user.deleted':
        // Handle user deletion
        return { handled: true, event: 'user.deleted' };
      default:
        return { handled: false, event: eventType };
    }
  }
}
