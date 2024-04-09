export interface User {
    firstName?: string,
    lastName?: string,
    email: string,
    role: string,
    category?: string,
    created: Date
    lastUpdated?: Date
}