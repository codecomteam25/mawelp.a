"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    async getUserByClerkId(clerkId) {
        return {
            clerkId,
            message: 'Connect to Convex to fetch user profile',
        };
    }
    async handleWebhook(body) {
        const eventType = body?.type;
        switch (eventType) {
            case 'user.created':
                return { handled: true, event: 'user.created' };
            case 'user.updated':
                return { handled: true, event: 'user.updated' };
            case 'user.deleted':
                return { handled: true, event: 'user.deleted' };
            default:
                return { handled: false, event: eventType };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map