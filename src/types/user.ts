export type UserRole = 'admin' | 'user' | 'moderator' | 'guest';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface UserAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
}

export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    language: string;
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    currency: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: UserRole;
    status: UserStatus;
    addresses: UserAddress[];
    preferences: UserPreferences;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
}
