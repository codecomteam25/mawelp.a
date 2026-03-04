export declare class AuthService {
    getUserByClerkId(clerkId: string): Promise<{
        clerkId: string;
        message: string;
    }>;
    handleWebhook(body: any): Promise<{
        handled: boolean;
        event: any;
    }>;
}
