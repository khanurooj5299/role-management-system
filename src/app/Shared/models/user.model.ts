export interface UserModel {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    category?: string,
    created: Date
    lastUpdated?: Date
}