export interface User {
    email: string;
    passwordHash: string;
}

export const users: User[] = [];