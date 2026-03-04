import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getCurrentUser(req: any): Promise<{
        clerkId: string;
        message: string;
    } | {
        error: string;
    }>;
    handleClerkWebhook(body: any): Promise<{
        handled: boolean;
        event: any;
    }>;
}
